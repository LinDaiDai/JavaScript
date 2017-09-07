/**
 * Created by Administrator on 2017/8/26.
 */
var fan = {
    _init:function(){
        this.fensan = document.querySelector('#fensan');
        this.img = document.querySelector('#fensan img');
        this.btn = document.querySelector('#btn');
        var that = this;
        this.animation = new Animation(1000, Easing.linear, function (e){
            that.fensan.style.transform = `rotateZ(${360 * e}deg)`;
        });
        this.imgSrcs = ['img/电风扇.png','img/四叶风扇.png','img/风扇.png'];
        this.i = 0;
        this.btn.addEventListener('click',function(e){
            var clickBtn = e.target;
            switch (clickBtn.innerHTML){
                case "打开风扇":
                    that.start();
                    break;
                case "1档":
                    that.changeSpeed(1000);
                    break;
                case "2档":
                    that.changeSpeed(500);
                    break;
                case '3档':
                    that.changeSpeed(200);
                    break;
                case "关闭风扇":
                    that.stop();
                    break;
                case "换扇叶":
                    that.changeImg(that.imgSrcs[that.i++ % that.imgSrcs.length]);
                    break;
            }
        })
    },
    start:function(){
        this.animation.start(Infinity);
    },
    stop:function(){
        this.animation.stop();
    },
    changeSpeed:function(speed){
        this.animation.duration = speed;
    },
    changeImg:function(src){
        this.img.src = src;
    }
};
fan._init();