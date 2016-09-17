var AsyncAwait = (function () {

    function AsyncAwait() {
        this.currAsynResult = {};
        this.preAsynResult = {};
        this.scope = {};
        this._taskAsyn = [];
        this._taski = -1;
        this._taskResultIndex = -1
    }

    AsyncAwait.prototype.$go =
    AsyncAwait.prototype.$using =
    AsyncAwait.prototype.$code =
    AsyncAwait.prototype.$getResult =
    AsyncAwait.prototype.$await = function (func, extend) {
        var that = this;
        var $scope = this.scope;
        that._taski++;
        that._taskAsyn.push({
            method: function (index) {
                that.preAsynResult = index != 0 ? that._taskAsyn[index - 1].asynResult : null;
                func.call(this, $scope, that.preAsynResult, []);
            },
            asynResult: null,
            index: that._taski,
            extend: extend
        });
        return this;
    }
    AsyncAwait.prototype.$done =
    AsyncAwait.prototype.setAsynResult = function (data) {
        this._taskResultIndex++;
        var taskData = this._taskAsyn[this._taskResultIndex];
        taskData.asynResult = data;
        if (this._taskAsyn.length > this._taskResultIndex + 1) {
            this._taskAsyn[this._taskResultIndex + 1].method(this._taskResultIndex + 1);
        }
    }
    AsyncAwait.prototype.start = function () {
        //执行链式调用
        this._taskAsyn[0].method(0);
    }
    AsyncAwait.prototype.$returnResult = function (data) {
        this.setAsynResult(data);
    }
    AsyncAwait.prototype.$run = function () {
        this.start();
    }
    AsyncAwait.prototype.$dispose = function () {
        this.currAsynResult = {};
        this.preAsynResult = {};
        this.scope = {};
        this._taskAsyn = [];
        this._taski = -1;
        this._taskResultIndex = -1
    }
    AsyncAwait.prototype.$if = function (func) {
        return this;
    }
    AsyncAwait.prototype.$then = function (func) {
        return this;
    }
    AsyncAwait.prototype.$else = function (func) {
        return this;
    }
    AsyncAwait.prototype.$endif = function () {
        return this;
    }
    AsyncAwait.prototype.$for = function (func) {
        return this;
    }
    AsyncAwait.prototype.$to = function (func) {
        return this;
    }
    AsyncAwait.prototype.$body = function (func) {
        return this;
    }
    AsyncAwait.prototype.$next = function (func) {
        return this;
    }

    return AsyncAwait;

}());

function $async(func) {

    var asyncAwait = new AsyncAwait();
    var scope = {};

    var using = function (_func, extend) {
        asyncAwait.$await(_func, extend);
    };

    var done = function () {
        asyncAwait.$done();
    };

    var dispose = function () {
        asyncAwait.$dispose();
    };

    func(scope, using, done, dispose);

    asyncAwait.$run();
}










