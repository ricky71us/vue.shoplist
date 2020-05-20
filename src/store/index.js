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
  catStoreItems: [],
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
  getCatStoreItems(state, catStoreItems) {
    state.catStoreItems = catStoreItems;
  },
  addCategoryStore(state, categoryStore) {
    //console.log(`categoryStore: ${categoryStore}`);
    state.categoryStores.unshift(...categoryStore); // mutable addition
  },
  deleteCategoryStore(state, categoryStoreId) {
    state.categoryStores = [
      ...state.categoryStores.filter((p) => p.id !== categoryStoreId),
    ];
  },
  addStoreItem(state, catStoreItem) {
    //console.log(`catStoreItem: ${catStoreItem}`);
    if (catStoreItem) state.catStoreItems.unshift(...catStoreItem); // mutable addition
  },
  deleteCatStoreItem(state, catStoreId) {
    state.catStoreItems = [
      ...state.catStoreItems.filter((p) => p.id !== catStoreId),
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
    const catStoreItems = await dataService.getCatStoreItems();
    commit("getCatStoreItems", catStoreItems);
  },
  async getItemsAction({ commit }) {
    const items = await dataService.getItems();
    commit("getItems", items);
  },
  async addCategoryStoreAction({ commit }, categoryStore) {
    const addedCategoryStore = await dataService.addCategoryStore(
      categoryStore
    );
    commit("addCategoryStore", addedCategoryStore);
  },
  async deleteCategoryStoreAction({ commit }, categoryStore) {
    await dataService.deleteCategoryStore(categoryStore);
    commit("deleteCategoryStore", categoryStore.id);
  },
  async addStoreItemsAction({ commit }, storeItem) {
    //console.log(`storeItem: ${storeItem}`);
    const addedStoreItem = await dataService.addStoreItem(storeItem);
    commit("addStoreItem", addedStoreItem);
  },
  async deleteCatStoreItemAction({ commit }, catStoreItem) {
    await dataService.deleteCatStoreItem(catStoreItem);
    commit("deleteCatStoreItem", catStoreItem.id);
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
  getItemsByCatStoresId: (state) => (catStoreId) =>
    state.catStoreItems.filter(
      (v) => parseInt(v.catstoreId) === parseInt(catStoreId)
    ),
  getCatStore: (state) => (catId, storeId) =>
    state.categoryStores.find(
      (v) => v.categoryId === catId && v.storeId === storeId
    ),
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
          if (catStores.length > 0) {
            children = [];
            catStores
              .sort((a, b) => a.categoryId - b.categoryId)
              .filter((c) => c.storeId > 0)
              .forEach((catStore) => {
                if (catStore.id) {
                  let catStoreItems = getters.getItemsByCatStoresId(
                    catStore.id
                  );
                  //console.log(catStore.id);
                  subChildren = [];
                  if (catStoreItems.length > 0) {
                    catStoreItems.forEach((storeItem) => {
                      let item = getters.getItemById(storeItem.itemId);
                      subChildren.push({
                        id: storeItem.itemId,
                        name: item ? item.name : "",
                        children: [],
                      });
                    });
                  }
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
