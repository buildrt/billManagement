export default {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
  setIsAdmin(state, isAdmin) {
    state.isAdmin = isAdmin;
  },
  setBillSelect(state, billSelect) {
    state.billSelect = billSelect;
  },
  setRetailerSelect(state, retailerSelect) {
    state.retailerSelect = retailerSelect;
  },
  setProfileSelect(state, profileSelect) {
    state.profileSelect = profileSelect;
  },
  setLoginUserName(state, loginUserName) {
    state.loginUserName = loginUserName;
  },
  setLoginPassWord(state, loginPassWord) {
    state.loginPassWord = loginPassWord;
  }
}