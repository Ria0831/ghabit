// src/store/MyModule.ts
import { Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators'
import store from '../index'

@Module({ dynamic: true, store, name: 'mymod' })
export default class MyModule extends VuexModule {
  someField: string = 'somedata'
  list: Array<number> = [1,2,3,4,5,6]

  get listdata() {
      return this.list.filter(item=>item+'-')
  }

  @Mutation
  changelist(){
    this.someField += "aaaaa"
    
  }

  @Mutation
  addlist(data:number){
    this.list.push(data)
  }
}
export const myMod2 = getModule(MyModule) // 取得Store中某一module