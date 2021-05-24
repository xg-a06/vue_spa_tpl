import { createApp } from 'vue';
<% if(vueRouter){ -%>
import router from './router'
<% } -%>
<% if(vuex){ -%>
import store from './store'
<% } -%>
import App from './App.vue'
import { importUI } from './ui';


const app = createApp(App);

importUI(app);

// Vue.config.devtools = process.env.NODE_ENV !== 'production';
// Vue.config.productionTip = process.env.NODE_ENV !== 'production';
// Vue.config.errorHandler = function (err, vm, info) {
//   console.error('发生错误', err, info);
// };


<% if(vueRouter){ -%>
app.use(router)
<% } -%>
<% if(vuex){ -%>
app.use(store)
<% } -%>
app.mount('#app');
