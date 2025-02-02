import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastOnlineTime: new Date(0),
    isOnline: false,
    currentData: {
      uplink_message: {
        decoded_payload:
        {
          lat: 46.3030583, long: 30.4951066
        }
      }
    }
  },
  mutations: {
    setCurrentData(state, data) {
      state.currentData = data;
    },
    setLastOnlineTime(state, data) {
      state.lastOnlineTime = data;
    },
    setOnline(state) {
      state.isOnline = true;
    },
    setOffline(state) {
      state.isOnline = false;
    }
  },
  actions: {

  }
})
