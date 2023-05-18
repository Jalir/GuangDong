import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msgLists: '',
    pageConfigPageTotal: {
      total: 1,
      pageSize: 5,
      pageNo: 1,
      pageTotal: 1,
      getMethods: 'getItemListAsync',
      url: '',
      method: ''
    },
    hasLogin: true,
    showLoading: true,
    GdNewsItemList: {},
    loadingTips: ''
  },
  mutations: {
    getItemList (state, data) {
      state.msgLists = data
      state.pageConfigPageTotal.pageTotal = Math.ceil(data.length / state.pageConfigPageTotal.pageSize)
    },
    addDefaultConfiguration (state, obj) {
      Object.assign(state.pageConfigPageTotal, obj)
    },
    changeLoginState (state, Boolean) {
      state.hasLogin = Boolean
    },
    changeLoading (state, Boolean) {
      state.showLoading = Boolean
    },
    addGdNewsItemList (state, obj) {
      state.GdNewsItemList = obj
    },
    clearAllMsgList (state) {
      state.msgLists = ''
    },
    changeLoadingTips (state, tips) {
      state.loadingTips = tips
    }
  },
  actions: {
    // 检查是否有登录
    async checkLogin (context) {
      const { data: msg } = await axios.post('/user/auth', {
        headers: { token: localStorage.getItem('token') }
      })
      if (msg.status === 401) {
        // console.log('404')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        context.commit('changeLoginState', false)
      } else {
        context.commit('changeLoginState', true)
      }
    },
    async getItemListAsync (context) {
      const { data: msg } = await axios.get(context.state.pageConfigPageTotal.url)
      context.commit('getItemList', msg)
    },
    async getAllCutvAsync (context) {
      const data = await axios.all([
        axios.get('api/cutv/d?city=baoan/a/a'),
        axios.get('api/cutv/d?city=shenzhen/b/c/d'),
        axios.get('api/cutv/d?city=shenzhen/b/a/a'),
        axios.get('api/cutv/d?city=shenzhen/b/c/b'),
        axios.get('api/cutv/d?city=shenzhen/b/f/a'),
        axios.get('api/cutv/d?city=shenzhen/b/f/b'),
        axios.get('api/cutv/d?city=shenzhen/b/c/a')
      ])
        .then(axios.spread(function (...res) {
          const arr = [res.data]
          return arr
        }))
      context.commit('getItemList', data)
    },
    async getSearchAsync (context, text) {
      const { data } = await axios.get('/api/gdtv/s', { params: { t: text } })
      context.commit('getItemList', data)
    },
    async getGdNews (context) {
      await axios.get('api/gdtv/b').then(res => {
        context.commit('addGdNewsItemList', res)
      })
    }
  },
  modules: {}
})
