import Vue from 'vue'
import store from './store'
import router from './routes'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.devtools = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.config.errorHandler = function (err, vm, info) {
  console.error('发生错误', err, info)
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
