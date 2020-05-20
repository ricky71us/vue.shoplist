import * as axios from "axios";

import { API } from "./config";

const signIn = async function(user) {
  try {
    const response = await axios.post(`${API}/authentication/login`, user);
    const userInfo = parseItem(response, 200);
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
    return userInfo.data;
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
  try {
    console.log("Inside add store dataservice");
    console.log(store);
    const response = await axios.post(`${API}/stores`, store);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const updateStore = async function(store) {
  try {
    const response = await axios.post(`${API}/stores`, store);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const deleteStore = async function(store) {
  try {
    const response = await axios.post(`${API}/stores`, store);
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


const addCategory = async function() {
  try {
    const response = await axios.get(`${API}/categories`);
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
    const response = await axios.delete(`${API}/categorystores?id=${categoryStore.id}`, categoryStore);
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
    const response = await axios.post(`${API}/storeitems`, storeItem);
    const addedStoreItem = parseItem(response, 201);
    return addedStoreItem;    
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteCatStoreItem = async function(catStoreItem) {
  try {
    console.log(catStoreItem);    
    const response = await axios.delete(`${API}/storeitems?id=${catStoreItem.id}`, catStoreItem);
    let data = parseList(response);
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const parseList = (response) => {
  //console.log(response.status);
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
  //console.log(`Parsed Item with code ${code} - ${item}`)
  //console.log(item);
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
  getItems,
  getCategoryStores,
  getCatStoreItems,
  addCategoryStore,
  deleteCategoryStore,
  addStoreItem,
  deleteCatStoreItem,
};
