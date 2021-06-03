<template>
  <ul class="tab" :class="[currentStyle === 'text' ? 'blackStyle' : 'whiteStyle']">
    <!-- <transition-group name="nav" tag='li' id="tab" :duration="10000"> -->
      <li v-for='(item, index) in listdata' 
        :key='index'
        class='active'
        :class="[
          current == index && currentStyle === 'text' ? 'whiteStyle' : '',
          current == index && currentStyle === 'img' ? 'blackStyle' : '',
        ]"

        @click="changeItem(index,item)"
      >
       
        <span v-if='currentStyle === "text"'>{{item.title}}</span>
        <svg class="icon" aria-hidden="true" v-else>
          <use :xlink:href="item.icon"></use>
        </svg>
      </li>
    <!-- </transition-group> -->
    
  </ul>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Watch, InjectReactive,Vue } from 'vue-property-decorator';
@Component({
  name:'tab'
})
export default class tab extends Vue {
  // @Prop() tablist!: []
  public current: number = 0
  public listdata: any = []
  @Prop() tabStyle!: number
  
  @InjectReactive() tablist!: []
  @InjectReactive()  hoverNavList!: []
  //computed
  get currentStyle(){
    if( this.tabStyle === 1 ) {
      this.current = -1
      this.listdata = this.hoverNavList
    }else{
      this.listdata = this.tablist
    }
    return this.tabStyle === 1 ? 'img' :'text'
  }

  @Emit('changeItem')
  changeItem(index: number,item: string){
    this.current = index
    return item
  }
}
</script>

<style lang='scss' scoped>
@import '../style/mixxin.scss';
.blackStyle{
  // background: #DCDCDC;
  background: $forColor;
}
.whiteStyle{
  background: #fff;
}
.tab{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  padding:2px 4px;
  line-height: 27px;
  box-shadow: 2px 0px 20px 0px 
		rgba(0, 0, 0, 0.08);
  li{
    padding:4px 8px;
  }
  .active{
    border-radius: 10px;
  }
}
</style>