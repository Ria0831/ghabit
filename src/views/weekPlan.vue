<template>
    <div id="weekPlan">
        <div class="week-top">
            <div class="calendar-box" v-if='!showTips'>
                <Calendar :month.sync="month" ref="weekCalendar"></Calendar>
            </div>
        </div>
        <van-sticky @scroll="tosticky">
            <div  style="display:none"  ></div>
        </van-sticky>
        <div class="stickybox tips-box" v-if='showTips'>
            <div  class="tips " >
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xingxing"></use>
                </svg>
                {{todayInfo.fulldate.split('-')[1]}}月{{todayInfo.fulldate.split('-')[2]}}日：&nbsp;{{planList.length || 0}}个计划
            </div>
        </div>
        <div class="week-btom">
            <ul  class="plandataBox">
                <li  v-for="(item,index) in planList" :key="index">
                    <svg class="icon circlePosition" aria-hidden="true" v-if='item.readed'>
                        <use xlink:href="#icon-xuanzhong"></use>
                    </svg>
                    <div class="circle circlePosition" v-else></div>
                    <div class='line-box'>
                        <div class="line-box-left">
                            <span v-if="index< 9">0{{index+1}}</span>
                            <span v-else>{{index+1}}</span>
                        </div>
                        <div class="line-box-right">
                            <div class='clearfloat'>
                                <span class="floatleft">{{item.time}}</span>
                                <div class="floatRight">
                                    <span class="overtext marinLeft10">{{item.tag}}</span>
                                    <svg class="icon marinLeft10" aria-hidden="true">
                                        <use xlink:href="#icon-tag"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="text overtext">{{item.title}}</div>
                        </div>
                    </div>
                    
                </li>
            </ul>
        </div>
        
        
        
    </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import Calendar from '../components/calendar.vue'
import {initSate} from '../store/state'
import 'vant/lib/sticky/style'
import { Sticky } from 'vant';
Vue.use(Sticky);
@Component({
    name:'weekPlan',
    components:{
        Calendar
    }
})
export default class weekPlan extends Vue {
    public planList: object = Object.create(null)
    public month: number = new Date().getMonth() + 1
    public todayInfo: any
    public showTips: boolean = false
    @Ref('weekCalendar') readonly calendar !: Calendar;
    created(){
        // if(this.calendar){
        //     console.log(this.calendar.currentDay,'aaaaaaa')
        // }
        console.log(initSate,'vuex',initSate.currentDay)
        this.todayInfo = initSate.currentDay
        this.planList = [
            {
                title:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                tag:"vue",
                time:'14:44',
                readed: true
            },
            {
                title:"测试测试测试",
                tag:"js",
                time:'04:44',
                readed: false
            },
            {
                title:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                tag:"vue",
                time:'14:44',
                readed: true
            },
            {
                title:"测试测试测试",
                tag:"js",
                time:'04:44',
                readed: false
            },
            {
                title:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                tag:"vue",
                time:'14:44',
                readed: true
            },
            {
                title:"测试测试测试",
                tag:"js",
                time:'04:44',
                readed: false
            },{
                title:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                tag:"vue",
                time:'14:44',
                readed: true
            },
            {
                title:"测试测试测试",
                tag:"js",
                time:'04:44',
                readed: false
            },
            {
                title:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                tag:"vue",
                time:'14:44',
                readed: true
            },
            {
                title:"测试测试测试",
                tag:"js",
                time:'04:44',
                readed: false
            },
            {
                title:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                tag:"vue",
                time:'14:44',
                readed: true
            },
            {
                title:"测试测试测试",
                tag:"js",
                time:'04:44',
                readed: false
            }
        ]

    }
    @Watch('month')
    monthChange(val:number):void{
        initSate.changeHeadInfo({"subtilte":val +"月"})
    }
    tosticky(val: any){
        if(val.scrollTop > 80){
            this.showTips =  true
        }else{
            this.showTips = val.isFixed
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../style/mixxin.scss';
    #weekPlan{
        width: 100%;
        background: $mainColor;
        .week-top{
            width: 100%;
            position: sticky;
            left:0;
            top:0;
            background: $mainColor;
        }
        .calendar-box{
            margin:0 10px 10px;
        }
        .stickybox{
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 1;
        }
        .tips-box{
            background: $mainColor;
            padding:10px;
        }
        .tips{
            font-weight: 700;
            width: 50%;
            height: 45px;
            line-height: 45px;
            color:$secColor;
            padding-left: 15px;
            background: $forColor;
            border-radius: 15px;
        }
        .week-btom{
            height: calc(100% - 200px);
            border-radius: 16px 16px 0 0;
            background: #fff;
            padding:15px 10px;
            .plandataBox{
                line-height: 30px;
                margin-left: 15px;
                box-sizing: border-box;
                li{
                    position: relative;
                    border-left:1px solid #DCDCDC;
                    padding:0 0 15px 10px;
                }
                .circlePosition{
                    position: absolute;
                    left:-9px;
                    top:0;
                }
                .circle{
                    width: 18px;
                    height: 18px;
                    background: $defaultColor;
                    border-radius: 50%;

                }
                .line-box{
                    background: $defaultColor;
                    border-radius: 10px;
                    margin-left: 10px;
                    padding:8px;
                    overflow: hidden;
                    clear: both;
                    .line-box-left{
                        float: left;
                        width:50px;
                        text-align: center;
                        vertical-align: middle;
                        span{
                            height: 60px;
                            line-height: 60px;
                            font-weight: 700;
                            font-size: 30px;
                            color:$mainColor;
                        }
                    }
                    .line-box-right{
                        float: right;
                        width: calc(100% - 50px);
                    }
                }
            }
        }
        
        
        
    }
</style>