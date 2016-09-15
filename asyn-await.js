var Asyn = (function () {

    function Asyn() {

    }

    var _taskAsyn = [];
    var _taski = -1;
    var _taskResultIndex = -1

    Asyn.prototype.await = function (func,extend) {
        _taski++;
        _taskAsyn.push(
            {
                method: function (index) {
                    func.call(this, index != 0 ? _taskAsyn[index - 1].asynResult : null)
                },
                asynResult: null,
                index: _taski,
                extend: extend
            }
        );
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
