var express = require('express');
var router = express.Router();               //路由模块
var User = require('../models/User');    //数据表模型

var Webcontent=require('../models/Webcontent');
var fs=require('fs');
//引入一个路径模块
var url =require("url");

//引入处理上传文件信息的模块
var Formidable=require('formidable');

// 统一返回格式
var responseData;

router.use(function(req, res, next) {
  responseData = {
    code: 0,
    message: '',


  }

  var userxinxi='';

  next();
});

//注册处理逻辑，接收注册页面的post的req.body请求
router.post('/user/register', function(req, res, next) {
  var username = req.body.username;
  var name = req.body.name;
  var password = req.body.password;
  var repassword = req.body.repassword;

  if (username == '') {
    responseData.code = 1;
    responseData.message = "用户名不能为空";
    res.json(responseData);  // 直接返回包装后的json数据，下同
    return;
  }
    if (name == '') {
        responseData.code = 2;
        responseData.message = "用户名不能为空";
        res.json(responseData);
        return;
    }

  if (password == '') {
    responseData.code = 2;
    responseData.message = "密码不能为空";
    res.json(responseData);
    return;
  }
  if (password != repassword) {
    responseData.code = 3;
    responseData.message = "两次输入的密码不一致";
    res.json(responseData);
    return;
  }

  // 数据库查询避免重复
  User.findOne({
    username: username
  }).then(function(userInfo) {
    if (userInfo) {
      responseData.code = 4;
      responseData.message = "用户名已被注册";
      res.json(responseData);
      return;
    }

    // 保存注册信息到到数据库，这里操作的是抽象模型
    var user = new User({
      username: username,
        name: name,
      password: password
    });
    return user.save();
  }).then(function(newUserInfo) {
    responseData.message = "注册成功";
    res.json(responseData);
  });
});

router.post('/user/login', function(req, res, next) {
  var username = req.body.username;

  //通过传过来的用户名查找数据库中的头像url



  var password = req.body.password;

  if (username == '' || password == '') {
    responseData.code = 1;
    responseData.message = "用户名或密码不能为空";
    res.json(responseData);
    return;
  }

  // 查询数据库是否有用户
  User.findOne({
    username: username,
    password: password
  }).then(function(userInfo) {
    if (!userInfo) {
      responseData.code = 2;
      responseData.message = "用户名或密码错误";

      res.json(responseData);
      return;
    }
    // 存在用户



    responseData.message = "登录成功";
    responseData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username,
        name:userInfo.name

    };

//返回头像url


    User.findOne({
      username: username
    }).then(function(user){

      avatarUrl=user.avatarUrl;
      name=user.name;
      weixin=user.weixin;
      qq=user.qq;
      fensi=user.fensi;
      xihuan=user.xihuan;
      huida=user.huida;
      fangwen=user.fangwen;
      jifen=user.jifen;
      yuanchuang=user.yuanchuang;
      paiming=user.paiming;
      fanwen=user.fanwen;
       id=user._id;

        res.json(avatarUrl);
        res.json(qq);
        res.json(fensi);
        res.json(xihuan);
        res.json(name);
        res.json(huida);
        res.json(fangwen);
        res.json(jifen);
        res.json(fanwen);
        res.json(paiming);
        res.json(yuanchuang);


    });

    //设置cookies
    req.cookies.set('userInfo', JSON.stringify({


      _id: userInfo._id,
      username: userInfo.username,


    }));
    res.json(responseData);


    return;
  })


});


//头像上传

// logout
router.get('/user/logout', function (req, res) {
  req.cookies.set('userInfo', null);
  res.json(responseData);
});

// // 评论提交
// router.post('/comment/post', function(req, res) {
//   // 内容的ID
//
//   var contentId = req.body.contentid || '';
//
//
//
//     // 查询数据库是否有用户
//     User.findOne({
//         username: req.userInfo.username,
//
//     }).then(function(userInfo) {
//
//
//        if(userInfo){
//            var name=userInfo.name;
//
//            var userid=req.userInfo.id
//
//        }
//        else{
//            var name="游客发言";
//
//            var userid="545";
//
//        }
//
//       if(userInfo.avatarUrl){
//
//         var avatarUrl= userInfo.avatarUrl;
//       }else {
//
//           var avatarUrl = "http://blog-1253427454.file.myqcloud.com/lunbo-imgs/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg?sign=Aag3LyweGVD9EKan4pyn7yfk5h1hPTEyNTM0Mjc0NTQmaz1BS0lERk5LNWYzR256NHlpR3l4cXp5bE1reENLbTlLaHA3YlomZT0xNTE5NjM1NjkyJnQ9MTUxNzA0MzY5MiZyPTQ2Nzk3MDMxOSZmPS9sdW5iby1pbWdzLyVFOSVCQiU5OCVFOCVBRSVBNCVFNSVBNCVCNCVFNSU4MyU4Ri5qcGcmYj1ibG9n";
//
//
//       }
//
//
//         var postData = {
//             id:userid,
//             img:avatarUrl,
//             replyName: name,
//             beReplyName:"回复人",
//             content: req.body.content,
//             time: new Date(),
//             address:"",
//             osname:"",
//             replyBody:[]
//
//         }
//
//         //查询当前这篇文章的信息
//         Webcontent.findOne({
//             _id: contentId
//         }).then(function (content) {
//             content.comments.push(postData)
//             return content.save()
//         }).then(function (newContent) {
//             responseData.message = '评论成功'
//             responseData.data = newContent;
//
//             res.json(responseData);
//
//         });
//
//
//         });
//
//
// });

// 获取制指定文章评论
// router.get('/comment', function(req, res) {
//     var contentId = req.query.contentid || '';
//
//     Webcontent.findOne({
//         _id: contentId
//     }).then(function(content) {
//         responseData.data = content.comments;
//
//         res.json(responseData.data);
//
//         // res.json(content);
//
//     });
// });
module.exports = router;
