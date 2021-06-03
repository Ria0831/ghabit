// src/views/useVuex.vue
<template>
  <div>
    {{hello}}
    {{alist}}
    <button @click="add">+1</button>
    <button @click="change">改变</button>
    <p>{{somefiled}}</p>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Emit, Inject, Model, Prop, Provide, Ref, Watch, PropSync } from 'vue-property-decorator'
import { Module, VuexModule, getModule } from 'vuex-module-decorators'

import {myMod2} from '../store/modules/test'

// const $myMod = getModule(MyModule) // 取得Store中某一module

@Component
export default class UseVuex extends Vue {
  hello: string = myMod2.someField
  
  get alist(){
    return myMod2.listdata
  }
  get somefiled(){
    return myMod2.someField
  }
  change(){
    myMod2.changelist()
  }
  add(){
    myMod2.addlist(2)
  }
}
</script>
