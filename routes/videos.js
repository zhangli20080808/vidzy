//require 可以返回一个方法或者对象
var express = require('express');
var router  = express.Router();

//持久化mongodb的模块
var monk = require('monk');

// 当我们引入monk的时候得到是一个方法而不是一个对象 我们通过他来调用访问数据库的方法
var db = monk('localhost:27017/vidzy');

router.get('/',function(req,res){
  // 首先我们调用db的get方法，传入集合的名称 他将返回一个集合对象 这个对象提供了一些数字和方法来操作集合上的文档
  // insert find findOne update remove
  var collection = db.get('videos');
  //find 第一个参数是一个用来过滤的对象  node回调函数中的标准协议模式 错误优先 错误对象 返回结果
  // 再这种模式中 我们首先检查err对象是否被设置 如果在查询视频文档中没有出现错误 err的值为null
  // 否则他将被设置  我们抛出err来中断程序的执行并告知用户  如果没错 就通过调用res.json简单的返回一个json对象
  collection.find({},function(err,videos){
    if(err)
    throw err;
    res.json(videos);
  })
});
router.post('/',function(req,res){
  var collention = db.get('videos');
  // 我们使用req.body从这些属性中读取值 他代表数据将被提交到请求的body中
  collention.insert({
    title: req.body.title,
    description: req.body.description
  },function(err,video){
    if(err)
    throw(err);
    // 最后 在回调方法中新增一个文档 如果没错 返回一个新增的用json表示的视频文档
    res.json(video);
  })
});

router.get('/:id',function(req,res){
  // 这里我们通过集合中的findone来返回一个对象 我们通过 _id来寻找一个文档
  var collection = db.get('videos');
  collection.findOne({_id:req.params.id},function(err,video){
    if(err) throw err;
    res.json(video);
  })
});


// 我们通过router.put来定义这个路由，当这个端点上有http put请求时这个处理器将会被调用

router.put('/:id',function(req,res){
  // 这里我们通过集合中的findone来返回一个对象 我们通过 _id来寻找一个文档
  var collection = db.get('videos');
  // 通过集合中的update方法来更新一个文档 第一个参数为标准对象 只更新_id和req.params.id
  // 匹配的文档 第二个参数代表了需要更新的值
  collection.update({_id:req.params.id
  },
  {
    title: req.body.title,
    description: req.body.description
  },
    function(err,video){
    if(err) throw err;
    res.json(video);
  })
});

// 删除一个video
router.delete('/:id',function(req,res){

  var collection = db.get('videos');
  collection.remove({ _id: req.params.id},function(err,video){
    if(err) throw err;
    res.json(video);
  })
})







//对象返回值 当别的模块应用这个模块时我们讲返回这个对象
// 在这种情况下 我们返回路由对象给express 这个模块的主要功能就是获取路由并注册一些路由配置并返回
module.exports = router;
