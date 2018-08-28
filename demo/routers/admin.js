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
router.use(function(req, res, next) {
  if  (!req.userInfo.isAdmin) {
    res.send("sorry，只有管理员有权访问");
    return;
  }
  next();
});

// 首页
router.get('/', function(req, res, next) {
  res.render('admin/index', {
    userInfo: req.userInfo
  });
});

// 用户管理
router.get('/user', function(req, res, next) {

  // 从数据库中读取用户数据
  var page = Number(req.query.page || 1);
  var limit = 8;
  var pages = 0;

  User.count().then(function(count) {
    // 计算总页数
    pages = Math.ceil(count / limit);
    // 规定页数的最大与最小值
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;

    User.find().limit(limit).skip(skip).then(function(users) {
      res.render('admin/user_index', {
        userInfo: req.userInfo,
        users: users,
        count: count,
        pages: pages,
        limit: limit,
        page: page
      });
    });
  });

});

//----------------------------------------------------------------




// 用户信息修改展示
router.get('/user/edit', function(req, res) {
    var id = req.query.id || '';
    User.findOne({
        _id: id
    }).then(function(user) {
        if (!user) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '用户信息不存在'
            });
        } else {
            res.render('admin/user_edit', {
                userInfo: req.userInfo,
                user: user
            });
        }
    });
});

//用户信息修改

// 用户修改保存
router.post('/user/edit', function (req, res) {
    //获取要修改的用户信息，并且用表单的形式展现出来
    var id = req.query.id || ''
    //获取post提交过来的name
    var name = req.body.name || ''
    var password = req.body.password || ''
    var sex = req.body.sex || ''
    var telephone = req.body.telephone || ''
    var xuexing = req.body.xuexing || ''
    var intro = req.body.intro || ''
    var address = req.body.address || ''
    var emali = req.body.emali || ''
    var qq = req.body.qq || ''
    var fanwen = req.body.fanwen || ''
    var yuanchuang = req.body.yuanchuang || ''
    var fensi = req.body.fensi || ''
    var xihuan = req.body.xihuan || ''
    var huida = req.body.huida || ''
    var paiming = req.body.paiming || ''
    var jifen = req.body.jifen || ''

    User.findOne({
        _id:id
    }).then(function (user) {
        if(!user){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '用户信息不存在'
            })
            return Promise.reject()
        }else {
            //当用户没有做任何的修改提交的时候
            if (name == user.name ){


            }else{
                //要修改用户名称是否已经在数据库中存在
                return User.findOne({
                    _id: {$ne: id},
                    name: name
                })
            }
        }
    }).then(function (sameUser) {
        if (sameUser){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '用户名已经存在，不可使用'
            })
            return Promise.reject()
        }else {
            return User.update({
                _id:id
            },{
                name:name,
                password:password,
                sex:sex,
                telephone:telephone,
                xuexing:xuexing,
                intro:intro,
                address:address,
                emali:emali,
                qq:qq,
                fanwen:fanwen,
                yuangchuang:yuanchuang,
                xihuan:xihuan,
                huida:huida,
                paiming:paiming,
                jifen:jifen,
                fensi:fensi

            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '用户信息修改成功',
            url:'/admin/user'
        })
    });

});

// 用户删除
router.get('/user/delete', function(req, res) {
    var id = req.query.id || '';

    User.remove({
        _id: id
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除用户成功',
            url: '/admin/user'
        });
    });
});


// 分类列表展示

router.get('/fenlei', function(req, res, next) {


    var moxing;
    switch( req.query.moxing){
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

    // 从数据库中读取用户数据
    var page = Number(req.query.page || 1);
    var limit = 8;
    var pages = 0;

    moxing.count().then(function(count) {
        // 计算总页数
        pages = Math.ceil(count / limit);
        // 规定页数的最大与最小值
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;

        moxing.find().limit(limit).skip(skip).populate(['userId','category']).then(function(contents) {
            res.render('admin/fenlei-index', {
                userInfo: req.userInfo,
                contents: contents,
                count: count,
                pages: pages,
                limit: limit,
                page: page,
                rout:req.query.moxing
            });
        });
    });

});

// 文章修改展示
router.get('/fenlei/edit', function(req, res) {


    var moxing;
    switch( req.query.rout){
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

    moxing.findOne({
        _id: req.query.wenzhangid
    }).populate(['userId','category']).then(function(content) {
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '文章信息不存在'
            });
        } else {
            res.render('admin/content-edit', {
                userInfo: req.userInfo,
                content: content
            });
        }
    });
});
//文章信息修改保存
router.post('/fenlei/edit', function (req, res) {
    //获取要修改的用户信息，并且用表单的形式展现出来

    //获取post提交过来的name
    var title = req.body.title || '';
    var dianzan = req.body.dianzan || '';
    var shoucang = req.body.shoucang || '';
    var content = req.body.content || '';
    var jianjie = req.body.jianjie || '';

    var moxing;
    switch( req.body.rout){
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

    moxing.findOne({
        _id:req.body.wenzhangid
    }).then(function (content) {
        if(!content){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '文章信息不存在'
            })
            return Promise.reject()
        }else {
            //当用户没有做任何的修改提交的时候
            if (title == content.title ){


            }else{
                //要修改的用户标题名称是否已经在数据库中存在
                return moxing.findOne({
                    _id: {$ne: req.body.wenzhangid},
                    title: title
                })
            }
        }
    }).then(function (sametitle) {
        if (sametitle){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '文章标题已经存在，不可使用'
            })
            return Promise.reject()
        }else {
            return moxing.update({
                _id:req.body.wenzhangid
            },{
                title:title,
            dianzan :dianzan,
           shoucang :shoucang,
           content :content,
            jianjie :jianjie

            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '文章信息修改成功',
            url:'/admin/fenlei?moxing='+req.body.rout
        })
    });

});
//文章删除
router.get('/fenlei/delete', function(req, res) {

    var moxing;
    switch( req.query.rout){
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

    moxing.remove({
        _id: req.body.wenzhangid
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '文章删除',
            url:"/admin/fenlei?moxing="+req.body.rout
        });
    });
});

// 用户删除
router.get('/user/delete', function(req, res) {
    var id = req.query.id || '';

    User.remove({
        _id: id
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除用户成功',
            url: '/admin/user'
        });
    });
});
//----------------------------------------------------------------

// 内容首页
router.get('/content', function (req, res) {
    var page = Number(req.query.page || 1)
    var limit = 5
    var pages = 0;  //总页数

    Content.count().then(function (count){
        pages = Math.ceil( count/limit )
        page = Math.min(page, pages)    //取值不能超过总页数pages
        page = Math.max(page, 1)        //取值不能小于1
        var skip = (page - 1)*limit

        Content.find().sort({_id: -1}).limit(limit).skip(skip).populate(['category','user']).sort({addTime: -1}).then(function (contents) {
            // console.log(contents);
            res.render('admin/content_index', {
                userInfo:req.userInfo,
                contents: contents,

                page:page,
                limit:limit,
                count:count,
                pages:pages
            })
        })
    })
});

// 添加内容
router.get('/content/add', function(req, res) {

  Category.find().sort({_id: -1}).then(function(categories) {
    res.render('admin/content_add', {
      userInfo: req.userInfo,
      categories: categories
    });
  });

});

// 保存内容
router.post('/content/add', function(req, res) {
  if (req.body.category == '') {
    res.render('admin/error', {
      userInfo: req.userInfo,
      message: '内容分类不能为空'
    });
    return;
  }

  if (req.body.title == '') {
    res.render('admin/error', {
      userInfo: req.userInfo,
      message: '内容标题不能为空'
    });
    return;
  }

  // 保存数据导数据库
  new Content({
        category:req.body.category,
        title:req.body.title,
        user: req.userInfo._id.toString(),
        description:req.body.description,
        content:req.body.content
    }).save().then(function () {
        res.render('admin/success', {
            userInfo:req.userInfo,
            message:'内容保存成功',
            url:'/admin/content'
        })
    });
});

// 修改内容
router.get('/content/edit', function(req, res) {
  var id = req.query.id || '';
  var categories = [];

  Category.find().sort({_id: -1}).then(function (rs) {
    categories = rs;
    return Content.findOne({
      _id: id
    }).populate('category');
  }).then(function(content) {
    if  (!content) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '内容不存在'
      });
      return Promise.reject();
    } else {
      res.render('admin/content_edit', {
        userInfo: req.userInfo,
        categories: categories,
        content: content
      });
    }
  });

});

// 保存内容修改
router.post('/content/edit', function(req, res) {
  var id = req.query.id || '';

  if (req.body.category == ''){
      res.render('admin/error',{
          userInfo:req.userInfo,
          message:'内容的分类不能为空'
      })
      return
  }
  if (req.body.title == ''){
      res.render('admin/error',{
          userInfo:req.userInfo,
          message:'内容的标题不能为空'
      })
      return
  }

  Content.update({
    _id: id
  }, {
    category:req.body.category,
    title:req.body.title,
    description:req.body.description,
    content:req.body.content
  }).then(function() {
    res.render('admin/success',{
        userInfo:req.userInfo,
        message:'保存成功',
        //url:'/admin/content/edit?id=' + id
        url:'/admin/content'
    });
  })
});

// 内容删除
router.get('/content/delete', function(req, res) {
  var id = req.query.id || '';
  Content.remove({
    _id: id
  }).then(function() {
    res.render('admin/success', {
      userInfo: req.userInfo,
      message: "内容删除成功",
      url: '/admin/content'
    });
  });
});

module.exports = router;
