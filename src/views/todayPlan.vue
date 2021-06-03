<template>
    <div id="todayPlan">
        <h4>待复习</h4>
           <template v-for="(item,index) in needList">
             <tabBox :tagData="item"></tabBox>
           </template>
         <h4>已复习</h4>
    </div>
</template>

<script lang='ts'>
import { Component, Emit, InjectReactive, Prop, Vue } from 'vue-property-decorator';
import tabBox from '../components/tagBox.vue'
@Component({
    name:'todayPlan',
    components:{
        tabBox
    }
})
export default class todayPlan extends Vue {
    public month: number = new Date().getMonth() + 1
    @InjectReactive() needList!:[]
}
</script>

<style lang='scss' scoped>
    #todayPlan{
        padding:10px;
    }
</style>