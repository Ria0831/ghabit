<template>
    <ul id="tagBox">
        <li >
            <span class="title">{{tagData.title}}</span>
            <span class="point floatRight" v-if="tagData.todayneed"></span>
        </li>
        <li>{{tagData.tag}}</li>
        <li>
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dingweiweizhimudedi"></use>
                </svg>
                <span >{{tagData.studytimes}}/{{tagData.needtimes}}&nbsp;{{tagData.studyLine}}</span>
            </span>
            <span class="floatRight">{{tagData.nextStudy}}</span>
        </li>
    </ul>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Watch, Vue } from 'vue-property-decorator';
@Component({
  name:'tagBox'
})
export default class tab extends Vue {
    @Prop()
    tagData!: {}
}
</script>

<style lang='scss' scoped>
@import '../style/mixxin';
    #tagBox{
        width:100%;
        background: #fff;
        border-radius: 8px;
        box-sizing: border-box;
        padding:10px;
        margin-bottom: 15px;
        box-shadow: 2px 0px 20px 0px 
		rgba(0, 0, 0, 0.08);
        li{
            height: 30px;
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            overflow: hidden;
        }
        .floatRight{
            float: right;
        }
        .title{
            display: inline-block;
            width: 80%;
            overflow: hidden;
            text-overflow:ellipsis; 
            white-space: nowrap;
        }
        .point{
            display: inline-block;
            @include iconSize(8px,8px);
            background: $mainColor;
            border-radius: 50%;
            margin: 0 8px;
        }
    }
</style>