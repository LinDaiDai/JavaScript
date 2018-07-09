## ES6



### 第一章:ES6简介

​	ECMAScript 简称ES6

​	由于ES6是在2015年发布的，所以也叫ES2015。



### 第二章:块级作用域

在ES5之前，是不存在块级作用域，在编程的时候很多时候会带来很多的不便，ES6新增了块级作用域，补足了这方面的缺陷。

1.块级作用域中没有了变量的声明提前

### 2.1 let声明

let声明语法和var 一样,不过let声明的变量只能在当前的代码块中,这是它也var 的最大区别.

```javascript
		let a = 10;
        if(a>0){
            console.log(b);		//报错
            let b = 5;		
            console.log(b);		//5
        }
        console.log(b);			//报错
```



### 2.2  const声明

在ES6使用const来声明的变量称之为常量,表示它们不能再次被赋值.

由于这个原因，所有的 const 声明的变量都必须在声明处初始化.

const声明的变量其实和let变量一样也具有块级作用域的特性.

```javascript
		let a = 10;
        if(a>0){
            console.log(b);	//报错
            const b=10;
            console.log(b);	//10
            b = 20;			//报错,不能重新赋值
            const c;		//报错,声明常量时要同时赋值
        }		
```



### 第三章:函数

#### 3.1 带默认参数的函数

```javascript
function foo(m=10,n=20){
  console.log(m,n)
}
foo(3,4)
=>3 4
//若调用foo时不传递参数,则会赋值默认的参数
foo()
=>10,20
```



#### 3.2 默认参数对arguments对象的影响

> 在非严格模式下,arguments的值总是和形参的值保持一致(也就是总能反映形参的变化).

```javascript
		function foo(a, b) {
        //非严格模式
        console.log(arguments[0] === a); //true
        console.log(arguments[1] === b); //true
        a = 10;
        b = 20;
        console.log(arguments[0] === a); //true
        console.log(arguments[1] === b); //true
    }
    foo(1, 2);
```



> 在ES5的严格模式下,arguments只反映参数的初始值而不再反映形参的变化.

```javascript
function foo(a, b) {
        //非严格模式
        console.log(arguments[0] === a); //true
        console.log(arguments[1] === b); //true
        a = 10;
        b = 20;
        console.log(arguments[0] === a); //false
        console.log(arguments[1] === b); //false
    }
    foo(1, 2);
```

> 当使用ES6参数默认值的时候，不管是否是在严格模式下，都和ES5的严格模式相同。
>
> 若调用函数时不传入实参,则argunments并不会被赋值默认值:

```javascript
function foo(a, b = 30) {
            console.log(arguments[0]); //1
            console.log(arguments[1]); //undefined
            a = 10;
            b = undefined;
            console.log(arguments[0]  === a); //false。  由于b使用了默认值。虽然a没有使用默认值，但是仍然表现的和严格模式一样。
            console.log(arguments[1] === b); //true。  b使用了默认值，所以表现的和严格模式一样。
        }
        foo(1);
```



#### 3.3 剩余参数

剩余参数使用三个点( … )和变量名来表示。

不管函数传递多少的实参,剩余参数都会把它归集为自身

```javascript
		function foo(a,b,...c){
            console.log(a,b,c);
          	console.log(b instanceof Array);  //true  .多余的参数都被放入了c中。c其实就是一个数组
        }
        foo(1,2,3,4);
        =>1 2 [3,4]
```



### 第四章:箭头函数

#### 4.1 语法

```
(形参列表)=>{
	//函数体
}	
```

```javascript
例1:
var sum = (num1,num2) =>{
  return num1 + num2
}
等同于:
var sum = function(num1,num2){
  return num1 + num2
}
```

若函数体内中只有一行代码,则包裹函数体的大括号({})可以省略.

如果有return，return关键字也可以省略。

如果函数体内有多条语句,则{}就不能省略.

并且若函数只有一个参数,则函数的( )也可以省略.

```javascript
//例1:
		var sum = (a)=>{
            return   ++a;
        }
        console.log(sum(3));
        =>4
//1.简写为:
		var sum = (a)=>++a;
        console.log(sum(3));
//2.还可以简写为:
		var sum = a=>++a;
		console.log(sum(3));
```

如果想直接返回一个js对象，而且还不想添加传统的大括号和return，则必须给整个对象添加一个**小括号 ()**

```javascript
<script type="text/javascript">
    var foo = ()=>({name:"lisi", age:30});
    console.log(foo());
	//等同于下面的；
	var foo1 = ()=>{
      	return {
          	name:"lisi",
          	age : 30
      	};
	}
</script>
```





#### 4.3 箭头函数中无this绑定

> 箭头函数没有自己的this,箭头函数内部的this其实就是它的外部函数的this.

```javascript
例1:
	普通函数:
		var p = {
            name:"wang",
            eat:function (){
                console.log(this);
            },
        };
        p.eat();
        =>{name: "wang", eat: ƒ}
     箭头函数:
     	var p = {
            name:"wang",
            eat:()=>{
                console.log(this);
            },
        };
        p.eat();
        =>Window {stop: ƒ, open: ƒ, alert: ƒ, confirm: ƒ, prompt: ƒ, …}
```



> 箭头函数的this,和调用者没有关系,只和声明的地方有关系,所以适合用于回调函数

```javascript
//例1:
		var p = {
            name:"wang",
            eat:function(){
               return () =>{
                console.log(this);
                }
            }
        };
        p.eat()();
        =>{name: "wang", eat: ƒ}
```



```
例2:
		var arr = [10,20,30,40];
        var sum = arr.reduce((sum, a) => sum+a, 0);
        console.log(sum);
        =>100
        var arr1 = arr.map(a=>a*a);
        console.log(arr1);
        =>[100, 400, 900, 1600]
```



#### 4.4箭头函数无arguments

```javascript
<script type="text/javascript">
    function foo() {
        //这里的arguments是foo函数的arguments对象。箭头函数自己是没有 arguments 对象的。
        return ()=>arguments[0]; //箭头函数的返回值是foo函数的第一个参数
    }
    var arrow = foo(4, 5);
    console.log(arrow()); // 4
</script>
```



### 第五章:对象功能拓展



#### 5.1 简写属性的初始化

```javascript
function createPerson(name,age){
  return {
    name:name;
    age:age
  }
}
//简化为:
function createPerson(name,age){
  return {
    name;		//省略了 属性名:
    age 
  }
}
```



#### 5.2 简写方法的声明

```javascript
var person = {
  name:"王先生",
  eat:function(food){
    console.log(this.name+"爱吃"+food)
  }
}
person.eat("拨娜娜")
=>王先生爱吃拨娜娜
//简化为:	
var person = {
  name:"王先生",
  eat(food){			//省略了:和function
    console.log(this.name+"爱吃"+food)
  }
}
person.eat("拨娜娜")
```



#### 5.3在字面量中动态计算属性名



> 在ES5之前,想要访问对象的动态属性名,只能使用 对象[属性名]的方式来访问,如下:

```javascript
//例1:
		var arrName = "name";
        var person = {
            name:"王先生",
        };
        console.log(person[arrName]);
        =>王先生
```



> 下面这种方式是无法访问的:

```javascript
//例2:
		var arrName = "name";
        var person = {
            arrName:"王先生",
        };
        console.log(person[arrName]);
        => undefined
```



> 在ES6中，把属性名用[ ]括起来，则括号中就可以引用提前定义的变量。

```javascript
//例3:
		var arrName = "name";
        var person = {
            [arrName]:"王先生",
        };
        console.log(person[arrName]);
```



#### 5.4 新增方法

##### 1.Object.is( )

> 该函数接受两个参数并在它们相等的返回 true 。只有两者在类型和值都相同的情况下才会判为相等。如下所示：

```javascript
console.log(+0 == -0);              // true
console.log(+0 === -0);             // true
console.log(Object.is(+0, -0));     // false

console.log(NaN == NaN);            // false
console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true

console.log(5 == 5);                // true
console.log(5 == "5");              // true
console.log(5 === 5);               // true
console.log(5 === "5");             // false
console.log(Object.is(5, 5));       // true
console.log(Object.is(5, "5"));     // false
```

*很多情况下 Object.is() 的表现和 === 是相同的。它们之间的区别是前者 \**认为 +0 和 -0 不相等而 NaN 和 NaN 则是相同的**。不过弃用后者是完全没有必要的。何时选择 Object.is() 与 == 或 === 取决于代码的实际情况。*



##### 2.Object.assign( )

> assing可以把一个对象的属性和方法完整的转copy到另外一个对象中。
>
> 这种copy是浅copy，也就是说如果属性值是对象的话，只是copy的对象的地址值(引用）

```javascript
var  p1 = {
  name:"王先生"
};
var p2 = {};
Object.assign(p2,p1);
console.log(p2);
=>{name: "王先生"}
```



> assign方法可以接受任意多的提供者。意味着后面提供者的同名属性和覆盖前面提供者的属性值。

```javascript
var  p1 = {
  name:"王先生"
  age:18
};
var p2 = {
  name:"小雲"
  sex:"女"
}
var p3 = {};
Object.assign(p3,p1,p2);
console.log(p3);
=>{name: "小雲", age: 18, sex: "女"}
```



### 第六章:字符串功能的增加



#### 6.1 字符串查找

- includes() 方法会在给定文本存在于字符串中的任意位置时返回 true，否则返回 false 。
- startsWith() 方法会在给定文本出现在字符串开头时返回 true，否则返回 false 。
- endsWith() 方法会在给定文本出现在字符串末尾时返回 true，否则返回 false 。




#### 6.2	repeat方法

> ECMAScript 6 还向字符串添加了 repeat() 方法，它接受一个数字参数作为字符串的重复次数。该方法返回一个重复包含初始字符串的新字符串，重复次数等于参数。例如：

```javascript
console.log("x".repeat(3));         // "xxx"
console.log("hello".repeat(2));     // "hellohello"
console.log("abc".repeat(4));       // "abcabcabcabc"
```



#### 6.3 字符串模板字面量

> 使用一对反引号 ``(tab正上方的按键)来表示模板字面量。
>
> 内部变量用${ } 括起来



#### 6.4 多行字符串

在字符串尾部添加 反斜杠\ 就可以实现多行字符串

```javascript
		var str = "abc\
aaa";
        console.log(str);
        =>abcaaa
```



#### 6.5 模板标签



一个标签仅代表一个函数，他接受需要处理的模板字面量。

标签分别接收模板字面量中的片段，且必须将它们组合以得出结果。

函数的首个参数为包含普通 JavaScript 字符串的数组。余下的参数为每次置换的对应值。

标签函数一般使用剩余参数来定义，以便轻松地处理数据。如下：

```javascript
			let name = '张三',
                age = 20,
                message = show`我来给大家介绍${name}的年龄是${age}.`;

            function show(stringArr, value1, value2) {
                console.log(stringArr); //
                console.log(value1);  // 张三
                console.log(value2);  // 20
                return "abc";
            }
            console.log(message);
```



### 第七章: 解构



#### 7.1 对象解构

> 对象结构的语法就是在赋值语句的左侧使用类似对象字面量的结构。



在ES5之前,我们要读取对象中的属性需要使用对象名.属性值来读取,而ES6中

```javascript
			var p = {
                name:"王",
                age:18
            };
            var {name,age} = p;	//这里就相当于声明了两个变量： name=p.name   age=p.age
            console.log(name,age);
            =>王  18
```

> 在上面的结构中必须要初始化。否则会出现语法错误。

```
在上面的结构中必须要初始化。否则会出现语法错误。
// 语法错误！
var { type, name };

// 语法错误！
let { type, name };

// 语法错误！
const { type, name };
```

> 不过我们也可以手动指定他的默认值。（这个和函数的参数默认值很像）

```
			var p = {
                name:"王",
                age:18
            };
            var {name:"张",age:20} = p;	//这里就相当于声明了两个变量： name=p.name   age=p.age
            console.log(name,age);
            =>王  18
```



#### 7.2数组的解构



> 数据解构的语法和对象解构看起来类似，只是将对象字面量替换成了数组字面量，而且解构操作的是数组内部的位置（索引）而不是对象中的命名属性，例如：

```javascript
let arr = [1,2,3,4];
let [first,second] = arr;

console.log(first);		//1
console.log(second);	//2
```

> 如果只想取数组中的某一项，则可以不用命名。

```javascript
let arr = [1,2,3,4];
let [, ,third] = arr;

console.log(third);		//3
```



几种交换方式;

```javascript
//第一种
var temp = a;
a = b;
b = temp;

//第二种
a = a + b;
b = a - b;
a = a - b;

//第三种 异或(只能用在整数上)
a = a ^ b;
b = a ^ b;
a = a ^ b;

//第四种 数组解构
[a,b] = [b,a]		//解构语法 = 数组

//第五种 数组解构
({a,b} = [a:b,b:a]);
```


### 第八章:Symbol类型

> 在ES5之前,5种基本数据类型是: Number	String	Boolean		Null		Undefined
>
> ES6新增的一种数据类型:	Symbol
>
> 在ES5之前我们都没办法创建私有变量,只能想办法去封装.symbol 来创建私有成员.



### 8.1创建Symbol

> 使用symbol全局函数来创建Symbol

```javascript
	//例1:
	let firstName = Symbol();   //创建一个Symbol
    let person = {};

    person[firstName] = "王先生";
    console.log(person[firstName]);     // "王先生"
```

在例1中,firstName被作为Symbol类型赋值给person成为其属性,每次访问这个属性时必须使用该 symbol .



> 创建Symbol时候,( )内也可以传入字符串,不过一般没有什么实际的用处,仅仅是在调试输出的时候方便.

```javascript
	var s1 = Symbol("abc");
    var s2 = Symbol("abc");
    console.log(s1 == s2); //false
```

**注:任意俩个Symbol都不会相等**	



### 8.2 识别Symbol

可以使用typeof来识别Symbol类型

```
let symbol = Symbol();
console.log(typeof symbol);         // "symbol"
```



### 8.3	Symbol作为属性名

```
例1:
var mySymbol = Symbol();

// 第一种写法

var a = {};

a[mySymbol] = 'Hello!';

// 第二种写法

var a = {

	[mySymbol]: 'Hello!'
}
```

> symbol作为对象的属性的时候，只能使用 [ ] 去访问，不能使用点去访问。

ES6之前,属性名只能使用字符串,如果是其他类型的,在js会自动将它转换为字符串:

```
例2:
var m = ["age":20];
var obj = {
  [m]:"abc"		
}
console.log(obj);	
=>{age,20: "abc"}

例3:
var m = ["age":20];
var obj = {
  [m]:"abc"		
}
console.log(obj);	
=>{[object Object]: "abc"}

例3:
var m = {
           'age':20,
           toString:function () {
               return "name"
             }
         };
var obj = {
  [m]:"abc"		
}
console.log(obj);	
=>{name: "abc"}
```



### 8.4	Symbol属性名的遍历

> Symbol有一个私有的方法: Object.getOwnPropertySymbols方法,可以获取指定对象的所有 Symbol 属性名。
>
> symbol作为对象的属性名使用的时候，该属性还是公开属性，不是私有属性。但是这个时候使用for... in和for...of时无法遍历到这个symbol属性的。

> 1.遍历对象中Symol属性名的API:	Object.getOwnPropertySymbols( );

```javascript
//例1:			
			var p ={};
            var a = Symbol('a');
            var b = Symbol('b');
            p[a] = "王先生";
            p[b] = 18;
            var objectSymbols = Object.getOwnPropertySymbols(p);
            console.log(objectSymbols);
            =>[Symbol(a), Symbol(b)]
```



```javascript
//例2:
//利用for in 来遍历例1的p:
	for(var i in p){
      console.log(i);
	}
	=>//遍历到的是空的,证明Symbol作为属性名并不能被for in 和 for of 遍历到.
```

> 2.遍历对象中常规属性名的API:	Object.getOwnPropertyNames( );

```javascript
//例3:
			var a = Symbol('a');
            var b = Symbol('b');
            
            var p ={
              "sex":"男",
              [a]:"王先生",
              [b]:18
            }
            
            var objectNames=Object.getOwnPropertyNames(p);// ["sex"]  只能拿到非Symbol类型的属性

			var objectSymbols=Object.getOwnPropertySymbols(p) //[Symbol(a),Symbol(b)]
```

> 3.遍历所有类型的属性，包括常规和Symbol型的API:	Reflect.ownKeys( );

```
//例4:
//利用Reflect.ownKeys()变量例3中的p
			var allNames = Reflect.ownKeys(p)
            console.log(allNames);
            =>["sex", Symbol(a), Symbol(b)]	//取到了所以的属性名
```



### 8.5 Symbol.for(字符串)

> 在上面介绍了,获取一个Symbol 可以直接用`var a  = Symbol()`,这里获取的Symol一定是最新的.
>
> 而Symbol.for方法也可以获取Symbol,但是它有一个查找的功能:即在全局环境中搜索 以该字符串作为参数的Symbol值，如果搜到则返回这个Symbol，如果搜不到则创建一个Symbol，并把它注册在全局环境中。



```javascript
//例1:
			var a = Symbol.for('a');	//第一个var a 表示先在全局中查找Symbol(a),没找到,所以此时新建了一个Symol(a);
            var a2 = Symbol.for('a');	//第二个var a2 表示在全局中查找Symbol(a),找到了,所以返回Symbol(a);

            console.log(a == a2);	////因为两次搜到的是同一个Symbol，所以此处是true	
```



### 8.6 Symbol.keyFor(symbol)

> Symbol.keyFor(symbol):返回一个已经全局注册的symbol的"key"。

```javascript
<script type="text/javascript">
    var a = Symbol("foo");
    var b = Symbol.for("foo");
    console.log(Symbol.keyFor(a)); // undefined.   因为a没有向全局环境中注册，所以是undefinded
    console.log(Symbol.keyFor(b)); // foo
</script>
```



### 第九章: set数据结构

> Set是类似数组的一种结构，可以存储数据，与数组的区别主要是 **Set中的元素不能重复，而数组中的元素可以重复**。
>
> 一句话总结：**Set类型是一个包含无重复元素的有序列表**



#### 9.1 创建set并添加

1.利用new Set( ) 来创建;

2.利用add( )来添加元素;

3.利用size属性查看set中的元素个数;

4.set中不能添加重复元素

```javascript
//例1:			
			var set1 = new Set();
            set1.add(1);
			set1.add(1);	//添加重复元素
			set1.add("1");	//添加字符串
            set1.add(2);
            set1.add(3);
            console.log(set1);
			console.log(set1.size);	
            =>{1,"1",2, 3}
			=>4
            
           
```



#### 9.2 遍历set

1.利用for...of...来遍历

```javascript
//例2:
			for(var s of set1){
                console.log(s);
            }
            1
            1
            2
            3
```

 

2.利用forEach来遍历

forEach(function(value,key,ownerSet){

})

参数1：遍历到的元素的值

参数2：对set集合来说，参数2的值和参数1的值是完全一样的。

参数3：这个 ==set== 自己

```javascript
例3:
			set1.forEach(function (value, key, ownerSet) {
                console.log(value,key,ownerSet);
            })
            1 1 Set(4) {1, "1", 2, 3}
            1 1 Set(4) {1, "1", 2, 3}
            2 2 Set(4) {1, "1", 2, 3}
            3 3 Set(4) {1, "1", 2, 3}
```



#### 9.3 set去重

```javascript
//例1:			
			var arr = [1,1,2,3,4,5,5];
            var arr2 = [...new Set(arr)];	//新创建一个arr2数组来盛放
            console.log(arr2);
//例2:
//若要将数据塞到原来的arr中,可以先清空arr,再添加进去
			var arr = [1,1,2,3,4,5,5];
            var arr2 = [...new Set(arr)];
            arr.splice(0,arr.length);//或者使用 arr.length=0;
            arr.push(arr2)
            console.log(arr);
```


#### 9.4 set.clear( )

> 清空set中的所有内容

```javascript
//例1:
			var s = new Set();
             s.add(1);
             s.add(2);
             console.log(s);
             s.clear();
             console.log(s);	
			=>{1,2}
			=>{}
```



### 第十章: map数据结构

#### 10.1 创建map并添加

map主要是对对象类型的补充

1.利用new Map( )来创建;

2.利用.set(key, value) 方法来添加;map 类型包含一组有序的键值对，其中键和值可以是任何类型, key 不允许重复,但是value允许重复.

3.添加相同的属性的时候,后面的属性会把前面的给覆盖;

3.get(key),来获取指定key对应的value



```javascript
//例1:			
			var map = new Map();
            map.set("a","aa");
            map.set("b","bb");
            map.set("b","bbb");
            console.log(map);
            console.log(map.get("a"))
            
```



#### 10.2 Map的初始化

由于Map中的内容是以键子对的形式存储的,所以我们向里面添加内容的时候应该添加的是一个个的数组:	即(通过二维数组,给Map初始化值).

```javascript
			var map = new Map([["a","aa"],["b","bb"]]);
            console.log(map);
            =>{"a" => "aa", "b" => "bb"}
```



#### 10.3 Map与Set类似的3个方法

- has(key) - 判断给定的 key 是否在 map 中存在

- delete(key) - 移除 map 中的 key 及对应的值

- clear() - 移除 map 中所有的键值对

  ```javascript
  			var map = new Map();
              map.set("a","aa");
              map.set("b","bb");
              map.set("b","bbb");

              console.log(map.has("a"));	//true
              map.delete("b");
              console.log(map);			//{"a" => "aa"}
              map.clear();
              console.log(map);			//{}
  ```



#### 10.4 Map的forEach方法

> 利用forEach来遍历
>
> map.forEach(function(value,key,ownMap){ });
>
> ```
> 		参数1：键值对的value
>         参数2：键值对的key
>         参数3：map对象本身
> ```



```javascript
			var map = new Map([["a","aa"],["b","bb"]]);
            map.forEach(function (key,value,ownMap) {
                console.log(key,value,ownMap);
              	console.log(this);
            });
            =>aa a Map(2) {"a" => "aa", "b" => "bb"}
            =>bb b Map(2) {"a" => "aa", "b" => "bb"}
			=>window
```



### 第十一章: 迭代器

#### 11.1 迭代器简介

什么是迭代器?

1. 迭代器是一个对象
2. 迭代器提供一个方法next() 这个方式总是能够返回迭代到的对象。
3. next返回的对象中，至少有两个属性：done 是一个boolean值(表示数据是否迭代完)。 value：具体的数据(迭代到的具体数据)

OK,下面我们利用以前的知识手动创建一个迭代器,遵循上面的三个条件:

```javascript
//例1:			
			function createIterator(arr){
                var index = 0;
                return {			//1.迭代器是一个对象,所以return的是一个对象
                    next(){			//2.迭代器提供一个方法next()
                        var done = index >= arr.length;	//属性1
                        var value = arr[index];			//属性2
                        index++;
                        return {done,value}				//返回迭代到的对象
                    }
                }
            }
            var it = createIterator([10,20,30,40]);
            var ele = it.next();
            while(!ele.done){
                console.log(ele.value);
                ele = it.next();
            }
			=>	10
            	20
                30
                40
```



#### 11.2 生成迭代器

> 当我们在创建函数的时候,在函数名之前添加一个* ,如:`function * createIterator(){}` 这样的函数就叫做生成器函数,
>
> 它的作用就是返回一个迭代器对象

新的 yield 关键字,yield 关键字只能 **直接用在生成器内部** 

```javascript
//例2:
function * createIterator(){
  console.log("aaa");
  yield 3;
  yield 4;
}
var it = createIterator();
console.log(it.next());			//aaa		{value:3,done:false}
console.log(it.next());			//{value: 4, done: false}
console.log(it.next());			//{value: undefined, done: true}
```

**每调用一次迭代器的next方法，如果碰到 yield 都会返回一个迭代到的一个对象，然后停止执行，直到下次调用next方法，会从上次停止的地方继续执行。**



所以我们可以在生成器函数传入一个要迭代的数组,然后在函数内做一个for循环来将所有的value值都返回出来;

```javascript
//例3			
			function * createIterator(arr){
                for(var i = 0;i<arr.length;i++){
                    yield arr[i];
                }
            }
            var it = createIterator([10,20,30,40]);		//创建了一个迭代器对象
            var ele = it.next();						//调用迭代器对象内置的next方法
            while(!ele.done){
                console.log(ele.value);
                ele = it.next();
            }
			=>	10
            	20
                30
                40
          //会发现效果和我们的例1是一样的
          //上面的迭代器函数就相对完整一点了
```



#### 11.3迭代器与for...of...



### 第十二章: 类

#### 12.1 基本类的声明

> 在ES6直接借鉴其他语言，引入了类的概念。



```javascript
			//class关键字要小写,后面跟着类名
            class Person{
                //等效于 Person 构造函数
                constructor(name,age){  //这个表示类的构造函数
                    this.name = name;   //创建属性
                    this.age = age
                }
                //等效于 Person.prototype.say = function(){}
                say(){
                    console.log("My name is "+this.name);
                }
            }
            let person1 = new Person("Mrs.wang",18);
            person1.say();
			=>My name is Mrs.wang
```



> 类的成员,也可以像我们前面的对象的属性一样可以动态计算.( 使用[ ] 来计算)

```javascript
	let methodName = "sayName";
	class PersonClass {
    constructor(name) {
        this.name = name;
    }

    [methodName]() {		//属性名是一个变量,必须用[]括起来
        console.log(this.name);
    }
}
let me = new PersonClass("王先生");
me.sayName();           // "王先生"
```



**注:**

在类的内部,不能直接书写语句,只能声明方法.

1.construction这个构造函数内,负责诶对象添加书写

​	在上面的例子中,name和age属性是自有属性,它们创建在构造函数中.

2.直接在类中给原型添加方法

3.任何的类都有一个默认的无参的constructor,如果手动添加constructor,则默认的constructor不在存在

4.如果用typeof对类名进行测试,结果是function , es6中的类,仅仅是一种语法糖,本质仍然是构造函数+原型

5.类不会声明提前,必须先声明再使用.

6.类声明中的代码自动运行在严格模式下,同时没有任何办法可以手动切换到非严格模式.

7.所有的方法都是不可枚举的(也就是不能使用for...in..)

8.所有的方法都不能使用 new 来调用，因为它们没有内部方法 [[Construct]].

9.不适用new 来调用类构造函数会抛出错误,也就是必须使用new 类名()方式来创建

10.在类的方法内部重写类名会抛出错误.（因为在类的内部，类名是作为一个常量存在的）

#### 12.2 启动严格模式



第一种方式:

在js标签的最头上加上一句`"use strict"`(在它之前不能有代码).

```javascript
<script>
	"use strict"
</script>
```



第二种方式:

直接在要启动严格模式的函数内部写上`"use strict"`

```javascript
function foo(){
  "use strict"
  console.log(this);
}
```



#### 12.3  类作为一等公民



1. 类可以作为参数传递

   ```javascript
   			function foo(cls) {
                   let obj = new cls();
                   obj.say();
               }
               foo(class{
                   say(){
                       console.log("我是类中的方法");
                   }
               })
   ```



2.立即调用类构造函数，创建单例



#### 12.4 静态成员

> ECMAScript 6 的类通过在方法之前使用正式的 **static** 关键字简化了静态方法的创建。
>
> 静态方法直接通过类名来调用,不能通过对象来调用.

首先来看一下在ES5,我们给构造函数中添加方法的俩种方式:

```
			function Person(name){
 			 this.name = name;
			}
			//静态方法 : 直接添加到构造方法上(就是将构造函数当成一个普通对象来用)
			Person.eat=function () {
                console.log("我是静态方法");
            };
            //实例方法 : 添加到构造方法的原型对象中
            Person.prototype.say=function(){
                console.log("我是实例方法");
            };
            let p1 = new Person("王先生");
            Person.eat();	//调用静态方法只能通过构造函数本身调用,不能通过对象调用(p1.eat()会报错)
            p1.say();		//调用实例方法可以通过对象调用.
```



> ECMAScript 6 的类通过在方法之前使用正式的 **static** 关键字简化了静态方法的创建。例如，下例中的类和上例相比是等效的：

```javascript
			class Person{
                constructor(name){
                    this.name = name
                }
                say(){
                    console.log("我是实例方法");
                }
                static eat(){			//直接在
                    console.log("我是静态方法");
                }
            }
            let p1 = new Person("王先生");
            Person.eat();
            p1.say();
```

#### 12.5 ES6的继承

在es5之前,我们想实现继承,需要这样:

```javascript
//例1:
function Father(name) {
        this.name = name;
    }
    Father.prototype.sayName = function () {
        console.log(this.name);
    }

    function Son(name,age) {
        Father.call(this, name);
        this.age = age;
    }
    Son.prototype = new Father();
    Son.prototype.constructor = Son;
    Son.prototype.sayAge = function () {
        console.log(this.age);
    }

    var son1 = new Son("儿子", 20);
    son1.sayAge();  //20
    son1.sayName(); //儿子
```



但是在es6中,只需要用到一个关键字 extends 就可以了,如下:

```javascript
//例2:			
			class Father{
                constructor(name,age){
                    this.name = name;

                }
                sayName(){
                    console.log("我是父类中的sayName方法:"+this.name);
                }
            }
            class Son extends Father{
                constructor(name,age){
                super(name);        //相当于以前的：Father.call(this.name);
                this.age = age;     //添加son自身的属性
                }
                sayAge(){           //添加son独有的方法
                    console.log(this.age);
                }
                sayName(){
                    console.log("我是子类中的sayName方法:"+this.name);
                 super.sayName();    //也可以调用父类中的sayName方法,而且这里面的this指代的是子类
                }
            }
            let son1 = new Son("王先生",15);
            son1.sayName();
            son1.sayAge();
            console.log(son1 instanceof Son);
            console.log(son1 instanceof Father);
			=>我是子类中的sayName方法:王先生
            =>我是父类中的sayName方法:王先生
            =>true
            =>true
```

> 这种继承方法，和我们前面提到的构造函数+原型的继承方式本质是一样的。但是写起来更简单，可读性也更好。

这里的super有几点要注意的:

1.super方法只有在派生类中使用(使用extents的类或者函数),否则就会报错

2.必须在构造函数的起始位置调用super方法.

3.在类构造函数中，唯一能避免调用 super() 的办法是返回一个对象。



```
1. 在构造函数语法中,使用super就相当于在给对象初始化属性,就是以前的构造函数借调  super( )调用父类的构造函数的时候不要加点,而且要放在构造函数的第一行,因为它会初始化 this.

2. 在子类中可以覆写(override)父类的方法, 而且也可以在子类的方法中, 使用 super.父类方法()来
调用父类的方法, 而且这个时候父类方法中的 this 其实指的是子类的对象

3. 使用类的的时候, 静态方法也可以继承
```



