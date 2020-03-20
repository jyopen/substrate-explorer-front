<template>
  <header>
    <div class="page">
      <component
          :is="isMobile ? 'el-drawer':'div'" class="menu"
          direction="ltr"
          :with-header="false"
          size="60%"
          :visible.sync="visible">
        <el-menu
            :mode="!isMobile ? 'horizontal':'vertical'"
            :router="true"
        >
          <el-menu-item router index="/">{{$t('Home')}}</el-menu-item>
          <el-menu-item index="/validators">
            {{$t('Validators')}}
          </el-menu-item>
          <el-menu-item index="/transactions">
            {{$t('Transactions')}}
          </el-menu-item>
          <el-menu-item index="/accounts">
            {{$t('Accounts')}}
          </el-menu-item>
          <el-menu-item index="/blocks">{{$t('Blocks')}}</el-menu-item>
          
          <el-submenu class="right" index="5">
            <template slot="title">{{$i18n.locale === 'en' ? 'English':'中文'}}</template>
            <el-menu-item @click="setLang('zh')">
              中文
            </el-menu-item>
            <el-menu-item @click="setLang('en')">
              English
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </component>
      
      <i class="menu-btn" :class="visible ? 'el-icon-close': 'el-icon-s-unfold'" @click="visible = !visible"/>
    </div>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {isMobile} from "@/utils";

@Component
export default class CommonHeader extends Vue {
    private isMobile = isMobile();
    private visible = false;
    private activeIndex = "/";

    private setLang(lang: string) {
        if (lang === this.$i18n.locale) {
            return false;
        }
        localStorage.setItem("language", lang);
        location.reload();
    }
}

</script>

<style lang="stylus" scoped>
  
  header {
    width 100%
    background rosybrown
    display flex
    justify-content center
  }
  
  .lang-menu {
    display flex
    flex-direction column
    font-size 16px
    margin -10px 0
    background-color white
    padding 10px
    
    span {
      cursor pointer
    }
  }
  
  .menu-btn {
    display none
  }
  
  @media screen and (max-width: 768px) {
    .lang-menu {
      display none
    }
    
    .menu-btn {
      display block
      position absolute
      right: 10px
      font-size 30px
      color white
      cursor pointer
    }
    
  }
</style>
