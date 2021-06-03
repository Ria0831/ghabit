<template>
  <div id="error">
      <button @click="toHome" class="bigBtn">回到首页</button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component({
    name: 'Error',
})
export default class Error extends Vue {
    toHome(){
        this.$router.replace('/');
    }
}
</script>

<style lang="scss">
    @import '../style/mixxin';

    #error{
        @include bimg('../assets/404.jpg');
        width: 100%;
        height: 100%;
        position: relative;
        .bigBtn{
            @include abCenter(60%, 40%);
            height: 45px;
            width: 80px;
            margin: 0 auto;
            background: none;
            border-color:rgb(255, 244, 234);
            color:#fff;
            border-radius: 10px;
        }
    }
</style>