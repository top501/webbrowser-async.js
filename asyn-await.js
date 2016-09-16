var Asyn = (function () {

    function Asyn() {
        this.currAsynResult = {};
        this.preAsynResult = {};
        this.scope = {};
    }

    var _taskAsyn = [];
    var _taski = -1;
    var _taskResultIndex = -1

    Asyn.prototype.await = function (func, extend) {
        var that = this;
        var $scope = this.scope;
        _taski++;
        _taskAsyn.push({
            method: function (index) {
                that.preAsynResult = index != 0 ? _taskAsyn[index - 1].asynResult : null;
                func.call(this, $scope)
            },
            asynResult: null,
            index: _taski,
            extend: extend
        });
        return this;
    }

    Asyn.prototype.setAsynResult = function (data) {
        _taskResultIndex++;
        var taskData = _taskAsyn[_taskResultIndex];
        taskData.asynResult = data;
        if (_taskAsyn.length > _taskResultIndex + 1) {
            _taskAsyn[_taskResultIndex + 1].method(_taskResultIndex + 1);
        }
    }

    Asyn.prototype.start = function () {
        //执行链式调用
        _taskAsyn[0].method(0);
    }

    return Asyn;

}());
//=======进一步简化操作=======


var __asyn = {}

function _asyn(func) {
    __asyn = new Asyn();
    func.call(__asyn);
    __asyn.start();
}

function await(_func, extend) {
    __asyn.await(_func, extend)
}

function getPreResult() {
    return __asyn.preAsynResult;
}

function setCurrResult(data) {
    __asyn.setAsynResult(data);
}

function nextAwait(data) {
    __asyn.setAsynResult(data);
}