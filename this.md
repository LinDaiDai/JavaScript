## this的四种使用方式

this 的绑定方式:

​	1.默认绑定

​	2.隐式绑定

​	3.new 绑定

​	4.显示绑定



### 1.默认绑定:

当直接调用一个函数的时候,就是默认绑定

​	1.在非严格模式下,默认绑定到window上,

```
function foo(){
  console.log(this);
}
foo();
=>window
```

```
var name = "张三";
var obj = {
  this.name = "李四",
  foo:function(){
    console.log(this.name);
  }
}
var f = obj.foo;
foo();
=>"张三"
```

​	

2.严格模式下(ES6),	this默认绑定到undefined;



### 2.隐式绑定

当使用对象.方法( )这种方式调用,称之为隐式绑定;

this绑定到前面那个对象上.

```
var obj = {
  name:"李四",
  foo:function(){
    console.log(this);
  }
}
obj.foo();
=>obj
```



### 3.new 绑定

> 使用new来调用构造函数的方式,new绑定
>
> this是绑定在新创建的那个对象上

```
function foo(){
  console.log(this);
}
var obj = new foo();
console.log(obj)
=>obj
=>obj
```

```
var obj = {
  name:"张三",
  foo:function(){
    console.log(this);
  }
}
var obj1 = new obj.foo();			//可以理解为将对象obj中的foo函数作为构造函数来使用
console.log(obj1)
=>空的obj
```



### 4.显示绑定

三种函数方法:

​	call	apply    bind

​	call 和 apply:

​	相同点:仅仅这一次调用的时候使用了显示绑定,对原函数没有任何的影响;

​	call:

```
function foo(){
  this.name = "李四";
  console.log(this.name)
}
foo();
=>"李四"
foo.call({name:"王先生"});
=>王先生
```

​	apply:

```
//若是使用call来进行函数借调,它会将参数一一对应的输出,若是没有则会返回undefined;
function foo(a,b){
  this.name = "李四";
  console.log(this.name,a,b)
}
foo.call({name:"王先生"},[3,4]);
=>王先生 [3,4] undefined
//若是使用apply来进行函数借调,它将会把数组拆开来,把参数一一对应的输出
foo.apply({name:"王先生"},[3,4]);
=>王先生 3 4
```

```
例1:求数组中的最大值

var arr = [10,20,30,40,50,60];
var max = Math.max.apply(Math,arr);
console.log(max);
=>60;

//普通max的使用:
var max = Math.max(a);
console.log(max);
=>7

例2:求数组中的最小值
var min = Math.min.apply(Math,a);

例3:Math对象中本身没有求和这个属性(max,min都是它自身默认的属性)
	所有要拓展一个求和的属性
	Math.sum = function(){
        return Array.prototype.reduce.call(arguments,function (a,ele) {		//借调Array对象中的reduce方法
            return a+ele;
        },0)
    }
    console.log(Math.sum(10,20,30));
    //也可以计算一个数组中所有数的和
    var a = [10,20,30];
    console.log(Math.sum.apply(Math,a));
```

​	

bind:	固定绑定

> 优先级是最高的

> 调用函数对象的bind的方法,返回一个固定this绑定的新的函数;
>
> 对原来的函数没有影响

```
		var name = 'b';
		var obj = {
            name:"a"
        }
        function foo(){
            console.log(this.name);
        }
      
        var f = foo.bind(obj);  //借调foo()这个函数来赋值给f(此时f是函数),并将foo中的this永远绑定到obj这个对象中,不管以后如何调用f,f中的this都是指obj这个对象;	并且对原函数foo没有影响.
        f();
        =>a				//输出的是obj中的name属性
        
       var obj2 = {		//新建了一个对象,并将上面的f函数添加为它的一个属性
         name:"b",
         foo2:f
       }
       obj2.foo2();		//调用obj2中的foo2方法
       =>a				//输出的还是a,因为f函数中的this指向的还是obj,而不是obj2;
```



## 回调函数的this绑定丢失问题



什么是回调函数的this绑定丢失?





```
var name = "王先生";
var obj = {
  name :"李四",
  show:function(){
    setInterval(function(){
      console.log(this.name);//this指向的是调用它的对象,此时是window调用的定时器,而这个匿名函数又在定时器中,所以this是window;
    },1000)
  }
}
obj.show();
=> 每隔一秒输出一次 王先生;

解决方案一:
var name = "王先生";
var obj = {
  name :"李四",
  show:function(){
    var self = this;				//将this(也就是obj)赋值给一个变量self			
    setInterval(function(){
      console.log(self.name);	//此时输出的就是self(也就是obj)的name属性"李四";
    },1000)
  }
}
obj.show();
=>每隔一秒输出一个  李四

解决方案二:
var name = "王先生";
var obj = {
  name :"李四",
  show:function(){
    setInterval(function(){
      console.log(this.name);
    }.bind(this),1000)			//将这个匿名函数中的this固定死了绑定到this(也就是obj),所以里面输出的也就是obj的name属性"李四";
  }
}
obj.show();
=>每隔一秒输出一个  李四
```



显示绑定的丢失问题

显示把绑定到undefined上,会默认绑定为window对象

```
var obj = {
  name:"a"
}
function foo(){
  console.log(this.name);
}
foo.bind(undefined);
```