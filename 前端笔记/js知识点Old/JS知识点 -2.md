# JS知识点 -2



## Obj.Constructor/object上的函数和方法

 从本质上看，`Object` 是一个[构造函数](https://so.csdn.net/so/search?q=%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0&spm=1001.2101.3001.7020)，用于创建对象。

在 `Object` 中声明的属性只有两个：

- `Object.length` —— 值为1
- `Object.prototype` —— 指向 `Object` 函数的原型对象

### 静态方法

静态方法就是直接定义在 `Object` 函数上的方法，注意与实例方法区分！！！调用的方式也不同，直接通过 `Object.xxx()` 的方式调用。

#### `Object.assign(target,...assign)`

浅拷贝

#### `Object.create(proto,propertiesObject)`

该方法用于创建新对象。第一个参数用于指定新建对象的原型对象；第二个参数是对象的属性描述对象。方法返回新建的对象。

在默认的情况下，我们通过对象字面量的方式 `{}` 创建的对象的原型对象就是 `Object` ，然而，通过该方法就可以指定一个新建对象的原型对象，从而改变原型链的结构。

```js
function Person() {}
Person.prototype.hello = function (){
    console.log("hello")
}
let person = Object.create(Person.prototype,{
    name:{
        value:"jonas",
        writable:true,
        configurable:true,
    },
    age:{
        value:18,
        writable:true,
        configurable:true,
    }
})
console.log(person)//Person {name: "jonas", age: 18}
person.hello()//hello
```

#### `Object.defineProperty(obj,prop,desc)`

在对象 `obj` 上定义新的属性，或者修改对象 `obj` 中的属性，结果返回对象 `obj`。

该方法有三个参数，第一个参数 `obj` 是目标对象，第二个参数 `prop` 是属性键名，第三个参数是这个属性的描述符。

```js
let person = {}
Object.defineProperty(person,"name",{
    value : "jonas",
    writable : true,
    enumerable : true,
    configurable : true
})
console.log(person)//{name: "jonas"}
```

扩展：属性描述符有两种：

- 数据描述符。具有值的属性。
- 存取描述符。由 `getter` 和 `setter` 函数对属性的描述。

一个属性只能是其中的一种描述符。

描述符通用属性：

- `configurable` —— 布尔值，默认值为 `false` 。若值为 `true`，则表示这个属性描述符可以被改变，同时该属性也能从对象上删除。
- `enumerable` —— 布尔值，默认值为 `false`。表示是否能枚举

数据描述符特有的属性：

- `value` —— 该属性的值，默认值为 `undefined`
- `writable` —— 布尔值，默认值为 `false`，表示是否能重写。

存取描述符特有的属性：

- `get:function` —— 默认值为 `undefined`，当访问该属性时，该方法会被执行。
- `set:function` —— 默认值为 `undefined`，当属性修改时，触发执行该方法，该方法接收一个参数，就是该属性新的值。

#### `Object.entries(obj)`

该方法返回对象 `obj` 自身的可枚举属性的键值对[数组](https://so.csdn.net/so/search?q=%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)。结果是一个二维数组，数组中的元素是一个由两个元素 `key` ，`value` 组成的数组。

```js
let person = {name:"jonas",age:18}
let arr = Object.entries(person)
console.log(arr)//[["name", "jonas"],["age", 18]]
```

该方法的使用场景是：将普通的对象转换为 `Map`：

```js
let person = {name:"jonas",age:18}
let map = new Map(Object.entries(person))
console.log(map)//Map(2) {"name" => "jonas", "age" => 18}
```

相似的，还有两个方法可以取出对象的键名或键值：

- `Object.keys(obj)` —— 返回一个对象中的可枚举属性组成的数组
- `Object.values(obj)` —— 返回一个对象中的可枚举属性值组成的数组。

#### `Object.freeze(obj)`

该方法用于冻结对象，一个被冻结的对象不能被修改，不能添加新的属性，不能修改属性的描述符，该对象的原型对象也不能修改。返回值为被冻结的对象。

#### `Object.getOwnPropertyDescriptor(obj,prop)`

该方法用于返回指定对象上自有属性对应的属性描述符。

```js
let obj = {}
Object.defineProperty(obj,"name",{
    configurable:false,
    enumerable:true,
    writable:true,
    value:"Jonas"
})
let descriptor = Object.getOwnPropertyDescriptor(obj,"name")
console.log(descriptor)//{value: "Jonas", writable: true, enumerable: true, configurable: false}

```

#### `Object.getOwnPropertyNames(obj)`

该方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 `Symbol` 作为键名的属性）组成的数组。

该方法包含的范围比 `Object.keys()` 广。

```js
let obj = {}
Object.defineProperty(obj,"name",{
    configurable:false,
    enumerable:false,
    writable:true,
    value:"Jonas"
})
Object.defineProperty(obj,Symbol(),{
    configurable:false,
    enumerable:false,
    writable:true,
    value: 18
})
let arr = Object.getOwnPropertyNames(obj)
console.log(arr)//["name"]

```

#### `Object.getOwnPropertySymbols(obj)`

该方法返回一个指定对象自身所有的 `Symbol` 键名的属性的数组。

#### `Object.getPrototypeOf(obj)`

该方法返回指定对象的原型对象。

```js
function Person() {}
Person.prototype.hello = function () {
    console.log("hello")
}
let person = new Person()
let proto = Object.getPrototypeOf(person)
proto.hello()//hello
```

#### `Object.is(obj1,obj2)`

该方法用于比较两个对象是否相同，返回布尔值。

比较规则如下：

如果两个值都是 undefined ，则返回 true
如果两个值都是 null，则返回 true
如果两个值都是 true 或 false ，则返回 true
如果两个值都是由相同个数的字符按照相同的顺序组成的字符串，则返回 true
如果两个值指向同一个对象，则返回 true
如果两个值都是 +0 ,-0，NaN，则返回 true

注意：该方法不会做隐式类型转换。

7.Object.getOwnPropertySymbols()

返回一个数组，包括对象自身的所有Symbol属性

11.Object.keys()

返回一个数组，成员是参数对象自身的（不含继承的）所有可枚举（enumerable）属性的键名

数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。

12.Object.values()
方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

17. Object.deleteProperty(obj,"c"); 删除



### 实例方法

在 `JS` 中，所有的对象都是来自 `Object`，所有对象从 `Object.prototype` 中集成方法和属性，尽管它们可能被覆盖。`Object` 的原型对象中也定义着一些方法，但是有一部分已经遗弃了，下面展示几个还在使用的：

- `Object.prototype.hasOwnProperty(prop)` —— 检测指定对象的自身中是否具有指定的属性，返回布尔值。
- `Object.prototype.toString()` —— 返回对象的字符串形式。


- `Object.prototype.valueOf()` —— 返回对象本身。
- `Object.prototype.isPrototypeOf(obj)` —— 检测对象是否在另一个对象的原型链上，返回布尔值。



## js中的symbol

xxx



## 浏览器进程和线程

 https://blog.csdn.net/weixin_44196299/article/details/102651547?spm=1001.2101.3001.6650.13&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-13-102651547-blog-79505478.pc_relevant_multi_platform_whitelistv4&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-13-102651547-blog-79505478.pc_relevant_multi_platform_whitelistv4&utm_relevant_index=16







## 判断类型的方法

 基本数据类型（**值类型**）：String、Number、[boolean](https://so.csdn.net/so/search?q=boolean&spm=1001.2101.3001.7020)、null、undefined、symbol（es6新增的）

引用数据类型 (**引用类型)**：object。包含 Function、Array、Date、RegExp、Error等都是属于 Object 类型 。

#### 一、typeof

- 通常用来判断基本数据类型，它返回表示数据类型的字符串
- （返回结果只能包括number,boolean,string,function,undefined，object）；
-  *注意，使用typeof来判断null和引用类型 返回的结果都是 'object'

#### 二、instanceof

使用instanceof，如：a instanceof A(构造函数) 根据instanceof的定义：判断参照对象（大写字母A）的prototype属性所指向的对象是否在被行测对象a的原型链上，instanceof 只能用来判断两个对象是否属于实例关系，而不能判断一个对象实例具体属于哪种类型

```js
function A(name,age){
  this.name = name;
  this.age = age;
}
 
a = new A('张三',18);
console.log(a instanceof A)  //true
 
 
obj = new Object()//创建一个空对象obj
//或者通过字面量来创建：
obj = {}
console.log(obj instanceof Object); // true
 
arr = new Array()  //创建一个空数组arr  或arr = []
console.log(arr instanceof Array ); // true
 
date = new Date()
console.log(date instanceof Date ); // true
 
// 注意：instanceof后面一定要是对象类型，instanceof前面相当于它的实例对象,
// 后面的对象类型大小写不能写错，该方法试用一些条件选择或分支
```

但是这种方式判断有个弊端：对于number,string,boolean这三种基本数据类型，**简单实现instanceof:**

```js
function my_instanceof(L, R) {
  const O = R.prototype;
  if (L === null) {
    return false;
  }
  L = L.__proto__;
  while (true) {
    if (L === null) {
      return false;
    }
    if (L === O) {
      return true;
    }
    L = L.__proto__;
  }
}
```

#### 三、根据constructor判断 

- 针对于instanceof的弊端，我们使用constructor检测，constructor是原型对象的属性指向构造函数。

```js
console.log('数据类型判断 -  constructor');
 
 
let num = 23;
let date = new Date();
let str = "biu~";
let reg = new RegExp();
let bool = true;
let fn = function () {
  console.log(886);
};
let udf = undefined;
let nul = null;
let array = [1, 2, 3];
console.log(num.constructor); // [Function: Number]
console.log(date.constructor); // [Function: Date]
console.log(str.constructor); // [Function: String]
console.log(bool.constructor); // [Function: Boolean]
console.log(fn.constructor); // [Function: Function]
console.log(reg.constructor); // [Function: RegExp]
console.log(array.constructor); // [Function: Array]
 
```

-  这种方式解决了instanceof的弊端，可以检测出除了undefined和null的9种类型（因为它两没有原生构造函数） 

#### 四、通过Object下的toString.call()方法来判断 

所有typeof返回值为"object"的对象，都包含一个内部属性[[Class]]，我们可以把他看作一个内部的分类,而非传统意义上面向对象的类,这个属性无法直接访问，一般通过Object.prototype.toString(…)来查看。并且对于基本数据类类型null,undefined这样没有原生构造函数，内部的[[Class]]属性值仍然是Null和Undefined 

```js
Object.prototype.toString.call();
console.log(toString.call(123));          //[object Number]
console.log(toString.call('123'));        //[object String]
console.log(toString.call(undefined));    //[object Undefined]
console.log(toString.call(true));         //[object Boolean]
console.log(toString.call({}));           //[object Object]
console.log(toString.call([]));           //[object Array]
console.log(toString.call(function(){})); //[object Function]
```



## bigInt？

 处理大整数



## 所有距离相关

https://zhuanlan.zhihu.com/p/368206969

#### 1.1、client系列-元素可见度

**clientWidth = width（可见区域）+ padding - 滚动条宽度（如果有）**
**clientHeight = height（可见区域）+ padding - 滚动条宽度（如果有）**
**clientLeft：相当于元素左border(border-left)的宽度**
**clientTop：相当于元素上border（border-top）的宽度**

#### 1.2、scroll系列-元素内滚动

**scrollWidth = width（内容实际宽度，包括不可见区域） + padding**
**scrollHeight = height（内容实际高度，包括不可见区域） + padding**
**scrollLeft：指当前元素可见区左部，到完整内容左部的距离（也就是横向滚动条滚动的距离）。**
**scrollTop：指当前元素可见区顶部，到完整内容顶部的距离（也就是纵向滚动条滚动的距离）**

#### 1.3、offset系列

在此之前，我们先看看一个属性：offsetParent。

offset是偏移的意思，既然是偏移就要有一个参照物，这个参照物就是 offsetParent。它指的是距离当前元素最近的定位父元素（position != static），这个定位父元素就是我们计算所有offset属性的参照物。

元素的 offsetParent 的获取方式：

- 通过元素的`offsetParent`属性直接获取。
- 元素`position:fixed`，则其`offsetParent`的值为`null`，此时相对视口定位。
- 元素非`fixed`定位，其父元素无位设置定位，则`offsetParent`均为为`null`，相对视口定位
- 元素非`fixed`定位，其父元素中有设置定位的，则其中离当前元素最近的父元素为`offsetParent`。

**offsetWidth = width（可见区域） + padding + border**
**offsetHeight = height（可见区域） + padding + border**
**offsetLeft：元素左外边框距离父元素左内边框的距离（简单来说就是元素相对父元素左边的距离）**
**offsetTop：元素上外边框距离父元素上内边框的距离（简单来说就是元素相对父元素上边的距离）**

#### 三、鼠标事件相关的坐标距离

**clientX** = 鼠标点击位置距离浏览器**可视区域**左边的距离
**offsetX** = 鼠标点击位置距离元素左边的距离，不包括左border。
**pageX** = scrollLeft + clientX （**但是IE8不支持**）
**layerX** = offsetX + 左border + 左边滚动条滚动的距离
**x** = 鼠标点击位置距离浏览器可视区域的左边距离（相当于 clientX）。
**screenX** = 鼠标点击位置距离电脑屏幕左边的距离。



## 原型对象/原型链

 https://blog.csdn.net/u012468376/article/details/53121081?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-53121081-blog-125742947.pc_relevant_multi_platform_featuressortv2dupreplace&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-53121081-blog-125742947.pc_relevant_multi_platform_featuressortv2dupreplace&utm_relevant_index=7



https://blog.csdn.net/u012468376/article/details/53127929

## 词法作用域

 https://zhuanlan.zhihu.com/p/125568209

​                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

## STAR原则

**什么是STAR法则？** 

STAR 法则是四个关键概念的缩写，每一个概念都是面试者回答行为面试问题的一个步骤。通过四个步骤，求职者就能给出一个全面且有逻辑的答案。具体拆分开看：

SITUATION: 情境，即描述背景，你在当时所处的环境或者面临的挑战。比如你当时要做一个从来没有接触过的项目，公司没有成功的先例可以参考；或者在一次团队合作中与同事出现了意见分歧等等…尽量与工作相关，描述地尽可能详细。

TASK: 任务，指描述你当时的任务，或在当时环境下你所承担的职责。比如你是这个项目的组织者、策划者，需要带领团队探索未知。或者你需要解决与同事之间的分歧，试图说服他听取你的意见等；或者是达成销售目标…

ACTION: 行动，即表述你和你的团队如何克服挑战。重点关注’你‘做了什么，而不是去讲你的团队，你的同事做了什么。

RESULT: 结果，解释所采取的行动产生了什么结果，从中学到了什么。





具体的回答方式我们来看两个例子：

【范例一】

面试提问：举一个你必须在很短时间内搞定工作/任务的例子，说说你是怎么解决的。

参考回答：

虽然我平时喜欢分阶段划分我的工作任务，然后一块一块地完成，但我也可以在很短的时间内高质量地完成任务。

之前我的一个同事在他的项目即将交付的前几天离职了，这个项目没有其他人了解（Situation）。我被要求负责完成这个项目，那时只剩下3天时间（Task）。我带着两个实习生成立了一个小组并给他们分派工作，我们用熬了一个通宵（Action），用了不到2天就完干完了这个项目。我非常相信我有能力在很短的时间内完成工作（Result）。

 

【范例二】 

面试提问：当一个团队成员拒绝完成分配的工作时，你是怎么做的？

参考回答：

当团队出现冲突时，我总是尽我最大的努力去领导团队。我认为我的沟通能力可以让我成为合格的领导者。

有一次当我在做一个团队项目时，两个成员有了争论，因为他们对工作量不满意，拒绝完成自己的部分（Situation）。我明白必须要先解决他们的问题，才能让团队运转起来（Task），所以我安排了一次小组会议，听取每个人对分工的看法，听取每个人擅长和想做的部分，重新分配工作，尽可能让所有人满意（Action），最终我们的项目很成功，这件事也让我明白了合理地分工对于团队配和来说非常重要（Result）。