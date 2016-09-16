# webbrower-await.js
javasript asyn library

脚本 多级回调问题一直让人头疼，代码不堪入目。

因为这个问题，写了一个 以同步的方式调用异步的脚本，解决多级回调的头疼问题。

      

``` javascript
       //请先引入asyn-await.js库
       // https://github.com/waitaction/webbrower-await.js
	   //<script src="asyn-await.js" ></script>

       //模拟一个ajax调用
       function ajax(data, callback, t) {
            setTimeout(function() {
                callback(data);
            }, t);
        }

        //=================演示异步阻塞调用 开始==================
      
      
       // 执行 _asyn 方法，里面定义的 await 代码段将会以同步的方式执行
        _asyn(function() {

            //一个await 对应一个异步（0个或者1个异步），不支持多个
            //每一个await的代码段内必须含有 setCurrResult(data) 方法,如果该方法与你项目有冲突，请更改源码
            await (function() {
                    console.log(this);
                    //使用this访问扩展数据
                    var extendData = this.extend;
                    //执行异步
                    ajax("第1个异步:" + extendData, function(data) {
                        //设置异步结果
                        setCurrResult(data);
                    }, 5000);
                },
                //设置扩展数据，方便 await 代码段内调用，如循环执行异步阻塞时
                "扩展数据");


            await (function() {
                //取得上一个异步的结果 getPreResult() 方法，如果该方法与你项目有冲突，请更改源码
                var preResult = getPreResult();
                //第二个异步需要上一个异步的结果
                var asynData2 = preResult + "->第2个异步";
                ajax(asynData2, function(data) {
                    setCurrResult(data);
                }, 200);
            });


            await (function() {
                //取得上一个异步的结果 getPreResult() 方法，如果该方法与你项目有冲突，请更改源码
                var preResult = getPreResult();
                //第三个异步需要上一个异步的结果
                var asynData3 = preResult + "->第3个异步";
                ajax(asynData3, function(data) {

                    setCurrResult(data);
                }, 200);
            });

            //循环异步阻塞
            for (var i = 5; i < 10; i++) {
                await (function() {
                    var preResult = getPreResult();
                    var extendData = this.extend;
                    ajax(preResult + "->第" + this.extend + "个异步", function(data) {
                        if (extendData >= 9) {
                            alert(data);
                        }
                        setCurrResult(data);
                    }, 1000);
                }, i);
            }

        });
        
        //=================演示异步阻塞调用 结束==================
        
        
        
        
         //=================      说明      ==================

        // 执行 _asyn 方法，里面定义的 await 代码段将会以同步的方式执行
        _asyn(function() {  

             //异步代码段
            await (function() {

                ...执行 异步(最多只能一个异步方法)/同步 代码，记得在异步的回调 调setCurrResult方法

                //设置当前的异步结果
                setCurrResult(data);   
            });
        
        			.
			        .
			        .
			        .
			        .
	    //n个异步代码段
                   
            //异步代码段
            await (function() {
                //取得上一个异步的结果 getPreResult() 方法，如果该方法与你项目有冲突，请更改源码
                var preResult = getPreResult();

                ...执行 异步(最多只能一个异步方法)/同步 代码，记得在异步的回调 调setAsynResult方法

                //设置当前的异步结果
                setCurrResult(data);   
            });
 
```


