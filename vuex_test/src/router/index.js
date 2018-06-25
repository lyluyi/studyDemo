import Vuex from "vuex"; // 1.引入
import Vue from "vue";

Vue.use(Vuex); // 2.注册

export default new Vuex.Store({ // 3.实例化
  // 1.数据中心
  state: {
    price: 0
  },
  // 2.更新方法
  mutations: {
    // 接收两个参数，一个是数据中心，一个是修改的值
    purchase (state, price) {
      state.price += price;
    },
    sold (state, price) {
      state.price -= price
      if (state.price < 0) {
        state.price = 0;
      }
    }
  }
});