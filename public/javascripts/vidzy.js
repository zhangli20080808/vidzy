var app = angular.module('Vidzy',['ngRoute','ngResource']);

//  $scope用来传递数据 $resource用来调用restfulapi
app.controller('HomeCtrl',['$scope','$resource',function($scope,$resource){

    // 这里我们通过给定的api 端点来获取一个资源对象 这个对象将提供一些方法来访问我们的api
    var Videos = $resource('/api/videos');
    // 我们用query方法来获取所有视频 在得到结果后得到一个回调函数 这个函数将获得我们从服务器获取的视频
    Videos.query(function(videos){
      // 最后我们将视频渲染到视图中
      // console.log(videos);
      $scope.Videos = videos;
    })

}]);

// 新增一个视频
app.controller('AddVideoCtrl',['$scope','$resource','$location',function($scope,$resource,$location){

   $scope.save = function(){
     var Videos = $resource('/api/videos');
    //  这里我们使用一个save方法来提交一个视频给api
    // save方法有两个参数  用来提交的对象和回调函数（当异步调用执行完成时调用）
     Videos.save($scope.video,function(){
       console.log($scope.video);
      //  我们使用$location 服务来修改浏览器地址到网站根路径
      // angular知道url是绑定到视图的 他将展示页面给用户
       $location.path('/');
     })
   }

}]);
// 编辑一个视频  编辑中使用的视频id将成为路由参数
app.controller('EditVideoCtrl',['$scope','$resource','$location','$routeParams',function($scope,$resource,$location,$routeParams){

  // 这次我们使用另一种方式去使用$resource
  // 三个参数  1.url 2.一个对象 为路由参数：id提供默认值
  //  @_id 告诉angular在请求对象中查找一个叫做_id的属性
  // 所以当我们发送一个put请求 /api/videos/:id Angular将使用视频对象的id属性来设置路由中的:id参数
  //第三个参数用来拓展$resource服务
  // 在某些情况下，默认你不能用$resource服务发送HTTP PUT请求，你需要扩展它通过一个使用HTTP UPT的 update 方法。
//
  var Videos = $resource('/api/videos/:id',{id:'@_id'},
      {update:{ method:'PUT'}
    });

  //下面我们通过给定的id使用video.get来获取这个视频
  Videos.get({id:$routeParams.id},function(video){
    $scope.video = video;
  });

  $scope.save = function(){
    // 这个地方我们使用update来代替save方法 这是我们早就在拓展服务时就定义的方法
    // 这里将发送一个http put请求给我们的api端点
    Videos.update($scope.video,function(){
      $location.path('/');
    })
  }

}]);

// 删除一个视频
app.controller('DeleteVideoCtrl',['$scope','$resource','$location','$routeParams',function($scope,$resource,$location,$routeParams){

  var Videos = $resource('/api/videos/:id');

  //下面我们通过给定的id使用video.get来获取这个视频
  Videos.get({id:$routeParams.id},function(video){
    $scope.video = video;
  });

  $scope.delete = function(video){
    Videos.delete({id: $routeParams.id},function(video){
      $location.path('/');
    })
  }

}]);
// 这对配置将在angular检测到ng -app并且视图启动的时候执行 config方法的参数是一个数组
app.config(['$routeProvider',function($routeProvider){

  $routeProvider
    .when('/',{
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/add-video',{
      templateUrl: 'partials/video-form.html',
      controller: 'AddVideoCtrl'
    }).
    when('/video/:id',{
      templateUrl: 'partials/video-form.html',
      controller: 'EditVideoCtrl'
    })
    .when('/video/delete/:id',{
      templateUrl: 'partials/video-delete.html',
      controller: 'DeleteVideoCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);
