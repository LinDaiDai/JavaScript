/**
 * Created by Administrator on 2017/8/26.
 */
/**
 * 表示动画的函数
 * @param duration  周期
 * @param ease      动画算子
 * @param doSomething   执行的动画效果
 * @constructor
 */
function Animation(duration,easing,doSomething){
    this.duration = duration;
    this.easing = easing;
    this.doSomething = doSomething;
}
Animation.prototype = {
    start:function (count) {
        if(typeof this.doSomething != 'function') return;
        if(typeof this.easing!='function'){
            this.easing=function (p) {
                return p;
            }
        }
        var startTime = new Date();
        var that = this;
        this.frameId=requestAnimationFrame(function step(){
            if(count<=0) return;      //如果动画次数小于等于0,直接返回
            var p = Math.min(1,(new Date()-startTime)/that.duration);
            that.doSomething(that.easing(p));
            if(p<1){
                that.frameId=requestAnimationFrame(step)
            }else {
                    count--;
                    if(count>0){
                        startTime=new Date();
                        that.frameId=requestAnimationFrame(step);
                    }
                }
        });
    },
    stop:function () {
        cancelAnimationFrame(this.frameId)
    }
}