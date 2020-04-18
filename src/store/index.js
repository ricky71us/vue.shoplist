import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from '../shared';

Vue.use(Vuex)

const state = {
  user: {id:'', pwd:''},  
}

const mutations = {
  signIn(state, user){
    state.user = user;
  },  
}

const actions = {
  async signInAction({commit}, user) {
    const signInUser = await dataService.signIn(user);
    console.log(signInUser);
    commit("signIn", signInUser.data);      
  },  
}

const getters = {
  getUserName: state => 
    state.user.firstname === undefined
      ? 'Guest'
      : state.user.firstname + ' ' + state.user.lastname   
}

export default new Vuex.Store({
  state,
  mutations,
  actions,  
  getters
})
