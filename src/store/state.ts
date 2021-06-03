import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from "vuex-module-decorators";
import store from '@/store'

interface DateInfo{
    day: number,
    mounth: number,
    weekdays: number,
    fulldate: string
}
interface HeadObj {
    title: string,
    subtilte: string | number,
    type: string
}
@Module({
    name:"initState",
    dynamic: true, //动态模块
    // namespaced: true,
    store  //
})
export  class state  extends VuexModule {
    //  currentDay: DateInfo = {
    //     day: new Date().getDate(),
    //     mounth: new Date().getMonth()+1,
    //     weekdays: new Date().getDay(),
    //     fulldate: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join("-")
    // }
    //  currentDay: DateInfo = {
    //     day: 0,
    //     mounth: 0,
    //     weekdays: 0,
    //     fulldate: ""
    // }
    // today: string = ""
     today: string =  [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join("-")
     headInfo: HeadObj = {
        title: "今日",
        subtilte: '',
        type: 'Today'
    }
    get currentDay():DateInfo{
        return {
            day: new Date(this.today).getDate(),
            mounth: new Date(this.today).getMonth()+1,
            weekdays: new Date(this.today).getDay(),
            fulldate: [new Date(this.today).getFullYear(), new Date(this.today).getMonth() + 1, new Date(this.today).getDate()].join("-")
        }
    }
    @Mutation
     changeHeadInfo(data:object){
        this.headInfo = Object.assign(this.headInfo,data)
        console.log(this.headInfo,'this.headInfo')
    }

    @Mutation
     changetoday(data: string){
         
        this.today = data
    }

}

export const initSate = getModule(state) 