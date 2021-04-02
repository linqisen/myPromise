/**
 * ###promise是什么？
    1.字面意义： 承诺  本质 承诺将来会执行
    2.主要解决回调地狱问题
    3.Promise是异步解决方案
    4.Promise是一个构造函数 函数里面有一些属性和方法（使用通过new）
 */

/**
 * ###promise的注意事项：
    1.Promise是一个构造函数  里面有两个参数  resolve成功的状态  reject代表失败的状态
    2.then里面的回调函数的结果就是上面resolve和reject的参数内容
    3.两者要么是成功的状态 要么是失败的状态  只能执行其中的一个
    4.当Promise执行错误的时候下一个then会执行成功的方法。
 */

const PENDING = "pending";
const FUFILLED = "fufilled";
const REJECTED = "rejected";

function Promise(executor) {
    // 正在进行
    this.status = PENDING;
    // 成功的值
    this.success = undefined;
    // 失败的值
    this.error = undefined;
    // 想法：等1秒之后再一起执行
    // 定义成功的数组
    this.onfufilledCallback = [];
    // 定义失败的数组
    this.onrejectedCallback = [];
    const that = this;
    // 成功的函数
    function resolve(value) {
        if (that.status === PENDING) {
            that.status = FUFILLED;
            that.success = value;
            // 如何执行数组里面的函数
            that.onfufilledCallback.forEach((fn) => {
                fn();
            });
        }
    }
    // 失败的函数
    function reject(value) {
        if (that.status === PENDING) {
            that.status = REJECTED;
            that.error = value;
            // 执行失败的数组
            that.onrejectedCallback.forEach((fn) => {
                fn();
            });
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

//定义then方法
Promise.prototype.then = function (onfufilled, onrejected) {
    const that = this;
    //then的链式
    const promise2 = new Promise(function (resolve, reject) {
        // 上面是成功的状态
        if (that.status === FUFILLED) {
            try {
                const res = onfufilled(that.success);
                resolve(res);
            } catch (e) {
                reject(e);
            }
        }
        // 上面是失败的状态
        if (that.status === REJECTED) {
            try {
                const res = onrejected(that.error);
                resolve(res);
            } catch (e) {
                reject(e);
            }
        }
        // 说明没有走成功和失败
        if (that.status === PENDING) {
            that.onfufilledCallback.push(() => {
                try {
                    const res = Fonfufilled(that.success);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
            that.onrejectedCallback.push(() => {
                try {
                    const res = onrejected(that.error);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
        }
    });
    return promise2;
};

// 定义catch方法 错误信息 其实catch就是then的另一种写法
Promise.prototype.catch = function (callback) {
    // 其实就是执行then的错误信息
    return this.then(function () {}, callback);
};

// all
Promise.all = function (values) {
    return new Promise(function (resolve, reject) {
        let num = 0;
        let arr = [];
        function Process(kay, value) {
            // 把值存到数组;
            arr[kay] = value;
            if (++num === values.length) {
                resolve(arr);
            }
        }
        for (let i = 0; i < values.legth; i++) {
            let current = values[i];
            if (current.then && typeof current.then === "function") {
                // 此时是promise对象
                // 呼叫current的this调用
                current.then.call(
                    current,
                    function (data) {
                        Process(i, data);
                    },
                    reject
                );
            } else {
                // 说明是具体的值
                Process(i, current);
            }
        }
    });
};

// resolve
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(value);
    });
};

module.exports = Promise;
