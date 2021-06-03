<template>
    <div id="calendar">
        <ul class="flexbox">
            <li v-for="(item,index) in weekdays" :key="index" class="daystitle"
                :class="{active: currentDay.weekdays === index}"
            >{{item}}</li>
        </ul>
        <div class="scroll-box" >
            <Scroll :onLeft="afterWeek" :onRight="beforeWeek" :onDowndrop="handleShow">
                <ul slot="box" :class="[monthType == true ? 'nowrapflex' :'flexbox']">
                    <li v-for="(item,index) in allFullDate" :key="index"
                        class="days"
                        :class="{active: currentDay.fulldate === item,hiddenday: item == ''}"
                        @click="changeDate(item)"
                    >   
                        <b v-if="today === item">今</b>
                        <b v-else>{{item.split('-')[2]}}</b>
                    </li>
                </ul>
            </Scroll>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Watch, PropSync, Vue } from 'vue-property-decorator';
import Scroll from '../components/scroll.vue'
import {initSate} from '../store/state'
interface DateInfo{
    day: number,
    mounth: number,
    weekdays: number,
    fulldate: string
}
@Component({
    name:'Calendar',
    components:{
        Scroll
    }
})
export default class calendar extends Vue {
    public weekdays: string[] = ['日','一','二','三','四','五','六']
    public allFullDate: any = []
    public today: string = this.getYMD(new Date())
    public monthType: boolean = false

    created(){
        var yiifaa = 'yiifaa',
            str1 = new String(yiifaa),
            str2 = String(yiifaa)
            console.log(str1 === str2 ,'en ?')
            console.log(str1 == str2 ,'en ? ==')
            console.log(typeof str1 ,typeof str2 ,'en ? ==')
        this.initDate()
    }
    
    get currentDay():DateInfo{
        return initSate.currentDay
    }
    get choseday(){
        return initSate.today
    }
    @PropSync('month',{type:Number})
    syncedMonth ?: number

    @Watch('allFullDate',{deep: true})
    public onFullDateChange(val: string[],oldvale: string[]){
        this.syncedMonth = new Date(val[val.length-1]).getMonth() + 1
    }
    getMonthday(dates: string){
        this.allFullDate = []
        var date = new Date(dates)
        this.allFullDate = this.mGetDate(date.getFullYear(),date.getMonth()+1)
    }
    mGetDate(year: number, month: number){
        
        // if(month === 12){
        //     //如果是12月，下一年
        //     year ++
        //     month = 0
        // }
        var s = new Date(year, month-1, 1);
        var d = new Date(year, month, 0);
        console.log(this.getYMD(d),'这是啥啊',year,month,this.getYMD(s))
        
        
        let tempdays = this.getDays(this.getYMD(s),this.getYMD(d))
        let sday = new Date(this.getYMD(s)).getDay()
        for (let i = 0; i < sday; i++) {
            
            tempdays.splice(0,0,"")
        }
        return tempdays
        
    }
    handleShow(done: Function){
        this.monthType = true
        this.getMonthday(this.allFullDate[this.allFullDate.length-1])
        console.log('准备吧改变')
        done()
    }

    initDate(){
        let start = this.getBeforeDate(this.currentDay.fulldate,this.currentDay.weekdays,'before')
        let end = this.getBeforeDate(this.currentDay.fulldate,(6-this.currentDay.weekdays),'after')
        this.allFullDate = this.getDays(start,end)
    }
    beforeWeek(done: Function){
        if(this.monthType){
            console.log("上个月")
            
            var nextM:any  = this.allFullDate[this.allFullDate.length-1].split('-')
            nextM[1] = Number(nextM[1]) - 1
            nextM = nextM.join('-')
            this.allFullDate = []
            this.getMonthday(nextM)
        }else{
            console.log('上一周')
            let start = this.getBeforeDate(this.allFullDate[0],7,'before')
            let end = this.getBeforeDate(start,6,'after')
            this.allFullDate = this.getDays(start,end)
        }
        
        done()
    }

    afterWeek(done: Function){
        console.log('来了嘛')
        if(this.monthType){
            
            var nextM:any  = this.allFullDate[this.allFullDate.length - 1].split('-')
            console.log(nextM,'没改之前的nextM')
            if(nextM[1] == 12){
                nextM[0] = Number(nextM[0]) + 1
                nextM[1] = 1
            }else{
                nextM[1] = Number(nextM[1]) + 1
            }
            
            nextM = nextM.join('-')
            this.allFullDate = []
            console.log(nextM,'nextM')
            this.getMonthday(nextM)
        }else{
            console.log('下一周')
            let start = this.getBeforeDate(this.allFullDate[6],1,'after')
            let end = this.getBeforeDate(start,6,'after')
            this.allFullDate = this.getDays(start,end)
        }
        
        done()
    }

    changeDate(item: string){
        initSate.changetoday(item)
    }
    // 给月和天，不足两位的前面补0
    fz(num: number | string) {
        if (num < 10) {
            num = "0" + num;
        }
        
        return num
    }
    
    //获取指定日期指定天数之前的日期
    getBeforeDate(date: string,day: number,type: string) {  
        var dd = new Date(date);
        if(type === 'before'){
            dd.setDate(dd.getDate() - day);
        }else{
            dd.setDate(dd.getDate() + day);
        }
        
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
    }
    //获取两个日期之间的所有日期
    getDays(day1:any, day2:any){
        var st  = new Date(day1)
        var et = new Date(day2)
        var retArr = [];
        
        // 获取开始日期的年，月，日
        var yyyy = st.getFullYear(),
            mm = st.getMonth(),
            dd = st.getDate();
        

        // 循环
        while (st.getTime() != et.getTime()) {
            // 使用dd++进行天数的自增
            st = new Date(yyyy, mm, dd++);
            if(st.getTime() < et.getTime()){
                retArr.push(this.getYMD(st));
            }else{
                break
            }
            
        }
        // 将结束日期的天放进数组
        retArr.push(this.getYMD(et));
        retArr = [...new Set(retArr)]
        return retArr // 或可换为return ret;
    }

    // 给Date对象添加getYMD方法，获取字符串形式的年月日
    getYMD(date: Date){
        let _this = new Date(date)
        // 将结果放在数组中，使用数组的join方法返回连接起来的字符串，并给不足两位的天和月十位上补零
        return [_this.getFullYear(), _this.getMonth() + 1, _this.getDate()].join("-");
    }
}
</script>

<style lang='scss' scoped>
    @import '../style/mixxin.scss';
    #calendar{
        width: 100%;
        // background: $secColor;
        padding:10px 0;
        color:$defaultColor;
        // border-radius: 10px;
        .scroll-box{
            overflow-x: auto;
        }
        .nowrapflex{

            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;
            align-items: center;
            li{
                width:calc((100% - 140px) / 7);
                height: 20px;
                text-align: center;
                line-height: 20px;
                background: $secColor;
                padding:5px;
                margin:0 5px 5px;
            }
            .hiddenday{
                background: #498428;
            }
        }
        .flexbox{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            // color:$forColor;
            li{
                width:calc((100% - 140px) / 7);
                height: 20px;
                text-align: center;
                line-height: 20px;
                background: $secColor;
                padding:5px;
                margin:0 5px;
                // border: 1px solid $forColor;
            }
            .days{
                border-radius: 0px 0px 10px 10px;
                border-top:none;
            }
        }
        .daystitle{
            border-radius: 10px 10px 0 0;
            border-bottom: none;
            
        }
        
        .active{
            background: $forColor !important;
            color:$mainColor;
        }
    }
</style>