/**
 * Created by Administrator on 2017/8/26.
 */
/**
 * 表示动画的构造函数
 * @param durations  周期
 * @param easings      动画算子
 * @param doSomethings   执行的动画效果
 * @constructor
 */
function Animation(durations,easings,doSomethings){
    this.durations = durations || [];
    this.easings = easings || [];
    this.doSomethings = doSomethings || [];
}
Animation.prototype = {
    /**
     * 开始动画的函数
     */
    start:function (count) {
        if(this.durations.length ==0) return;
        //设置动画开始的时间,为当前时间;
        var startTime = new Date();
        var dus = this.durations;
        var es = this.easings;
        var dos = this.doSomethings;
        var index = 0;//表示正在运行的动画的序列的下标
        //执行动画
        this.frameId=requestAnimationFrame(function step(){
            //如果动画次数小于等于0,直接返回
            var p = Math.min(1,(new Date()-startTime)/dus[index]);
            //调用doSomething()函数并传入动画算子计算的结果
            dos[index](es[index](p));
            //判断若p<1则表示动画还没有结束则继续执行
            if(p<1){
                this.frameId=requestAnimationFrame(step)
            }else {
                index++;
                if(index<dos.length){
                    //重新更新动画的开始时间
                    startTime=new Date();
                    this.frameId=requestAnimationFrame(step);
                }else {
                    count--;
                    if(count>0){
                        index = 0;
                        startTime=new Date();
                        this.frameId=requestAnimationFrame(step);
                    }
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
};