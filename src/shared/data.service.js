import * as axios from "axios";

import { API } from "./config";

const signIn = async function(user) {
  try {
    console.log('Sign in user');
    const response = await axios.post(`${API}/authentication/login`, user);
    const userInfo = parseItem(response, 200);
    console.log(userInfo);
    return userInfo.data;
  } catch (error) {
    console.error(error);
    console.error(error.message);
    return null;
  }
};

const register = async function(user) {
  
  try {
    const response = await axios.post(
      `${API}/authentication/registration`,
      user
    );
    
    const userInfo = parseItem(response, 200);
    
    return userInfo;
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }
};

const getStores = async function() {
  try {
    const response = await axios.get(`${API}/stores`);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const addStore = async function(store) {
  var response = null;
  try {
    response = await axios.post(`${API}/stores`, store);
    console.log(response);
    const addedStore = parseItem(response, 201);
    return addedStore;
  } catch (error) {
    console.log(store);    
    console.log(error)
    return error.message;
  }
};

const updateStore = async function(store) {
  try {
    console.log(store);
    const response = await axios.put(`${API}/stores?id=${store.id}`, store);
    parseItem(response, 200);
    return store;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const deleteStore = async function(store) {
  try {
    const response = await axios.delete(`${API}/stores?id=${store.id}`, store);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const getCategories = async function() {
  try {
    const response = await axios.get(`${API}/categories`);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const addCategory = async function(category) {
  try {
    const response = await axios.post(`${API}/categories`, category);
    const addedCategory = parseItem(response, 201);
    return addedCategory;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateCategory = async function(category) {
  try {
    const response = await axios.put(
      `${API}/categories?id=${category.id}`,
      category
    );
    parseItem(response, 200);
    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteCategory = async function(category) {
  try {
    const response = await axios.delete(
      `${API}/categories?id=${category.id}`,
      category
    );
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getItems = async function() {
  try {
    const response = await axios.get(`${API}/items`);
    let data = parseList(response);
    return data;
  } catch (error) {
    return [];
  }
};

const addItem = async function(item) {
  try {    
    const response = await axios.post(`${API}/items`, item);
    const addedItem = parseItem(response, 201);
    return addedItem;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateItem = async function(item) {
  try {
    const response = await axios.put(`${API}/items?id=${item.id}`, item);
    parseItem(response, 200);
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteItem = async function(item) {
  try {
    const response = await axios.delete(`${API}/items?id=${item.id}`, item);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getCategoryStores = async function() {
  try {
    const response = await axios.get(`${API}/categorystores`);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getCatStoreItems = async function() {
  try {
    const response = await axios.get(`${API}/storeitems`);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const addCategoryStore = async function(categoryStore) {
  try {
    const response = await axios.post(`${API}/categorystores`, categoryStore);
    const addedCategoryStore = parseItem(response, 201);
    return addedCategoryStore;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteCategoryStore = async function(categoryStore) {
  try {
    //console.log(categoryStore);
    const response = await axios.delete(
      `${API}/categorystores?id=${categoryStore.id}`,
      categoryStore
    );
    let data = parseList(response);
    //console.log(response);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const addStoreItem = async function(storeItem) {
  try {
    console.log(storeItem);
    const response = await axios.post(`${API}/storeitems`, storeItem);
    const addedStoreItem = parseItem(response, 201);
    console.log(addedStoreItem);
    return addedStoreItem;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteCatStoreItem = async function(catStoreItem) {
  try {    
    const response = await axios.delete(
      `${API}/storeitems?id=${catStoreItem.id}`,
      catStoreItem
    );
    let data = parseList(response);    
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const parseList = (response) => {  
  if (response.status !== 200) throw Error(response.data);
  if (!response) return [];
  let list = response.data;

  if (typeof list !== "object") {
    list = [];
  }
  return list;
};

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response);
  let item = response;
  if (typeof item !== "object") {
    item = undefined;
  }  
  return item.data;
};

export const dataService = {
  signIn,
  register,
  getStores,
  addStore,
  updateStore,
  deleteStore,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getItems,
  addItem,
  updateItem,
  deleteItem,
  getCategoryStores,
  addCategoryStore,
  deleteCategoryStore,
  getCatStoreItems,
  addStoreItem,
  deleteCatStoreItem,
};
