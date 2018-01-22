# vue-cli	



## 第一章: 项目运行

1.webpack.build.js进行所有的js文件打包

​	文件夹名build

​	其中`webpack.base.conf`中的`module.exports={}`:

```
module.exports = {
  entry: {      //入口文件
    app: './src/main.js'  
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',      //打包以后输出的文件名称,(输出配置)
  },
  module: {					//用以解析模块的一些规则
    rules: {
      
    }
  },
  resolve: {				//读取文件的一些配置
    
  }
```



2.利用webpack.config.js来进行命令的简化处理

​	这个文件就是webpack的默认配置文件,也就是文件夹名为config

3.利用webpack打包css

​	webpack本身不支持css打包. 依赖于`style-loader`和`css-loader`(使用webpack下载下来的文件中自带)

4.安装less-loader(需手动安装)

```
npm i less less-loader --save-dev
```

5.安装vuex

```
npm install vuex --save
```

6.安装axios

​	用到http时需要安装axios

```
npm install --save axios
```



项目的入口文件是`main.js`,然后在`main.js`中依赖`app.vue`.`app.vue`中又依赖了`hello.vue`这个组件。

一个标准组件的构成就是由`template,script,style`这三个标签构成，

如果要在`app.vue`中使用`hello.vue`这个组件的话，需要把hello定义为app的子组件

```vue
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
```






## 第二章: router

根据不同的地址跳转到不同的页面，提到前端路由就不得不提SPA单页应用，单页面应用就是视觉感觉是页面的切换，但页面其实一直没有刷新，我们是通过js来让页面看起来好像是跳转到了另外一个页面。



### 2.1 基本使用



- 在终端中进入到你的项目目录: `cd 项目路径`
- 在项目目录下执行：`npm install vue-router --save`。后面加上`--save`的原因是要将`vue-router`添加到`package.json`的依赖中
- 然后在可以项目中引入`vue-router`，比如在`main.js`中



```javascript
/// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 1.引入vue-router及组件
import Router from 'vue-router'
import Hello from './components/Hello'
import Orange from './components/Orange'
import Banana from './components/Banana'

// 2.使用vue-router
Vue.use(Router)
// 3.实例化router这个类
let router = new Router({
    // 5.做映射,什么样的地址,跳转到什么样的页面
    routes:[
        {
              // path:路径
            path:'/',
              // 跳转的组件
            component:Hello
        },
        {
            path:'/orange',
            component:Orange
        },
        {
            path:'/banana',
            component:Banana
        }
    ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 4.在vue实例中使用router
  router:router,
  template: '<App/>',
  components: { App }
})
```

然后在`app.vue`中指定路由的位置，使用`router-view`这个组件







### 2.2 案例1:

1.在vue文件夹目录下,执行

```
$ vue init webpack route_demo
```

先不安装router



2.进入到route_demo文件夹下,执行

```
$ npm i
```

安装依赖



3.进入到route_demo文件夹下,执行

--save保存到生产环境

--dev保存到开发环境

```
npm i vue-router@^2 --save
```

文件夹下会多出



4.项目中引入`vue-router`

在`main.js`中:

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入helloword组件
import Hello from '@/components/HelloWorld'
// 引入orange组件
import Orange from '@/components/Orange'
// 引入banana组件
import Banana from '@/components/Banana'

// 1.引入vue-router
import Router from 'vue-router'
// 2.在vue调用(使用)vue-router
Vue.use(Router)
// 3.初始化(实例化)vue-router
var router = new Router({
  // 配置表
  // 将路由模式切换为html5的history模式,可以将地址栏中的#去掉
  mode: 'history',
  // 5.配置路由,做映射，什么样的地址，跳转到什么的页面(组件)
  routes: [
    {
      path: '/',
      // component->ng中的templateUrl
      component: Hello
    },
    {
      path: '/orange',
      name: 'orange',
      component: Orange
    },
    {
      path: '/banana',
      name: 'banana',
      component: Banana
    }
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 4.在vue实例中使用router,键名必须为router
  router,
  template: '<App/>',
  components: { App }
})

```



5.在components文件夹中创建`orange`和`banana`俩个组件

如在orange中:

```javascript
<template>
  <div class="orange">
    <h1>{{title}}</h1>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '橙子'
    }
  }
}
</script>
<style scoped>
.orange{
  color: orange;
}
</style>
```



6.路由中的跳转(3种方式)

1.在要实现路由的地方使用`<router-link to="/path"> </router-link>`

2.在要实现路由的地方使用`<router-link :to="{path:path}"></router-link>`

3.在要实现路由的地方使用`<router-link :to="{name: name}"></router-link>`(需要在设置路由的地方加上name属性)

```javascript
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to='/'>首页</router-link>
    <router-link to='/orange'>orange</router-link>	// to中填入的是你在main.js的path设置的路径
    <--<router-link :to="{path:'orange'}">orange</router-link>-->
    <--<router-link :to="{name: 'orange'}">orange</router-link>-->
    <router-link to='/banana'>banana</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {

  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```





### 2.3 通过js控制跳转

在上面的案例中,我们是通过`router-link`标签自动转换为`a`标签来实现页面的跳转的,也可以通过js给任何元素添加事件来实现跳转:



1.给要跳转的元素添加事件:

```
<button @click="toBanana">点击跳转</button>
```



2.编写js代码

```
<script>
export default {
  name: 'app',
  components: {
  },
  methods: {
    toBanana () {
      // this.$router.push('banana')	
      // this.$router.push({path: 'banana'})
      this.$router.push({name: 'banana'})
    }
  }
}
</script>
```



### 2.4 路由器嵌套

有时候在路由器的内部需要嵌套路由器,



#### 1. 案例

比如在上面例子中的`Orange.vue`需要添加一个`RedOrange.vue`子路由器

1.编写`RedOrange.vue`

```javascript
<template>
  <div class="redOrange">
    <h1>{{title}}</h1>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '红色橙子'
    }
  }
}
</script>
<style scoped>
.redOrange{
  color: red;
}
</style>
```



2.在配置`orange`路由的地方添加`children`属性,然后`red`作为它的子路由



```
// 引入orange组件
import Orange from '@/components/Orange'
//1. 引入redOrange 
import RedOrange from '@/components/RedOrange'


var router = new Router({
	...
  routes: [
    {
      path: '/',
      // component->ng中的templateUrl
      component: Hello
    },
    {
      path: '/orange',
      name: 'orange',
      component: Orange,
      children: [		// 2. 配置red
        {
          path:'red',	//这里的path不用加'/',因为以 / 开头的嵌套路径会被当作根路径
          component: RedOrange
        }
      ]
    }
  ]
})
```



3.在需要显示子路由的地方添加`router-view`(这里再Orange.vue中显示,所以在上面的Orange.vue中添加)

```javascript
<template>
  <div class="orange">
    <h1>{{title}}</h1>	
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '橙子'
    }
  }
}
</script>
<style scoped>
.orange{
  color: orange;
}
</style>
```



4.在要触发跳转至`RedOrange`的地方,添加`<router-link to="">`,(这里直接在主页中添加)

```javascript
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to='/'>首页</router-link>
    <router-link :to="{name:'orange'}">orange</router-link>
    <router-link to='/banana'>banana</router-link>
    <button @click="getBanana">点击按钮到banana</button>
    <router-link :to="{path:'/orange/red'}">redOrange</router-link>		
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {

  },
  methods: {
    getBanana () {
        this.$router.push('banana')
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

**注:点击redOrange跳转,可以看到地址栏变为了:`http://localhost:8080/orange/red`**





### 2.5 重定向 

```
{
  path:'/',
  redirect:'/orange'
}
```

redirect：重定向地址



### 2.6 路由配合动画

我们在进行路由切换的时候,可以直接就在`<router-view></router-view>`外面包上`transition`标签

```javascript
	<transition name="fade">
      <router-view class="view"></router-view>
    </transition>
```

```css
.fade-enter-active, .fade-leave-active{
  transition: all 1s;
}
.fade-enter, .fade-leave{
  opacity: 0;
}
.view{
  position: absolute;
}
```



**使用animation.css**

1.使用CDN加速,

在index.html页面引入

```css
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
```



2.将`animation.css`文件放在`src/assets目录下`

​	1.并在index.html页面引入

```css
<link href="./src/assets/animation.css" rel="stylesheet" type="text/css">
```

​	2.或者在你要用到它的地方使用`import`调用

```css
<style>
	@import url(""); 
</style>	
```



## 第三章: vuex



> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。



**什么情况下使用vuex?**

虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 [global event bus](https://cn.vuejs.org/v2/guide/components.html#非父子组件通信) 就足够您所需了。但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。



### 3.1 安装vuex

在你项目文件目录下使用命令行:

```html
npm install vuex --save
```

> 下载完后可以在`package.json`中查看到:
>
> ```
> "dependencies": {
>     "vue": "^2.4.2",
>     "vue-router": "^2.7.0",
>     "vuex": "^3.0.0"
>   },
> ```

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。



> 1.在src目录下创建文件夹store

文件夹store中应该有

```
1. index.js
2. actions.js
3. getters.js
4. mutations.js
5. state.js
```



> 2.在index.js中要确保引用了vuex:
>
> Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：

```vue
//引入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
```



> 3.在`main.js`中要引用

通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store`访问到

```vue
new Vue({
  el: '#app',
  router,
  store,
})
```

如想要获取`store`下的`state`中的`count`

```javascript
let count = this.$store.state.count
```



### 3.2 vuex基础

vuex核心理念:

- [State](https://vuex.vuejs.org/zh-cn/state.html)
- [Getter](https://vuex.vuejs.org/zh-cn/getters.html)
- [Mutation](https://vuex.vuejs.org/zh-cn/mutations.html)
- [Action](https://vuex.vuejs.org/zh-cn/actions.html)
- [Module](https://vuex.vuejs.org/zh-cn/modules.html)



#### 1. state

单一状态树

一般用于储存初始化的一些数据

```html
export default {
  // bannar
  bannar: {},
  // 存储所有分类数据
  classifys: [],
  // 控制tabBar显示隐藏的
  tabBarShow: true,
  // 用户信息
  userInfo: {},
  // 地址列表
  sites: [],
  // 所选城市
  selectCity: '',
  // 所选的地区
  selectSite: '',
  // 所选地区的坐标
  location: {},
  // 购物车数据
  carts: [],
  // 控制购物车数量图标的动画
  cartActive: false,
  // 保存tabBar中cart标签的位置
  cartPos: {}
}
```



#### 2. getters

> Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

> 也就是用于存储一些方法,这些方法用来返回需要计算的数据

例如,存储了购物车中计算商品总数的方法

```html
export default {
  // 获取购物车中的商品总数
  cartsLen (state) {
    let result = 0
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].selected) {
        result += state.carts[i].num
      }
    }
    return result
  }
}
```



#### 3. mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation

**mutation必须同步执行!**	

Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

在上面的例子中,我们不能直接使用`store.increment`来调用函数,需要以相应的type调用store.commit方法:

```
store.commit('increment')
```



你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

```javascript
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

```javascript
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```



在实际中,会将mutations整合到一个js文件,并且每个要提交的函数都应该用大写命名,

如 : 向购物车添加商品

```

  ADD_PRODUCT_NUM (state, product) {
    state.carts.push(product)
  },
```

此函数会在action中定义



#### 4. action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。

- Action 可以包含任意异步操作。

  Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters

  让我们来注册一个简单的 action：

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    INCREMENT (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('INCREMENT')
    }
  }
})
```

> 实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```
actions: {
  increment ({ commit }) {	//将上面的context换为{commit}
    commit('INCREMENT')
  }
}
```



那么我们怎么调用`increment`这个方法呢(也就是mutations中的INCREMENT方法)

> 1.Action 通过 `store.dispatch` 方法触发：
>
> ```javascript
> store.dispatch('increment')		//触发的就是Action中的increment方法
> ```
>
> 2.在组件中使用 `this.$store.dispatch('xxx')` 分发 action
>
> ```
> this.$store.dispatch('increment')
> ```
>
> 3.或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 **mutation 必须同步执行**这个限制么？Action 就不受约束！我们可以在 action 内部执行**异步**操作：

```javascript
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {				//比如定时器这种异步操作
      commit('INCREMENT')
    }, 1000)
  }
}
```



> Actions 支持同样的载荷方式和对象方式进行分发：

```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

来看一个更加实际的购物车示例，涉及到**调用异步 API** 和**分发多重 mutation**：

```
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```



**组合 Action**

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```javascript
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```javascript
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```



#### 5. module



由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，[`vuex-router-sync`](https://github.com/vuejs/vuex-router-sync) 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。



### 3.3 vuex项目结构



Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

1. 应用层级的状态应该集中到单个 store 对象中。
2. 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
3. 异步逻辑都应该封装到 **action** 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。



对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```



## 第四章: http相关



### 4.1 promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。



####1. 基本语法:

```javascript
function async(a, b) {
    //resolve异步操作成功时调用
    //reject失败时调用
  return new Promise (function (resolve, reject) {
    
    if(...) {
      reject(new Error('出错了'));
    }
    setTimout(function () {
      resolve(a+b)
    }, 1000)
    
  })
}

async(1, 2)
	.then(function (result) {
      console.log('第一次返回的值' + result)
	}, function (error) {
      console.log('第一次的错误是' + error)
	})
```





#### 2. 传统的异步操作转promise



传统写法：

```javascript
function async(a,b,cb){
    setTimeout(function (){
        cb(a+b)
    },200)
}    
async(1,2,function (result){
    // 延迟200ms后执行
    if (result>2){
        async(result,2,function(result){
            if (result>4){
                console.log(result)
            }
        })
    }
})
```

> es6-promise写法：
>

```javascript
function async(a,b){
    //resolve异步操作成功时调用
    //reject失败时调用
    return new Promise(function(resolve,reject){

        if (typeof a !== "number" ||typeof b !== "number"){
            reject(new Error("不是一个number"));
        }
        setTimeout(function (){
            resolve(a+b);
        },1000)
    })
}
//不管是成功或者失败都会调用then这个方法
//然后接受两个函数作为参数，第一个是成功的
/*
promise:更加优雅，逻辑更加清晰
*/
async(1,'a')
    .then(function (result){
        console.log("第一次返回的值"+result)
        if (result > 2){
            return async(result,2)
        }
    },function (error){
        console.log("第一次错误:"+error)
        return 5;
    })
    .then(function (result){
        console.log("第二次返回的值"+result)
        if (result > 4){
            return async(result,2)
        }
    })
    .then(function (result){
        console.log("第三次返回的值"+result)
    })
    //catch捕获错误
    .catch(function(error){
        console.log("第二次错误:"+error)
    })
```





### 4.2  ES7的Async/Await

Async/Await应该是目前最简单的异步方案了

案例1:

要实现一个暂停功能，输入N毫秒，则停顿N毫秒后才继续往下执行。

```javascript

function sleep (time) {
  return new Promise(function (resolve, reject)) {
    setTimeout(function () {
      resolve();
    }, time)
  }
} 

var start = async function () {
// 在这里使用起来就像同步代码那样直观
  console.log('start')
  await sleep(3000)
  console.log('end)
}

start();
async function start () {
  
}
```

```
=> 控制台先输出start，稍等3秒后，输出了end。
```

在申明`start`函数时,也可以这样写:

```
async function start () {	// 表面这是一个async函数
  
}
```



#### 1. 基本规则



> 1. async 表示`这是一个async函数`，`await只能用在这个函数里面`。
>
>    ​
>
> 2. await 表示在这里`等待promise返回结果`了，再继续执行。
>
>    ​
>
> 3. await 后面跟着的`应该是一个promise对象`（当然，其他返回值也没关系，只是会立即执行，不过那样就没有意义了…）



#### 2. 获得返回值



await等待的虽然是promise对象，但不必写`.then(..)`，直接可以得到返回值。

```javascript
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 返回 ‘ok’
            resolve('ok');
        }, time);
    })
};

var start = async function () {
  	console.log('start')
    let result = await sleep(1000);	//直接用一个变量来盛放返回值
    console.log(result); // 收到 ‘ok’
};
start();
```

```
start
=>1秒后输出ok
```



#### 3. 捕捉错误

既然`.then(..)`不用写了，那么`.catch(..)`也不用写，可以直接用标准的`try catch`语法捕捉错误。

```javascript
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 模拟出错了，返回 ‘error’
            reject('error');
        }, time);
    })
};

var start = async function () {
    try {
        console.log('start');
        await sleep(3000); // 这里得到了一个返回错误
        
        // 所以以下代码不会被执行了
        console.log('end');
    } catch (err) {
        console.log(err); // 这里捕捉到错误 `error`
    }
};
```



#### 4. 循环多个await

await看起来就像是同步代码，所以可以理所当然的写在`for`循环里，不必担心以往需要`闭包`才能解决的问题。

```javascript
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 返回 ‘ok’
            resolve('ok');
        }, time);
    })
};

var start = async function () {
    for (var i = 1; i <= 10; i++) {
        console.log(`当前是第${i}次等待..`);
        await sleep(1000);
    }
};
```

```javascript
当前是第1次等待..
当前是第2次等待..
当前是第3次等待..
当前是第4次等待..
...
当前是第10次等待..
```

**值得注意的是，`await`必须在`async函数的上下文中`的。**







### 4.3 vue-resource



#### 1. 安装使用vue-resource



1.进入项目目录后安装vue-resource

```javascript
npm install vue-resource --save
```



2.在要用的地方引入vue-resource,比如在`main.js`中	

```javascript
import Resource from 'vue-resource'

//使用vue-resourece
Vue.use(Resource)
```



3.就可以开始使用`this.$http`来调用对应的方法



####2. 基本语法:

```
// global Vue object	(全局 Vue 对象)
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

//in a Vue instance		(Vue 实例)
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```



比如调用get和post请求：

```javascript
1.get:
created () {	//created是vue中的生命周期中的在某个组件一创建时执行的代码
  this.$http.get("db.json")		//获取数据
  	.then(function (result) {
      console.log(result)
  })
}  
2.post:
created () {
  this.$http.post("db.json",{user:'wang'})		//直接给db.json添加一条新数据
    .then(function (data){
    console.log(data)
  })
}
```



#### 3. http的方法

- `get(url, [options])`	//获取数据
- `head(url, [options])`
- `delete(url, [options])` //删除数据
- `jsonp(url, [options])`
- `post(url, [body], [options])` //添加数据
- `put(url, [body], [options])` //更改数据
- `patch(url, [body], [options])`



```javascript
{
  // POST /someUrl
  this.$http.post('/someUrl', {foo: 'bar'}).then(response => {

    // get status
    response.status;

    // get status text
    response.statusText;

    // get 'Expires' header
    response.headers.get('Expires');

    // get body data
    this.someData = response.body;

  }, response => {
    // error callback
  });
}
```



#### 4. get

**1. 属性值(Filter)**	

使用 `.` 操作对象属性值

```
getData () {
      this.$http.get('http://localhost:8081/products/2') //获取products数组下id为2的对象
      this.$http.get('http://localhost:8081/products?name.length=3')//获取products数组下name长度为3的对象,并整合为一个数组
      this.$http.get('http://localhost:8081/products?name.length=3&description=3')/获取products数组下name长度为3的对象,并整合为一个数组
      
        .then(res => {
          console.log(res.body)
        })
    },
```

**2. 分割(Slice)**

使用 `_start` 和 `_end` 或者 `_limit` (response中会包含 `X-Total-Count`)来获取对应的数据

```
//id从3开始到6结束(不包过3)
this.$http.get('http://localhost:8081/products?_start=3&_end=6')
id : 4 5 6
//id从3开始获取5个(不包过3)
this.$http.get('http://localhost:8081/products?_start=3&_limit=5')
id : 4 5 6 7 8 
```

**3. 排序(Sort)**

使用 `_sort` 和 `_order` (默认使用升序(ASC))

```
 //id按降序排列
 this.$http.get('http://localhost:8081/products?_sort=id&_order=DESC')
```

**4. 运算符(Operators)**	

使用 `_gte` 或 `_lte` 选取一个范围

```
// 选取浏览量在2000-2500之间的新闻

GET /news?views_gte=2000&views_lte=2500
```

使用 `_ne` 排除一个值

```
// 选择tag属性不是 "国际新闻" 的分类

GET /news?tag_ne=国际新闻
```

使用 `_like` 进行模糊查找 (支持正则表达式)

```
// 查找title中含有 "前端" 字样的新闻 

GET /news?title_like=前端
```

**5. 全文检索(Full-text search)**

上面的`_like`是在`title`中查找的,使用 `q`，在对象全部value中遍历查找包含指定值的数据

```
// 查找新闻全部字段包含 "强拆" 字样的数据

GET /news?q=强拆
```



###4.4 axios

上面介绍的`vue-resourc`e是`Vue.js`的一款插件,它可以通过`XMLHttpRequest`或`JSONP`发起请求并处理响应

但在实际应用中,`vue-resource`已经被摈弃了,而是使用`axios`

简介，在vue升级到2.0后，官方就不再更新`vue-resourece`，vue官网也不再推荐`vue-resource`作为推荐的HTTP库.转而推荐使用：axios。



#### 1. 使用axios

1.首先肯定是安装并添加到生产环节的依赖

```
cnpm install axios --save
```

2.在`main.js`中引入`axios`

然后因为axios并不是vue的插件所以不能用`Vue.use`,但可以将它添加到Vue的原型中

```
import axios from 'axios'
//将axios添加到vue的原型中
Vue.prototype.$http = axios
```

这样我们也可以像调用vue-resourece一样在组件中调用axios的方法.



#### 2. 利用axios跨域

`axios`也提供了办法进行跨域

**设置代理:**	

首先按上面的步骤下载配置axios,然后在`config/index.js`中的设置proxyTable的值为：

```javascript
proxyTable: {
      '/api': {
        target: 'http://127.0.0.1:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
```

其中 '/api' 为匹配项，target 为被请求的地址

因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的

所以需要**通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'**

如果本身的接口地址就有 '/api' 这种通用前缀，就可以把 pathRewrite 删掉



**案例:**

获取豆瓣网的书本信息

如果我们直接用:

```javascript
getDouban () {
      this.$http.get('https://api.douban.com/v2/book/1220562')	//直接请求这个地址
        .then(function (data){
          console.log(data)
        })
    }
```

会报出请求失败:

```javascript
localhost/:1 Failed to load https://api.douban.com/v2/book/1220562: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.
```



所以这时候我们可以使用代理来进行获取数据

1.按上面的步骤安装配置好`axios`

2.在`config/index.js`中的设置proxyTable的值为:

```javascript
proxyTable: {
      '/api': {
        target: 'https://api.douban.com',	//豆瓣网的接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
```

3.在`App.vue`中设计一个按钮并添加方法:

```javascript
<template>
  <div id="app">
	<button @click="getDouban">获取豆瓣服务器的数据</button>
  </div>
</template>
<script>
export default {
  name: 'app',
  methods: {
    getDouban () {
      this.$http.get('https://api.douban.com/v2/book/1220562')
        .then(function (data){
          console.log(data)
        })
    }
  }
}
</script>
<style>
</style>
```

点击按钮,可以获取到图书的信息打印在控制台中.





## 第五章: json-server插件

在前后端分离的这种工作模式下，分工明确，各司其职。前端负责展示数据，后端提供数据。然而，在这种过程中对于接口的规范 需要提前制定好。例如根据规范提前模拟数据，这个时候就比较麻烦的。JsonServer这个比较NB了,它可以快速搭建服务端环境，创建json文件，便于调用。下面是使用过程：



### 5.1 使用json-server



1.安装json-server 

```
npm install  json-server --save
```



2.修改dev-server.js

添加到`    server = app.listen(port)`之前

```
const jsonServer = require('json-server')
const aipServer = jsonServer.create()
const apiRouter = jsonServer.router('db.json') //此处的db.json是与package.json在同一目录下
const middlewares = jsonServer.defaults()


aipServer.use(middlewares)
aipServer.use(apiRouter)
aipServer.listen(port + 1, () => {
  console.log('JSON Server is running')
})
```



3.在根目录下创建并修改一个db.json文件 (如果你已经有了db.json,则省略这一步)

```
{
    "getList":[
        {
            "id":1,
            "title":"title1",
            "content":"content1"
        },
        {
            "id":2,
            "title":"title2",
            "content":"content2"
        },
        {
            "id":3,
            "title":"title3",
            "content":"content3"
        }
    ]
}
```



4.**然后CD到项目文件夹下 cd..**

```
json-server --watch data.json
```





5.在浏览器打开网址验证json-server是否启动成功 
在浏览器打开以下网址：`http://localhost:3000` (默认端口号:3000),你也可以使用如下命令修改它





成功打开地址后证明json-server安装成功，打开地址后可以看到db.json中的接口方法“getList”，点击“getList”，返回getList数据，证明可以成功调用mock数据。

1. 使用代理访问mock数据 
   我们在项目里访问什么路径会到json-server，这需要我们做一个代理。 
   4.1 修改 config文件夹中的index.js 
   修改index.js文件，在 dev 对象中的 proxyTable 设置以下代理对象

```
   {
        '/api': {
            target: 'http://localhost:8081',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/'
            }
        }
    }
```
**注:数据的访问端口不能和你项目的启动端口号相同!!!**

否则就会报出一个:

端口号已经被使用的错误

**注: 项目文件的名字也不能为`json-server`,否则也会报错**



###5.2 修改端口号

默认端口号:3000,你也可以使用如下命令修改它

```
$ json-server --watch db.json --port 3004
```



### 5.3 设置常用路由地址

当我们在进行`http`请求`json-server`数据的时候,有一些常用的路由地址,我们可以用一个`json`文件来盛放它

1.在根目录下,创建一个`routes.json`的文件,并写上你常用的路由地址:

```json
  {
    "/api/*": "/$1",
    "/:resource/:id/show": "/:resource/:id",
    "/posts/:category": "/posts?category=:category",
    "/articles\\?id=:id": "/posts/:id"
  }
```

2.将`json-server`和你的`routes.json`关联起来:

使用以下命令:

```
json-server db.json --routes routes.json
```



3.现在你可以使用以下命令来直接访问资源了

```
/api/posts # → /posts
/api/posts/1  # → /posts/1
/posts/1/show # → /posts/1
/posts/javascript # → /posts?category=javascript
/articles?id=1 # → /posts/1
```



### 5.4 json-server的关系图谱



`json-server`是非常好用的一款模拟REST API的工具,文档也很详细和全面. 详情：[json-server](https://github.com/typicode/json-server) 而其中的关系图谱是它非常强大的一个功能，可以非常方便实现多个路由之间关联数据的获取。



**案例:**	

官网上对于关系图谱的案例非常好，我这里在它示例的基础上稍以改进，进行说明，首先我这里编写了一个原始数据,`db.json`:

```
{
  "posts": [
    { "id": 1, "title": "post的第一个title", "author": "typicode" },
    { "id": 2, "title": "post的第二个title", "author": "tangcaiye" }
  ],
  "comments": [
    { "id": 1, "body": "some comment1111", "postId": 2 },
    { "id": 2, "body": "some comment2222", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}

```

这里对这个`db.json`数据内容解释一下： 这个json文件中`posts`跟`comments`是有关联的，他们的关系通过的就是`comments`下`postId`属性，`postId`对应的就是`posts`的`id`。 比如`comments`下`postId:2`的对象关联的就是posts下的`{ "id": 2, "title": "post的第二个title", "author": "tangcaiye" }`



####1. _embed	



`json-server`中的`_embed`就是用来获取包含下级资源的数据. 比如我`json-server`服务器的端口号是`8081`,然后我的请求路径是`http://localhost:8081/posts/2?_embed=comments` 这个路径获取的就是posts下的id为2的数据和它关联的comments的数据：`{ "id": 1, "body": "some comment1111", "postId": 2 }`输出结果为：

```
{
  "id": 2,
  "title": "post的第二个title",
  "author": "tangcaiye",
  "comments": [
    {
      "id": 1,
      "body": "some comment1111",
      "postId": 2
    }
  ]
}
```

####2. _expand



如果理解了`_embed`那么`_expand`它也就很轻松了,`_expand`获取的是包含上级资源的数据： 路径：`http://localhost:8081/comments/2?_expand=post` 上面这个路径获取的就是`comments`下`id`为2的数据和它关联的上级资源`post`，也就是`posts`下的： `{ "id": 1, "title": "post的第一个title", "author": "typicode" }` 输出结果：

```
{
  "id": 2,
  "body": "some comment2222",
  "postId": 1,
  "post": {
    "id": 1,
    "title": "post的第一个title",
    "author": "typicode"
  }
}
```



#### 3. 只获取下级资源



有时候我们可能想只获取下级资源，可以通过： 路径：`http://localhost:8081/posts/2/comments` 上面这个路径就是获取`posts`的`id:2`所关联的`comments`数据： 返回结果：

```
[
  {
    "id": 1,
    "body": "some comment1111",
    "postId": 2
  }
]
```

但因为`jsonserver`服务器的端口号跟我们的服务器端口不一样，也就是跨域了，所以可以在vue-cli中设置代理:



####4.总结

```
1.获取下级资源(从post => postId)
http://localhost:8081/posts/2?_embed=comments
2.获取上级资源(从postId => post)
http://localhost:8081/comments/2?_expand=post
3.只获取下级资源
http://localhost:8081/posts/2/comments
```





## 第六章: mockjs



### 6.1 基本使用



1.安装mockjs

```javascript
npm i mockjs --save
```



2.使用mockjs



在根目录下创建mock.js并编写

```javascript
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
```



3.由于Mock.js是插件,为了让人能看懂,最好在package.js中的scripts写入:

```
"mock": "node mock.js"
```





### 6.2 mockjs配合fs写入数据



在根目录下创建mock.js并编写:

```javascript
// 使用 Mock
var Mock = require('mockjs')
var fs = require('fs')
var data = Mock.mock({
  //list|1-10 数组元素个数随机范围， id|+2 属性值递增, age|20-30数值随机范围
  // test|3.2-5 3.xx-3.xxxxx 整数位3，小数位位数范围为2-5
  //'yourname|2-4': 'alice-' 重复字符串的次数范围2-4
  //常规真实数据格式，@name @color @url @first @last @image
  'list|1-10': [{'id|+2': 1 , 'age|20-30': 100}],
  'name': '@name',
  'color': '@color',
  'url': '@url',
  'email': '@email',
  'friends|3': [{name: '@name'}],
  'price|10-20.1-4': 11,
  'cost|10-20.3': 11,
  'test|3.2-5': 52,
  'yourname|2-4': 'alice-',
  'img': '@image(200x100,@color,tangcaiye)',
  'txt': '@cword(3)',
  'cname': '@cname'
  });
// console.log(JSON.stringify(data, null, 2));
// 写入到db.json
fs.writeFile('db.json', JSON.stringify(data, null, 2),  function(err) {
  if (err) {
      return console.error(err);
  }
  console.log("数据写入成功！");
});
```

`db.json`不需要我们创建,后台会自动生成一个db.json文件

执行:

```
node mockjs
```

可以看到控制台输出"数据写入成功!",此时我们的文件夹下多了一个`db.json`文件,并且其中的数据已经写好





## 第七章: json+mockjs+http案例



1.创建一个`webpack`,名为`demo`

```javascript
$ vue init webpack demo
vue-router   Y
```

2.依次使用指令

```
npm install vue-resource --save
npm install  json-server --save
npm i mockjs --save
```

3.在`main.js`引入`vue-resource`	

```
import Resource from 'vue-resource'
Vue.use(Resource)
```

4.修改`dev-server.js`	

添加到`    server = app.listen(port)`之前

```
const jsonServer = require('json-server')
const aipServer = jsonServer.create()
const apiRouter = jsonServer.router('db.json') //此处的db.json是与package.json在同一目录下
const middlewares = jsonServer.defaults()


aipServer.use(middlewares)
aipServer.use(apiRouter)
aipServer.listen(port + 1, () => {
  console.log('JSON Server is running')
})
```

5.在根目录下创建`mock.js`并编写	

```
// 使用 Mock
var Mock = require('mockjs')
var fs = require('fs')
var data = Mock.mock({
  'products|3-5': [
    {
      // id
      'id|+1': 1,
      // 商品名
      'name': '@cword(3, 5)',
      // 商品描述
      'description': '@cword(8, 15)',
      // 分类
      'category|0-3': 100,
      // 商品价格
      'price|50-300.1-2': 100
    }
  ]
})
// 写入到db.json
fs.writeFile('db.json', JSON.stringify(data, null, 2),  function(err) {
  if (err) {
      return console.error(err);
  }
  console.log("数据写入成功！");
});
```

6.由于`Mock.js`是插件,为了让人能看懂,最好在`package.json`中的`scripts`写入:	

```
"mock": "node mock.js"
```

7.在`App.vue`中编写:

```javascript
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <HelloWorld/> -->
    <br>
    <button @click="getData">获取json-server的数据</button>
    <button @click="postData">添加一条记录</button>
    <button @click="putData">更改id为2的商品数据</button>
    <button @click="delData">删除id为3的商品数据</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  created () {
    // 也可以在组件创建时就获取数据
    /* this.$http.get('http://localhost:8081/products')
      .then(function (res) {
        console.log(res.body)
      }) */
    
  },
  components: {
    HelloWorld
  },
  methods: {
    getData () {
      this.$http.get('http://localhost:8081/products/2') //json-server的端口号是监听的端口号+1
        .then(res => {
          console.log(res.body)
        })
    },
    postData () {		//添加数据
      let obj = {
        "name": "彭利兵",
        "description": "的所发生的开发的是九分裤哈哈哈",
        "category": 3,
        "price": 432.1
      }
      this.$http.post('http://localhost:8081/products', obj)
        .then(res => {
          console.log(res.body)
        })
    },
    putData () {			//更改数据
      let newObj = {
        "id": 2,
        "name": "军到话xx",
        "description": "例六每题意目改从且道省系目心听aa",
        "category": 1,
        "price": 235.3
      }
      this.$http.put('http://localhost:8081/products/2', newObj)
        .then(res => {
          console.log(res.body)
        })
    },
    delData () {			//删除数据
      this.$http.delete('http://localhost:8081/products/3')
        .then(res => {
          console.log(res.body)
        })
    }
  }
}
</script>
<style>
</style>
```



## 第八章: ESlint

`ESLint`就是一个Lint工具，它是由js红宝书的作者创立的一个开源项目.旨在为大家提供一个可扩展、每条规则独立、不内置编码风格的语法检测工具，`ESLint`相比`JSLint`它被设计成完全可配置的.每一条规则都是一个插件，用户完全可以根据自己的需求来选择使用哪些规则.比如报错就分为`警告`和`错误`两个等级，或者禁用



### 2.1 使用ESlint

在安装`vue-cli`提示是否安装`ESLint`的时候选择y,然后选择标准(standard)安装。



如果你想让 ESLint 成为你项目构建系统的一部分，我们建议在本地安装。你可以使用 npm：

1.命令行输入:

```
$ npm install eslint --save-dev
```

会看到根目录下多出了:

`eslintgnore`和`eslintrc.js`俩个文件

紧接着你应该设置一个配置文件：

```
$ ./node_modules/.bin/eslint --init

```

之后，你可以在你项目根目录运行 ESLint：

```
$ ./node_modules/.bin/eslint yourfile.js

```

使用本地安装的 ESLint 时，你使用的任何插件或可分享的配置也都必须在本地安装。



## 第九章: Element-ui

**桌面端:**	

Element UI 是一套采用 Vue 2.0 作为基础框架实现的组件库，它面向企业级的后台应用，能够帮助你快速地搭建网站，极大地减少研发的人力与时间成本。

仓库地址： <https://github.com/ElemeFE/element>

文档地址： <http://element.eleme.io/#/>

## 9.1 安装使用Element-ui



**1. CDN**

```
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```



**2. npm 安装**	

1.安装Element-ui

```
$ npm i element-ui -S			//-S 等同于--save
```

2.引用element-ui

在`main.js`文件下:

```javascript
// 引入ElementUI
import ElementUI from 'element-ui'
// 引用样式
import 'element-ui/lib/theme-default/index.css'
// 使用
Vue.use(ElementUI)
```



## 第十章: Mine-ui

移动端:

GitHub：[https://github.com/ElemeFE/mint-ui**](http://link.zhihu.com/?target=https%3A//github.com/ElemeFE/mint-ui)

项目主页：[http://mint-ui.github.io/#!/zh-cn**](http://link.zhihu.com/?target=http%3A//mint-ui.github.io/%23%21/zh-cn)

Demo：[http://elemefe.github.io/mint-ui/#!/**](http://link.zhihu.com/?target=http%3A//elemefe.github.io/mint-ui/%23%21/)

文档：[http://mint-ui.github.io/docs/#!/zh-cn](http://link.zhihu.com/?target=http%3A//mint-ui.github.io/docs/%23%21/zh-cn)



**1. CDN**

```
https://cdn.rawgit.com/ElemeFE/mint-ui/master/lib/index.js
https://cdn.rawgit.com/ElemeFE/mint-ui/master/lib/style.css
```





1.安装:

```
npm i mint-ui -S
```



2.引用方式:

​	1.在要使用的它的组件里使用:

```javascript
<script>
	import { MessageBox } from 'mint-ui'
</script>
```

​	2.直接在`main.js`引入(全局使用)

```
// 引入全部组件
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);

// 按需引入部分组件
import { Cell, Checklist } from 'minu-ui';
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
```



