## 事件对象

### 第一章: DOM2事件

	#### 1.addEventListener()

> ​	语法:	element.addEventListener( event,function(){ },boolean);

​	参数1:	必写	要添加的事件		这里直接用" "或者 ' ' 将事件名添加进去就行, 如  'click'	'mouseover'	等等.

​	参数2: 	必写	事件处理程序的函数		

​	参数3:	可选	true/false	true : 捕获	false/不写: 冒泡(默认)

如给按钮添加click事件,以下三个例题效果相同

**把事件名和函数都写在DOM2内:**

例1:

```
btn.addEventListener('click', function( ){	
		console.log('click  1');
})
```

**也可以把函数写在DOM2事件外面, 并在DOM2内引用:**

如例2:

```
	function foo(){
		console.log('click  1');
}
	btn.addEventListener('click', foo );	
```

**函数在外声明,并在DOM2事件内部赋值:**	

如例3:

```
	var foo;
	btn.addEventListener('click', foo = function( ){	
			console.log('click  1');
})
```

#### 2.removeEventListener()

​	移除事件

​	语法以及参数和addEventListener相同

​	但要移除的事件,它的事件处理程序的函数名必须相同

​	

### 第二章:event

​	

|          属性/方法           |    类型    |                    说明                    |
| :----------------------: | :------: | :--------------------------------------: |
|           type           |  string  |                 被触发的事件类型                 |
|          target          | element  |              指的是目标元素,最内层元素               |
|      currentTarget       | element  |    其事件处理程序当前正在处理事件的那个元素(注册事件处理程序的元素)     |
|         bubbles          | boolean  |                  事件是否冒泡                  |
|        eventPhase        | integer  |        得到事件所处的阶段,1:捕获 2:目标节点 3:冒泡        |
|     stopPropagation      | Function |          取消事件的进一步向其他元素节点捕获或者冒泡           |
| stopImmediatePropagation | Function | 立即停止传播,效果和stopPropagation一样,但它也会取消同一元素的其他监听器捕获或冒泡 |
|      preventDefault      | Function |       取消事件的默认行为(如阻止submit事件的提交行为)        |
|        cancelable        | Boolean  |             表明是否可以取消事件的默认行为              |
|     defaultPrevented     | Boolean  |  表明是否调用了preventDefault事件,即是否取消了事件的默认行为   |
|                          |          |                                          |
|                          |          |                                          |



实例:

```javascript
<div class="div">					//给div添加样式: width:100px;height:100px;background:red;
    <button class="btn">点击</button>
</div>
```

##### 1.type: 

> 被触发的事件类型

返回类型string

```javascript
var div = document.querySelector('.div');
var btn = document.querySelector('.btn');
    btn.addEventListener('click',function(event){
        console.log('btn事件');       //btn事件
        console.log(event.type);      //click
    })
```

##### 2.target 和 currentTarget :

> 指的是目标元素,最内层元素

 返回的是整个元素

```javascript
div.addEventListener('click',function(event){	//给div添加点击事件
    console.log(event.target);    
  	console.log(event.currentTarget);	
})
若点击的是div,没点在按钮上 ,俩个返回的都是 <div>..</div>
若点击的是按钮:
  			target	<button class="btn">点击</button>//返回的是div的最内层元素btn
            currentTarget	<div>..</div> //返回的是当前正在处理的元素,也就是add前面的元素
```
##### 3.bubble: 

> 是否是冒泡事件

返回布尔类型,是否是冒泡事件

```javascript
btn.addEventListener('click',function(event){
  console.log(event.bubble);	//true;			//click事件是冒泡事件,所有返回true;	
})
btn.addEventListener('mouseenter',function(event){
  console.log(event.bubble);	//false;
})
```

##### 4.stopPropagation:

一个方法   event.stopPropagation( );

> 取消事件的进一步向其他元素节点捕获或者冒泡

```javascript
//例1:
btn.addEventListener('click',function(event){
   console.log('btn');	
   event.stopPropagation();				//给按钮添加
})
div.addEventListener('click',function(event){ 		//给div添加第一个点击事件
   console.log('div1');					
})
div.addEventListener('click',function(event){		//给div添加第二个点击事件
   console.log('div2');				
})
```

| 事件类型 | 事件元素 | 是否添加event.stopPropagation(); |    返回值     |
| :--: | :--: | :--------------------------: | :--------: |
|  点击  | btn  |              是               |    btn     |
|  点击  | div  |                              | div1  div2 |

```javascript
//例2:
btn.addEventListener('click',function(event){
   console.log('btn');	
})
div.addEventListener('click',function(event){		//给div添加第一个点击事件
   console.log('div');	
   event.stopPropagation();				//给div添加
})
div.addEventListener('click',function(event){		//给div添加第二个点击事件
   console.log('div2');				
})
```

| 事件类型 | 事件元素 | 是否添加event.stopPropagation(); |       返回值        |
| :--: | :--: | :--------------------------: | :--------------: |
|  点击  | btn  |                              | btn   div1  div2 |
|  点击  | div  |              是               |    div1  div2    |

##### 5.stopImmediatePropagation

一个方法   event.stopImmediatePropagation( );

> 立即停止传播,效果和stopPropagation一样,但它也会取消同一元素的其他监听器捕获或冒泡

```javascript
//例3:
btn.addEventListener('click',function(event){
   console.log('btn');	
})
div.addEventListener('click',function(event){ 		//给div添加第一个点击事件
   console.log('div1');	
   event.stopImmediatePropagation();				
})
div.addEventListener('click',function(event){		//给div添加第二个点击事件
   console.log('div2');				
})
```

| 事件类型 | 事件元素 | 是否添加event.stopImmediatePropagation() |   返回值    |
| :--: | :--: | :----------------------------------: | :------: |
|  点击  | btn  |                                      | btn div1 |
|  点击  | div  |                  是                   |   div1   |

可以看到例2和例3中,同样是给div 和 btn 添加相同的事件,但event事件的类型不同,

例2中的stopProgation( ) 只能阻止它传播给给其他元素节点捕获或者冒泡,对于自身元素要还有其他的监听事件则不能阻止

例3中的stopImmediatePropagation( ) 既可以阻止前者,也能阻止后者;

##### 6.preventDefault

一个方法 event.preventDefault( );

> 取消事件的默认行为(如阻止submit事件的提交行为)

```javascript
<form action="http://www.baidu.com">
    <input type="text" name="user">
    <input type="submit" value="提交">
</form>
<script>
	var form = document.querySelector("form");
    form.addEventListener("submit", function (event){
        event.preventDefault();  // 阻止默认行为	点击按钮,不能提交
    });
```

若没有event.preventDefault( ); 	点击提交按钮,网页则会跳转到百度首页

##### 7.cancelable

> 表明是否可以取消事件的默认行为

返回布尔类型

##### 8.defaultPrevented

> 表明是否调用了preventDefault事件,即是否取消了事件的默认行为

返回布尔类型

##### 9.事件的触发

可以在一个定时器内放入点击事件,从而达到模拟用户点击按钮



的效果

```
btn.onclick = function (e){
        console.log("click...");
        console.log(e.isTrusted);
    }
    setInterval(function (){
        btn.click();  // 模拟用户的点击
    }, 500)
```



### 第三章:event事件的高级属性

#### 1.offsetX和offsetY


> ​	光标相对于触发元素边界的X、Y坐标
>
> ​	其实是光标相对于触发元素的**==左上角==**的坐标。(把左上角的位置看做0，0)

#### 2.screenX和screenY

> ​	当前光标相对于屏幕边缘的x、y坐标
>
> ​	其实就是相对于屏幕左上角的坐标。(可以看出是绝对坐标)

#### 3.clientX和clientY

> 当前光标相对于浏览器浏览器窗口客户区域左上角的坐标(客户区域不包括状态栏、菜单栏等。)

![img3](E:\JavaScript\DomImg\img3.png)