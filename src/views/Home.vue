<template>
  <div class="home">
    <!-- <transition name="fade" key='sidebar'> -->
      <div class="left" v-if="showLeft">
        <pheader :headInfo="leftNavInfo" class="flexbox">
          <span slot='headLeft'></span>
        </pheader>
        <leftNav :navlist="leftNavList" @changeIndex='getLeftNavItem'></leftNav>
        <div class="left-btom">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jia"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shezhi-"></use>
          </svg>
        </div>
      </div>
    <!-- </transition> -->
    <!-- <transition key='main'> -->
      
        <div class="main">
          <pheader :headInfo="headInfo" @getCurrentTab="changeHeadTitle" 
            :class='{"greenBg" :headInfo.type === "Plan"}'>
            <span slot="subtitle" v-if='headInfo.subtilte'>
              <span class="point"></span>
              {{headInfo.subtilte}}
            </span>
          </pheader>
          <!-- class="home" -->
          <Scroll  :onRight="toggleNav" :onLeft="toggleNav">
            <component :is=headInfo.type slot="box"></component>
          </Scroll>
          <!-- <router-view /> -->
          <tab-title :tabStyle="1"  class="hoverLeft"></tab-title>
          <svg class="hoverRight" aria-hidden="true">
            <use xlink:href="#icon-jia-shi-01"></use>
          </svg>
        </div>
      
      
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">
import { Component, ProvideReactive, Vue } from 'vue-property-decorator';
import pheader from '../components/head.vue'
import leftNav from '../components/leftNav.vue'
import tabTitle from '../components/tab.vue'
import Scroll from '../components/scroll.vue'
import Plan from './weekPlan.vue'
import Today from './todayPlan.vue'
import {initSate} from '../store/state'

interface navobj {
  'leftIcon'?: string,
  'type': number,
  'descript': string,
  'rightIcon'?: string,
}

interface HeadObj {
  title: string,
  subtilte: string,
  type: string
}

interface tagObj {
  title: string,
  tag: string,
  studytimes?: number,
  needtimes?: number,
  studyLine?: string,
  nextStudy?: string,
  todayneed?: boolean
}
@Component({
  name: 'Home',
  components:{
    pheader,leftNav,tabTitle,Scroll,Plan,Today
  }
})

export default class Home extends Vue {
  public showLeft: boolean = false
  public startX: number = 0;
  public startY: number = 0;
  public endX: number = 0;
  public endY: number = 0;
  // public headInfo: HeadObj = {
  //   title: "今日",
  //   subtilte: '',
  //   type: 'Today'
  // }
  public headInfo:any
  @ProvideReactive() tablist = [
    {
      title: "今日",
      subtilte: '',
      type: 'Today'
    },
    {
      title: "计划",
      subtilte: '',
      type: 'Plan'
    },
  ]
  created(){
    this.headInfo = initSate.headInfo
    let tempday: {} = {
        day: new Date().getDate(),
        mounth: new Date().getMonth()+1,
        weekdays: new Date().getDay(),
        fulldate: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join("-")
    }
    // initSate.changeCurrentDay(tempday)
  }
  public leftNavInfo: object = {
    title: "好习惯",
    default: true,
    rightIcon: '#icon-cloud-fill'
  }
  
  @ProvideReactive() hoverNavList: any= [
    {
      'icon':'#icon-chazhao',
      'code':'search',
    }
  ]
  
  @ProvideReactive() needList: tagObj[]=[
    {
      'title': "测试测试测试测试测试测试测试测试测试测试",
      'tag': '#vue',
      'studytimes': 3,
      'needtimes': 14,
      'studyLine': "艾宾浩斯记忆曲线",
      'nextStudy': '30分钟后',
      'todayneed': true
    },
    {
      'title': "测试测试测试测试测试测试测试测试测试测试",
      'tag': '#js',
      'studytimes': 10,
      'needtimes': 14,
      'studyLine': "艾宾浩斯记忆曲线",
      'nextStudy': '下周',
      'todayneed': false
    }
  ]

  public leftNavList0: navobj[] = [
    {
      'leftIcon':'#icon-iconset0121',
      'type': 0,
      'descript':'全部',
      'rightIcon':'',
    },
    {
      'leftIcon':'#icon-shanchu1',
      'type': 1,
      'descript':'最近删除',
    },
    {
      'leftIcon':'#icon-icon-test',
      'type': 2,
      'descript':'vue',
    },
    {
      'leftIcon':'#icon-icon-test',
      'type': 2,
      'descript':'js',
    },
  ]

  get leftNavList(){
    this.leftNavList0.forEach((element: any)=> {
      switch (element.type) {
        case 0:
          element.leftIcon = '#icon-wendang';
          element.rightIcon = '#icon-tubiaozhizuo-';
          break;
        case 1:
          element.leftIcon = '#icon-lujing58';
          break;
        case 2:
          element.leftIcon = '#icon-tag';
          break;
        default:
          break;
      }
    });
    return this.leftNavList0
  }

  toggleNav(done: Function){
    this.showLeft = !this.showLeft;
    done()
  }

  getLeftNavItem(val:any){
    switch (val.type) {
      // 2是标签页
      case 2:
        this.headInfo['subtilte'] = val.descript
        break;
      default:
        break;
    }
    this.showLeft = false
  }

  changeHeadTitle(val: any){
    
    if(val.type === "Plan"){
      val.subtilte = initSate.currentDay.mounth + "月" + initSate.currentDay.fulldate.split('-')[2] + "日"
    }
    initSate.changeHeadInfo(val)
  }
}
</script>

<style lang='scss' scoped>
@import '../style/mixxin';
.home{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  .greenBg{background: $mainColor;}
  // .garyBg{}
  .left{
    width:85vh;
    height: 100%;
    background: $darkColor;
    color:#dcdcdd;
    .flexbox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
    }
    #head {
      padding:10px;
      .icon{
        width: 30px !important;
        height: 30px !important;
      }
    }
  }
  .left-btom{
    position: absolute;
    left:10px;
    bottom: 10px;
    .icon{
      color: $mainColor;
      @include iconSize(30px,30px);
      margin-right:10px;
    }
  }
  .main{
    // width: calc(100% - 20px);
    // height: calc(100% - 20px);
    width: 100%;
    height: 100%;
    background: $defaultColor;
    position: relative;
    // overflow: hidden;
    // padding:10px;
    .point{
      display: inline-block;
      @include iconSize(8px,8px);
      background: $thiColor;
      border-radius: 50%;
      margin: 0 8px;
    }
    .hoverLeft{
      position: fixed;
      bottom: 15px;
      left: 15px;
    }
    .hoverRight{
      position: fixed;
      bottom: -15px;
      right:-95px;
    }
  }
}
</style>
