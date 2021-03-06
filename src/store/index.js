import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    username: "",
    is_staff: false,
    is_superuser: false,
    is_approved: false,
    // Toast
    toastVisible: false,
    toastText: "",
    toastType: "info"
  },
  mutations: {
    setUser(state, user) {
      state.logged = true;
      state.username = user.username;
      state.is_staff = user.is_staff;
      state.is_superuser = user.is_superuser;
      state.is_approved = user.is_approved;
      localStorage.setItem("username", state.username);
      localStorage.setItem("is_staff", state.username);
      localStorage.setItem("is_superuser", state.is_superuser);
      localStorage.setItem("is_approved", state.is_approved);
    },
    loadInfo(state) {
      state.logged = true;
      state.username = localStorage.getItem("username");
      state.is_staff = localStorage.getItem("is_staff") === "true";
      state.is_superuser = localStorage.getItem("is_superuser") === "true";
      state.is_approved = localStorage.getItem("is_approved") === "true";
    },
    logout(state) {
      state.logged = false;
      state.username = "";
      state.is_staff = false;
      state.is_superuser = false;
      state.is_approved = false;
      localStorage.clear();
    },
    makeToast(state, payload) {
      state.toastVisible = true;
      state.toastText = payload.text;
      state.toastType = payload.color;
    },
    setToastVisible(state, isVisible) {
      state.toastVisible = isVisible;
    }
  },
  actions: {},
  modules: {}
});
