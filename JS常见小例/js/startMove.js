/**
 * Created by Administrator on 2017/7/28.
 */
var timer = null;

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
};

function startMove(obj,json,fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var bStop = true;  //假设所有值都到了的；
        for (var attr in json){
            var cur = 0;   //把获取到的元素的属性变成一个变量；
            if(attr=='opacity'){
                //当获取到的元素是opacity时；
                cur = Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                //其他任意元素；
                cur = parseInt(getStyle(obj,attr));
            };
            //设置速度；
            var speed = (json[attr]-cur)/6;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            //只要有一个值没有到目标，则继续执行定时器；
            if(json[attr]!=cur){
                bStop=false;
            }

            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
            }else{
                obj.style[attr]=cur+speed+'px';
            }
        };
        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd)fnEnd();
        };

    },30);
};
