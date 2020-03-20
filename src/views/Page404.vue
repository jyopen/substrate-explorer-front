<template>
  <div class="content">
    <h1>404</h1>
    <div>
      <router-link to="/">
        <el-button size="small">{{$t('返回首页')}}</el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Page404 extends Vue {
    private refresh() {
        location.reload();
    }
}

</script>

<style lang="stylus" scoped>
  .content {
    width 100%
    display flex
    margin-top 71px
    align-items center
    flex-direction column
    
    .icon {
      width 162px
      height 104px
      margin-bottom 21px
    }
    
    .right {
      margin-left 10px
    }
  }

</style>
