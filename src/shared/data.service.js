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
    const response = await axios.post(`${API}/authentication/registration`,
      user
    );
    const userInfo = parseItem(response, 200);    
    return userInfo.data;
  } catch (error) {
    console.error(error);
    console.error(error.message);
    return error.message;
  }
};

// const parseList = response => {
//   if (response.status !== 200) throw Error(response.data);
//   if (!response) return [];
//   let list = response.data;
//   if (typeof list !== 'object') {
//     list = [];
//   }
//   return list;
// };

export const parseItem = (response, code) => {  
  if (response.status !== code) throw Error(response);
  let item = response;
  if (typeof item !== "object") {
    item = undefined;
  }
  return item;
};

export const dataService = {
  signIn,
  register
};
