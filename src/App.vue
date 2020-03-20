<template>
  <div id="app">
    <common-header/>
    <div class="page content">
      <router-view/>
    </div>
    <common-footer/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import CommonHeader from "./components/CommonHeader.vue";
import CommonFooter from "./components/CommonFooter.vue";

@Component({components: {CommonHeader, CommonFooter}})
export default class App extends Vue {
}
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }
  
  .content {
    flex: 1
  }
</style>
