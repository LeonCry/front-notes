# Promise

[toc]

-----



问题：为什么要用Promise，他有什么优点吗？

答：因为Promise支持**链式调用**，可以解决回调地狱的问题。



## Promise的衍生方法

**--Promise.all(promises)**

Promises:多个promise的**数组**，使用该方法可以返回一个promise，只有promises数组中所有的promise都成功才算成功，只要有一个失败，就直接失败。

**--Promise.allSettled(promises)**

Promises:多个promise的**数组**,使用该方法可以返回一个promise,promise.then(res=>res)可以返回所有promises数组里的执行结果数组res，不管是成功还是失败。返回的res表示形式为：**返回数组顺序为输入顺序**。

```js
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 2 },
  { status: 'rejected', reason: 3 }
]
```

**--Promise.race(promises)**

Promises:多个promise的**数组**，使用该方法可以返回一个promise，promises数组中第一个完成的promise的结果就为该方法的最终状态，无论成败。

**--Promise.any(promises)**

Promises:多个promise的**数组**，使用该方法可以返回一个promise，promises数组中第一个状态变为**fulfilled**的promise的结果为该方法的最终状态。如果数组中所有promise都为reject,则返回一个失败的promise，失败的原因为所有失败promise原因的集合。



## Promise异常穿透

由于promise链式调用的特性，我们可以在所有then链式调用的最后，指定失败的回调，前面操作出现的任何异常，都会传到最后的失败的回调中处理。



## 如何中断Promise链式调用

在需要中断的地方加上 return new Promise(()=>{})即可中断。原理，返回的是一直pendding状态的promise，不会调用后面的then方法。



## 手写Promise

### 初立框架

首先，在使用Promise时，我们都需要new Promise，因此，Promise实质上是一个类，那么我们要首先创建这个类。并且要知道这个类上有哪些方法。

```js
//创建Promise
let p = new Promise((resolve,reject)=>{
  resolve("ok");
})
p.then((res)=>res,(rej)=>rej)
```

由上可知:

- Promise本身具有一个状态属性值和结果属性值。
- Promise接收一个函数，我们可以称它为exactor，executor函数接收两个参数 - resolve,reject,这两个参数也是函数。resolve,reject方法也接收参数data,即返回的数据。
- new Promise出来的实例对象有方法.then()，then()方法接收两个参数，这两个参数也是函数，一个是res函数，一个是reject函数。then方法会return一个新的Promise对象好方便进行链式调用。

此时我们可以搭建出来一个框架：

> 坑:由于resolve是直接调用的，所以this得指向是全局window
>
> 解决办法:1 将this在外面进行额外保存  2 resolve reject使用箭头函数

```js
function MyPromise(executor){
  //添加promise属性值
  this.PromiseState = "pending";
  this.PromiseResult = null;
  //resolve函数
  const resolve = (data) =>{
    
  }
  //reject函数
  const reject = (data) =>{
    
  }

  //执行器函数是同步调用的。
  executor(resolve,reject);
}

//添加then方法
MyPromise.prototype.then = function(onReslove,onReject){

}
```

### 完善resolve、reject函数

由于resolve和reject方法可以改变Promise状态和Promise结果值，我们可以对resolve和reject函数进行进一步的完善。

```js
  //resolve函数  
	const resolve = (data) =>{
   this.PromiseState = "fulfilled";
   this.PromiseResult = data;
	}
  //reject函数
  const reject = (data) =>{
    this.PromiseState = "rejected";
    this.PromiseResult = data;
  }
```

另外，抛出异常也会改变Promise的状态和结果值。采用try...catch来处理异常。另外，我们都知道抛出异常其实是在executor函数中进行的，因此我们的try...catch应该包裹在executor函数中进行。

```js
//try...catch捕获异常并改变Promise的状态和结果值。
  try {
    //执行器函数是同步调用的。
    executor(resolve,reject);
  } catch (error) {
    reject(error);
  }
```

此时整体框架为：

```js
function MyPromise(executor){

  //添加promise属性值
  this.PromiseState = "pending";
  this.PromiseResult = null;


  //resolve函数
  //resolve功能:1.修改Promise的状态  2.修改promise的结果
  const resolve = (data) =>{
    this.PromiseState = "fulfilled";
    this.PromiseResult = data;

  }
  //reject函数
  const reject = (data) =>{
    this.PromiseState = "rejected";
    this.PromiseResult = data;
  }
  //try...catch捕获异常并改变Promise的状态和结果值。
  try {
    //执行器函数是同步调用的。
    executor(resolve,reject);
  } catch (error) {
    reject(error);
  }
}

//添加then方法
MyPromise.prototype.then = function(onReslove,onReject){

}
```

### 状态只能修改一次

在改变状态之前，应该判断一下状态是否已经被更改了。

```js
//在resolve和reject函数内部添加一条判断语句即可
if (this.PromiseState!=="pending") return;
```

### 同步任务then方法的实现

此时我们对then方法进行完善，then方法接收两个函数参数，在成功时和失败时分别调用。

```js
//添加then方法
MyPromise.prototype.then = function(onReslove,onReject){
  //成功时回调-同步
  if(this.PromiseState==="fulfilled") onReslove(this.PromiseResult);
  //失败时回调-同步
  if(this.PromiseState==="rejected") onReject(this.PromiseResult);
}
```

### 异步任务then方法的实现

以上我们的实现都是在同步任务时进行实现的，但是若在异步任务时，我们上面的方法就不好使了。

在进行异步任务时，executor里面掺杂了定时器，resolve或者reject函数还未执行，而是丢进了宏任务队列，此时代码继续向下走，走到.then方法时执行，由于此刻的Promise实例状态并未改变，因此then方法并不执行。所以，我们应该给.then方法再加一个判断，即，当状态为pending时，我们需要做些事情...

做什么事情呢？

我们都知道，在异步任务时，我们的then回调函数肯定是不能立即执行的，只有当executor中调用了resolve/reject函数之后才执行，那么就表明，我们的then回调函数应该在resolve/reject函数中执行。

怎么把then回调函数放入resolve/reject函数中执行呢？

在实例对象上新添加一个属性callbacks,此为then方法的回调函数，并在resolve/reject函数中执行。

```js
function MyPromise(executor){
  ...
  this.callbacks = {};
  ...
  const resolve = (data) =>{
    ...
    //异步:调用成功的回调函数
    this.callbacks?.onReslove(data) ?? null;
  }
  const reject = (data) =>{
    ...
    //异步:调用失败的回调函数
    this.callbacks?.onReject(data) ?? null;
  }
  ...
}
  //添加then方法
MyPromise.prototype.then = function(onReslove,onReject){
  //成功时回调-同步
  if(this.PromiseState==="fulfilled") onReslove(this.PromiseResult);
  //失败时回调-同步
  if(this.PromiseState==="rejected") onReject(this.PromiseResult);
  //异步时执行-异步
  if(this.PromiseState==="pending") this.callbacks = {onReslove,onReject};
}
```

### 指定多个回调的实现

本小节的意思是：

p.then()....之后 再次p.then()...应该继续执行(两者都执行),所以我们需要将所有的then回调函数都放到callback里面，所以我们的代码应该进行适当的改变，将callback改成数组。

```js
function MyPromise(executor){
  ...
  this.callbacks = [];
  ...
  const resolve = (data) =>{
    ...
    //异步:调用成功的回调函数
    this.callbacks.forEach((val)=>{
      val?.onReslove(data);
    })
  }
  const reject = (data) =>{
    ...
    //异步:调用失败的回调函数
    this.callbacks.forEach((val)=>{
      val?.onReject(data);
    })
  }
  ...
}
  //添加then方法
MyPromise.prototype.then = function(onReslove,onReject){
  //成功时回调-同步
  if(this.PromiseState==="fulfilled") onReslove(this.PromiseResult);
  //失败时回调-同步
  if(this.PromiseState==="rejected") onReject(this.PromiseResult);
  //异步时执行-异步
  if(this.PromiseState==="pending") this.callbacks.push({onReslove,onReject});
}
```

### 同步任务then方法的返回

我们知道，then方法返回的应该也是一个Promise对象，返回的Promise对象的状态和结果会根据.then方法返回的值进行判断：

- 如果.then方法返回的是undefined或者其他非promise类型的值，则返回的promise对象为fulfilled，结果为.then方法返回值
- 如果.then方法返回的是一个新的promise对象，则之前返回的promise对象状态和值要根据新的promise对象状态和值进行更新

```js
//添加then方法
MyPromise.prototype.then = function(onReslove,onReject){
  //返回一个promise对象 ， 注意：new Promise中new关键字就相当于一个函数fn进行了fn();
  return new MyPromise((resolve,reject)=>{
    //成功时回调-同步
    if(this.PromiseState==="fulfilled") {
      let res = onReslove(this.PromiseResult);
      //如果返回是Promise对象
      if(res instanceof MyPromise){
        res.then(v=>resolve(v),r=>reject(r))
      }
      //如果返回不是promise对象
      else{
        resolve(res);
      }
    }
    //失败时回调-同步
    if(this.PromiseState==="rejected"){
      let res = onReject(this.PromiseResult);
      //如果返回是Promise对象
      if(res instanceof MyPromise){
        res.then(v=>resolve(v),r=>reject(r))
      }
      //如果返回不是promise对象
      else{
        reject(res);
      }
    }
    //异步时执行-异步
    if(this.PromiseState==="pending") this.callbacks.push({onReslove,onReject});
  })
}

```

### 异步任务then方法的返回

由于在异步任务中，其then回调函数的执行放在了callbacks中，由于我们需要知道then回调函数的执行结果，因此，我们需要对then函数部分的异步状况进行改进：

```js
MyPromise.prototype.then = function(onReslove,onReject){
  ...
  if(this.PromiseState==="pending") {
      let obj = {
        onReslove:()=>{
          let res = onReslove(this.PromiseResult);
          if(res instanceof MyPromise){
            res.then(v=>resolve(v),r=>reject(j));
          }	
          else{
            resolve(res);
          }
        },
        onReject:()=>{
          let res = onReject(this.PromiseResult);
          if(res instanceof MyPromise){
            res.then(v=>resolve(v),r=>reject(j));
          }
          else{
            resolve(res);
          }
        }
      }
      this.callbacks.push(obj)
  ...
}
```

### 异常穿透方法的实现

```js
MyPromise.prototype.then = function(onReslove,onReject){
  //如果没有传onReslove和onReject，给一个默认初始值
  if(typeof onReslove!=="function"){
    onReslove = value => value;
  }
  if(typeof onReject!=="function"){
    onReslove = reason => {throw reason};
  }
  ...
}
  
//添加异常穿透方法
MyPromise.prototype.catch = function(onReject){
  return this.then(undefined,onReject);
}
```























