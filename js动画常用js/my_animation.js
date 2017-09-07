/**
 * Created by Administrator on 2017/8/26.
 */
/**
 * 表示动画的构造函数
 * @param duration  周期
 * @param easing      动画算子
 * @param doSomething   执行的动画效果
 * @constructor
 */
function Animation(duration,easing,doSomething){
    this.duration = duration;
    this.easing = easing;
    this.doSomething = doSomething;
}
Animation.prototype = {
    /**
     * 开始动画的函数
     * @param count 动画播放的次数
     */
    start:function (count) {
        //如果传进来的doSomething不是一个函数,则直接返回;
        if(typeof this.doSomething != 'function') return;
        //如果传进来的easing不是一个动画算子,则当成普通的p来用
        if(typeof this.easing!='function'){
            this.easing=function (p) {
                return p;
            }
        }
        //设置动画开始的时间,为当前时间;
        var startTime = new Date();
        //获取this
        var that = this;
        //执行动画
        this.frameId=requestAnimationFrame(function step(){
            //如果动画次数小于等于0,直接返回
            if(count<=0) return;
            //计算时间已经用去的比例
            var p = Math.min(1,(new Date()-startTime)/that.duration);
            //调用doSomething()函数并传入动画算子计算的结果
            that.doSomething(that.easing(p));
            //判断若p<1则表示动画还没有结束则继续执行
            if(p<1){
                that.frameId=requestAnimationFrame(step)
            }else {
                //若p>1,则表示动画已经执行了一遍了,此时将count-1并继续执行动画
                    count--;
                    //当count还大于0时,则表示动画还要继续执行
                    if(count>0){
                        //重新更新动画的开始时间
                        startTime=new Date();
                        that.frameId=requestAnimationFrame(step);
                    }
                }
        });
    },
    /**
     * 定义动画结束的函数
     */
    stop:function () {
        cancelAnimationFrame(this.frameId)
    }
}