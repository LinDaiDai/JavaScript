# ES7+ES8

## ES7

### 1.Array.prototype.includes()

> includes()作用,是查找一个值在不在数组里,若是存在则返回true,不存在返回false.

1.基本用法：

```
['a', 'b', 'c'].includes('a')     // true
['a', 'b', 'c'].includes('d')     // false
```

2.接收俩个参数：**要搜索的值和搜索的开始索引**

```
['a', 'b', 'c', 'd'].includes('b')         // true
['a', 'b', 'c', 'd'].includes('b', 1)      // true
['a', 'b', 'c', 'd'].includes('b', 2)      // false
```

3.与`ES6中的indexOf()`比较

有些时候是等效的

```
['a', 'b', 'c'].includes('a')          //true
['a', 'b', 'c'].indexOf('a') > -1      //true

var arr = [1, 2, 3]
var a = 1;
arr.includes(a)   //true
arr.indexOf(a)    //0 
```

- 在判断 +0 与 -0 时，被认为是相同的。

```
[1, +0, 3, 4].includes(-0)    //true
[1, +0, 3, 4].indexOf(-0)     //1
```

- 只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些，是无法判断的.

```
var arr = [1, [2, 3], 4]
arr.includes([2, 3])   //false
arr.indexOf([2, 3])    //-1
```



**优缺点比较**

- 简便性

`includes()`返回的是布尔值，能直接判断数组中存不存在这个值，而`indexOf()`返回的是索引，这一点上前者更加方便。

- 精确性

  两者都是采用`===`的操作符来作比较的，不同之处在于：对于`NaN`的处理结果不同。

  我们知道js中	`NaN === NaN`	的结果是false,`indexOf()`也是这样处理的，但是`includes()`不是这样的。

  ```
  let demo = [1, NaN, 2, 3]

  demo.indexOf(NaN)        //-1
  demo.includes(NaN)       //true
  ```

**总结：**

> 由于它对NaN的处理方式与indexOf不同，假如你只想知道某个值是否在数组中而并不关心它的索引位置，建议使用includes()。如果你想获取一个值在数组中的位置，那么你只能使用indexOf方法。



### 2.求幂运算符**

基本用法：

```
3 ** 2  //9
效果同
Math.pow(3, 2) //9
```

由于是运算符，所以可以和 `+=`一样的用法

```
var b = 3;
b **= 2;
console.log(b); //9
```



## ES8

### 1.async await

异步函数`async function()`

#### 1.1作用

避免有更多的请求操作，出现多重嵌套，也就是俗称的“回调地狱”

```
this.$http.jsonp('/login', (res) => {
  this.$http.jsonp('/getInfo', (info) => {
    // do something
  })
})
```

因此提出了ES6的Promise,将回调函数的嵌套，改为了链式调用：

```
var promise = new Promise((resolve, reject) => {
  this.login(resolve);
})
.then(() => {
  this.getInfo()
})
.catch(() => {
  console.log('Error')
})
```

#### 1.2声明方式

异步函数存在以下四种使用形式：

- 函数声明： `async function foo() {}`
- 函数表达式： `const foo = async function() {}`
- 对象的方式： `let obj = { async foo() {} }`
- 箭头函数： `const foo = async () => {}`



#### 1.3支持返回Promise和同步的值

async用于定义一个异步函数，该函数返回一个Promise。
如果async函数返回的是一个同步的值，这个值将被包装成一个理解resolve的Promise，等同于`return Promise.resolve(value)`。
await用于一个异步操作之前，表示要“等待”这个异步操作的返回值。await也可以用于一个同步的值。

```
    //async await
    //返回Promise
    let timer = async function timer() {
        return new Promise((reslove, reject) => {
            setTimeout(() => {
                reslove('a');
            }, 1000);
        })
    }
    timer().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err.message);
    })

    //返回同步的值
    let sayHello = async function sayHello() {
        let hi = 'hello world'//等同于return Promise.resolve(hi);
        return hi
    }
    sayHello().then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err.message);
    })
```



#### 1.4对异常的处理

> 首先来看下`Promise`中对异常的处理

1.使用`reject`

```
let promise = new Promise((reslove, reject) => {
  setTimeout(() => {
  	reject('promise使用reject抛出异常')  
  }, 1000)
})
promise().then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)     //'promise使用reject抛出异常'
})

```

2.使用`new Error()`

```
let promise = new Promise((reslove, reject) => {
  	throw new Error('promise使用Error抛出异常') //使用throw异常不支持放在定时器中
})
promise().then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err.message)     //'promise使用Error抛出异常'
})

```

3.`reject`一个`new Error()`

```
	let promise = new Promise((resolve, reject) => {
	
        setTimeout(() => {
            reject(new Error('promise抛出异常'));
        }, 1000);
    })

    promise.then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err.message);  //'promise抛出异常'
    })
```

> `async`对异常的处理也可以直接用`.catch()`捕捉到

```
	//async抛出异常
    let sayHi = async sayHi => {
            throw new Error('async抛出异常');
    }
    sayHi().then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err.message);
    })
```

> 和Promise链的对比：

我们的async函数中可以包含多个异步操作，其异常和Promise链有相同之处，如果有一个Promise被reject()那么后面的将不会再进行。

```
    let count = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('promise故意抛出异常')
            }, 1000);
        })
    }
    let list = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([1, 2, 3])
            }, 1000);
        })
    }

    let getList = async () => {
        let c = await count()
        console.log('async')    //此段代码并没有执行
        let l = await list()
        return { count: c, list: l }
    }
    console.time('start');
    getList().then(res => {
        console.log(res)
    })
    .catch(err => {
        console.timeEnd('start')
        console.log(err)
    })
    
    //start: 1000.81494140625ms
    //promise故意抛出异常
```

可以看到上面的案例，`async`捕获到了一个错误之后就会立马进入`.catch()`中，不执行之后的代码



#### 1.5并行

上面的案例中，async采用的是串行处理

count()和list()是有先后顺序的

```
let c = await count()
let l = await list()
```

实际用法中，若是请求的两个异步操作没有关联和先后顺序性可以采用下面的做法

```
let res = await Promise.all([count(), list()])
return res

//res的结果为
//[ 100, [ 1, 2, 3 ] ]
```



案例详情为：

```
let count = ()=>{
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve(100);
        },500);
    });
}

let list = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve([1,2,3]);
        },500);
    });
}

let getList = async ()=>{
    let result = await Promise.all([count(),list()]);
    return result;
}
console.time('begin');
getList().then(result => {
    console.timeEnd('begin');  //begin: 505.557ms
    console.log(result);       //[ 100, [ 1, 2, 3 ] ]
}).catch(err => {
    console.timeEnd('begin');
    console.log(err);
});
```

> 我们将count()和list()使用Promise.all()“同时”执行，这里count()和list()可以看作是“并行”执行的，所耗时间将是两个异步操作中耗时最长的耗时。
> 最后得到的结果是两个操作的结果组成的数组。我们只需要按照顺序取出数组中的值即可。



#### 1.6与Generator的关系

先来回顾一下ES6中`Generator`函数的用法：

```
	function* getList() {
        const c = yield count()
        const l = yield list()
        return 'end'
    }
    var gl = getList()
    console.log(gl.next()) // {value: Promise, done: false}
    console.log(gl.next()) // {value: Promise, done: false}
    console.log(gl.next()) // {value: 'end', done: true}
```

> 虽然Generator将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。此时，我们便希望能出现一种能自动执行Generator函数的方法。我们的主角来了：async/await。

**ES8引入了async函数，使得异步操作变得更加方便。简单说来，它就是Generator函数的语法糖。**

```
let getList = async () => {
  const c = await count()
  const l = await list()
}
```



### 2.Object.entries()

#### 2.1作用

> 作用：将一个对象中可枚举属性的键名和键值按照二维数组的方式返回。
>
> 若对象是数组，则会将数组的下标作为键值返回。

```
Object.entries({ one: 1, two: 2 })    //[['one', 1], ['two', 2]]
Object.entries([1, 2])                //[['0', 1], ['1', 2]]
```

#### 2.2要点

1.若是键名是`Symbol`，编译时会被自动忽略

```
Object.entries({[Symbol()]:1, two: 2})  //[['two', 2]]
```

2.`entries()`返回的数组顺序和`for`循环一样，即如果对象的key值是数字，则返回值会对key值进行排序，返回的是排序后的结果

```
Object.entries({ 3: 'a', 4: 'b', 1: 'c' })    //[['1', 'c'], ['3', 'a'], ['4', 'b']]
```

3.利用`Object.entries()`创建一个真正的`Map`

```
    var obj = { foo: 'bar', baz: 42 };
    
    var map1 = new Map([['foo', 'bar'], ['baz', 42]]); //原本的创建方式
    var map2 = new Map(Object.entries(obj));    //等同于map1

    console.log(map1);// Map { foo: "bar", baz: 42 }
    console.log(map2);// Map { foo: "bar", baz: 42 }
```

#### 2.3自定义`Object.entries()`

`Object.entries`的原理其实就是将对象中的键名和值分别取出来然后推进同一个数组中

```
    //自定义entries()
    var obj = { foo: 'bar', baz: 42 };
    function myEntries(obj) {
        var arr = []
        for (var key of Object.keys(obj)) {
            arr.push([key, obj[key]])
        }
        return arr
    }
    console.log(myEntries(obj))
    
    //Generator版本
    function* genEntryies(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]]
        }
    }
    var entryArr = genEntryies(obj);
    console.log(entryArr.next().value) //["foo", "bar"]
    console.log(entryArr.next().value) //["baz", 42]
```



### 3.Object.values()

#### 3.1作用

> 作用：只返回自己的键值对中属性的值。它返回的数组顺序，也跟`Object.entries()`保持一致

```
Object.values({ one: 1, two: 2 })            //[1, 2]
Object.values({ 3: 'a', 4: 'b', 1: 'c' })    //['c', 'a', 'b']
```

#### 3.2与Object.keys()比较

> ES6中的`Object.keys()`返回的是键名

```
    var obj = { foo: 'bar', baz: 42 };
    console.log(Object.keys(obj)) //["foo", "baz"]
    console.log(Object.values(obj)) //["bar", 42]
    
    //Object.keys()的作用就类似于for...in
    function myKeys() {
        let keyArr = []
        for (let key in obj1) {
            keyArr.push(key)
            console.log(key)
        }
        return keyArr
    }
    console.log(myKeys(obj1)) //["foo", "baz"]
```



#### 3.3entries()、values()总结

```
    var obj = { foo: 'bar', baz: 42 };
    console.log(Object.keys(obj)) //["foo", "baz"]
    console.log(Object.values(obj)) //["bar", 42]
    console.log(Object.entries(obj)) //[["foo", "bar"], ["baz", 42]]
```



### 4.字符串填充

#### 4.1padStart()和padEnd()

> 字符串填充`padStart()`和`padEnd()`

> 用法
>
> String.padStart(targetLength, padding)
>
> 参数：字符串目标长度和填充字段

```
'Vue'.padStart(10)           //'       Vue'
'React'.padStart(10)         //'     React'
'JavaScript'.padStart(10)    //'JavaScript'
```

#### 4.2要点

1.填充函数只有在字符长度小于目标长度时才有效,而且目标长度如果小于字符串本身长度时，字符串也不会做截断处理，只会原样输出

```
'Vue'.padEnd(10, '_*')           //'Vue_*_*_*_'
'React'.padEnd(10, 'Hello')      //'ReactHello'
'JavaScript'.padEnd(10, 'Hi')    //'JavaScript'
'JavaScript'.padEnd(8, 'Hi')     //'JavaScript'
```



### 5.Object.getOwnPropertyDescriptors()

#### 5.1作用

> 该方法会返回目标对象中所有属性的属性描述符，该属性必须是对象自己定义的，不能是从原型链继承来的。

```
    var obj = {
        id:  1,
        name: '霖呆呆',
        get gender() {
            console.log('gender')
        },
        set grad(d) {
            console.log(d)
        }
    }
    console.log(Object.getOwnPropertyDescriptors(obj))
 //输出   
{
  gender: {
    configurable: true,
    enumerable: true,
    get: f gender(),
    set: undefined
  },
  grade: {
    configurable: true,
    enumerable: true,
    get: undefined,
    set: f grade(g)
  },
  id: {
    configurable: true,
    enumerable: true,
    value: 1,
    writable: true
  },
  name: {
    configurable: true,
    enumerable: true,
    value: '霖呆呆',
    writable: true
  }
}
```

> 第二个参数,用于指定属性的属性描述符

```
Object.getOwnPropertyDescriptors(obj, 'id')

//输出结果应该为
{
  id: {
    configurable: true,
    enumerable: true,
    value: 1,
    writable: true
  }
}
```

但是我在谷歌/火狐浏览器试了好像没有效果,有知道原因的小伙请留言

#### 5.2与`getOwnPropertyDescriptor()`比较

> ES6中也有一个返回目标对象可枚举属性的方法

```
var obj = {
    id: 1,
    name: '霖呆呆',
    get gender() {
        console.log('gender')
    },
    set grad(d) {
        console.log(d)
    }
}
console.log(Object.getOwnPropertyDescriptor(obj, 'id'))
        
//输出结果
 {
  id: {
    configurable: true,
    enumerable: true,
    value: 1,
    writable: true
  }
}
```

**两者的区别：一个是只返回知道属性名的描述对象,一个返回目标对象所有自身属性的描述对象**



#### 5.3自定义该方法

```
        function myDescriptors(obj) {
            let descriptors = {}
            for (let key in obj) {
                descriptors[key] = Object.getOwnPropertyDescriptor(obj, key)
            }
            return descriptors
        }
        console.log(myDescriptors(obj))
        //返回的结果和该方法一样
        
        //其中上面自定义方法的for...in也可以换成,效果也是一样的
        for (let key of Object.keys(obj)) {
            descriptors[key] = Object.getOwnPropertyDescriptor(obj, key)
        }
```



### 6.函数参数支持尾部逗号

该特性允许我们在定义或者调用函数时添加尾部逗号而不报错

```
        let foo = function (
                a,
                b,
                c,
            ) {
                console.log('a:', a)
                console.log('b:', b)
                console.log('c:', c)
            }
            foo(1, 3, 4, )

            //输出结果为：
            a: 1
            b: 3
            c: 4
```

> 它适用于那种多行参数并且参数名很长的情况，开发过程中，如果忘记删除尾部逗号也没关系，ES8已经支持这种写法。



### 装饰器Decorator

> ES8神器Decorator

在介绍`Decorator`之前，先实现这样一个功能：

定义一个函数，在调用这个函数时，能够执行一些其他额外操作

如下代码,定义`doSometing()`,在调用它时再执行其他代码

```
        function doSometing(name) {
            console.log('Hello' + name)
        }
        function myDecorator(fn) {
            return function() {
                console.log('start')
                const res = fn.apply(this, arguments)
                console.log('end')
                return res
            }
        }
        const wrapped = myDecorator(doSometing)
        doSometing('lindaidai')
        //Hellowlindaidai
        
        wrapped('lindaidai')
        //start 
        //Hellowlindaidai
        //end
```

可以看到上面的操作：其实就是一个函数包装成另一个函数,这样的方式我们称之为“装饰器”



