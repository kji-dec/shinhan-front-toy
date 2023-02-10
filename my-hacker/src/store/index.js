import { createStore } from 'vuex'
import { fetchListItem } from '@/api'

export default createStore({
  state: {
    list: [],
  },
  getters: {
  },
  mutations: { // state에 저장하기 위한 장치
    SET_LIST(state, list) {
      state.list = list;
    },
  },
  actions: { // axios 요청을 하게 함
    FETCH_LIST(context, pageName) {
      return fetchListItem(pageName).then((res) => {
        context.commit('SET_LIST', res.data);
        return res;
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  modules: {
  }
})
