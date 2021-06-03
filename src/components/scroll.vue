<template>
    <div class='scrollbox' @touchmove.stop="touchmove" @touchend.stop="touchend" @touchstart.stop="touchstart">
        <!-- <header class="pull-refresh">
            <div class="down-tip" v-if="dropDownState==1">
                <span class="down-text">{{dropDownInfo.downText}}</span>
            </div>
            <slot name="pull-refresh">
            <div class="up-tip" v-if="dropDownState==2">
                <span class="up-text">{{dropDownInfo.upText}}</span>
            </div>
            <div class="refresh-tip" v-if="dropDownState==3">
                <span class="refresh-text">{{dropDownInfo.refreshText}}</span>
            </div>
            </slot>
        </header> -->
        <slot name='box'></slot>
    </div>
</template>

<script lang='ts'>
    import { Component, Emit, Prop, Watch, Vue } from 'vue-property-decorator';
    @Component({
        name: 'scrollbox'
    })
    export default class ScrollBox extends Vue {
        public defaultOffset: number = 50 // 默认高度, 相应的修改.releshMoudle的margin-top和.down-tip, .up-tip, .refresh-tip的height
        public top: number = 0
        public scrollIsToTop: number = 0
        public isDropDown: boolean = false// 是否下拉
        public isRefreshing: boolean = false // 是否正在刷新
        public dropDownState: number = 1 // 显示1:下拉可以刷新, 2:松开立即刷新, 3:正在刷新数据中...
        public dropDownInfo: object = {
            downText: '下拉可以刷新',
            downImg: 'arrow.png',
            upText: '松开立即刷新',
            upImg: 'arrow.png',
            refreshText: '正在刷新数据...',
            refreshImg: 'loading.png'
        }

        public startX: number = 0;
        public startY: number = 0;
        public endX: number = 0;
        public endY: number = 0;
        public scrollSate: number = 1; //1可以滚动

        @Prop({type:Function})
        onLeft?: any

        @Prop({type:Function})
        onRight?: any

        @Prop({type:Function})
        onDowndrop?: any

         created () {
            if (document.querySelector('.down-tip')) {
            // 获取不同手机的物理像素（dpr）,以便适配rem
                this.defaultOffset = document.querySelector('.down-tip')?.clientHeight || this.defaultOffset
            }
        }

        public touchmove(e: any){
            this.endX = e.touches[0].pageX;
            this.endY = e.touches[0].pageY;
            let direction = this.getSlideDireation(this.startX,this.startY,this.endX,this.endY)
            switch (direction) {
            case 1:
                //向上
                ;
                console.log('向上')
                this.scrollSate === 4 ? e.preventDefault() : this.downdrop()
                break;
            case 2:
                //向下
                console.log('向下')
                this.scrollSate === 4 ? e.preventDefault() : ''
                break;
            case 3:
                //向左
                console.log('向左')
                this.scrollSate === 4 ? e.preventDefault() : this.toLeft()
                break;
            case 4:
                //向右
                console.log('向右')
                this.scrollSate === 4 ? e.preventDefault() : this.toRight()
                break;
            default:
                break;
            }
        }
        downdrop(){
            this.scrollSate = 3
            setTimeout(()=>{
                this.onDowndrop(this.scrollDone)
            },0)
        }
        toRight(){
            this.scrollSate = 3
            setTimeout(()=>{
                this.onRight(this.scrollDone)
            },0)
        }
        toLeft(){
            this.scrollSate = 3
            setTimeout(()=>{
                this.onLeft(this.scrollDone)
            },0)
            
        }
        scrollDone(){
            this.scrollSate = 4
        }

        public touchstart(e: any){
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
        }

        public touchend(e: any){
            // console.log(e,'移动结束了')
            this.scrollSate = 1
        }

        /**
         * 返回角度
         */
        private getSlideAngle (dx: number, dy: number): number{
            return Math.atan2(dy, dx) * 180 / Math.PI
        }

        private getSlideDireation(startX: number, startY: number, endX: number, endY: number){
            let dx = endX - startX;
            let dy = endY - startY;
            let result = 0;
            
            //如果滑动距离太短
            if(Math.abs(dx) < 2 && Math.abs(dy) < 2 ){
                return result
            }

            //计算角度
            let angle: number = this.getSlideAngle(dx, dy)
            if(angle >= -45 && angle < 45){
                result = 4
            } else if ( angle > 45 && angle <= 135 ){
                result = 1
            } else if ( angle > -135 && angle < -45  ){
                result = 2
            } else if ( (angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135) ){
                result = 3
            }
            
            return result
        }
    }
</script>

<style lang='scss' scoped>
    .scrollbox{
        width: 100%;
        height: 100%;
        .pull-refresh{
            width: 100%;
            margin-top: -100px;
            -webkit-overflow-scrolling: touch; /* ios5+ */
            color: #999;
            transition-duration: 200ms;
            font-size: 24px;
        }
    }
</style>