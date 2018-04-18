## javascript 权威指南（第6版）

### 第二章

#### 1.1 标识符和保留字

##### 标识符

标识符用来对变量或函数进行命名 或者对 **某些循环语句中的跳转位置的标记**

命名规则：

```
字母、下划线、或者$开头，不能是数字开头
```

**允许使用非英语语言或特殊符合作为标识符**

```
var π = 3.14
```

##### 保留字

js会用一些标识符来做自己的关键字，这些是不能用来命名的。



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

如以下是不会填补的：

```
var a
a
=
3
console.log(a)

解析为：
var a;a=3;console.log(a);
```

3.若是当前语句和下一行语句无法解析时，会在第一行后填补分号，这个是通常规则，但是有两个例外：

第一个：

涉及到break  return continue语句中，若是这三个关键字后面有换行，则会在它们后面填补上分号

```
return
true

return; true;
```

第二个：

涉及到 ++  -- 运算符，由于它们既可以作为前缀也可以作为后缀，所有最好在运用的时候加上分号

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

当不在有任何引用指向这个对象，解释器会自动回收它所占用的内存资源



js是面向对象的语言，不严格的说，意味着 我们不用全局的定义函数去操作不同类型的值，数据类型本身可以定义方法来使用值

如，要对数组a中的元素进行排序，可以不必将a传入sort();而是调用a的一个方法

```
a.sort();//sort(a)的面向对象版本
```

js对象，数字，字符串，布尔值可以拥有自己的方法，只有null和undefined无法拥有方法。



#### 3.2进制

16进制，以“0x”或“0X”开头

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

字符串并不是对象，为什么会有属性和方法？

因为只要引用了字符串的属性，js会将字符串通过调用new String()的方式转换为对象，这个对象继承了字符串的方法。

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



以下结果均为true

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

使用`new`构造函数创建对象时，若是对象创建表达式不需要传参数时可以省略()

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

**当其中一个操作数为NaN时，所有的比较结果都返回false**



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









