## JavaScript继承

### 第一章:更换构造函数的原型

原型其实就是一个对象，只是默认情况下原型对象是浏览器会自动帮我们创建的，而且自动让构造函数的 **prototype** 属性指向这个自动创建的原型对象。

​	其实我们完全可以把原型对象更换成一个我们自定义类型的对象。

![img2](E:\JavaScript\面向对象img\img2.png)



所有构造函数它的prototype的值都可以换一个值作为构造函数的原型对象

即,我们可以用一个函数来作为基类(父类) base-class    然后继承它的称为子类(派生类) sub-class

如上图中的function C 它原本的原型对象是对象D,后来通过`C.prototype = A1`,将原型对象改变了,这样它就将对象A1作为自己的原型对象,并且继承了A1应该有的属性



```javascript
		function Father(name){
            this.name = name;
        }
        Father.prototype={
            eat:function(){
                console.log("我是father下的eat函数");
            }
        }
        function Son(age){
            this.age = age;
        }
		//创建一个fater1的对象
        var father1 = new Father();
		//将Son函数的原型改为father1这个对象
        Son.prototype=father1;
		//在Son函数的原型(也就是father1)中添加一个方法paly
        Son.prototype.play=function(){
            console.log("我是son下的play函数")
        };
        var son1 = new Son();
        son1.eat();			//son1可以执行Father中的eat函数
        son1.play();		//也可以执行Son中的play函数
		father1.paly()		//此时father1也可以执行play函数
```



### 第二章:函数借调

> 借用构造函数调用  继承，又叫伪装调用继承或冒充调用继承。虽然有了继承两个字，但是这种方法从本质上并没实现继承，只是完成了构造方法的调用而已。



​	使用 **call** 或 **apply** 这两个方法完成函数借调。这两个方法的功能是一样的，只有少许的区别(暂且不管)。功能都是更改一个构造方法内部的 **this** 指向到指定的对象上。

```javascript
例1:
		function foo(age){
            this.age = age;
            console.log(this.age);
        }
        var d = {};	
        foo.call(d,20);
```

```javascript
例2:
function Animal(name,color){
  this.name = name;
  this.color =color;
}
Animal.prototype.eat=function(){
  console.log("动物在吃")
}
function Dog(name,color,weight){
  Animal.call(this,name,color);				//此时只是暂时的将Animal中的this指向调用Dog函数的对象
  this.weight = weight;
}
var dog1 = new Dog("瓜皮","yellow","80kg");	//Dog()中并没有name,color的属性只是借用了Animal中的
console.log(dog1 instanceof Animal);
=>false
//此时执行会报错,因为并没有继承Animal
dog1.eat()	
```



### 第三章:组合继承

> 组合函数利用了原型继承和构造函数借调继承的优点，组合在一起。成为了使用最广泛的一种继承方式.

```javascript
例2:
function Animal(name,color){
  this.name = name;
  this.color =color;
}
Animal.prototype.eat=function(){
  console.log("动物在吃")
}

function Dog(name,color,weight){
  Animal.call(this,name,color);				//此时只是暂时的将Animal中的this指向调用Dog函数的对象
  this.weight = weight;
}
//将Dog函数的原型对象改为用构造函数Animal()新建的这个对象(继承)
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

var dog1 = new Dog("瓜皮","yellow","80kg");	//Dog()中并没有name,color的属性只是借用了Animal中的
console.log(dog1 instanceof Animal);
=>true
//此时执行可以输出,因为继承了Animal
dog1.eat()	
```

**注:**

1. 组合继承是我们实际使用中最常用的一种继承方式。
2. 可能有个地方有些人会有疑问：Dog.prototype = new Animal( );这不照样把父类型的属性给放在子类型的原型中了吗，还是会有共享问题呀。但是不要忘记了，我们在子类型的构造函数中借调了父类型的构造函数，也就是说，子类型的原型（也就是Animal的对象）中有的属性，都会被子类对象中的属性给覆盖掉。就是这样的。



### 第四章:内置类型的测试

> 只能测试出内置类型,自定义类型不能(运用了函数借调)

```javascript
var a1 = Object.prototype.toString.call(/a/);
var a2 = Object.prototype.toString.call([1,2,3,4]);
var a3 = Object.prototype.toString.call(function(){});
console.log(a1);
console.log(a2);
console.log(a3);
=>[object RegExp]
=>[object Array]
=>[object Function]
```