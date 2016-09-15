# webbrower-await.js
javasript asyn library

脚本 多级回调问题一直让人头疼，代码不堪入目。

因为这个问题，写了一个 以同步的方式调用异步的脚本，解决多级回调的头疼问题。

      

``` javascript
       //请先引用asyn-await.js库
       // https://github.com/waitaction/webbrower-await.js
	   //<script src="asyn-await.js" ></script>

       //模拟一个ajax调用
       function ajax(data, callback, t) {
            setTimeout(function() {
                callback(data);
            }, t);
        }

        //=================演示异步阻塞调用 开始==================
        var _asyn = new Asyn();

        //一个await 对应一个异步（0个或者1个异步），不支持多个
        //每一个await的代码段内必须含有setAsynResult方法
        _asyn.await(function() {
            //执行异步前的javascript代码
            var ajaxPostData = "";
            for (var i = 0; i < 5; i++) {
                ajaxPostData += i.toString();
            }

            //执行异步
            ajax("第1个异步:" + ajaxPostData, function(data) {

                //设置异步结果
                _asyn.setAsynResult(data);

            }, 5000);
        });

        //取得上一个异步的结果 preAsynResult，并执行第二个异步
        _asyn.await(function(preAsynResult) {

            //由于第二个异步需要上一个异步的结果
            var asynData2 = preAsynResult + "->第2个异步";
            ajax(asynData2, function(data) {
                _asyn.setAsynResult(data);
            }, 200);
        });


        _asyn.await(function(preAsynResult) {
            ajax(preAsynResult + "->第3个异步", function(data) {
                _asyn.setAsynResult(data);
            }, 2000);
        });

        _asyn.await(function(preAsynResult) {

            //使用this访问扩展数据
            var extendData = this.extend;

            //这里可以不需要异步，执行正常操作
            for (var i = 0; i < 10; i++) {
                extendData += i;
            }
            extendData = preAsynResult + "->" + extendData;

            //记得设置异步结果，供下一次调用
            _asyn.setAsynResult(extendData);
        }, "扩展数据");


        _asyn.await(function(preAsynResult) {
            ajax(preAsynResult + "->第4个异步", function(data) {
                _asyn.setAsynResult(data);
            }, 200);
        });


        _asyn.await(function(preAsynResult) {
            _asyn.setAsynResult(preAsynResult);
        });


        //循环阻塞异步
        for (var i = 5; i < 10; i++) {
            _asyn.await(function(preAsynResult) {
                ajax(preAsynResult + "->第" + this.extend + "个异步", function(data) {
                    _asyn.setAsynResult(data);
                }, 1000);
            }, i);
        }


        _asyn.await(function(preAsynResult) {
            ajax(preAsynResult + "->最后一个异步", function(data) {
                alert(data);
                _asyn.setAsynResult(data);
            }, 200);
        });

        //开始执行定义的异步，按顺序执行
        _asyn.start();
        //=================演示异步阻塞调用 结束==================
        
         //=================      说明      ==================

	//声明一个阻塞式异步的实例
        var _asyn = new Asyn();
        
        //异步代码段
        _asyn.await(function(preAsynResult) {
	        ...调用异步(最多只能一个异步方法)或同步代码，记得在异步的回调 调setAsynResult方法
	        _asyn.setAsynResult(preAsynResult);
        });
        
        //异步代码段
        _asyn.await(function(preAsynResult) {
	        ...调用异步(最多只能一个异步方法)或同步代码，记得在异步的回调 调setAsynResult方法
	        _asyn.setAsynResult(preAsynResult);
        });
			        .
			        .
			        .
			        .
			        .
	    //n个异步代码段
		_asyn.await(function(preAsynResult) {
	        ...调用异步(最多只能一个异步方法)或同步代码，记得在异步的回调 调setAsynResult方法
	        _asyn.setAsynResult(preAsynResult);
        });
        
        //执行阻塞式的异步代码段
         _asyn.start();
 
```


