import Vue from 'vue'
<% if(vuex){ -%>
import store from './store'
<% } -%>
<% if(vueRouter){ -%>
import router from './routes'
<% } -%>
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
  <% if(vueRouter){%>router,<% } %>
  <% if(vuex){%>store,<% } %>
  render: h => h(App)
})
