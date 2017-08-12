## 日期对象和万年历

### 1.创建Date()对象（日期和时间的对象）

JavaScript中的 Date 类型是在早期 Java 中的 java.util.Date 类基础上构建的。

为此， Date类型使用自 UTC 1970 年 1 月 1 日午夜（零时）开始经过的毫秒数来保存日期。

在使用这种数据存储格式的条件下， Date 类型保存的日期能够精确到 1970 年 1月 1 日之前或之后的 285 616 年。



> **使用new 和 Date()构造方法创建一个日期对象：**

var box = new Date( );  //创建一个时间和日期对象；

alert(box);  //不同浏览器显示不同；

支持格式:

```javascript
<body>
    <script type="text/javascript">
      	var d = new Date(23231424214);					//支持格式1:毫秒
        var d1 = new Date("May 31, 2016 09:00:00");    	//支持格式2：英文月 日,年 时:分:秒 例如：May 23, 2016 09:00:00
        console.log(d1);    //Tue May 31 2016 09:00:00 GMT+0800 (中国标准时间)
        var d2 = new Date("2016-11-12");				//支持格式3：年-月-日 例如：2016-11-11
        console.log(d2);    //Sat Nov 12 2016 08:00:00 GMT+0800 (中国标准时间)
        var d3 = new Date("2016/11/12");				//支持格式4：年/月/日 例如：2016/11/11
        console.log(d3);    //Sat Nov 12 2016 08:00:00 GMT+0800 (中国标准时间)
    </script>
</body>
```

**在调用Date构造方法里面是可以传参数的，不传参的情况下，新建的对象默认获取当前的时间和日期；**

**注:**	

**Date()的静态方法**

> Date.parse() 和Date.UTC() 的使用方法:

1.var box = new Date(Date.parse(1999,09,15)); 

 alert(box);

2.var box = new Date(1999,09,15);  

alert(Date.parse(box));  		 ()里可以有参数

**Date()的其他方法:**

> Date.toString(); 			 ()里没有参数;
>
> toString()方法一般返回带有时区信息的日期和时间。

如:  var box =new Date();   

  alert(box.toString());

> Date.toLocaleString( );

toLocaleString( )

返回符合本地习惯的日期和时间格式;

> valueOf( )

valueOf()方法不返回字符串，而是返回的代表这个时间的毫秒值。

**一般用用来比较两个日期的大小，就知道谁在前谁在后了。**

> getTime( )

和valueOf( ) 一样

> 例:

var box = new Date(1996,09,15,14,13,12);  

alert(box);                     //Tue Oct 15 1996 14:13:12 GMT+0800 (中国标准时间)    

alert(box.toString());          //Tue Oct 15 1996 14:13:12 GMT+0800 (中国标准时间)    

alert(box.toLocaleString());    //1996/10/15 下午2:13:12    

alert(box.valueOf());           //845359992000

**PS:不同浏览器显示的格式可能不同**	



### 2.Date()的“静态”方法

**情况一:**	

将一个2008/09/08转换为标准的时间模式:

**方法一:**

**直接利用Date(),系统会自动调用Date.parse()方法;**	

**new box = new Date('2008/09/08');**

​         '2008,09,08'         

​          2008,09,08

​	alert(box);

​	**错误写法:          2008/09/08**

**方法二:**	

调用Date.parse()方法来实现;

alert(Date.parse('2008/09/08'))                

​                              '2008,09,08'         

 		              2008,09,08

 		错误写法:    

​	      2008/09/08

**情况二:将一个毫秒数转换为标准的时间模式:**

new box = new Date(1175875200000);

alert(box);

**错误写法:        '1175875200000'**

#### 1.Date.parse( )

将'2008/09/08'和毫秒数等格式转换为标准格式;

**正确格式:**

alert(Date.parse(2008,04));

alert(Date.parse('2008,04'));

alert(Date.parse('2008/04'));

**错误格式:**	

alert(Date.parse(2008/04));

alert(Date.parse(11782882933));

**例1：**

var box = new Date();

alert(Date.parse('4/7/2007');       

   //返回的是一个毫秒数；

#### 2.Date.UTC( )

UTC  世界协调时间;按照它的区域基准来计算;

北京东八区的时间比它早8个小时;

**Date.UTC()同样也返回毫秒数**，

但他与Date.parse()在构造时使用不同的信息；

0表示1月,1表示2月,

月[0~11]                 

日[1~31]                 

小时[0~23]

(注:Date.UTC()必须传入年份和月份)

> 写法一:

放在Date()中返回的是世界协调时间;

(Date()会自动再给获取到的毫秒数(此毫秒数为世界协调时间的毫秒数)转为标准时间)

new box = new Date(Date.UTC(2011,11))

alert(box);

> 写法二:

直接当方法用返回的是毫秒数;

alert(Date.UTC(2011,11));     //和Date.parse()一样，若是传参错误，返回NaN等错误信息，不同浏览器不同；

### 3.日期组件方法

#### 1.getTime( )

​	获取表示这个时间的那个毫秒值

```
var d = new Date();
d.setTime(8998778999)
```

#### 2.getFullYear( )

​	获取年份

```
d.getFullYear();
```

​	setFullYear( );

如设置一个 获取是一年中的第几天	的函数

```
console.long(getDatesOfYear(new Date(2017,3,10)));		//注:要用new Date() 包着
方法一:
function getDatesOfYear(year,month,date){		//利用年月日来获取天数
  var temp = 0;
  for(var i = 1; i < month ; i++){				
    temp+=getDatesOfMonth(year,month);			//调用了4.getDate()例题中的函数,用以获取这个月有几天
  }
  temp += date;									
  return temp;
}
方法二:
function getDatesOfYear(date){					//利用组件来获取天数
  var temp = 0;
  for(var i = 1; i < date.getMonth()+1 ; i++){
    temp+=getDatesOfMonth(date.getFullYear(),i);
  }
  temp += date.getDate();
  return temp;
}
=>69
```

#### 3.getMonth( )

​	获取月份

```
d.getMonth();			//0 ~ 11 获取月份
```

​	setMonth(-1);			// 1

#### 4.getDate( )

​	获取是一个月中的第几天

```
d.getDate();	
```

​	setDate( );

如设置一个  输入年月,获取这个月有几天  的函数

```
console.log(2017,3)
function getDatesOfMonth(year,month){  			 //年份,月份(1月即1)
          var d = new Date(year,month,0);    	 //这里面的month是实际月份+1,0表示上个月最后一天
          return d.getDate();
      }
      => 31
```

#### 5.getDay( )

​	获取是一周中的第几天,只能获取不能设置	(0~6  0代表星期天)

#### 6.getHourse( )

​	获取小时

```
d.getHourse();
```

​	setHourse( );

#### 7.getMinutes( )

​	获取分钟

```
d.getMinutes();
```

​	setMinutes( );

#### 8.getSeconds( )

​	获取秒钟

```
d.getSeconds();
```

​	setSeconds( );