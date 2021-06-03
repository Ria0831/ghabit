<template>
    <div id="head">
        <slot name='headLeft'></slot>
        <b>{{headInfo.title}}</b>
        <slot name='subtitle'></slot>
        <!-- 首页是nav导航栏 -->
        <div v-if='$route.meta.main && !headInfo.default' class="floatRight">
            <tab-title @changeItem='getCurrentTab' :tabStyle="0"></tab-title>
        </div>
        <svg class="icon floatRight" aria-hidden="true" v-else-if="headInfo.rightIcon">
            <use :xlink:href="headInfo.rightIcon"></use>
        </svg>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
// import { Tab, Tabs} from 'vant'
// import 'vant/lib/tab/style';
// import 'vant/lib/tabs/style';
// Vue.use(Tab);
// Vue.use(Tabs);
import tabTitle from '../components/tab.vue'
@Component({
    name: 'Head',
    components:{
        tabTitle
    }
})

export default class Head extends Vue {
    @Prop(Object)
    public headInfo!: object

    @Emit('getCurrentTab')
    getCurrentTab(val:any){
        return val
    }
}
</script>


<style lang='scss'>
@import '../style/mixxin';
#head{
    width: calc(100% - 20px);
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    overflow: hidden;
    padding:10px;
    .floatRight{float:right}
    .icon{
        @include iconSize(20px,20px);
        color:$mainColor;
        
    }
}
</style>