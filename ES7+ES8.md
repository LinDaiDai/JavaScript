# ES7+ES8

## ES7

### Array.prototype.includes()

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



### 求幂运算符**

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

### async await

异步函数`async function()`

#### 作用

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

#### 声明方式

异步函数存在以下四种使用形式：

- 函数声明： `async function foo() {}`
- 函数表达式： `const foo = async function() {}`
- 对象的方式： `let obj = { async foo() {} }`
- 箭头函数： `const foo = async () => {}`



#### 支持返回Promise和同步的值

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



#### 对异常的处理

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



#### 并行

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



#### 与Generator的关系

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

