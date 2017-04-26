

1.在线游戏，协作工具，聊天系统
2.搭建在类似于MongoDB的文档数据库的API服务器
3.mean全栈开发
    MongoDB：我盟用来存储数据的数据库引擎。
    Express.js：服务器端用来构建web应用程序的框架，类似于ASP.NET MVC或Rails。
    Angular：用来构建web应用的前端框架
    Node.js：javascript运行环境。

    通过mean，你可以将文档数据以json对象的格式存储在mongo中，然后通过基于node和express搭建的RESTful API服务器的来操作它们。通过Angular构建客户端来操作这些API并渲染视图给用户。这意味着你在你的代码中，你将使用单一的统一的语言（javascript），结果就是让代码更加具有一致性和可维护性

4.通过angular来展示数据  从数据库中查询所有视频
    我们将在Mongo中创建一个数据库并且构建一些视频文件。
    然后我们通过Express在数据库中创建一个API
    最后我们用Angular来调用API并显示这些数据    

    1.构建数据库
    2.通过Express创建1个API
    3.添加Angular
    4.用Angular重构首页
    5.实现控制器
5.实现新增功能
    在Express中创建API端点，利用Angular构建表单，用Monk在Mongo中存储文档。

    首先，我们将创建一个添加视频的API。我们将使用Express路由创建此端点并用Monk存储视频文件在Mongo中。然后，我们将创建一个新的页面来添加一个视频并用Angular来构建这个页面。

    第1步：创建1个API端点
    第2步：创建一个表单 更新路由配置 添加Bootstrap
    第3步：实现控制器
6.实现编辑功能
