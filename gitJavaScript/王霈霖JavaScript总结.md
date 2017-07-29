[TOC]

# JavaScript

##### 

### 第一章 变量与数据类型

**1.声明变量:**声明提前:会把声明的语句提前到脚本的最前头,但不会把赋值的语句提前;例:console.log(a);     //已经找到了a,因为var a 会被声明提前,但是却不会提前赋值,也就是不能找到a=10;var a =10;console.log(a);=>undefined  10 ;var 变量名 ;



**2.声明并赋值:**
var 变量名=值; / var 变量名;  变量名=值;
console.log(a);

var a = 20;

var a ;console.log(a);

=>undefined   =>20;



**3.var 变量名1,变量名2,变量名3;**

cd: change directory 更改目录     cd ..     //回到上一层   cd /      //回到根目录



**4.数据类型:****1.Number(只能是实数,虚数不支持)**** 用typeof 测试出来的类型都是小写的**
只能测试出6种类型:  number  boolean  string  undefined  object  functions**整数**  二进制   用0b 开头   字节:8个二进制位
  八进制   用0或者0o(推荐)开头
  十六进制   用0x开头   转换为二进制:每一个16进制位,用4个二进制位来表示  123 = 0001 0010 0011

**浮点数**
**无穷大  Infinity  (正无穷大和负无穷大)**1/0无穷大
**NaN   **转成数字=>0; 

NaN的特殊

:1.NaN 的typeof 的类型是 number;

2.NaN 转成数字类型是 NaN ;

3.NaN 转成布尔类型是 false;

4.NaN 转成字符串是  NaN ;

5.NaN == NaN =>false ;

6.NaN ===NaN =>false;0/0 = NaN

**2.Boolean**只有俩个值: true  和   false

**3.String**字符串:用一对单引号'' 或者 一对双引号"" 括起来的字符序列.

**4.Undefined**当声明一个变量但是并没有赋值时,或者没有声明的变量,变量的类型是Underfined类型typeof(undefined);=>undefined;undefined=>转成数字=>NaN

undefined的特殊之处:

1.undefined 的typeof 的类型是 undefiend;

2.undefined 转成数字类型为 NaN;

3.undefined 转为布尔类型是 false;

4.undefined 转为字符串类型是 undefined ;5.null == undefined => true;

5.Null  typeof(null);=>object;Null=>转成数字=>0;

null的特殊之处:

1.null 的typeof 的类型是 object;

2.null 转成数字类型为 0

;3.null 转为布尔类型是 false;

4.null 转为字符串类型是 null ;

5.null 和 任何非 null 都不相等;(但和undefined相等)

6.null == undefined =>true;



**6.Object**对象



**5.数据类型转换:********自动类型的转换:** 字符串,数字,boolean 之间的转换
 字符串->数字:        如果字符串例的内容全部是数字,则转换为数字,否则就是NaN;       其实就是调用的一种叫做转换函数Number();**Number()内要是有一个内容不是数字**,就会返回NaN;
 数字->字符串:       把数字的字面形式转换为字符串
 字符串,数字->布尔值:     0,"",undefined,null,false,NaN ->这六种是转换为false,其余的全当做true来用("0"," "是true); 布尔值 -> 字符串: true -> "true"  false-> "false" true -> 1; flase -> 0;
**强制类型转换:**1.使用转换:  Boolean()  String()  Number()
2.转换为Number():**转整形: **

** parseInt();**

1.字符串转数字(显式类型转换)
例1:  var a = '12';   parseInt(a);  =>12;
例2:  var a = '12aa12';  parseInt(a) =>  12   **//从左到右,遇到非数字则跳出去;**
例3:  var a = 'abc';  parseInt(a); => NaN   //任何数 + NaN = NaN     NaN == NaN =false  NaN和NaN不相等
**转浮点型: parseFloat();**

 var a = '3.5aa'; parseFloat(a); => 3.5

``Number(false); // 0

Number(true);  //1

Number(undefined); // NaN

Number(null); //0

Number( "5.5 "); //5.5

Number( "56 "); //56

Number( "5.6.7 "); // NaN

Number(new Object()) NaN
**转字符串型: i.toString();**

如:var i =10;

alert(typeof(i.toString()));

=>  string
注:数字+字符串=字符串

数字+数字+字符串=(数字相加)+字符串=字符串

如:var i = 1 + 2 + '4';i=34;

**6.转义字符:**

![Image(11).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(11).png?raw=true)

**7.运算符:**

**1.算术运算符**
"+" 运算符:加号如果俩个都是Number类型,则按照普通的数学加法运算;
如果有一个是字符串,则按照字符串链接
如果有一个是NaN,则结果为NaN;
如果同时是infinity或者-infinity,则结果就是infintity或者-infitity;
infinity + (-infinity) = NaN ;
"-" 运算符:减法数字相减
"*" 运算符:乘法
"/" 运算符:除法(不会取整)10/3 => 3.333333333
"%" 运算符:取余,取模10%3 => 1 ;(符号和前面的数一致);-10%3 =>-1;
"++"自增运算符:
var a = 10;a++;=>11

例:var a =10;var b = a++;=> a=11; b=10; a++   

变量a的值11;    

  表达式的值:永远是自增之前的值10;

例2:var a =10;var a = a++;=> a=10;

"--"自减运算符:
**2.赋值运算符 . 复合赋值运算符**
=   +=    -=   *=   /=   %=

**3.比较运算符:**
**== 比较俩个数是否相等**


如果比较的俩个数据的类型不同,他们都要想办法转成数字;如果一边是对象,一边是基本类型:   

   1.首先调用这个对象的valueOf(),看这个方法的返回值是否是基本类型          如果是基本类型,则用这个返回值和另一边相比;   

   2.如果返回的不是基本类型,调用toString(),

使用这个方法的返回字符串和另一边比较字符串 : 

 字符串里有数字的转换为数字;

只要有一个非数字,就是NaN;

**对象与对象比较,**

*不管是==还是===,比较的是俩个对象的地址值是否相等,

如:var a = [];  

 var b = []; 

  alert(a==b)  

 =>false;

**undefined=>转成数字=>NaN;
null=> 转成数字 => 0;
特殊:

1. null虽然转成数字是0,但他和其他的任何非 null 都不相等
2. NaN !=NaN ;
3. null和undefined是相等的;

**===  全等**
先看类型,如果类型不同,直接false ,如果类型相同,再比较内容;

**2.逻辑运算符******
! 逻辑非   true 变false 

  false 变true ;(结果必是布尔类型)
&& 逻辑与   有一个是false ,结果就是false;       

​     短路:第一个操作数的结果是false ,所以最终结果就是false,就不会去执行之后的代码;

例:var a = 2;

var b = 3;

var c = a > b && a++ > b++;c

onsole.log(c , a , b);

=> false     2     3 
|| 逻辑或   有一个是true ,结果就是true ;      

​      短路:第一个操作数的结果是true,所以最终结果就是true,就不会去执行之后的代码;

**逻辑与和逻辑或的特点:**

参与运算的可以是任何的类型,结果也可以是任何类型;

如果第一个能决定结果,则结果就是第一个数据,否则就是第二个数据;

console.log("0" || undefined );

=> "0" console.log("0" && undefined );

=> undefined ;

console.log("" && undefined );

=>""

**3.三元(目)运算符:**

表达式1 ? 表达式2 : 表达式3;

表达式1运算结果为ture或相当与true  执行表达式2;表达式1运算结果为false或者相当与false  执行表达式3

**4.逗号运算符:**
var a =(1,2,3);alert(a);=>3

​	

### 第二章  语句

一.语句和程序结构          程序流程控制     顺序结构     选择结构     循环结构
二.if条件语句
if(表达式){    //代码;}else{    //代码2;}
三.switch语句
switch(表达式)

{   

case 1:语句1  

 break;  

 case 2: 语句二   

break;  

 case 3: 语句三  

 break;  

 default:语句四  

 break;

}

四.for 循环
for(表达式一;表达式二;表达式三)

{   

​	 //循环体

}
表达式一: 仅仅是用来初始化一些数据;一般是用来初始化循环变量;
表达式二: 是一个布尔值,根据他的true 或 false 来决定是否执行循环体;
表达式三: 一般都是用来控制循环变量的自增或者自减;

> 注:1.三个表达式都可以省略,但俩个;不能省略

2.第二个表达式如果没写,表示true;
3.如果for 循环的循环体只有一行代码(以;作为界限),大括号可以省略

五.while

while(循环执行的条件)

{   

​	 //循环体

}

> 注:1.如果循环执行的次数确定,比较适合用for 
> 2.如果执行的次数不确定,比较用while
> 3.如果想至少执行一次,用do  while;
> 4.while中的条件不能省略
> var i = 0;while( i<10 ){    console.log(i);     i++;}
> 6.do while 先执行一次循环,然后在去判断循环条件;
> var i=0;do{   console.log(i);   i++;}while(i<0);



### 第三章  函数



**1.1 函数的概念**

函数就是把完成特定功能的一段代码封装起来。给该功能起一个名字（函数名）。哪里需要实现该功能就在哪里调用该函数。函数可以在任何时间任何地方调用。函数是完成某一功能的代码段函数是可重复执行的代码段函数方便管理和维护,便于复用
1.2 函数的作用

使程序变得更简短而清晰有利于程序维护可以提高程序开发的效率提高了代码的重用性(复用性）1.函数的定义(声明)

function 函数名(形式参数,形式参数2)

{     

​	//函数体  

   return 返回值;

}
foo = function(){       

//函数表达式,不是函数声明,所以不会声明提前; 

   //函数体

}

注意:

1.函数名命名规则:遵循驼峰命名法;

2."形式参数"是可选的 可以有也没有没有;

3.函数声明之后,不会自动执行函数体的代码,只有在被调用时,才会执行;

4.和声明变量一样,也会提前;

5.return可以出现在函数的任何位置,一旦碰到return,则这个返回return后的值,然后函数会立即结束;

6.如果一个函数没有 return 语句或者有return语句但是没有返回值,那么函数执行结束的时候,会自动的返回一个undefined;

7. 注意：声明函数时，如果后定义的函数名与前面定义的函数名重复了，则后定义的会覆盖前定义的8.在js中,函数调用时候的参数传递,永远是值传递;

**例1:**

function print(){   //声明函数print();   

  for(var i=1;i<=100;i++){       

   console.log(i);    

 }}

print();                              //调用函数;

**例2:**

//声明一个函数,这个函数可以判断一个指定的数字是否为质数;
function isPrime(num){     

​    for(var i=2;i<num;i++){    

​      if(num%i==0){        

​      return false;     

​     }   

  }  

  return true; 

}
if(isPrime(10)){        

​               //调用的时候,传递数据,称为实际参数(实参);  

   console.log(num+"是质数");

}else{     

  console.log(num+"不是质数");    

​      }      

**例3:   **

//定义一个函数,这个函数可以计算俩个数之间的所有的质数的和;

 (调用了上面的isPrime函数);

function add(a,b){     

​    var sum = 0;   

​     for(var i=a;i<=b;i++){     

​       if(isPrime(i)){        

​           sum+=i;         

​            }     

​       }       

​     return sum;}

alert(add(3,7))

**例4:**//声明一个函数,用来计算俩个数之和;

function add(a,b){  

   var sum = a+b;  

  return sum;

}

alert(add(10,20));

**例5:**var num=parseInt(prompt("请输入一个数计算其阶乘:"));

//用户输入数字num;
alert(num+"的阶乘为:"+jiechen(num));                //调用阶乘函数;
function jiechen(num){                                //定义阶乘函数   

​     var sum = 1;    

​    for(var j=num;j>0;j--){     

​       sum*=j;      

  }    

​    return sum;}



> 实参和形参
> 在函数声明括号里的是形参;在调用函数括号里的是实参;
> 注意:实参和形参的数量可以不一致:     1.如果在调用函数的时候,没有给形参赋值,则形参的值就是 undfined      2.实参是按照顺序给形参赋值的;
>

**局部作用域**函数内部

**局部变量:只能在函数内部使用;(for循环内部的变量也是全局变量)****        

 局部变量也会声明提前**如:for(var i =0;i<10;i++);  //i 是全局变量;

当for循环结束后

i=10;console.log(i)

输出的是全局变量i;

console.log(i);=>10;

**全局变量**
function foo(){     a = 20;    

 console.log(a);}

foo();

console.log(a);=> 20; 20;

原因:如果在声明变量的时候,没有使用var ,这个变量就会自动变为全局变量;解决方案: 在<script></script>的最头上写上 "use strict"  (双引号不能少); 

严格模式
var foo=3;          //声明了一个变量并赋值;

foo();               //foo已经成为一个数字3;不再是一个函数了;

function foo(){      //声明一个函数

foo()  

   console.log("a);}

=> 报错,foo not a function

> **递归**
> 函数的递归调用:recursive 在一个函数的内部调用自己
> 注意:    

 1.递归调用一定要有结束条件;   

  2.必须要能够到达结束条件;

递归案例：

计算一个数的阶乘`<script type="text/javascript">` 

   function jieCheng (num) {     

   if(num == 1){     `//结束条件;`        

​    return 1;     //遇到return 跳出函数`  

​      }
​          //递归调用
​        return jieCheng(num - 1) * num;
​    }
​    alert(jieCheng(6));

</script>`

递归案例：计算斐波那契数列数列
function add(n){  

  if(n==1||n==2){      //前俩项都要为1;   

​     return 1;    }  

  return add(n-1)+add(n-2);      //递归调用  第n项 = 前一项+前前项}

alert(add(8));

**匿名函数**

匿名函数是指没有函数名的函数。
创建匿名函数:
把匿名函数赋值给变量f变量f是存储在栈内存中,函数对象是存储在堆内存中,将f = function 实际是将函数对象的地址值赋值给f

var f = function(){

alert("我是匿名函数");

}//我们可以把变量f当成一个函数名来调用;

f();       //调用上面定义的匿名函数;
**注:赋值给变量的函数只能在函数内部使用:**如var f1 = function f2(){     console.log("a");}f1();f2();=> a   =>  f2 is not defined
**匿名函数自执行(匿名函数立即执行):**
(function(){    

 alert("我是自动执行的函数");}

)();

或者:(function(){    

 alert("我是自动执行的函数");

}());

### 第四章  数组

**栈内存(stack memory):** 存储变量和基本类型的值;

**堆内存(heap memory):**** **存储所有的对象********

**数组的特点:**

1.有序可重复的列表;

2.长度可以动态的改变;

3.同一个数组中存储的元素的类型不唯一

**1.创建Array数组**注：

Array 也是Object类型 所以创建方式也是和Object一样，有new 和字面量方式
1.new 关键字创建数组(构造函数创建 )var box = new Array();          //创建了一个数组

；var box = new Array(10);        //创建了一个包含10个元素的数组；（）必须是数字，必须写一位

var box = new Array(10,20)      //创建一个数组并分配好元素;

var box = new Array('王先生','22','学生'); //创建了一个数组并分配好了元素；

**注:在用构造函数创建数组对象的时候,如果传递的是只有1个正int (0就是空数组),那么这个int就被当成数组的长度处理,而不是数组处理;如果传递的是一个浮点数或者负数,报错.**

2.以上3种方法都可以忽略关键字newvar box = Array();

3.使用字面量方式创建数组；var box = [];                     //创建一个空的数组；

var box = ['王先生','22','学生'];  //创建了一个包含元素的数组；

**2.使用索引下标来读取数组的值**

alert(box[2]);              //获取第三个元素；

box[2]='学生';                 //修改第三个元素；

box[4]='软件专业';            //添加第五个元素；
例：var box = [];          

​    box[0]='王先生';                //如果是索引下标，就会在数组上体现出来

box[1]=22;alert(box);

=>  王先生，22
而：var box = [];bo['name']='王先生';    

​     box['age']=22;           

​       alert(box);=>  空； //如果是字符串下标，不会体现在数组上，而是要单独的拎出来；

如：var box = [];

box['name']='王先生';      

 box['age']=22;alert(box.name);

=>王先生,22
注: 如果通过下标去访问数组,下标的索引值超出我们定义的数组长度,则返回undefined

**3.使用length属性来获取数组元素的量**

var box = [1,2,3];alert(box.length);

=>3
也可以用length 强制数组的长度   以逗号扩展补充；
var box = new Array('王先生',22);

alert(box.length);

box.length=10;

alert(box.length);
先弹出2  后弹出10；

若此次alert(box);

=>   王先生，22，，，，，，，，，  会多出8个,

**4.数组的检测:**
使用instanceof运算符。

使用Array.isArray(arr) 方法。

var a = [];

1.使用 instanceof来检测;

console.log(a instanceof Array);

2.Array.isArry(数据)

console.log(Array.isArray(a));

**5.数组的遍历**
1.使用普通for循环遍历数组
`var arr = [50, 20, 10, 5, 15, 6];     

  for(var i = 0; i < arr.length; i++){ 

   //数组长度多长，就遍历多少次。  循环变量作为数组的下标
  console.log(arr[i]);

}`
2.使用 for...in 循环遍历数组(输出的是数组的下标)

var arr = [50, 20, 10, 5, 15, 6];// 每循环一轮，都会把数组的下标赋值给变量index，然后num就拿到了每个元素的下标。

 //注意:这里index是元素的下标,不是与元素

//对数组来说，index从从0开始顺序获取下标

  for (var index in arr) { 

 console.log(num);  //循环输出： 0 1 2 3 4 5

  }                    //这里var 关键字也是可以省略的，但是不建议省略。

  for(i in arr){

 console.log(arr[i]);```

`  }`
3.使用 for ...of 循环变量数组(输出的是数组中的元素)

**注: for..of 只能读取数组中的元素,不能去修改数组中的元素**

var arr=[10,20,30,40];

for(var x of arr){ 

 console.log(x);

}

=> 10,20,30,40

4.使用 arr.forEach()
var arr = [10,20,30,40];

arr.forEach(function(e,i,self){   

​     //数组有多少的长度,函数就调用多少次,参数e就是数组中的每一个元素,i就是数组下标,self数组本身    console.log(e,i);                 

​         })

=> 10,20,30,40   => 0,1,2,3   =>输出4次[10,20,30,40]



**6.查找字符串**
**1.arr.indexOf(item,start);**

arr.indexOf(item);

从前面开始向后查找item,返回查找到的第一个item的位置(也就是下标);
arr.indexOf(item,start);

start支持负数,-1最后一位,-2倒数第二位;

从start位置开始向后查找item,返回查找到的第一个item的位置(也就是下标);
若item不存在,则返回-1;

**2.arr.lastIndexOf(item);**从最后先前查找item,返回查找到的第一个item的位置(也就是小标);

arr.lastIndexOf(item,start);

从start位置开始向前查找item,返回查找到的第一个item的位置(也就是下标);

若item不存在,则返回-1;

**7.数组的排序**
冒泡,插入,选择,归并,希尔,快速排序

**冒泡算法:**

var arr = [10,20,100,200,150,40,70,80,100];

for(var i=0;i<arr.length-1;i++){          

​     //控制循环的次数;

for(var j =0;j<arr.length-1-i;j++){  

​       //控制数组的相邻的俩项比较的次数,i越大,比较的次数应该越小;  

   if(arr[j]>arr[j+1]){           

​         //相邻的俩项比较;     

​     var temp = arr[j];           

​         //定义一个新的数用来盛放大的那一项;   

​       arr[j]=arr[j+1];             

​           //将小的那一项放到前面;    

​      arr[j+1]=temp;               

​               //将大的那一项放到后面;    

 }   

  }}

document.write(arr);   //从小到大输出;(若要从大到小,将if里的大于号改为小于号)

### 第五章 字符串

**1.创建字符串**在JS中,有俩种字符串基本类型的字符串对象类型(引用类型);

1.基本类型的字符串: 1.使用字符直接量     var s = "abc";

 2.使用String()转换函数   

  var s = String(123);

2.对象类型:  通过关键字new配合String()构造方法  

   var s = new String("abc");     

=>返回类型object
**2.字符串相关方法**


**1.stringObject.charAt(index);********

作用:返回指定位置的字符;**
index必需,表示字符串中某个元素的位置,即下标;

返回值:index下标的位置上的字符串,即长度为一;

**2.stringObject.charCodeAt(index);********

作用:返回指定位置的字符的Unicode编码;**

返回值:index下标的位置上的字符的Unicode

编码拓展:根据一个编码,得到编码对应的字符:     var c1 = String.fromCharCode(33333);    

 console.log(c1);

unicode编码范围：

汉字：[0x4e00,0x9fa5]（或十进制[19968,40869]）

数字：[0x30,0x39]（或十进制[48, 57]）

小写字母：[0x61,0x7a]（或十进制[97, 122]）

大写字母：[0x41,0x5a]（或十进制[65, 90]）
**3.字符串连接方法**

1.stringObject.concat(s1,s2);

作用:将俩个或字符串连接;返回值:s1+s2的新字符串;对原字符串无影响
2.直接使用+连接

**4.查找字符串出现的位置**


stringObject.indexOf(string,start);

返回值:要查找的子字符串中的第一个字符的位置(下标);
string:字符串中的子字符串(要查找的子字符串)

start 可选参数  指定从start位置开始查找(下标),没写时默认为0

**5.截取字符串**
**stringObject.substring(start,end);**


作用:提取字符串中介于俩个指定下标之间的字符;返回值:提取的子字符串;

对原字符无影响;

start:必须,非负整数, 子字符串的第一个字符在字符串中出现的位置(下标);

end: 可选参数  ,非负整数,要截取到的子字符串的最后一个字符的位置.

没写返回的子串一直到字符串的结尾;
**stringObject.substr(start,len);**


作用:提取字符串中指定下标开始,指定数目的字符;返回值:提取的子字符串;

对原字符串无影响;

start:必须,非负整数, 子字符串的第一个字符在字符串中出现的位置(下标);len:可选参数,非负整数,没写返回的子串一直到字符串的结尾;

**stringObject.slice(start,end);**


作用:提取字符串中介于俩个指定下标之间的字符;(和substring()方法一样,slice()允许负值)返回值:提取的子字符串;

对原字符无影响;

start: 必须,可为负数, 子字符串的第一个字符在字符串中出现的位置(下标); 

   -1最后  -2 倒数第二

end  可选参数, 如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。

**6.大小写转换**

**stringObject.toUpperCase();**

作用:将字符串中所有的字符都转为大写;

var s ="abcDFE";alert(s.toUpperCase());

=>ABCDFE

**stringObject.toLowerCase();**小写;

**7.去除字符串首尾空白字符**

**stringObject.trim();**

只是**去除字符串的首尾的所有空白字符**. 字符串内部的空白字符不做任何处理

var s = "\n \t ABC  abc  \t  \n";

alert(s.trim());

=>ABC  abc
**8.字符串替换,匹配,搜索方法**


**stringObject.replace(regexp/substr,replacement);**

作用: 用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串原字符串不改变   若是普通字符串只替换第一个;

第一个参数: 必需,一个与正则表达式匹配的子串或者指定的子串;

第二个参数: 必需,一个字符串值,要替换的文本或生成替换文本的函数;
**stringObject.match(匹配值);**


使用match( ) 方法获取匹配数组；

**返回的是匹配到的数据,若没有也是和exec一样,返回null;**

**9.字符串的比较**
== 作用:比较俩个字符串的内容是否相等,相等返回true;

var s = "abc";var s2 = new String("abc");

=>true

虽然一个是基本类型的字符串,一个是引用类型的字符串,但内容相同,所以相等;

=== 恒等作用:只有俩个字符串的内容和类型相等才会返回true;

stringObject.localCompare(other);

如果字符串在字母表中应该排在字符串参数之前，则返回一个负值；

如a在b之前;

+
如果字符串的等于字符串参数，返回0；

如果字符串在字母表中应该排在字符串参数之后，则返回一个正数；

 var arr = ['abc','bc','dfe','abd']

 var arrNew = arr.sort(compare); 

function compare(a,b){  

   return a.localCompare(b);    

 }

### 第六章 数组及字符串方法总结

**2.增删改(栈方法)**

**栈方法****push()  和pop()后进先出，最后进去的元素最先出来***FILO (先进后出)* **；**

******通过push()方法给数组添加一个元素或者多个元素，再通过pop()方法移出最后的元素

；pop()方法时,如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。

**var box = ['王先生',22,'上饶']

alert(box.push('德兴','男'));                    //给数组末尾添加了N个元素，并返回数组最新长度

；alert(box);=>5     =>王先生，22，上饶，德兴,男    

   var box = ['王先生',22,'上饶']alert(box.push('德兴'));           

​         alert(box);alert(box.pop());                          //移除数组最后的元素，并且返回移除的元素；

alert(box);

=> 4    =>王先生，22，上饶，德兴    

=>德兴     =>王先生，22，上饶

**3.队列方法****shift()**

**先进先出，最先进去的元素最先出来** *特点：FIFO(先进先出)***；***

*给数组的末端加入元素，从数组的前端移出元素**通过push()方法给数组添加一个元素，再通过shift()方法移出第一个的元素；

var box = ['王先生',22,'上饶']

alert(box.push('德兴'));                    //给数组末尾添加了N个元素，并返回数组最新长度；

alert(box);=>4     =>王先生，22，上饶，德兴     

  var box = ['王先生',22,'上饶']

alert(box.push('德兴'));        

​            alert(box);alert(box.shift());                          //移除数组第一个元素，并且返回移除的元素；

alert(box);

=> 4    =>王先生，22，上饶，德兴    =>王先生     =>22，上饶，德兴

**4.unshift()**

**给前端添加一个元素，并且返回最新的长度；**

var box = ['王先生',22,'上饶'];

alert(box.unshift('德兴'));

alert(box);

=>4   

​     => 德兴，王先生，22，上饶

注：对于IE浏览器 ，总返回undefined ,而不是数组新长度

**5.重排序方法***

*逆向排序reverse() 和 从小到大排序sort() reverse()

**var box = [1,2,3,4,5];

alert(box.reverse());     

​    //逆向排序，返回排序后的数组

；alert(box);=>5,4,3,2,1   

​     =>5,4,3,2,1      

   原数组也被逆向排序了，说明是引用

**sort()**

例1：

var box = [5,4,3,2,1];

alert(box.sort());    

​      //从小到大排序，返回排序后的数组；

alert(box);

=>1,2,3,4,5 

   =>1,2,3,4,5      

  //原数组也被逆向排序了，说明是引用

例2：var box = [0,1,5,10,15];

alert(box.sort());

alert(box.reverse());

=>0,1,10,15,5   

  => 5,15,10,5,1,0       
语法: arrayObject.sort(方法函数);

如果没有指定方法函数,则直接就按unicod的码排序用,若有 方法函数,就按方法函数所指定的排序方法排序;

​     arrayObject.sort(Math.method);

注意: 该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：
  若返回值<=-1，则表示 A 在排序后的序列中出现在 B 之前。 

 若返回值>-1 && <1，则表示 A 和 B 具有相同的排序顺序。  若返回值>=1，则表示 A 在排序后的序列中出现在 B 之后。

如下俩个例,指定方法函数 compare() 从小到大或从大到小;

例3：

function compare(n,m){  

 return n-m;              //从小到大,若要从大到小,也可以 m-n;

}
var box = [0,1,5,10,15];

alert(box.sort(compare));     

​       //正向排序alert(box.reverse());          

​      //正向排序之后，再用逆向排序，就可以达到从大到小的效果；

=>  0,1,5,10,15        =>  15,10,5,1,0

 **还可以按照数组内字符串的长度进行比较;**

var box = ['qew','qwer','q','sdfd','qowpelk'];

alert(box.sort(compare));

function compare(a,b){  

​    return a.length-b.length;} 

=>//字符串长度长的在后面
**可以利用随机数的配合达到打乱数组的效果** 

   var arr= [1,2,3,4,5,6,7,8];  

​      function upset(arr){       

​     arr.sort(campare);       

​     function campare(a,b){      

​          return 0.5-Math.random() ;      

​      }      

​      return arr;     

   }      

  alert(upset(arr));



**6.操作方法**

**1.concat()**

*基于数组1，再创建一个比数组1多N个或者少了N个元素的数组2；**
var box1 = [1,2,3,4];

var box2 = box1.concat(5);      

​    //创建新数组，并添加新元素alert(box2);            

​           //输出新数组alert(box1);             

​           //当前数组1并没有变化

=> 1,2,3,4，5        

​      =>1,2,3,4
**也可以用于数组链接;**

var box1 = [1,2,3,4];

var box2 = [5,6,7,8];

var box3 = box1.concat(box2);     //直接讲数组二添加到数组一后面

alert(box3);            

​          //输出新数组alert(box1);              

​         //原数组没有改变

=> 1,2,3,4,5,6,7,8   

   => 1,2,3,4

**2.slice()****基于数组1，获取指定区域元素并创建一个新数组2；**(只允许从前往后切,不允许从后往前,即end 要大于 start)**

arrayObject.slice(start,end);

![533299680001637b05160145.jpg](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/533299680001637b05160145.jpg?raw=true)

**var box1 = [1,2,3,4,5];

var box2 = box1.slice(1);     

​     //指定从数组1的第一个位置（也就是2）开始；

alert(box2);            

​            //输出新数组；

alert(box1);               

​          //当前数组1没有变化；

=>2,3,4，5     

​       => 1,2,3,4，5
若是 var box2 = box1.slice(1,3);      

   //指定从数组1的第一个位置（也就是2）开始，到第三个位置（也就是4，不包裹4）结束；

=>   2,3

**注意：**

1. 可使用负值从数组的尾部选取元素。

   ​

2. 如果 end 未被规定，那么 slice() 方法会选取从 start 到数组结尾的所有元素。

   ​

3. String.slice() 与 Array.slice() 相似。**若 start 和 end 都没写,则复制一份原数组****var box2 = box1.slice();

   ​

   3.splice()**splice()方法与concat()和slice()都不同，它会对原始数组产生改变；

   splice()中的删除功能：

var box1 = [1,2,3,4,5];

var box2 = box1.splice(1,3);   

​    //指定从数组1的第一个位置（也就是2）开始，取3个元素（与slice不同）;

alert(box2);                 

​      //输出新数组（被切了的元素为新数组）

alert(box1);                       //将原数组中的234删除，并返回（与concat和slice都不同）

=>  2,3,4              =>1,5
2.splice()中的插入功能：
var box2 = box1.splice(1,0,6);    //指定从数组1的第一个位置（也就是2之前）开始，截取0个元素，并插入元素6；

alert(box2);                      //输出被切了的元素

alert(box1);                      //输出操作过后的数组1

=>  空      =>1,6,2,3,4,5    

3.splice()中的替换功能：

var box2 = box1.splice(1,1,6);    //指定从数组1的第一个位置（也就是2）开始，截取1个元素，并替换成元素6；

alert(box2);                      //输出被切了的元素

alert(box1);                      //输出操作过后的数组1

=>  2      =>1,6,3,4,5    

**4.join()**

join()方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。

我们将使用分隔符来分隔数组中的元素，代码如下：

`<script type="text/javascript">

  var myarr = new Array(3)
  myarr[0] = "I";
  myarr[1] = "love";
  myarr[2] = "JavaScript";
  document.write(myarr.join("."));
</script>
`**运行结果：**I.love.JavaScript

**5.split();**字符串分隔;

stringObject.split(separator,limit);

语法:将**一串字符串**从指定位置以指定符号或者字符,正则表达式分隔为一个字符串数组;     返回的是一个字符串数组,该数组内不包含指定符号或者字符,正则;

**注意：**如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。

例1:var scoreStr = "小明:87;小花:81;小红:97;小天:76;小张:74;小小:94;小西:90;小伍:76;小迪:64;小曼:76";

var score1 = scoreStr.split(";");              //分隔为"名字:分数"的形式;

alert(score1);

=>小明:87 小花:81 小红:97 小天:76 小张:74 小小:94 小西:90 小伍:76 小迪:64 小曼:76 

 例2:

var array = ["Hellow! World!"];alert(array.split(""));               //每个字符之间都被分隔;

alert(array.split("",5));             //每个字符之间都被分隔,并定义分隔次数;

alert(array);

=> H,e,l,l,o,w,!,W,o,r,l,d,!    

​    => H,e,l,l,o 

   =>Hellow! World!

**6.substr();**提取字符串;stringObject.substr(startPos,length);

语法:提取开始的位置(下标), 提取字符的长度;

![2345_image_file_copy_1.jpg](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/2345_image_file_copy_1.jpg?raw=true)

注意：**如果参数startPos是负数，从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。

如果startPos为负数且绝对值大于字符串长度，startPos为0。

例:

var array = [1,2,3,4,5];alert(array.substr(1,3));      //从下标为1(也就是2)开始提取,3个字符

alert(array.substr(1));        //省略长度,则一直到结尾;

alert(array);                   //提取完之后对原数组没有影响;

=>2,3,4       =>2,3,4,5               =>1,2,3,4,5

**7.substring();**

提取字符串;array.substring(startPos,stopPos);

语法:提取开始的位置(数组的下标),到结束的位置(数组的下标)的字符;

![2345_image_file_copy_2.jpg](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/2345_image_file_copy_2.jpg?raw=true)

注意：

**1. 返回的内容是从 start开始(包含start位置的字符)到 stop-1 处的所有字符，其长度为 stop 减start。

2. 如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。

3. 如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。

   例:

   var array = [1,2,3,4,5,6];alert(array.substring(1,4);            //提取从下标为1(也就是2)到下标为4(也就是5)的字符串;

   alert(array.substring(1));             //提取从下标为1(也就是2)到结尾的字符串;

   alert(array);                         //原数组不改变;

   => 2,3,4,5        =>2,3,4,5,6     =>1,2,3,4,5,6

   ​

**8.toString()**     把数组转换为字符串并且用,隔开;



### 第七章 BOM

**window对象是BOM的核心;指当前浏览器的窗口;**

![Image(12).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(12).png?raw=true)

*1.window对象的方法:**

![Image(13).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(13).png?raw=true)

1.alert();()里可以放字符串,数字等等;
2.prompt(xx,默认值);
var age = prompt('请输入您的年龄',18);alert(age);=>18;
3.confirm();
var isOk = confirm('您确定要退出吗?');alert(isOk);=>true/flase;
4.console.log();
**2.window窗口大小**
**3种方法获取浏览器的窗口大小**
​     1.IE9+ Chrome FF Opera Safari 下          window.innerHeight             浏览器窗口的内部高度          window.innerWidth              浏览器窗口的内部宽度     2.IE 5 6 7 8 下(Chrome和FF也行)          document.documentElement.clientHeight            document.documentElement.clicentWidth     3.兼容写法           window.innerHeight || document.documentElement.clientHeight                     window.innerWidth  || document.documentElement.clicentWidth
**调整窗口大小****     (Chrome和FF以禁用)**     window.resizeTo(w,h);     调整到指定的大小;     window.resizeBy(w+,h+);   增加指定的窗口宽高;  
**3.打开窗口    **  
​     open(URL,name,features)方法用于打开一个新的浏览器窗口或者查找一个已命名的窗口
​     ![Image(14).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(14).png?raw=true)

例:     打开育知同创的官网,以新的窗口显示,窗口大小400px,400px.   

  var btn = document.getElementById("btn");
var btn1 = document.getElementById("btn1");
var w = "";
btn.onclick=function(){
​     w= window.open("http://www.yztcedu.com", "_blank","width:400px;height:400px;");
};

btn1.onclick=function () {
​    w.close()               //关闭窗口}

**4.history();**
history对象记录了用户曾经浏览过的页面(URL),并可以实现浏览器前进与后退相似导航的功能.
**注意:从窗口被打开的那一刻开始记录，每个浏览器窗口、每个标签页乃至每个框架，都有自己的history对象与特定的window对象关联。**
语法:
window.history.[属性|方法]
**(注:window可以省略);**
history 对象属性:length         返回浏览器历史记录列表中的URL数量;

![Image(1).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(1).png?raw=true)
history 对象方法:

![Image.png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image.png?raw=true)

**back()方法** ,加载history列表中的前一个URL;
语法:window.history.back();等价于: window.history.go(-1);
**forward()方法**,加载history列表中的下一个URL;如果倒退之后,再想回到倒退之前的浏览的页面,则可以用forward()方法;
语法:window.history.forward();等价于: window.history.go(1);
**go()方法,**根据当前所处的页面,加载history列表中的某个具体的页面;
语法:window.history.go(number);
参数:

![Image(2).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(2).png?raw=true)

浏览器中，返回当前页面之前浏览过的第二个历史页面，**代码如下：**`window.history.go(-2);
`**注意：和在浏览器中单击两次后退按钮操作一样。**
同理，返回当前页面之后浏览过的第三个历史页面，**代码如下：**window.history.go(3);

**5.location对象**location用于获取或设置窗体的URL,并且可以用于解析URL.
端口号范围:1-655351-1024被占用80 http 默认端口url:     协议://主机名:端口号/资源路径?查询参数(如username=lisi)
语法:location.[属性|方法];
location 对象属性图示:

![Image(3).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(3).png?raw=true)



location 对象属性:



![Image(4).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(4).png?raw=true)

location对象的方法:

![Image(5).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(5).png?raw=true)

例:获取当前页面完整的href :
var a = window.location.href;alert(a); 

![Image(6).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(6).png?raw=true)

例2:var msg = "协议:" + location.protocol+ "<br> 主机:" + location.host;p.innerHTML = msg;=>协议: http:  主机: localhost:63342 **6.navigato 对象**Navigator 对象包含有关浏览器的信息，通常用于检测浏览器与操作系统的版本。
对象属性:

![Image(7).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(7).png?raw=true)

查看浏览器的名称和版本，**代码如下:**<script type="text/javascript">

   var browser=navigator.appName;

   var b_version=navigator.appVersion;

   document.write("Browser name"+browser);

   document.write("<br>");

   document.write("Browser version"+b_version);

</script>
**userAgent:**navigator 对象的属性 userAgent****返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
**语法**`navigator.userAgent
`几种浏览的user_agent.，像360的兼容模式用的是IE、极速模式用的是chrom的内核。

![Image(8).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(8).png?raw=true)
使用userAgent判断使用的是什么浏览器(假设使用的是IE8浏览器),**代码如下:**function validB(){ 

  var u_agent = navigator.userAgent; 

  var B_name="Failed to identify the browser"; 

  if(u_agent.indexOf("Firefox")>-1){ 

​      B_name="Firefox"; 

  }else if(u_agent.indexOf("Chrome")>-1){ 

​      B_name="Chrome"; 

  }else if(u_agent.indexOf("MSIE")>-1&&u_agent.indexOf("Trident")>-1){ 

​      B_name="IE(8-10)"; 

  }

​    document.write("B_name:"+B_name+"<br>");

​    document.write("u_agent:"+u_agent+"<br>"); 
} 
运行结果:![Image(9).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(9).png?raw=true)

6.screen对象
screen对象用于获取用户的屏幕信息;
语法:window.screen.属性;可省略window对象的属性:

![Image(10).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(10).png?raw=true)

例1:获取屏幕宽度高度:**注意:**

1.单位以像素计。

2. window.screen 对象在编写时可以不使用 window 这个前缀。

我们来获取屏幕的高和宽，代码如下:`<script type="text/javascript">
  document.write( "屏幕宽度："+screen.width+"px<br />" );
  document.write( "屏幕高度："+screen.height+"px<br />" );
</script>
` 
例2:获取屏幕可以宽度高度(注:一般宽度和屏幕宽度一样,高度=屏幕高度-任务栏高度);**注意:**不同系统的任务栏默认高度不一样，及任务栏的位置可在屏幕上下左右任何位置，所以有可能可用宽度和高度不一样。

我们来获取屏幕的可用高和宽度，**代码如下：**`<script type="text/javascript">
document.write("可用宽度：" + screen.availWidth);
document.write("可用高度：" + screen.availHeight);
</script>
`**注意:根据屏幕的不同显示值不同。**



### 第八章  DOM

**一.DOM  **  文档对象模型DOM（Document Object Model）定义访问和处理HTML文档的标准方法。

![Image(15).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(15).png?raw=true)

DOM 将HTML文档呈现为带有元素、属性和文本的树结构（节点树）。
**HTML****文档可以说由节点构成的集合，DOM节点有:

1. 元素节点：**上图中<html>、<body>、<p>等都是元素节点，即标签。**

2. 文本节点:**向用户展示的内容，**

   **如<li>...</li>中的JavaScript、DOM、CSS等文本,即标签内部的纯文本.

   3.属性节点:**元素属性，**

   **如<a>标签的链接属性href="http://www.imooc.com",即标签的属性.**

   **document节点是每个文档的根节点document节点下面只有一个 html节点，我们称之为**文档元素**。(documentElement)

文档元素是文档的最外层元素，其他元素都包含在文档元素中。

一个文档只能有一个文档元素，在html中文档元素永远是 `<html>`元素。在DOM树中，html文档中每一处标记都可以用树中的一个节点来表示。
html(元素)标签，通过元素节点表示属性，通过属性节点来表示文档类型，通过文档类型节点来表示注释，通过注释类型来表示

经常用到了比较重要的节点：**(记住每个节点的数字值)**元素类型NodeType**元素**1属性2文本3注释8文档9******二:节点的特点:**每一个节点都有三个特点:     1.nodeName      节点名称(只读)     2.nodeValue     节点值(设置或返回节点的值)   

  3.nodeType      节点类型
**nodeName**：节点名称(nodeName 始终包含 HTML 元素的大写字母标签名) nodeName 是只读的元素节点的 nodeName 与标签名相同属性节点的 nodeName 与属性名相同（元素.getAttributeNode(“属性名”)获取属性节点）文本节点的 nodeName 始终是 #text（通过元素的子节点获取）注释节点的nodeName是#comment（通过元素的子节点获取）文档节点的 nodeName 始终是 #document**nodeValue**：节点值 （设置或返回节点的值）元素节点的 nodeValue 是 undefined 或 null属性节点的 nodeValue 是属性值文本节点的 nodeValue 是文本本身注释节点的nodeValue是注释里面的内容文档节点的nodeValue 是null**nodeType**：节点类型元素 element 1属性 attr 2文本 text 3注释 comments 8文档 document 9例:<body>     <p id = "p" class = "abc">您好</p>     <script>          var p = document.getElementById('p');          p.nodeName      P            p.nodeValue     null          p.nodeType     1     元素节点          var text = p.firstChild;          text.nodeName     #text          text.nodeValue     您好          text.nodeType     3     文本节点          var attrNode = p.getAttributeNode("id");          attrNode.nodeName     id          attrNode.nodeValue     p          attrNode.nodeType     2     属性节点**二.查找元素:**
​     1.根据 id 来获取到元素节点     2.根据标签名来获取页面查找不到元素如何解决?1.将<script></script>移后(甚至可以移到html标签之外);2.给<script>中的所有语句用window.onload=function(){}这个函数包住;这里面放的是等网页内的所有元素加载完之后再执行的代码;
**1.通过Id名获取:********IE5以下不兼容**<div id="box"> <span>我是span</span> </div><script>  var box = document.getElementById('box');  alert(typeof(box));  正常浏览器显示:   [object HTMLDivElement];  IE6              [object]
 **当获取到了元素节点之后,我们可以访问它的一系列属性;********                               元素节点的属性**属性说明tagName获取元素节点的标签名innerHTML获取元素节点里的内容,非W3C DOM规范格式******alert(box.tagName);  //获取这个元素节点的标签名;**正常浏览器和IE下都是     DIV (大写);
**alert(box.innerHTML); //获取这个元素节点里的文本(包含HTML标签),类型为string**正常浏览器显示:    <span>我是span</span>IE                 <SPAN>我是span</SPAN>若要改变innerHTML(**要改变的值一定要放在.innerHTML之后**);  var num =5;  num="我是字符串";   num=true; ** var span = document.getElementById('span').innerHTML=num;     正确写法** alert(typeof(span));     //num是什么属性或者赋值给它的是什么属性, span就是什么属性; **var span = document.getElementById('span').innerHTML;****  span = num;                                                  错误写法******
​                                                    **HTML属性的属性**属性说明id元素节点的id名称title元素节点的title属性值styleCSS内联样式属性值classNameCSS元素的类

**2.根据标签名来获取**<body><p></p><div id = "box">     <p>abc</p>     <p>adc</p></div><ul>       <p>bcd</p>     <li class = "list">li 节点1</li>     <li class = "list">li 节点2</li>     <li>li 节点3</li></ul><form action="">     <input type="text" name ="user">     <input type="text" name ="user"><script>     //1.根据id来获取到元素节点     var box = document.getElementById("box");     console.log(box);     => <div id="box"></box>     //2.根据标签名     var lis = document.getElementsByTagName("li");     console.log(lis);     => 长度为3,子级为li 的一个数组     //3.根据类名来获取     var list = document.getElementsByClassName("list");     console.log(list);     => 长度为2, 子级为有list类名的元素 的一个数组     //4.根据 name 属性的值类获取属性     var users = document.getElementsByName("user");     console.log(users);     => 长度为2, 子级为有user的name名的元素 的一个数组     //5.document.querySelector   获取第一个       var p = document.querySelector("#box > p"); //box 这个 id 下的 p标签       console.log(p);     =><p>abc</p>        //6.document.querySelectorAll  获取满足选择器里的所有标签         var ps = document.querySelectorAll("#box > p");         console.log(ps);     =>长度为2的p 的一个数组          <p>abc</p>          <p>adc</p>
**三.Node关系,获取操作**   
**1.节点与节点之间的关系**父（parent）节点 父节点拥有任意数量的子节点子（child）节点 子节点拥有一个父节点兄弟（sibling）节点 同级的子节点被称为同胞（兄弟或姐妹）。同胞是拥有相同父节点的节点根 (root) 节点 一个文档只能有一个根节点。对html文档来说，根节点就是documentElement。根节点不可能有父节点![Image(16).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(16).png?raw=true)

var div = document.querySelector("div");var allNodes = div.childNodes;          //childNodes会把所有类型节点都获取到,包裹元素节点,文本节点(空格换行符等),属性节点;
但主要是为了获取元素节点(nodeType为1)      方法1:          for( var c in allNode){               if( c.nodeType ==1){                    document.write(c)                    }               }      方法2:          var allNodes = div.children;          //div的所有子节点(只有元素节点,不包裹文本等其他节点)          var count = div.childElementCount;     //div的所有子节点的个数 ,也可以之间用 allNodes.length;          var firstChild = div.firstElementChild;     //div的第一个元素节点          var lastChild = div.lastElementChild;          //div的最后一个元素节点          var secondChild = div.firstElementChild.nextElementSibling;     //div的第二个元素节点          var lastSecondChild = div.lastElementChild.previousElementSibling;     //div的倒数第二个元素节点          div == div.firstElementChild.parentNode;                              //div的第一个元素节点的父节点就是div本身          **注:若把 children 换为childNodes 以及把后面全部的Element去掉,则会选取所有类型的节点**

二:创建节点               1.创建一个div(元素节点)          var ele = document.createElement("div");     2.添加到body中          document.body.appendChild(ele); //添加到body的最后一个子节点之后; 
​     

![Image(17).png](https://github.com/LinDaiDai/JavaScript/blob/master/gitJavaScript/Image(17).png?raw=true)

​      3.创建一个text(文本节点)          var text = document.createTextNode("这个是文本节点");      4.添加到div中          ele.appenChild(text);



