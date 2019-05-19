<template>
  <div>
    i am test2 page
    <div>
      <p>{{ $store.state.num }}</p>
      <div>
        <button @click="$store.commit('addNum',{num:1})">+ sync</button>
        <button @click="$store.dispatch('addNumAsync',{num:2})">+ async</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
