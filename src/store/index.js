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
  addStore(state, store) {
    state.stores.unshift(...store);
  },
  updateStore(state, store) {
    const index = state.stores.findIndex((h) => h.id === store.id);
    state.stores.splice(index, 1, store);
    state.stores = [...state.stores];
  },
  deleteStore(state, store) {
    state.stores = [...state.stores.filter((p) => p.id !== store.id)];
  },
  getCategories(state, categories) {
    state.categories = categories;
  },
  addCategory(state, category) {
    state.categories.unshift(...category); // mutable addition
  },
  updateCategory(state, category) {    
    const index = state.categories.findIndex((c) => c.id === category.id);    
    state.categories.splice(index, 1, category);
    state.categories = [...state.categories];
  },
  deleteCategory(state, categoryId) {
    state.categories = [...state.categories.filter((p) => p.id !== categoryId)];
  },
  getItems(state, items) {
    state.items = items;
  },
  addItem(state, item) {
    state.items.unshift(...item); // mutable addition
  },
  updateItem(state, item) {
    const index = state.items.findIndex((c) => c.id === item.id);
    //console.log(`item index of ${item.name} ; ${item.id} --> ${index}`);
    state.items.splice(index, 1, item);
    state.items = [...state.items];
  },
  deleteItem(state, item) {
    state.items = [...state.items.filter((p) => p.id !== item.id)];
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
  //Stores
  async getStoresAction({ commit }) {
    const stores = await dataService.getStores();
    commit("getStores", stores);
  },
  async addStoreAction({ commit }, store) {
    const addedStore = await dataService.addStore(store);
    commit("addStore", addedStore);
  },
  async updateStoreAction({ commit }, store) {
    const updatedStore = await dataService.updateStore(store);
    commit("updateStore", updatedStore);
  },
  async deleteStoreAction({ commit }, store) {
    await dataService.deleteStore(store);
    commit("deleteStore", store);
  },
  // categories
  async getCategoriesAction({ commit }) {
    const categories = await dataService.getCategories();
    commit("getCategories", categories);
  },
  async addCategoryAction({ commit }, category) {
    const addedCategory = await dataService.addCategory(category);
    commit("addCategory", addedCategory);
  },
  async updateCategoryAction({ commit }, category) {
    const updatedCategory = await dataService.updateCategory(category);
    commit("updateCategory", updatedCategory);
  },
  async deleteCategoryAction({ commit }, category) {
    await dataService.deleteCategory(category);
    commit("deleteCategory", category.id);
  },
  // Items
  async getItemsAction({ commit }) {
    const items = await dataService.getItems();
    commit("getItems", items);
  },
  async addItemAction({ commit }, item) {
    const addedItem = await dataService.addItem(item);
    commit("addItem", addedItem);
  },
  async updateItemAction({ commit }, item) {
    const updatedItem = await dataService.updateItem(item);
    commit("updateItem", updatedItem);
  },
  async deleteItemAction({ commit }, item) {
    const status = await dataService.deleteItem(item);
    if (status) commit("deleteItem", item);
  },
  //CategoryStores
  async getCategoryStoresAction({ commit }) {
    const categoryStores = await dataService.getCategoryStores();
    commit("getCategoryStores", categoryStores);
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
  //item Items
  async getStoreItemsAction({ commit }) {
    const catStoreItems = await dataService.getCatStoreItems();
    commit("getCatStoreItems", catStoreItems);
  },
  async addStoreItemsAction({ commit }, storeItem) {
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
