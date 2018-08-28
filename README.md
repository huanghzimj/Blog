# SKY
nodejs-express+mongodb+redis+vue.js+bootstrap+layui+socketio 实现.



## 这是一个仿知乎论坛博客系统。

个人纯碎为了练习nodejs而做出来的一个系统，给个Star就是我最大的动力！


#### 首页

![](https://raw.githubusercontent.com/huanghzimj/Blog/master/demo/ford-img/index.png)





## 用Node.JS+MongoDB搭建仿知乎论坛博客系统逐行代码分析：


## 技术选型：

* 后台：采用Express作为框架 MongoDB作为数据库 swig作为模板引擎  

* 前台：采用jQuery vue.js 库 Bootstrap 、layui作为前端UI框架
 
## 功能

* 文章：发布文章，文章分类，删除文章 获取访问用户的地理位置

## 目录结构：

```
data  数据库文件夹
model 模块目录
---- db.js      封装了对数据库的操作（增删改查）
---- md5.js     封装了md5加密函数
---- setting.js 封装了对数据库的接口
node_modules 项目依赖包
public 静态资源目录
routers 路由目录
---- router.js  对请求接口的统一处理
views 模板目录
app.js 入口文件
package.json 文件依赖配置包
```

## Install

##### 安装EJblog前要先安装node环境和MongoDB数据库，具体安装请自行Google。

##### 作为例子，我已经写入一些数据可提供使用观看。数据库位置在db文件夹内

第一步：

安装依赖包

```
  npm install
```

第二步：

启动MongoDB数据库和保存数据库的位置,db是相对路径。
```
  mongod --dbpath  ”db文件夹的绝对路径“
```

第三步：

```
  node app.js
```
#### 登陆后台(localhost:8082/login) 帐号：333 密码：111



#### 个人信息编辑页

![](https://raw.githubusercontent.com/huanghzimj/Blog/master/demo/ford-img/jianli.png)

#### 文章内容页

![](https://raw.githubusercontent.com/huanghzimj/Blog/master/demo/ford-img/neirong.png)

#### 平台消息页面

![](https://raw.githubusercontent.com/huanghzimj/Blog/master/demo/ford-img/message.png)

#### 个人主页

![](https://raw.githubusercontent.com/huanghzimj/Blog/master/demo/ford-img/zhuye.png)


#### 数据库截图

![](https://raw.githubusercontent.com/huanghzimj/Blog/master/demo/ford-img/sql.png)

#### 后台管理页面

![](https://raw.githubusercontent.com/huanghzimj/Blog/master/demo/ford-img/admin.png)
