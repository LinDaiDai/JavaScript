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

#### 支持返回Promise和同步的值



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

