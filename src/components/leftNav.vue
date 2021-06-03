<template>
    <ul id='leftNav'>
        <li v-for='(item,index) in navlist' :key="index"
            :class="{active:index == current}"
            @click="changeIndex(item,index)"
        >
            <svg class="icon" aria-hidden="true" v-if="item.leftIcon">
                <use :xlink:href="item.leftIcon"></use>
            </svg>
            <span class="nav-title">
                <span>{{item.descript}}</span>
                <svg class="icon" aria-hidden="true" v-if="item.rightIcon">
                    <use :xlink:href="item.rightIcon"></use>
                </svg>
            </span>
        </li>
    </ul>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
@Component
export default class leftNav extends Vue {
    @Prop([])
    public navlist!: []
    public current: number = -1

    @Emit('changeIndex')
    changeIndex(item: any,index: number){
        console.log(item,'啊啊啊')
        this.current = index
        return item
    }
}
</script>

<style lang='scss' scoped>
    @import '../style/mixxin';

    #leftNav{
        width: 100%;
        li{
            width:calc(100% - 20px);
            padding:10px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            .nav-title{
                width: calc(100% - 20px);
                margin-left: 10px;
                display: flex;
                justify-content: space-between;
            }
        }
        .icon{
            color:#339966;
            @include iconSize(20px,20px)
        }
        .active{
            background: #616161;
        }
    }
</style>