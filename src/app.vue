<template>
  <div>
    <router-view />
    <edge />
  </div>
</template>

<script>
import Edge from "./components/edge";
export default {
  name: 'app',
  components: {
    Edge
  },
}
</script>

<style lang="scss">
@import './assets/css/common';
body{
  min-width:1200px;
}
</style>