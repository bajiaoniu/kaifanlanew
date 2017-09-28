/**
 * Created by bjwsl-001 on 2017/8/2.
 */

//创建一个自定义模块，并指定依赖于ng ngRoute
var app = angular.module('kfl',
['ng','ngRoute']);

//配置路由词典
app.config(function ($routeProvider) {
  $routeProvider
      .when('/kflStart',{
        templateUrl:'tpl/start.html'
      })
      .when('/kflMain',{
        templateUrl:'tpl/main.html',
        controller:'mainCtrl'
      })
      .when('/kflDetail/:did',{
        templateUrl:'tpl/detail.html',
        controller:'detailCtrl'
      })
      .when('/kflOrder/:did',{
        templateUrl:'tpl/order.html',
        controller:'orderCtrl'
      })
      .when('/kflMyOrder',{
        templateUrl:'tpl/myOrder.html'
      })
      .otherwise({redirectTo:'/kflStart'})
})


//创建一个控制器 给body
// 里边封装一个跳转的方法
app.controller('bodyCtrl',
    ['$scope','$location',
      function ($scope,$location) {
        $scope.jump = function (desPath) {
          $location.path(desPath);
        }
      }
    ]
)

//给main页面 创建一个控制器
app.controller('mainCtrl',
    ['$scope','$http',
      function ($scope,$http) {
        $scope.hasMore = true;
        $scope.myKw = "";

        //初始化菜品列表
        //发起网络请求，拿到数据，绑定到视图
        $http
            .get('data/dish_getbypage.php?start=0')
            .success(function (data) {
              console.log(data);
              $scope.dishList = data;
            })
        //定义一个加载更多的方法
        $scope.loadMore = function () {
          $http.get(
              'data/dish_getbypage.php?start='
              +$scope.dishList.length)
              .success(function (data) {
                //当返回的数据不到5条时候，
                // 认为按钮可以隐藏，显示提示信息
                if(data.length < 5)
                {
                  $scope.hasMore = false;
                }
                //将返回的新的数据和之前的列表拼在一起
                $scope.dishList =
                    $scope.dishList.concat(data);
              })
        }

        //监听用户的输入，发起网络请求将
        // 搜索到的数据显示显示在列表
        $scope.$watch('myKw',
            function (newValue,oldValue) {
          //$scope.myKw / newValue
              console.log($scope.myKw);
              //发起网络请求
              // dish_getbykw.php
              if($scope.myKw.length>0)
              {
                $http.get(
                    'data/dish_getbykw.php?kw='
                    +$scope.myKw)
                    .success(function (data) {
                      console.log(data);
                      if(data.length>0)
                      {
                        $scope.dishList = data;
                      }
                    })
              }

        });


    }]);

//给detail创建控制器 接收参数 发起网络请求
app.controller('detailCtrl',
['$scope','$http','$routeParams',
  function ($scope, $http,$routeParams) {
    $scope.did=$routeParams.did;
    //console.log($routeParams);
    //拿到传递来的参数 发起请求 dish_getbyid.php
    $http.get(
        'data/dish_getbyid.php?did='
        +$routeParams.did)
        .success(function (data) {
          console.log(data);
          $scope.dish = data[0];
        })
}])

app.controller('orderCtrl',
['$scope','$http','$routeParams','$httpParamSerializerJQLike',
  function ($scope,$http,$routeParams,$httpParamSerializerJQLike) {
    $scope.showForm = true;
    $scope.submitResult="";

    $scope.order = {userDid:$routeParams.did};

    //console.log($routeParams);
    //获取用户所输入的其它信息 ngModel
    //定义一个下单的方法
    $scope.submitOrder = function () {
      //将用户所输入的数据打印
      console.log($scope.order);
      /*console.log('用户名:'+$scope.userName);
      console.log('手机号:'+$scope.userPhone);
      console.log('性别:'+$scope.userSex);
      console.log('住址:'+$scope.userAddr);*/
      //发给服务器
      //准备要发送的参数
      //在ng中提供了一个服务
      /*var params = "userName="
          +$scope.userName+
          "&userSex="+$scope.userSex
          +"&userPhone="+$scope.userPhone+
          "&userAddr="+$scope.userAddr+
          "&userDid="+$routeParams.did
      console.log(params);*/

      var params =
          $httpParamSerializerJQLike($scope.order);
      console.log(params)
      $http.get('data/order_add.php?'+params)
          .success(function (data) {
            $scope.showForm = false;
            console.log(data);
            result = data[0];
            if(result.msg =='success')
            {
              $scope.submitResult = "下单成功，订单编号:"+result.oid;
              //存储手机号 sessionStorage
            }
            else
            {
              $scope.submitResult = "下单失败";
            }
          })
    }
  }
]);