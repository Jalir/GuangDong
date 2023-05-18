import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import { extractText, removeVideoTag, dataMoment } from './assets/js/filter'
// import videojs from 'video.js'
// import 'video.js/dist/video-js.css'
import 'normalize.css/normalize.css'
import '../src/assets/css/index.css'

// axios.defaults.baseURL = 'http://127.0.0.1:2001'
// axios.defaults.baseURL = 'http://1.12.63.60:3000'
// axios.defaults.baseURL = 'http://localhost:2001'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers = {
  token: `Bear ${localStorage.getItem('token')}`
}
Vue.prototype.$extractText = extractText
Vue.prototype.$removeVideoTag = removeVideoTag
Vue.prototype.$dataMoment = dataMoment
Vue.prototype.$http = axios
// Vue.prototype.$videojs = videojs

Vue.use(VueClipboard)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
