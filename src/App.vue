<template>
  <div class="app-container ">
    <img src='./assets/logo.png'>
    <h1>Hello Vue!</h1>
    <p>
      <router-link to="/test1">Go to Test1</router-link>
      <router-link to="/test2">Go to Test2</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped >
.app-container {
  text-align: center;
  margin-top: 150px;
}
.app-container img {
  margin: auto;
  display: block;
}
.app-container span {
  display: inline-block;
}
</style>
