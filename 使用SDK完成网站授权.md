# 使用SDK完成网站授权

## 0. 开始之前

1. [注册SEA新浪云](http://sae.sina.com.cn/)

2. [注册微博开放平台](http://open.weibo.com)

3.  [下载SDK](https://github.com/xiaosier/libweibo)

   > **sdk （软件开发工具包）**
   > 软件开发工具包（外语首字母缩写：SDK、外语全称：Software Development Kit）一般都是一些软件工程师为特定的软件包、软件框架、硬件平台、操作系统等建立应用软件时的开发工具的集合。
   > 软件开发工具包括广义上指辅助开发某一类软件的相关文档、范例和工具的集合。

   ​

## 1. 创建应用

### 1.1 创建微博应用

![](http://oud7r3twh.bkt.clouddn.com/17-11-3/32517670.jpg)

创建完成后进入应用详情

![](http://oud7r3twh.bkt.clouddn.com/17-11-3/76745212.jpg)

记录`App Key ` 和`App Secret `



### 1.2 创建服务器

[新浪云](http://sae.sina.com.cn/)

![](http://oud7r3twh.bkt.clouddn.com/17-11-3/10231996.jpg)

语言: PHP , 环境: 标准环境 , 版本 : 5.6

![](http://oud7r3twh.bkt.clouddn.com/17-11-3/73285685.jpg)



创建完成后, 记录域名



## 2. 配置

### 2.1 配置SDK

解压SDK压缩包后, 打开` config.php` 文件

把之前记录的`App Key ` ,`App Secret ` 以及域名填写到文件中

```php
<?php
header('Content-Type: text/html; charset=UTF-8');

define( "WB_AKEY" , 'xxxxxxxxxx' );
define( "WB_SKEY" , 'xxxxxxxxxxxxxxxxxxxxxxxxx' );
define( "WB_CALLBACK_URL" , 'http://xxxxxxxxxxxx/callback.php' );
```

域名后的`/callback.php `需要保留

如:` define( "WB_CALLBACK_URL" , 'http://testqqsdk.applinzi.com/callback.php' );`

配置完成后打包(必须为`.zip`格式)

### 2.2 配置微博应用

![](http://oud7r3twh.bkt.clouddn.com/17-11-3/94929180.jpg)

把前一步最后的回调地址填写进入授权回调页, 提交

### 2.3 配置服务器

![](http://oud7r3twh.bkt.clouddn.com/17-11-3/23638921.jpg)

回到服务器控制台, 上传之前打包的SDK , 访问`testqqsdk.applinzi.com` 即可进入授权页面



### 

