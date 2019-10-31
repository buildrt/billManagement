import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  isLogin: false,
  isAdmin: false,
  billSelect: false,
  retailerSelect: false,
  profileSelect: false,
  loginPassWord: '',
  loginUserName: '',
  loginUserID: '',
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store