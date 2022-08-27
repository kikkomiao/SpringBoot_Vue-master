<template>
  <div id="app">
    <keep-alive :include="['DataPage']">
      <router-view v-if="alive" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      alive: true
    };
  },
  methods: {
    reload() {
      this.alive = false;
      this.$nextTick(() => {
        this.alive = true;
      });
    }
  }
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-green.css";
</style>
