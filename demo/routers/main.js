var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Web=require('../models/Web');
var Webcontent=require('../models/Webcontent');
var Javaweb=require('../models/Javaweb');
var Anzhuang=require('../models/Anzhuang');
var C=require('../models/C');
var Chengxurensheng=require('../models/Chengxurensheng');
var Houtai=require('../models/Houtai');
var Jichu=require('../models/Jichu');
var Node=require('../models/Node');
var Php=require('../models/Php');
var Shujuku=require('../models/Shujuku');
var Yidong=require('../models/Yidong');
var Qukuai=require('../models/Qukuai');



//引入文件操作模块
var fs=require('fs');
//引入一个路径模块
var url =require("url");

//引入处理上传文件信息的模块
var Formidable=require('formidable');


var usermessage;


// 首页
router.get('/', function(req, res, next) {

    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Webcontent.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
       data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
    return Webcontent.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
        addTime:-1
    });
    }).then(function(contents){

        data.contents=contents;
        res.render('main/list',data);
        })

});

//用户写文章展示
router.get('/xiewenzhang',function(req,res){
    var id=req.userInfo._id;
        User.findOne({
            _id: id
        }).then(function(user) {
            res.render('main/xiewenzhang', {
                userInfo: req.userInfo,
                user:user,
            });
            })
});
//用户写文章提交保存
router.post('/xiewenzhang',function(req,res){

    var moxing;
    var category;
    switch( req.body.rout){
        case "JavaWeb": moxing=Javaweb;category="5abc5293d26a1f39d8c61034";
            break;
            case "Php": moxing=Php;category="5abd9b87fe667e13fcb156b2";
            break;
        case "Node.js": moxing=Node;category="5abda768fe667e13fcb156cb";
            break;
        case "软件安装": moxing=Webcontent;category="5a40e4fea4f2231a18e57f12";
            break;
        case "C/C++": moxing=C;category="5abda641fe667e13fcb156bf";
            break;
        case "程序人生": moxing=Chengxurensheng;category="5abda67efe667e13fcb156c2";
            break;
        case "后台开发": moxing=Houtai;category="5abda6cffe667e13fcb156c5";
            break;
        case "计算机基础": moxing=Jichu;category="5abda70cfe667e13fcb156c8";
            break;

        case "数据库": moxing=Shujuku;category="5abda7c1fe667e13fcb156d1";
            break;

        case "移动开发": moxing=Yidong;category="5abda823fe667e13fcb156d4";
            break;
        case "区块链": moxing=Qukuai;category="5abda795fe667e13fcb156ce";
            break;

        default:
            // 错误参数跳转首页
            res.render('main/index');
            return;
    }


    var text = new moxing({
        title: req.body.title,
        jianjie: req.body.jianjie,
        userId: req.userInfo._id,
        content: req.body.wenzhangtext,
        category:category
    });

    return text.save().then(function(sd) {

        res.render('main/success', {
            userInfo: req.userInfo,
            message: "发表文章成功",
            url: '/'
        });

});


});






// Javaweb首页
router.get('/Javaweb', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Javaweb.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Javaweb.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});

//软件安装

router.get('/Anzhuang', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Anzhuang.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Anzhuang.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});

//C/C++

router.get('/C', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    C.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return C.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});

//程序人生

router.get('/Chengxurensheng', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Chengxurensheng.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Chengxurensheng.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});
//后台设计

router.get('/Houtai', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Houtai.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Houtai.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});
//计算机基础

router.get('/Jichu', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Jichu.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Jichu.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});

//Nodejs

router.get('/Node', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Node.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Node.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});

//Php

router.get('/Php', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Php.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Php.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});

//区块

router.get('/Qukuai', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Qukuai.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Qukuai.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});
//数据库

router.get('/Shujuku', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Shujuku.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Shujuku.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })
});
//首页

router.get('/Webcontent', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Webcontent.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Webcontent.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })
});
//移动开发

router.get('/Yidong', function(req, res, next) {


    var data = {
        userInfo: req.userInfo,

        page : Number(req.query.page || 1),
        limit :8,
        pages : 0,
        count:0,
        contents:[]
    };

    Yidong.count().then(function (count){
        data.count=count;

        data.pages = Math.ceil( data.count/data.limit )
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)        //取值不能小于1
        var skip = (data.page - 1)*data.limit
        return Yidong.find().limit(data.limit).skip(skip).populate(['Webcontent','userId','category']).sort({
            addTime:-1
        });
    }).then(function(contents){


        data.contents=contents;

        res.render('main/list',data);
    })


});
// 阅读原文
router.get('/view', function(req, res) {
  var contentId = req.query.contentid || '';
 var moxing;
  switch( req.query.fenlei){
      case "Javaweb": moxing=Javaweb;
          break;
      case "Webcontent": moxing=Webcontent;
          break;
      case "Anzhuang": moxing=Anzhuang;
          break;
      case "C": moxing=C;
          break;
      case "Chengxurensheng": moxing=Chengxurensheng;
          break;
      case "Houtai": moxing=Houtai;
          break;
      case "Jichu": moxing=Jichu;
          break;
      case "Node": moxing=Node;
          break;
      case "Php": moxing=Php;
          break;
      case "Shujuku": moxing=Shujuku;
          break;
      case "Yidong": moxing=Yidong;
          break;
      case "Qukuai": moxing=Qukuai;
          break;

      default:
          // 错误参数跳转首页
          res.render('main/index');
         return;
  }

     var cc={
         content:[],
         userInfo: req.userInfo,
         moxing:req.query.fenlei,
    };

    moxing.findOne({
    _id: contentId
  }).populate(['category','userId']).then(function(content) {

      cc.content=content;

        content.yuedu++;
        content.save();

      res.render('main/wenzhangye',cc);


  });


    });

//文章点赞、
router.post('/view/dianzan', function(req, res) {

    var moxing;
    switch( req.body.name){
        case "Javaweb": moxing=Javaweb;
            break;
        case "Webcontent": moxing=Webcontent;
            break;
        case "Anzhuang": moxing=Anzhuang;
            break;
        case "C": moxing=C;
            break;
        case "Chengxurensheng": moxing=Chengxurensheng;
            break;
        case "Houtai": moxing=Houtai;
            break;
        case "Jichu": moxing=Jichu;
            break;
        case "Node": moxing=Node;
            break;
        case "Php": moxing=Shujuku;
            break;
        case "Shujuku": moxing=Shujuku;
            break;
        case "Yidong": moxing=Yidong;
            break;
        case "Qukuai": moxing=Qukuai;
            break;

        default:
            // 错误参数跳转首页
            res.render('main/index');
            return;
    }

    var cc={
        content:[],
        userInfo: req.userInfo,
        moxing:req.body.name,
    };

    moxing.findOne({
        _id: req.body.id
    }).populate(['category','userId']).then(function(content) {

        cc.content=content;
        content.dianzan++;
        content.save();
        res.json('点赞成功')
    });

});




//自己查看
router.get('/chakanzhuye', function(req, res) {

    if (req.userInfo) {
        User.findOne({
            _id: req.userInfo._id
        }).then(function (user) {

            var users={

                userInfo: req.userInfo,
                   user:user
            };

            res.render('main/gerrenzongxin.html', users);
        });
    }
});
// 外部访问个人主页
router.get('/bierenchakanzhuye', function(req, res) {


        User.findOne({
            _id: req.query.userid
        }).then(function (user) {

            var user={

                userInfo: req.userInfo,
                user:user
            };
            res.render('main/gerrenzongxin-beiren.html', user);
        });
});



// 展示个人信息
router.get('/edituser', function(req, res) {

    if (req.userInfo) {
        User.findOne({
            _id: req.userInfo._id
        }).then(function (user) {
            var users={

                userInfo: req.userInfo,
                user:user
            };
            res.render('main/gerenedit.html', users);

        });
    }
});
// 修改个人信息
router.post('/edituserbiao', function(req, res) {


    //查询当前用户信息表
    User.findOne({
        _id: req.userInfo._id
    }).then(function (content) {
        content.name=req.body.name;
        content.intro=req.body.intro;
        content.telephone=req.body.telephone;
        content.weixin=req.body.weixin;
        content.email=req.body.email;
        content.gexing=req.body.gexing;
        content.qq=req.body.qq;
        content.xuexing=req.body.xuexing;
        content.address=req.body.address;

        content.password=req.body.password;
        content.sex=req.body.sex;


        return content.save()
    })
    res.json("修改成功");
});


router.get('/user/upload',function(req,res){

  var rs=fs.createReadStream("views/main/upload.html");
  //把可读流返回给前端，前端接收之后，会解析掉，在浏览其里会直接显示页面
   rs.pipe(res);
});

router.get('/user/upload/beijing',function(req,res){

    var rs=fs.createReadStream("views/main/upload-beijing.html");
    //把可读流返回给前端，前端接收之后，会解析掉，在浏览其里会直接显示页面
    rs.pipe(res);
});
router.post("/upload",function(req,res){

  var form=new Formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    //file:前端传过来的文件详情，
    //获取上次的临时路径
    var tempPath=files.file.path;
    //console.log(tempPath);
   var size=files.file.size;

  //  console.log(size);
    //先判断有没有存放文件的文件夹，如果有的话，直接存放，乳沟没有先创建一个文件夹
    if(!fs.existsSync("public/avatar-imgs")){
      fs.mkdirSync("public/avatar-imgs")
    }
   // 有了临时路径后，将临时路径以可读流形式读取出来，然后找个文件夹保存

    var filename=files.file.name;

    var filenameurl="public/avatar-imgs/"+filename;
    fs.exists(filenameurl, function(exists) {
   if(exists){
     //如果存在同名头像文件
     filename=req.userInfo._id+filename;
     filename= Math.random()*1000+filename



     var rs=fs.createReadStream(tempPath);


     //创建可写流
     var ws= fs.createWriteStream("public/avatar-imgs/"+filename);

     var a=rs.pipe(ws);


       var avatar="上传成功，手动返回上一页面";
     res.json(avatar);
   }
      else{

      filename=req.userInfo._id+filename;
     var rs=fs.createReadStream(tempPath);


     //创建可写流
     var ws= fs.createWriteStream("public/avatar-imgs/"+filename);

     var a=rs.pipe(ws);

     var avatar="上传成功，手动返回上一页面";
     res.json(avatar);

   }
//把文件路径存进数据库中
  var avatarUrlname="/public/avatar-imgs/"+filename

      User.findOne({
        _id:req.userInfo._id
      }).then(function (id) {

        return User.update({
          _id:id
        },{
          avatarUrl:avatarUrlname
        }) .then(function () {

          })
        });

      });
  })
})

router.post("/upload/beijing",function(req,res){

    var form=new Formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        //file:前端传过来的文件详情，
        //获取上次的临时路径
        var tempPath=files.file.path;
        //console.log(tempPath);
        var size=files.file.size;

        //  console.log(size);
        //先判断有没有存放文件的文件夹，如果有的话，直接存放，乳沟没有先创建一个文件夹
        if(!fs.existsSync("public/beijing-imgs")){
            fs.mkdirSync("public/beijing-imgs")
        }
        // 有了临时路径后，将临时路径以可读流形式读取出来，然后找个文件夹保存

        var filename=files.file.name;

        var filenameurl="public/beijing-imgs/"+filename;
        fs.exists(filenameurl, function(exists) {
            if(exists){
                //如果存在同名头像文件
                filename=req.userInfo._id+filename;
                filename= Math.random()*1000+filename



                var rs=fs.createReadStream(tempPath);


                //创建可写流
                var ws= fs.createWriteStream("public/beijing-imgs/"+filename);

                var a=rs.pipe(ws);


                var avatar="上传成功，手动返回上一页面";
                res.json(avatar);
            }
            else{

                filename=req.userInfo._id+filename;
                var rs=fs.createReadStream(tempPath);


                //创建可写流
                var ws= fs.createWriteStream("public/beijing-imgs/"+filename);

                var a=rs.pipe(ws);


                var avatar="上传成功，手动返回上一页面";
                res.json(avatar);

            }
//把文件路径存进数据库中
            var avatarUrlname="/public/beijing-imgs/"+filename

            User.findOne({
                _id:req.userInfo._id
            }).then(function (id) {

                return User.update({
                    _id:id
                },{
                    beijing:avatarUrlname
                }) .then(function () {

                })
            });

        });
    })
})

module.exports = router;
