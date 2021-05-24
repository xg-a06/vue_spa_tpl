<template>
  <div>
    i am test2 page
    <% if(vuex){ -%>
    <div>
      <p>{{ num }}</p>
      <div>
        <button @click="commit({num:1})">+ sync</button>
        <button @click="dispatch({num:2})">+ async</button>
      </div>
    </div>
    <%} -%>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'Test2',
  <% if(vuex){ -%>
  setup() {
    const store = useStore();
    const { num } = toRefs(store.state);

    const commit = (data) => {
      store.commit('addNum', data);
    };
    const dispatch = (data) => {
      store.dispatch('addNumAsync', data);
    };
    return {
      num,
      commit,
      dispatch,
    };
  },
  <%} -%>
};
</script>

<style>
</style>
