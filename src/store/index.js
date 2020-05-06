import Vue from "vue";
import Vuex from "vuex";
import { dataService } from "../shared";

Vue.use(Vuex);

const state = {
  user: { id: "", name: "" },
  stores: [],
  itemCategory: [],
  items: [],
  categories: [],
  categoryStores: [],
  storeItems: [],
};

const mutations = {
  signIn(state, user) {
    state.user = user;
  },
  getStores(state, stores) {
    state.stores = stores;
  },
  addStores(state, store) {
    state.stores.unshift(store);
  },
  updateStores(state, store) {
    const index = state.stores.findIndex((h) => h.id === store.id);
    state.stores.spice(index, 1, store);
    state.stores = [...state.stoers];
  },
  deleteStores(state, store) {
    state.stores = [...state.stores.filter((p) => p.id === store.id)];
  },
  getCategories(state, categories) {
    state.categories = categories;
  },
  getItems(state, items) {
    state.items = items;
  },
  getCategoryStores(state, categoryStores) {
    state.categoryStores = categoryStores;
  },
  getStoreItems(state, storeItems) {
    state.storeItems = storeItems;
  },
  addCategoryStore(state, categoryStore) {
    console.log(categoryStore);
    state.categoryStores.unshift(...categoryStore); // mutable addition
  },
  deleteCategoryStore(state, categoryStoreId) {
    state.categoryStores = [
      ...state.categoryStores.filter((p) => p.id !== categoryStoreId),
    ];
  },
};

const actions = {
  async signInAction({ commit }, user) {
    const signInUser = await dataService.signIn(user);
    commit("signIn", signInUser.data);
  },
  async getStoresAction({ commit }) {
    const stores = await dataService.getStores();
    commit("getStores", stores);
  },
  async addStoresAction({ commit }) {
    const store = await dataService.addStore();
    commit("addStores", store);
  },
  async updateStoresAction({ commit }) {
    const store = await dataService.updateStore();
    commit("updateStores", store);
  },
  async deleteStoresAction({ commit }) {
    const store = await dataService.deleteStore();
    commit("deleteStores", store);
  },
  async getCategoriesAction({ commit }) {
    const categories = await dataService.getCategories();
    commit("getCategories", categories);
  },
  async getCategoryStoresAction({ commit }) {
    const categoryStores = await dataService.getCategoryStores();
    commit("getCategoryStores", categoryStores);
  },
  async getStoreItemsAction({ commit }) {
    const storeItems = await dataService.getStoreItems();
    commit("getStoreItems", storeItems);
  },
  async getItemsAction({ commit }) {
    const items = await dataService.getItems();
    commit("getItems", items);
  },
  async addCategoryStoreAction({ commit }, categoryStore) {
    const addedCategoryStore = await dataService.addCategoryStore(
      categoryStore
    );
    commit("addCategoryStore", addedCategoryStore.data);
  },
  async deleteCategoryStoreAction({ commit }, categoryStore) {
    const deletedCategoryStoreId = await dataService.deleteCategoryStore(
      categoryStore
    );
    console.log(deletedCategoryStoreId);
    commit("deleteCategoryStore", categoryStore.id);
  },
};

const getters = {
  getUserName: (state) =>
    state.user.firstname === undefined
      ? "Guest"
      : state.user.firstname + " " + state.user.lastname,
  getStoreById: (state) => (id) =>
    state.stores.find((v) => parseInt(v.id) === parseInt(id)),
  getItemById: (state) => (id) =>
    state.items.find((v) => parseInt(v.id) === parseInt(id)),
  getCategoryById: (state) => (id) =>
    state.categories.find((v) => parseInt(v.id) === parseInt(id)),
  getStoresByCategory: (state) => (catId) =>
    state.categoryStores.filter(
      (v) => parseInt(v.categoryId) === parseInt(catId)
    ),
  getItemsByStores: (state) => (storeId) =>
    state.storeItems.filter((v) => parseInt(v.storeId) === parseInt(storeId)),
  selectedCategoryStoreItems(state, getters) {
    let items = [];
    let children = [];
    let subChildren = [];
    try {
      items = [];
      state.categories
        .sort((a, b) => {
          const bandA = a.name.toUpperCase();
          const bandB = b.name.toUpperCase();

          let comparison = 0;
          if (bandA > bandB) {
            comparison = 1;
          } else if (bandA < bandB) {
            comparison = -1;
          }
          return comparison;
        })
        .forEach((category) => {
          let catStores = [];
          catStores = getters.getStoresByCategory(category.id);
          // console.log(`cat Name: ${category.name}`)
          // console.log(catStores.length);
          if (catStores.length > 0) {
            children = [];
            catStores
              .sort((a, b) => a.categoryId - b.categoryId)
              .filter((c) => c.storeId > 0)
              .forEach((catStore) => {
                // console.log(`cat Id : ${category.id}`);
                // console.log(`   store Id : ${catStore.storeId}`);
                let storeItems = getters.getItemsByStores(catStore.storeId);
                subChildren = [];
                if (storeItems.length > 0) {
                  storeItems.forEach((storeItem) => {
                    // console.log(`     item ID : ${storeItem.itemId}`);
                    let item = getters.getItemById(storeItem.itemId);
                    subChildren.push({
                      id: storeItem.itemId,
                      name: item ? item.name : "",
                      children: [],
                    });
                  });
                }
                let store = getters.getStoreById(catStore.storeId);
                children.push({
                  id: catStore.storeId,
                  name: store ? store.name : "",
                  children: subChildren,
                });
              });

            items.push({
              id: category.id,
              name: category.name,
              children: children,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
    return items;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
