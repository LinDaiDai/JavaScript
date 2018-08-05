# ES9

### 1. 异步迭代

在`async/await`的某些时刻，你可能尝试在同步循环中调用异步函数。例如：

```
async function process(array) {
  for (let i of array) {
    await doSomething(i);
  }
}
复制代码
```

这段代码不会正常运行，下面这段同样也不会：

```
async function process(array) {
  array.forEach(async i => {
    await doSomething(i);
  });
}
复制代码
```

这段代码中，循环本身依旧保持同步，并在在内部异步函数之前全部调用完成。

ES2018引入异步迭代器（asynchronous iterators），这就像常规迭代器，除了`next()`方法返回一个Promise。因此`await`可以和`for...of`循环一起使用，以串行的方式运行异步操作。例如：

```
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
```



### 2. Promise.finally()

在ES6中，一个`Promise`链要么成功进入最后一个`then()`要么失败触发`catch()`。而实际中，我们可能需要无论`Promise`无论成功还是失败，都运行相同的代码。例如清除，删除回话，关闭数据库连接等操作。

ES9中，允许使用`finally()`来指定最终的逻辑。

如下：

```
        let count = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(100)
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
            console.log('async')
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
        .finally(() => {
            console.log('finally')
        }) 
        
        //执行结果
        async
        {count: 100, list: [1, 2, 3]}
        finally
```



### 3. Rest/Spread 属性

在ES6中引入了三点`...`，作用主要是`Rest参数和扩展运算符`:

作用对象仅用于数组

1.将一个未知数量的参数表示一个数组:

```
restParam(1, 2, 3, 4, 5);

function restParam(p1, p2, ...p3) {
  // p1 = 1
  // p2 = 2
  // p3 = [3, 4, 5]
}
```

2.扩展运算符：

```
const values = [99, 100, -1, 48, 16];
console.log( Math.max(...values) ); // 100
```



在ES9中为对象提供了像数组一样的Rest参数和展开运算符。

> Rest参数用法

```
        var obj = {
            a: 1,
            b: 2,
            c: 3
        }
        const { a, ...param } = obj;
        console.log(a)     //1
        console.log(param) //{b: 2, c: 3}
        
```

> Spread用法

```
        var obj = {
            a: 1,
            b: 2,
            c: 3
        }
		function foo({a, ...param}) {
            console.log(a);
            console.log(param)
        }
```

跟数组一样，Rest参数只能在声明的结尾处使用。此外，它只适用于每个对象的顶层，如果对象中嵌套对象则无法适用。

> 扩展运算符可以在其他对象内使用

```
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { ...obj1, z: 26 };
// obj2 is { a: 1, b: 2, c: 3, z: 26 }
```



> 扩展运算符浅拷贝

```
obj2 = {...obj1}
```

