<template>
  <div id="app">
    <div v-if='$route.meta.main' class="app-box">
      <!-- <HeaderBar v-for="item in headerInfo" :pageIndex="item.index" 
        :headRight="item.right" :headLeft="item.left" :headTitle="item.title"
        @on-del="delFn" @to-add="AddFn" v-model="value">
      </HeaderBar> -->
      <router-view />
    </div>
    <router-view v-else />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import Nav from './components/bottomNav.vue'; // @ is an alias to /src
// import HeaderBar from '../components/headBar.vue';


interface Header {
  index: number;
  left?: string;
  title: string;
  right?: string;
}
@Component({
  
})
export default class App extends Vue {
  value: string = 'ahahah'
  headerInfo: Array<Header> = [
    {
      index: 1,
      left: "file",
      title: "今天",
      right: 'new'
    },
    {
      index: 2,
      left: "all",
      title: "我的",
    },
    {
      index: 0,
      title: "设置",
      right: 'add'
    }
  ]
  created(){
    console.log(this.$router,'路由',this.$route)
  }
  delFn(val:number){
    console.log(val,'腰删除的是')
     this.headerInfo = this.headerInfo.filter(item=>item.index != val)
  }

  AddFn(val:string){
    console.log(val, '腰增加')
  }
}
</script>

<style lang="scss">
@import '@/style/common';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  .app-box{
    width: 100%;
    height: 100%;
  }
  .icon {
    width: 20px; 
    height: 20px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}

</style>
