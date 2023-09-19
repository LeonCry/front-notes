# JS - 3

## 闭包与return function

https://blog.csdn.net/weixin_42165445/article/details/100899287



return function(){} 和 return function(){}()的区别：

https://blog.csdn.net/u011113654/article/details/51672308?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-51672308-blog-100899287.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-51672308-blog-100899287.pc_relevant_default&utm_relevant_index=1

个人理解

```js
// 声明一个函数表达式
var add = function(x){
	var sum = 1;
	// 在函数表达式内部有一个求和的内部函数
	var tmp = function(x){
		sum = sum + x;// 求和
		return tmp;
	}
	// 构建一个函数体的toString()函数
	tmp.toString = function(){
		return sum;
	}
	return tmp; // 返回的是一个函数体,如果该函数体有toString()方法,则会调用函数体的toString()方法
}
```

如果是这种，在函数体内部定义了另一个函数，并返回这个函数本身，而不是函数()，则表明返回的是**tmp该函数的引用**，返回后需要再进行fun(2)类似进行执行。（如果有toString()方法，则返回函数本身时就会进行调用）。

如果上述返回的是return tmp(2)，则返回tmp(2)的执行结果。

```js
function infun(obj1, obj2) {
	console.log(obj1 + " -- " + obj2);
        return obj1 + obj2;
}
function create2(pro) {
	console.log("pro = " + pro);
        return infun(obj1, obj2); // 这个时候,会报错
}
var c1 = create2("pro"); 
```

如果是这种，在函数外部定义了一个函数，并且返回的时该函数的调用，则返回的是该函数在window下的调用结果，根据词法作用域，因为window中没有obj1和obj2，所以报错。



**闭包：**

**只要存在调用内部函数的可能，JavaScript就需要保留被引用的函数。而且JavaScript运行时需要跟踪引用这个内部函数的所有变量，直到最后一个变量废弃，JavaScript的垃圾收集器才能释放相应的内存空间**。

https://www.cnblogs.com/dolphinX/archive/2012/09/29/2708763.html   很透彻

**JS作用域与作用链**

没有块级作用域，只有函数级作用域：变量在声明它们的函数体及其子函数内是可见的。

局部变量优先级高于全局变量

作用域链创建规则：

当定义一个函数时（注意，是定义的时候就开始了），它实际上保存一个作用域链。

当调用这个函数时，它创建一个新的对象来储存它的参数或局部变量，并将这个对象添加保存至那个作用域链上，同时创建一个新的更长的表示函数调用作用域的“链”。

对于嵌套函数来说，情况又有所变化：每次调用外部函数的时候，内部函数又会重新定义一遍。因为每次调用外部函数的时候，作用域链都是不同的。内部函数在每次定义的时候都要微妙的差别---在每次调用外部函数时，内部函数的代码都是相同的，而且关联这段代码的作用域链也不相同。

https://blog.csdn.net/judyge/article/details/51889726?spm=1001.2101.3001.6650.17&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-17-51889726-blog-121848419.t5_layer_eslanding_SACD_04&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-17-51889726-blog-121848419.t5_layer_eslanding_SACD_04&utm_relevant_index=20 很透彻

## 防抖和节流

https://blog.csdn.net/hupian1989/article/details/80920324?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-80920324-blog-107864044.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-80920324-blog-107864044.pc_relevant_default&utm_relevant_index=1

防抖和节流是针对响应跟不上触发频率这类问题的两种解决方案。 在给DOM绑定事件时，有些事件我们是无法控制触发频率的。 如鼠标移动事件onmousemove, 滚动滚动条事件onscroll，窗口大小改变事件onresize，瞬间的操作都会导致这些事件会被高频触发。 如果事件的回调函数较为复杂，就会导致响应跟不上触发，出现页面卡顿，假死现象。 在实时检查输入时，如果我们绑定onkeyup事件发请求去服务端检查，用户输入过程中，事件的触发频率也会很高，会导致大量的请求发出，响应速度会大大跟不上触发。

debounce，去抖动。策略是当事件被触发时，设定一个周期延迟执行动作，若期间又被触发，则重新设定周期，直到周期结束，执行动作。 这是debounce的基本思想，在后期又扩展了前缘debounce，即执行动作在前，然后设定周期，周期内有事件被触发，不执行动作，且周期重新设定。

debounce的特点是当事件快速连续不断触发时，动作只会执行一次。 

我的debounce：

```js
// 防抖函数的实现：在一定时间内，如果有新事件触发，则删除上一个触发器，建立一个新的触发器
var debounce = (fn,wait)=>{
    // 用到了闭包，在内部函数中，如果一直引用着外部函数的变量，则要一直为其保留
    // 只有函数作用域，在整个函数里面由作用域链层级向上寻找向量
    var timer;
    var context;
    var args;
    var dataTime = 0;
    // 运行函数
    var run = ()=>{
        timer = setTimeout(() => {
            fn.apply(context,args);
        }, wait);
    }
    // 清除函数
    var clean = ()=>{
        clearTimeout(timer);
    }
    // 将内部函数进行返回，使外部可以访问到
    return function (){
        // 函数作用域，作用域链层级向上寻找向量
        args = [...arguments];
        context = this;
        if( new Date().getTime()-wait > dataTime){
            console.log("run")
            run();
        }
        else{
            console.log("clean")
            clean();
            run();
        }
        dataTime = new Date().getTime();
    }

}
function add(a,b,c) {
    console.log(a+b+c)
    return a+b+c;
}
var runs = debounce(add,100);
runs(1,2,3);
setTimeout(() => {
    runs(1,2,3);
}, 50);
setTimeout(() => {
    runs(4,5,6);
}, 200);
```

throttling，节流的策略是，固定周期内，只执行一次动作，若有新事件触发，不执行。周期结束后，又有事件触发，开始新的周期。

我的throttling：

```js
// 节流的实现：在一定时间内，如果有新事件触发，在该时间内，不执行，等到该事件执行完毕后，再等待事件
var debounce = (fn,wait)=>{
    // 用到了闭包，在内部函数中，如果一直引用着外部函数的变量，则要一直为其保留
    // 只有函数作用域，在整个函数里面由作用域链层级向上寻找向量
    var context;
    var args;
    var dataTime = 0;
    var flag = true;
    // 运行函数
    var run = ()=>{
        console.log("runing")
        setTimeout(() => {
            console.log("run over")
            fn.apply(context,args);
            flag = true;
        }, wait);
    }
    // 将内部函数进行返回，使外部可以访问到
    return function (){
        // 函数作用域，作用域链层级向上寻找向量
        if((new Date().getTime()-wait > dataTime)&&flag){
            args = [...arguments];
            context = this;
            console.log("run")
            run();
            flag = false;
            dataTime = new Date().getTime();
        }
        else{
            console.log("stop args",args);
        }
    }

}

function add(a,b,c) {
    console.log(a+b+c)
    return a+b+c;
}
var runs = debounce(add,100);
runs(1,2,3);
setTimeout(() => {
    runs(6,6,6);
}, 50);
setTimeout(() => {
    runs(4,5,6);
}, 200);
```



## Promise/async await

### promise:

https://blog.csdn.net/qq_34645412/article/details/81170576?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-81170576-blog-82882375.pc_relevant_multi_platform_featuressortv2dupreplace&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-81170576-blog-82882375.pc_relevant_multi_platform_featuressortv2dupreplace&utm_relevant_index=2

promise:`then`方法指定的回调函数，如果运行中抛出错误，也会被`catch`方法捕获。

我的promise：

```js
// 手写promise
function getPromise() {
    return new Promise((resolve,reject)=>{
        var r = Math.round(Math.random(0,1));
        setTimeout(() => {
            r==0 ? resolve(r):reject('error');
        }, 1000);
    })
}
function getPromise2() {
    return new Promise((resolve,reject)=>{
        var r = Math.round(Math.random(0,1));
        setTimeout(() => {
            r==0 ? resolve(r):reject('error');
        }, 1000);
    })
}
function getPromise3() {
    return new Promise((resolve,reject)=>{
        var r = Math.round(Math.random(0,1));
        setTimeout(() => {
            r==0 ? resolve(r):reject('error');
        }, 1000);
    })
}
// 一般用法
getPromise().then((data)=>{
    console.log("成功数据：",data);
}).catch((error)=>{
    console.log("失败数据：",error);
})

// all的用法：该方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后并且执行结果都是成功的时候才执行回调。
// 注意中括号：数组
Promise.all([getPromise(),getPromise2(),getPromise3()]).then((result)=>{
    console.log(result);
})
// all：Promise.all()接受一个由promise任务组成的数组，可以同时处理多个promise任务。
// 当所有的任务都执行完成时，Promise.all()返回resolve.
// 但当有一个失败(reject)，则返回失败的信息，即使其他promise执行成功，也会返回失败。
// 可以用一句话来说Promise.all()，要么全有要么全无。
// 解决办法
Promise.all([getPromise(),getPromise2(),getPromise3()].map(promiseItem=>promiseItem.catch(error=>error))).then((result)=>{
    console.log(result);
}).catch(error=>{
    console.log(error);
})
// 原理==和之前唯一的不同就是在promise数组添加了一个回调函数，当数组中有接口reject时，
//catch住结果直接返回，这样失败的结果也可以当做成功处理，所以在promise.all中我们可以监听到所有结果的返回
//，然后在针对不同的返回值进行处理。

//race的用法：all是等所有的异步操作都执行完了再执行then方法，那么race方法就是相反的，谁先执行完成就先执行回调。
//先执行完的不管是进行了race的成功回调还是失败回调，其余的将不会再进入race的任何回调,但是其余的会继续执行到最后，只是不进入race
Promise.race([getPromise(),getPromise2(),getPromise3()]).then(result=>{
    console.log(result);
}).catch(error=>{
    console.log(error);
})
```



### async await

https://blog.csdn.net/qq_42941302/article/details/109245356?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-109245356-blog-118763485.pc_relevant_multi_platform_whitelistv5&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-109245356-blog-118763485.pc_relevant_multi_platform_whitelistv5&utm_relevant_index=2



## ajax ? axios

封装axios

```js
// const { resolve, reject } = require("core-js/fn/promise")

function iaxios () {
  //保存拦截器中的回调函数
  this.saveRequest = []
  this.saveResponse = []
  //保存请求的数据
  this.data = {};
  let _this = this;
  this.interceptors = {
    request (cb) {
      _this.saveRequest.push(cb)
    },
    response (aa) {
      _this.saveResponse.push(aa)
    },
  }
}



iaxios.prototype.post = function (url, data) {
  this.data = data;
  let _this = this;
  // this.saveRequest && this.saveRequest(this)
  //请求之前调用请求拦截的回调函数
  if (this.saveRequest) {
    this.saveRequest.forEach(fn => {
      fn(this)
    })
  }

  //返回promise对象
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    //设置请求头的配置
    setHeader(xhr, this.headers);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status == 200 || xhr.status == 304)) {
          //用来保存返回的数据
          let newRespose = new Object;
          newRespose.data = JSON.parse(xhr.responseText);
          // _this.saveResponse && _this.saveResponse(newRespose)
          //在返回数据之前调用相应拦截器的回调函数
          if (_this.saveResponse) {
            _this.saveResponse.forEach(fn => {
              fn(newRespose)
            })
          }
          resolve(newRespose.data)
        } else {
          reject(xhr.responseText)
        }
      }
    };
    xhr.send(JSON.stringify(data))
  })
}

iaxios.prototype.get = function (url) {
  let _this = this;
  // this.saveRequest && this.saveRequest(this)
  //请求之前调用请求拦截的回调函数
  if (this.saveRequest) {
    this.saveRequest.forEach(fn => {
      fn(this)
    })
  }

  //返回promise对象
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    //设置请求头的配置
    setHeader(xhr, this.headers);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status == 200 || xhr.status == 304)) {
          //用来保存返回的数据
          let newRespose = new Object;
          newRespose.data = JSON.parse(xhr.responseText);
          // _this.saveResponse && _this.saveResponse(newRespose)
          //在返回数据之前调用相应拦截器的回调函数
          if (_this.saveResponse) {
            _this.saveResponse.forEach(fn => {
              fn(newRespose)
            })
          }
          resolve(newRespose.data)
        } else {
          reject(xhr.responseText)
        }
      }
    };
    xhr.send()
  })
}

//返回一个新的实例并且复制obj的属性
iaxios.prototype.create = function (obj) {
  var emaxios = new iaxios()
  emaxios.headers = obj.headers;
  emaxios.baseUrl = obj.baseUrl;
  return emaxios;
}

//设置请求头的方法
function setHeader (xhr, headers) {
  for (var i in headers) {
    xhr.setRequestHeader(i, headers[i]);
  }
}








var taxios = new iaxios();


export {
  taxios
}

```







































​       