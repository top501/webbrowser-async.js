# webbrower-await.js
javasript asyn library


``` code
     $async(function ($scope, $using, $done, $dispose) {
            $using(function () {  });
			$using(function () {  });
					.
					.
					.
            $using(function () {  });
        });
```

演示异步阻塞调用

``` javascript

       //=================演示异步阻塞调用 开始==================           

        /*
         * 执行 $async 内的所有using语句块，把异步伪装成同步模式，解块多级回调代码难以阅读的问题
         * $scope:作用域
         * $using:用于定义using语句块
         * $done:用在using语句块内的方法，表示当前using语句块执行完成
         * $dispose:仅用在最后一个using语句块，表示释放所有引用与内存
         * 注意：using 语句块不能再次包含 using 语句块，但可以包含 $async .
         * https://github.com/waitaction/webbrowser-async.js
        */
        $async(function ($scope, $using, $done, $dispose) {

            var myData = "";

            //uisng语句块，建议按步聚/功能划分using语句块
            // 比如：登陆操作
            $using(function () {

                ajax("登陆操作", function (data) {
                    myData += data + ">";
                    //当前using语句块执行完成
                    $done();
                }, 200);

            });

            //using语句块，建议按步聚/功能划分using语句块
            // 比如：登陆完成
            $using(function () {

                ajax("登陆完成", function (data) {
                    myData += data + ">";
                    //当前using语句块执行完成
                    $done();
                }, 200);

            });

            //using语句块
            // 比如：获取个人信息
            $using(function () {

                ajax("获取个人信息", function (data) {
                    myData += data;
                    //所有using语句块执行完成，释放内存
                    alert(myData);
                    $dispose();
                }, 200);

            })
        });
        
        //=================演示异步阻塞调用 结束==================
        
 
```


