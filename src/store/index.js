import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from '../shared';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {id:'', pwd:''}
  },
  mutations: {
    signIn(state, user){
      state.user = user;
    }
  },
  actions: {
    async signInAction({commit}, user) {
      const signInUser = await dataService.signIn(user);
      commit("signIn", signInUser);      
    }
  },
  modules: {
  },
  getters: {   
    getUserName: state =>
    state.user.firstname === undefined
      ? 'Guest'
      : state.user.firstname + ' ' + state.user.lastname, 
  }
})
