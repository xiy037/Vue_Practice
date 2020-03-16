import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const isInCart = (item, cartArr) => {
  let result = false;
  for (let i = 0; i < cartArr.length; i++) {
    if (cartArr[i].id === item.id) {
      result = true;
    }
  }
  return result;
}

export default new Vuex.Store({
  state: {
    count : 0,
    cart : [
      {
        id: 1,
        name: "apple",
        count: 4,
        price: 5
      },
      {
        id: 2,
        name: "watermelon",
        count: 1,
        price: 30
      },
    ]
  },
  getters : {
    summary : state => {
      return state.cart.reduce((prev, curr) => {
        prev.totalCount += curr.count;
        prev.totalPrice = prev.totalPrice + (curr.count * curr.price);
        return prev;
      }, {totalCount: 0, totalPrice: 0})
    }
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    addToCart(state, payload) {
      if (!isInCart(payload, state.cart)) {
        state.cart.push(payload);
      } else {
        state.cart = state.cart.map((el) => {
          if (el.id === payload.id) {
            el.count++;
          }
          return el;
        })
      } 
    },
    //payload={id:xxx, action: "add"};
    changeCount(state, payload) {
      state.cart = state.cart.map((el) => {
        if (el.id === payload.id) {
          if (payload.action === "add") {
            el.count++;
          }
          if (payload.action === "reduce") {
            if (el.count > 0) {
              el.count--;
            }
          }
        }
        return el;
      })
    },
    deleteItem(state, payload) {
      state.cart = state.cart.filter((el) => el.id !== payload.id);
    }
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  modules: {
  }
})
