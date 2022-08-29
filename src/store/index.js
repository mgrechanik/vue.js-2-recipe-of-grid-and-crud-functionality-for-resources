import Vue from 'vue'
import Vuex from 'vuex'

import omega from './omega'
import * as OMEGA_SETTINGS from '@/components/crud/omega/_moduleSettings';


import profile from './profile'
import * as PROFILE_SETTINGS from '@/components/crud/profile/_moduleSettings';

omega.state.settings = OMEGA_SETTINGS;

profile.state.settings = PROFILE_SETTINGS;

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  
  state: {

  },
  getters: {

  },
  mutations: {           

  },
  actions: {

  },
  modules: {
    omega,
    profile
  }
  
    
})
