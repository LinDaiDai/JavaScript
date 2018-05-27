## javascript 权威指南（第6版）

### 第二章

#### 1.1 标识符和保留字

##### 标识符

标识符用来对变量或者是函数来进行命名 或者是对 **某些循环语句中的跳转位置的标记**

命名规则：

```
字母、下划线、或者$开头，不能是数字开头
```

**在JS中允许使用非英语语言或特殊符合作为标识符**

```
var π = 3.14
```

##### 保留字

js中会用一些标识符用来做自己的关键字，所以这些是不能用来命名的。



下面这些关键字在普通的js代码中是合法的，但是在严格模式下不合法：

```
implements let private public yield 
interface package protected  static 
```

 下面这俩个并不完全是保留字，但也不能用于变量名、函数名、参数名

```
anguments eval
```



#### 1.2 可以省略的分号

1.js中的分号可写可不写

2.js并不是在所有换行处都填补分号，而是在缺少了分号就无法正确解析代码的时候填补。

如以下是不会进行填补的：

```
var a
a
=
3
console.log(a)

解析为：
var a;a=3;console.log(a);
```

3.若是当前语句和下一行语句无法解析时，则会在第一行后填补分号，这个是通常规则，但是有两个例外：

第一个情况是：

涉及到break  return continue语句中，若是这三个关键字后面有换行，则会在它们后面填补上分号

```
return
true

return; true;
```

第二个：

涉及到 ++  -- 运算符，由于它们既可以作为前缀同时也可以作为后缀，所有最好在运用的时候加上分号

```
x
++
y


会被解析为：
x; ++y
```



### 第三章

#### 3.1垃圾回收机制

javascript解释器有自己的内存管理机制 -》对内存进行垃圾回收

当不再有任何引用指向这个对象时，解释器会自动回收它所占用的内存资源



js是面向对象的语言，不严格的说，意味着 我们不用全局的定义函数去操作不同类型的值，数据类型本身可以定义方法来使用值

如，要对数组a中的元素进行排序，可以不必将a传入sort();而是调用a的一个方法

```
a.sort();//sort(a)的面向对象版本
```

js对象，数字，字符串，布尔值可以拥有自己的方法，只有null和undefined无法拥有方法。



#### 3.2进制

16进制的数字，以“0x”或“0X”开头

```
0xff // 15 * 16 + 15 = 255
```



8进制，以0开头，后面接0~7

```
0377 // 3 * 64 + 7 * 8 + 7 = 255
```



浮点型直面量

```
6.02e23   // 6.02 X 10的23次方
```



```
isNaN();
在参数为NaN 或 非数字(如字符串对象) 则返回true
isNaN(JSON.stringify({label: 1})); // true
JSON.stringify({label: 1}) == NaN // false 
isFinite();用于检查其参数是否是无穷大
在参数不是NaN Infinity 或 -Infinity 的时候返回true


负0和0相等；
-0 === 0
true

负无穷和正无穷不相等
1/-0 === 1/0
false
```



#### 3.3四舍五入错误

在任何使用二进制浮点数的编程语言中都会有这个问题；

```
var x = .3 - .2; 30美分-20美分
var y = .2 - .1;
x === y; //false 
x === .1; //false
y === .1; //true

在js中
0.3 - 0.2 = 0.09999999999999998
```







#### 3.4为false的几个值

undefined  

null  

0  

-0  

NaN 

 ""

false本身

其它包括对象(数组)都会被转换为true

```
var a = {};
var b;
if (a) {
  b = 1;
} else {
  b = 2
}

b = 1
```



#### 3.5全局对象

字符串并不是对象，那么为什么会有属性和方法？

因为只要是引用了字符串的属性，js会将字符串通过调用new String()的方式转换为对象，这个对象继承了字符串的方法。

但若是你试图给其赋值，则会忽略这个操作

```
var s = "test";
s.len = 4; //给其赋值属性len为4
var t = s.len;

console.log(t);
undefined;
```



#### 3.6包装对象

存取字符串、数字、布尔值的属性时创建的临时对象称为包装对象。

可以通过String() Number()  Boolean() 构造函数来显式创建包装对象

```
var s = "test", n = 1, b = true;
var S = new String(s);

s == S; //true;
s === S; //false;

且typeof S;
// "object"
```



#### 3.7类型转换

|     值     |     字符串     |  数字  |  布尔值  |        对象        |
| :-------: | :---------: | :--: | :---: | :--------------: |
| undefined | "undefined" | NaN  | false | throws TypeError |
|   null    |   "null"    |  0   | false | throws TypeError |



以下de结果均为true

```
undefined == null;
"0" == 0; //比较之前字符串都转换为数字
0 == false;//比较之前布尔值转换为数字
"0" == false;//比较之前字符串和布尔值都转换为数字
```



if 语句可以将undefined转换为false 但是“==”不行：

```
undefined == false; //false
```



**显式类型转换**

```
String(false); // "false" 或使用 false.toString();
Boolean([]); // true
Object(3); // new Number(3)
```

**除了null 和undefined 之外的任何值都具有toString()方法**

```
({x: 1, y: 2}).toString(); // => "[object Object]"
```



toString()和String()通常返回结果都一样，但是因为试图将null转换为对象都会抛出一个类型错误

```
String(undefined);
"undefined"

undefined.toString();
Uncaught TypeError: Cannot read property 'toString' of undefined
    at <anonymous>:1:11
```

Object()则不会报错，返回一个空对象

```
Object(undefined);
{}
```



**隐式类型转换**

常用：

```
x + ""; //等价于 String(x)
+x; //等价于 Number(x) 或 x - 0;
!!x; // 等价于 Boolean(x)
```



number类定义的toString()方法可以接收表示转换基数的可选参数，若不指定参数，则默认为十进制

```javascript
var n = 17;
var a = n.toString(2); // 转换为 "10001"
var b = "0" + n.toSting(8); // 转换为 "021"
var c = "0x" + n.toString(16); // 转换为 "0x11"
```

其它类定义的toString()方法

```javascript
[1,2,3].toString();  // "1,2,3";
(function(x) { f(x); }).toString();  // "function(x) { \n f(x); \n }"
/\d+/g.toString();  // "/\\d+/g"
new Date().toString(); //  "Thu Apr 12 2018 23:07:12 GMT+0800 (中国标准时间)"
```







parseInt() 和 parseFloat()

```javascript
parseInt('.1'); // NaN
parseInt('0.1); // 0
parseFloat('.1'); // 0.1

parseInt(" 3 abc"); // 3
parseFloat(" 3.14 wbs"); // 3.14
parseInt("-3"); // -3
parseInt("0x11"); // 17  
```



parseInt() 也可以指定基数

都可以指定基数

```javascript
parseInt("11", 2); // 3
parseInt(11, 2); // 3
parseInt("ff", 16);  // 255(15 * 16 + 15); 若是不传第二个参数，则是NaN,但若是0x开头则会解析为255

```











#### 3.8作为属性的变量

当声明一个JS全局变量时，实际上是定义了全局对象的一个属性；

使用`var `声明变量，创建的这个属性是不可配置的，也就是无法通过`delete`运算符来删除它。

非严格模式下，若给没有通过`var`声明的变量赋值的话，js会自动创建一个全局变量，且这个变量是可配置的，可以通过`delete`删除的。

```javascript
        var truevar = 1; // var声明
        fakevar1 = 2;	// 没有声明
        this.fakever2 = 3; //同上
        
        delete truevar; // 不可删除
        delete fakevar1; // 可以删除
        console.log(truevar); // 1
        console.log(fakevar1); // Uncaught ReferenceError: fakevar1 is not defined

```

**全局变量是全局对象的一个属性**



#### 3.9作用域链

```javascript
各种情况下的作用域链

js最顶层代码中
	由一个全局对象组成

不包含嵌套的函数体中
	作用域链中有两个对象：
	1.定义函数参数和局部变量的对象
	2.全局对象

嵌套的函数体中
	作用域链上至少有3个对象
	
```



```
定义一个函数：实际上是保存一个作用域链
调用这个函数：
			1.创建一个新的对象来存储局部变量
			2.将这个对象添加至保存的那个作用域链中
			3.同时创建一个新的更长的表示函数调用作用域的“链”。
```



### 第四章

#### 4.1对象创建表达式

在使用`new`构造函数创建对象时，若是对象创建表达式不需要传参数时可以省略()

```
function Animation() {
  this.name = 'wang'
}

var an1 = new Animation;
console.log(an1); // Animation {name: 'wang'}
```



#### 4.2表达式和运算符

几种加号的转换

```
1 + {}; // "1[object object]"  转换为字符串后相加
true + true; // 2 转换为数字后相加

2 + null; // 2  null转换为数字0后相加
2 + undefined; // NaN  undefined转换为NaN后相加	

相加顺序
1 + 2 + ' string'; // "3 string"
1 + (2 + ' string'); // "12 string"
```



一元运算符

```
+号
即为一元也为二元
一元时把操作数转换为数字（或NaN）
如
var num = + "1"; // 1
var und =  +undefined; // NaN	

-号
一元时把操作数转换为数字，然后改变运算结果的符号
var num = - "1"; // -1

++
将操作数转换为数字然后+1
var num  = ++"1"; // 2
var num = "1"++; // 1
```



**比较运算符**

所有大写的ASCII字母都小于小写的

```
Zoo < aadrvark; // true
```

**计算时数字转字符串，比较时字符串转数字**

```
1 + "2"; // 12  数字转字符串
3 > "11"; // false 字符串转数字  
"3" > "11"; // true 字符串比较
"one" > 3; // false 字符串转数字为NaN
"one" < 3; // false
```

**当其中的一个操作数为NaN时，所有的比较结果都返回false**



in运算符



```
var obj = {x: 1, y: 2}; // 定义对象
"x" in obj; // true
"z" in obj; // false
"toString" in obj; // true 对象继承了toString()方法


var data = [7,8,9];
'0' in data; // true  数组包含元素"0"
1 in data; // true  转换为字符串"1"
3 in data; // false  没有索引为3的元素
7 in data; // false
```



instanceof运算符

```
左侧为一个对象，右侧为标识对象的类

所有的对象都是object的实例

若左侧不是对象，则为false,
若右侧不是一个函数，则抛出一个类型错误异常
```



&&符可以用于“短路”

```
if (a == b) stop(); // 等价于
(a == b) && stop();  // 只有a==b才会执行stop()函数
```



delete 运算符

删除对象属性或者数组元素

```
var obj = {x: 1, y: 2}
delete obj.x
x in obj; //false

var a = [1,2,3]
2 in a; //true
delete a[2];
2 in a; //false
a.length; // 3
```





### 第五章

#### 5.1 for in 和 for of

```
for in 遍历的是对象的键，数组的下标
遍历的顺序按照属性定义的先后顺序
        var obj = {x: 1, y: 2, z: 3};
        var arr = [1, 2, 3];
        for (let o in obj) console.log(o); // x, y, z
        for (let i in arr) console.log(i); // 0, 1, 2
        
利用for in 获取对象的所有键
var arr = [], i = 0;
for (arr[i++] in obj) /* empty */;
// arr = ["x", "y", "z"];

for in 循环并不会遍历对象的所有属性，只有可枚举的属性才会遍历到
```



#### 5.2 throw语句

异常：当发生了某种异常情况或是错误时产生的一个信号。

js中是可以使用throw语句显示地抛出异常。

```
        function test(param) {
            if (param < 0) throw new Error('输入的不能是负数');
            console.log(param);
        }
        test(-1);
        console.log('执行');
        
        // 浏览器控制台只会抛出一个异常,不会执行之后的代码
        // Uncaught Error: 输入的不能是负数
```



#### 5.3 try/catch/finally



```
try:
	定义了需要处理的异常所在的代码
catch：
	当try中的代码发生异常时，执行此处代码，可以使用e(或其它命名的参数)来捕获错误
finally:
	清理代码，不管try中是否有异常，都会执行，

```

**catch和finally都是可选的**

使用catch

```
        try{
            console.log('try');
            var o = undefined.toString();
        } catch(e) {
            console.log('catch');
            if (e) {
                console.log(e);
            }
        } finally {
            console.log('finally');
        }
        console.log('last');
        
        // try
        // catch
        // TypeError: Cannot read property 'toString' of undefined // 打印出错误切会执行之后的代码
        // finally
        // last
```

不使用catch

```
        try{
            console.log('try');
            var o = undefined.toString();
        } finally {
            console.log('finally');
        }
        console.log('last');
        
        // try
        // finally
        // Uncaught TypeError: Cannot read property 'toString' of undefined //报红色错，不执行后面的代码
```





#### 5.4 with

作用域链实际是是一个按序检索的列表，通过它可以进行变量名解析，而with用于临时扩展作用域链

```
with(object)
statement

将object添加至作用域的头部，软化执行statment，最后把作用域链恢复到原始状态。
```



在严格模式下，禁止使用with,非严格模式下，也要避免使用



```
    <form>
        <input type="text" name="name">
        <input type="text" name="add">
        <input type="text" name="sex">
    </form>
    <script>
    	document.forms[0].name.value = '王';
    	document.forms[0].add.value = '地铁';
    	document.forms[0].sex.value = '男';
    	
    	// 等同于
    	with(document.forms[0]) {
            name.value = '王';
            add.value = '地铁';
            sex.value = '男'
        }
        // 等同于
        var f = document.forms[0];
        f.name.value = '王';
        f.add.value = '地铁';
        f.sex.value = '男'
    </script>
    
    
```



**只有在查找标识符的时候才会用到作用域链，创建新的变量的时候不适用它，如**



#### 5.5 use strict

```
        var o = {x: 1};
        with(o) x = 2;

        console.log(o); // {x: 2}
        
        var o = {x: 1};
        with(o) y = 2;

        console.log(o);// {x: 1}
        console.log(y);/// 2
        //若是o中存在x,那么就给x赋值1，若是o中不存在y,则这段代码就等于y=2,创建了一个全局变量y
```



严格与非严格的区别，最重要的三点：

```
1.严格模式下不能使用with，否则会报错
        "use strict"
        with (document.forms[0]) {
            name.value = '王';
            add.value = '地铁';
            sex.value = '男'
        }
        // Uncaught SyntaxError: Strict mode code may not include a with statement
      
2.严格模式下，所有的变量都要先声明
	     x = 1;
         console.log(x);
		// Uncaught ReferenceError: x is not defined
		
3.严格模式下，函数内部的this值是undefined,而非严格模式下是全局对象
        (function test() {
            "use strict"
            console.log(this);
        })();
        // undefined
```



### 第六章

#### 6.1原型

```
通过new Object()创建的对象的对象继承自Object.prototype
通过new Array()创建的对象的对象继承自Array.prototype也继承自Object.prototype
通过new Date()创建的对象的对象继承自Date.prototype也继承自Object.prototype
```

没有原型的对象不多，Object.prototype就是其中一个，它不继承任何属性。



#### 6.2 Object.create()

Object.create()，创建一个新对象，第一个参数为这个对象的原型，第二个为可选参数，用以对这个对象的属性进一步的描述

它是一个静态函数，不是提供给某个对象调用的方法。

```
// 使用时，只需要传入所需的原型对象即可
var o1 = Object.create({x: 1, y: 2}); // o1继承了属性x和y

若参数传入的是null，则创建的这个对象没有原型，不会继承任何东西，如toString()都没有
若参数传入的是Object.prototype,则创建的为普通的对象(和{}或new Object()一样)
var o2 = Object.create(null);
o2['x'] = 1;
console.log(o2.toString());
// Uncaught TypeError: o2.toString is not a function

var o3 = Object.create(Object.prototype);
o3['x'] = '2';
console.log(o3.toString());
// [object object]
```



**通过原型继承创建一个新对象**

```
        function createObject(p) {
            if (p == null) throw TypeError();
            if (Object.create) 
                return Object.create(p);
            var t = typeof p;
            if (t !== "object" && t !== 'function') throw TypeError();
            function F() {};
            F.prototype = p;
            return new F();
        }
        var f = createObject({'x': 1, y: 2});
        console.log(f); // {}   // prototype 为{'x': 1, 'y': 2}
        console.log(f.x); // 1
        
        若是传入的为null则抛出异常
```



#### 6.4 属性的查询和设置

```
通过.和[]两种方式来获取属性的值
```

在ECMAScript3中，.运算符后面的标识符不能为保留字，但在ECMScript5中可以

而[]运算符都可以使用保留字

若是键名有空格或者-都必须用[]

```
        var o = {};
        o.class = '1';
        o.for = '2';
        console.log(o); // {class: '1', for: '2'}
        
        o['font size'] = '3';
        o['font-weight'] = '4';
```



**可以利用[]动态的给对象中添加属性**

```
function addKey(object, key, value) {
  object[key] = value
}
```



**查询一个不存在的属性不会报错，如果试图查询这个不存在的对象的属性就会报错**，如

```
var o = {};
console.log(o.x); // undefined
console.log(o.x.length); // 报错
```

所以通常可以这样避免报错

```
if (o && o['x'] && o['x'.length]) console.log(o['x'].length);
```



**内置构造函数的原型是只读的**

在非严格模式下，不会成功，但也不会报错

```
var o = {x: 1};
Object.prototype = o; // 赋值失败，但是不会报错
console.log(Object); // ƒ Object() { [native code] }
```

在ECMAScript5的严格模式下，会报错

```
        "use strict"
        var o = {x: 1};
        Object.prototype = o; // 赋值失败，但是会报错
        console.log(Object);

// Uncaught TypeError: Cannot assign to read only property 'prototype' of function 'function Object() { [native code] }'
```



**几种给对象设置属性失败的情况**

```
o中的属性p是只读的(defineProperty()方法中有一个例外，可以对可配置的只读属性重新赋值)

o中的属性p是继承属性，且它是只读的，也不能通过同名自有属性覆盖只读的继承属性

o为可拓展，且o中没有p属性，并且没有setter方法可供调用，则p会被添加至o中；
o为不可拓展，那么o中不能定义新属性
```





#### 6.5 delete

delete 只能删除自有属性，不能删除继承属性



```
        var a = {p: {x: 1}};
        var b = a.p;
        console.log(b.x); // 1
        
        delete a.p;
        console.log(b.x); // 还是1
        
```



**delete删除成功或没有任何副作用(如删除不存在的属性)时，返回true**

**若delete后不是一个属性访问表达式，也是返回true**

```
        // 以下返回结果全是true
        var o = {x: 1};
        console.log(delete o.x); // 删除x，返回true
        console.log(delete o.x); // o中没有x属性，返回true
        console.log(delete o.toString); // toString是继承来的，返回true
        console.log(delete 1); // 无意义，返回true
```



**delete不能删除那些可配置性为false的属性**

在严格模式下，删除一个不可配置属性会报一个类型错误，

非严格模式下，返回false

```
delete Object.prototype; // 不能删除，属性是不可配置的
var x = 1; // 声明一个全局变量x
delete this.x; // 不能删除这个属性
function f(){}; // 声明一个全局函数
delete this.f; // 不能删除

若x不是用var声明的就可以删除

delete x; // 非严格模式下可以，严格模式下报错
delete this.x; // 正常
```



#### 6.6 检测属性

js中的对象属性的检测有很多方法

```
var o = {"x": 1};

1.in   对象的自有属性或者继承属性中包含的属性都可以
"x" in o; // true
"y" in o; // false
"toString" in o; // true

2.hasOwnPreperty()  对象的自有属性，不包括继承
o.hasOwnPreperty("x"); // true
o.hasOwnPreterty("toString"); // false

3.propertyIsEnumerable()  对象的自有属性，且可枚举(一般对象的自有属性都是可枚举的)
o.propertyIsEnumerable("x"); // true
Object.prototype.propertyIsEnumerable("toSting"); // false toString为不可枚举

4.使用 !==
o.x !== undefined; // true
o.toString !== undefined; // true
```

```
var o = {'x': undefined};

delete o.x;
"x" in o; // false
```



#### 6.7 可枚举属性

```
        var o = {'x': 1, 'y': 2};
        
        function keysName(o) { // 返回对象中所有可枚举属性的名字
            if (typeof o !== "object") throw TypeError();
            var res = [];
            for (prop in o) {
                if (o.hasOwnProperty(prop)) {
                    res.push(prop);
                }
            }
            return res;
        }
        
        function keysProp(o) { // 返回对象中所有可枚举属性的值
            if (typeof o !== "object") throw TypeError();
            var res = [];
            for (prop in o) {
                if (o.hasOwnProperty(prop)) {
                    res.push(o[prop]);
                }
            }
            return res;
        }
        console.log(keysName(p)); // ["x", "y"]
        console.log(Object.keys(p)); // ["x", "y"]
        console.log(keysProp(p)); // [1, 2]
        console.log(Object.getOwnPropertyNames(p)); // ["x", "y"]
```

js中提供的方法`Object.keys`返回一个数组，包含对象的所有可枚举属性的名；

`Object.getOwnPropertyNames()`返回一个数组，包含对象的所有可枚举不可枚举属性的名；

`Object.keys`类似于上面的`keysName()`



#### 6.8 属性的特性

##### 1.getter和setter

1.什么是getter，什么是setter？

　　getter 是一种获得属性值的方法，setter是一种设置属性值的方法。

​	对象中的普通属性可以称为“数据属性”

​	而通过getter 和 setter 定义的属性为 “存取器属性”



2.怎么定义？

　　有2种办法：

- 在对象初始化的时候定义
- 在对象定义后的时候定义

```
var obj = {
		//demo1
            val:100,
            get getval(){
                return this.val;
            },
            set setval(x){
                this.val = x;
            }
        }

        console.log(obj.getval); // 100
        obj.setval = 101;
        console.log(obj.getval); // 101

        //demo2
        
        var obj2 = {

            val:200
        }

        obj2.__defineGetter__('name',function(){return this.val});
        obj2.__defineSetter__('name',function(name){this.val = name;})

        console.log(obj2.name); // 200
        obj2.name = 201;
        console.log(obj2.name); // 201
```

- 使用get语法时，不能带参数；然而set必须有一个明确的参数。
- 在对象字面量中,同一个属性不能有两个get,也不能既有get又有属性键值(不允许使用 { get x() { }, get x() { } } 和 { x: …, get x() { } } )
- 在同一个对象中，不能为一个已有真实值的变量使用 set ，也不能为一个属性设置多个 set。 
  ( { set x(v) { }, set x(v) { } } 和 { x: …, set x(v) { } } 是不允许的 )
- get和set都能用delete方法删除



##### 2. 对象中属性总结

属性分为2种

可以当成它们分别有 4 种特性

1.数据属性

​	值(value)、可	写性(writable)、可枚举性(enumerable)、可配置性(configurable)

2.存取属性

​	存取属性不具有值特性和可写性，它的可写性是由有没有setter方法存在决定的

​	读取(get)、写入(set)、可枚举性(enumerable)、可配置性(configurable)



**Object.getOwnPropertyDescriptor()**

可以使用此方法获取一个对象中“**自有属性**”的这4个特性	

```javascript
        var obj2 = {
            val: 200, // 数据属性
            get getVal() {return this.val}, // 存取属性
            set getVal(newVal) {this.val = newVal}
        }
        
       	console.log(Object.getOwnPropertyDescriptor(obj2, "val"));
        console.log(Object.getOwnPropertyDescriptor(obj2, "getVal"));
        console.log(Object.getOwnPropertyDescriptor(obj2, "y")); // 不存在的属性
        console.log(Object.getOwnPropertyDescriptor(obj2, "toString")); // 继承的属性
        // {configurable：true, enumerable: true, value: 200, writable: true}
        // {configurable：true, enumerable: true, get: f getVal(), set: f setVal()}  
	    // undefined
        // undefined
```







