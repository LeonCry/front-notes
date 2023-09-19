# JS知识点 -2



## Object/Object.prototype上的属性与方法

https://juejin.cn/post/7037673377229701150

 从本质上看，`Object` 是一个[构造函数](https://so.csdn.net/so/search?q=%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0&spm=1001.2101.3001.7020)，用于创建对象。

### 创建方法

1. 字面量创建形式：使用花括号`{name: 'John'}`

2. 使用Object构造方法：

- 如果给定值是 `null`或 `undefined`，将会创建并返回一个空对象 {}
- 如果传进去的是一个基本类型的值，则会构造其**包装类型**的对象 [Number: 1]
- 如果传进去的是引用类型的值，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址 例如:`数组、对象、函数`

> **包装类型对象：**
>
> Object(value)，如果value是基本类型，那么该方法可以将基本类型的数据改为包装类。 Object(1) => [Number:1]
>
> 其他：Object(null) => {}  Object(undefined) => {} 

### 静态属性和方法

> 静态方法就是直接定义在`Object`**函数**上的方法，调用的方式也不同，直接通过`Object.xxx()` 的方式调用。

**静态属性：**

- `Object.length` —— 值为1
- `Object.prototype` —— 指向 `Object` 函数的原型对象

**静态方法：**

#### 1.  `Object.assign()`

- `功能`：浅拷贝。

- `用法`：`let res = Object.assign(target，source)`

- `说明`：将source对象中的**可枚举**属性拷贝到target中去，如果target中有与source相同的键，则会被覆盖并将拷贝后的对象返回为res。该方法也会同样改变target的值.(**改变原对象**)res===target // true   **这对于响应式的对象也可用哦~**

- `注意`:**如果source里面有嵌套对象，那么target里会引用source的内存地址，所以才称他为浅拷贝。同理，如果target是响应式对象，source里面有嵌套对象，那么source嵌套对象改变，targe仍然改变，因为target对该对象(同一内存地址)做了映射，对原对象的操作会同步到映射对象，反过来同理。**



#### 2.`Object.create()`

- `功能`：用于使用现有的对象来创建新的对象的`_proto_`。

- `用法`：`let res = Object.create(obj)`

- `说明`：以obj创建一个新的对象，得到的res为{},`res._proto_===obj`。该方法并**不能用来实现深拷贝**(**之前不知道从哪个黑网站听说的可以实现深拷贝**)，该方法得到的res是**引用**的obj,所以res会随着obj对象的内容改变而改变。

  

#### 3.`Object.defineProperty()`

- `功能`：直接在一个对象上定义新的属性或修改现有的属性。【**每次修改单个属性**】。

- `用法`：`Object.defineProperty(obj,prop,{config})`

- `说明`：其中obj为需要修改或定义新属性的对象，prop为修改或新增属性的名称，config为配置对象，其值具体如下：

```js
configurable:为false时表示除了`value、writeable`特性外的其他特性不可被改变，不可被删除。默认为false.
enumerable:可枚举性，即是否能够使用for in或者Object.keys()枚举出来。默认为false.
writable:其value值是否可更改，默认为false.
value:表示其值，默认为undefined.

get():属性的getter函数，没有时默认为undefined。当访问该属性时会调用此函数。
set():属性的setter函数，没有时默认为undefined。当属性值被修改时，会调用此函数。方法会接收一个默认参数（也就是被赋予的新值）
`注意1：一个属性有了get或者set中的任意一个，或者两个都有，那么，就不能再有value或者writeable，他们不能同时存在，如果同时存在会报错`
`注意2：set和get会替换掉默认修改和访问时值的赋值和值的返回。`
例如：
let res = Object.defineProperty(obj,'prop',{
    get(){
        console.log("prop被访问了");
        return this.value;	//如果不加这一句话，则不会返回prop的值。
    },
    set(newvalue){
        console.log("props被修改了",newvalue);
        this.value = newvalue; //如果不加这一句话，则不会进行赋值
      	res===this //true
    },
})

```

#### 4.`Object.defineProperties()`

- `功能`：直接在一个对象上定义新的属性或修改现有的属性。【**每次可以修改多个属性**】。

- `用法`：`Object.defineProperties(obj,{config})`

- `说明`：同Object.defineProperty().



#### 5.`Object.entries()` 特点：**自身**上的键值对 必须**可枚举**

- `功能`：返回一个**自身**键值对数组，该键值对必须在该对象上是**可枚举**的，其数组顺序与for..in一致。

- `用法`：`let res = Object.entries(obj)`

- `说明`：返回结果res为：`['a',123],['b',456]`,所以很容易可以将它变成一个Map对象。注意，entries是返回一个**自身可枚举**的键值对数组，不像for...in 还会将对象的原型链上的属性进行遍历【for..in在进行遍历的时候会先输出自身，再输出原型链】。所以怪不得在进行for...in（**可枚举**）的时候下面要加一句判断:

  ```js
  for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
          ...
      }
  }
  ```



#### 6.`Object.fromEntries()`

- `功能`：把键值对/Map转换为一个对象。

- `用法`：`let res = Object.fromEntries(map/[key:value])`

- `说明`：无。



#### 7.`Object.freeze()`

- `功能`：冻结一个对象，被冻结后的对象不能被修改。

- `用法`：`let obj2 = Object.freeze(obj)`

- `说明`：返回的obj2仍然是原来的对象obj.

```js
1. 不能添加新属性
2. 不能删除已有属性
3. 不能修改对象已有属性的可枚举性、可配置性、可写性
4. 不能修改已有的属性值（第一层的属性不可修改，但是第二层的属性可以修改）
5. 如果被冻结的是原型对象，也不可修改
```



#### 8.`Object.getOwnPropertyDescriptor()`

- `功能`：返回对象自有属性的属性描述符。

- `用法`：`let res = OObject.getOwnPropertyDescriptor(obj,prop)`

- `说明`：无。



#### 9.`Object.getOwnPropertyDescriptors()`

- `功能`：用来获取一个对象的所有自身属性的描述符。

- `用法`：`let res = OObject.getOwnPropertyDescriptors(obj)`

- `说明`：无。



#### 10.`Object.getOwnPropertyNames()` 特点：自身 枚举和不可枚举都能得到

- `功能`：返回一个数组，该数组对元素是`obj`**自身**拥有的**枚举或不可枚举**属性名称字符串。（不包含Symbol类型）。

- `用法`：`let keys = Object.getOwnPropertyNames(obj)`

- `说明`：此方法可以返回可枚举和不可枚举的所有keys数组。(for..in 和 entries 和object.keys() 只能返回**可枚举keys**)



#### 11.`Object.getPrototypeOf()`

- `功能`：返回该对象的对象原型。(用obj. _ proto _属性也可以获得，但proto属性终究是各大浏览器厂商为了方便而添加的，并不正规，真正取得要用Object.getPrototypeOf()方法)

- `用法`：`let res = Object.getPrototypeOf(obj)`

- `说明`：无。



#### 12.`Object.is()`

- `功能`：判断两个值是否相等。

- `用法`：`let res = Object.is(obj1,obj2)`

- `说明`：与 === 类似，但是有区别:

```js
===判断 +0和-0是相等的，Object.is判定它俩不相等
=== 判断 NaN === NaN 会返回false，Object.is判定它俩相等
```



#### 13.`Object.keys()` 特点：自身 可枚举

- `功能`：返回一个由一个给定对象的**自身** **可枚举**属性组成的数组。

- `用法`：`let res = Object.keys(obj)`

- `说明`：无。



#### 14.`Object.values()` 特点： 自身  可枚举

- `功能`：返回一个给定对象**自身**的所有 **可枚举**属性值的数组。

- `用法`：`let res = Object.values(obj)`

- `说明`：无。



#### 15.`delete obj.prop`

- `功能`：删除一个对象上的属性。

- `用法`：`delete obj.prop`

- `说明`：Object.deleteProperty(obj,prop)已弃用。



### Object原型上的方法  

> 原型.xxx.call() 和 对象.xxx()其实是是一样的 think why?`

#### 1.`hasOwnProperty()`

- `功能`：判断对象自身属性中是否具有指定的属性。

- `用法`：`Object.prototype.hasOwnProperty.call(obj,prop)`或`obj.hasOwnProperty(prop)`

- `说明`：无。



#### 2.`isPrototypeOf()`

- `功能`：测试一个对象是否存在于另一个对象的原型链上。

- `用法`：`Object.prototype.isPrototypeOf.call(objProto,obj)`或`objProto.isPrototypeOf(obj)`

- `说明`：objProto是原型对象，obj是实例对象。`原型对象.isPrototypeOf(实例对象)`。



#### 3.`toString()`

- `功能`：返回一个表示该对象的字符串。
- `用法`：`Object.prototype.toString.call(obj)`或`obj.toString()`
- `说明`：`Object.prototype.toString.call(obj)`会返回`"[object type]"`,主要用于类型判断。而`obj.toString()`会按类型返回不同值：
  - undefined||null.toString():返回错误；



#### 4.`valueOf()`

- `功能`：返回指定对象的原始值,如果没有原始值则返回对象本身。

- `用法`：`Object.isPrototypeOf.valueOf(obj)`或`obj.valueOf()`

- `说明`：Object.isPrototypeOf.valueOf(obj)中不同数据类型返回不同结果：
  - 基本数据类型返回: "数据类型 {数据值}"
  - 数组返回本身。
  - 对象返回对象本身。
  - 函数.valueOf()返回 => f(){你定义的函数体内容}。




> 为什么有的对象的`Object.prototype.xxx`和`obj.xxx`的结果不一样？
>
> 这是因为有的对象将自身的`xxx`方法进行了重写，在进行原型链查找的时候，就会先执行自身上的`xxx`方法。



 <a name="anchor">附录</a> ：不同数据类型的valueOf()和toString()的返回值

- toString():

  <img src="/Users/ll/Desktop/Apple共享/笔记/前端笔记/js知识点New/JS知识点 -2.assets/image-20230728142638924.png" alt="image-20230728142638924" style="zoom:50%;" />

- valueOf():

  > **注意!!!注意!!!注意!!!注意!!!注意!!!注意!!!**：下面表格中Array的valueOf()是其本身，表格描述错误。Function 返回的是f(){你定义的函数体内容}。

<img src="/Users/ll/Desktop/Apple共享/笔记/前端笔记/js知识点New/JS知识点 -2.assets/image-20230728142953295.png" alt="image-20230728142953295" style="zoom:50%;" />

- Date类型的toString()返回的表示时间的字符串；valueOf()返回的是现在到1970年1月1日的毫秒数

- undefined和null都没有toString()和valueOf()方法

- typeof (+/-1 .**toString**())结果为Number,原因是其会选执行-1 .**toString**(),然后再'+'隐式转换成Number数据类型



**两者的共同点与不同点：**

共同点：在 JavaScript 中，toString()方法和valueOf()方法，在输出对象时会自动调用。

不同点：二者并存的情况下，在数值运算中，优先调用了valueOf，字符串运算中，优先调用了toString。

返回值类型的差别：toString vs valueOf的差别:

              1. toString一定将所有内容转为字符串
    
              2. valueOf返回指定对象的原始值，不进行类型转换

用途的差别：

              1. valueOf专用于算数计算和关系运算
    
              2. toString专用于输出字符串

共同的缺点：无法获取null和undefined的值



## Array 与 Object等互转方法

### Array转Object

**方法一：三点运算符**

> 这是一个简单快速的方法,值得注意的是，该对象必须具有**iterator**属性才可以使用...运算符。
>
> ```js
> const arr = ['one','two','three'];
> const obj = {...arr}; // { 0: 'one', 1: 'tow', 2: 'three' }
> ```

**方法二:Object.assign()**

> 将所有可枚举属性的值从一个或多个源对象分配到目标对象
>
> ```js
> const arr = ['one','two','three'];
> const obj = Object.assign({}, arr); // { 0: 'one', 1: 'tow', 2: 'three' }
> ```

**方法三:Object.fromEntries()**

> 把键值对转换为一个对象。
>
> ```js
> const arr = [ ['a', 1], ['b', 2], ['c', 3] ];
> const obj = Object.fromEntries(arr);// { a:1 , b: 2, c: 3 }
> ```

### Object转Array

**方法一：Object.values()/Object.keys()/Object.entries()**

> Object.values()方法返回一个给定对象自身的所有可枚举属性`值`的数组,如果是想要得到对象有关值的数组，可以采用此方法
>
> `let arr = Object.values(obj)`
>
> Object.keys()方法返回一个给定对象的`键`的数组，如果是想要得到有关对象有关键的数组，可以采用此方法。
>
> `let arr = Object.keys(obj)`
>
> Object.entries()方法返回的是一个给定对象的`键值对`数组，如果想得到键值对数组的话，可以采用此方法。
>
> ```js
> let obj = {a:1,b:2,c:3}
> Object.entries(obj)	//[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
> ```

**方法二：可以用for..in  或者  for..of遍历出来**

略

**方法三:Array.from()**

> Array.from()接收三个参数，第一个参数是要转换为数组的对象，第二个参数是一个函数，表示对象中的每一项都要执行该方法并成为新数组该项的值，第三个参数是改变this指向。**值得注意的是，第一个参数要转换的对象必须具有length属性才可以转换，否则转出结果就是空数组。**
>
> ```js
> var arr = Array.from(Object.values(obj),x=>x);	//多此一举的做法
> ```
>
> 

### 伪数组转数组的方法

```js
var arr = Array.from({length:10},x=>x);	//后面的方法将针对fadeArr每一个值进行运算并返回给arr
```





### Array转Map

**方法一：new Map()**

> ```js
> let map = new Map([[1,"1"],[2,"c"],[3,"d"]]);
> ```

### Map转Array

**方法一：三点运算符**

> ```js
> const map = new Map();
> map.set(1,"foo").set(2,"bar").set(3,"baz");
> const arr = [...map]; // 法一：[ [ 1, 'foo' ], [ 2, 'bar' ], [ 3, 'baz' ] ]
> ```

**方法二：Array.from()**

> ```js
> const arr = Array.from(map); // 法二：[ [ 1, 'foo' ], [ 2, 'bar' ], [ 3, 'baz' ] ]
> ```

### Object转Map

**方法一：new Map(Object.entries(obj))**

### Map转Object

**方法一：Object.fromEntries(map.entries())**

### 对象转为JSON与JSON转为对象

对象转为JSON方法：JSON.stringify()

JSON转为对象方法: JSON.parse()



## JS中具有iterator接口的对象

**--什么是iterator可枚举性**

可枚举对象的一个定义特征是，当我们通过赋值运算符将属性赋值给对象时，我们将内部可枚举标志（enumerable）设置为 true。这是默认值。但是，我们可以通过将其设置为 false 来更改此行为。经验法则是，可枚举属性总是出现在 for...in 循环中。

所谓的可枚举就是可遍历的意思，也就是说对象的属性是否能够通过遍历得到。即通过for...in循环遍历到。

**--怎么判断是否可枚举？**

对象的属性是否具有可枚举属性是由enumerable值决定；可以通过obj.propertyIsEnumerable(prop)；来判断obj对象的prop属性是否能够枚举，该方法返回的是一个布尔值

**--哪些对象的属性是不可枚举的？**

js中基本包装类型的原型属性是不可枚举的，如自定义Object, Number，Boolean

**--具有可枚举性的对象有？**

**字符串，数组，set,map、Array，大多数类数组对象（DOM ， 节点对象（NodeList） ， arguments）等有迭代属性**。


## js中的symbol

https://juejin.cn/post/7028830157230047263



## 浏览器进程和线程

 https://blog.csdn.net/weixin_44196299/article/details/102651547?spm=1001.2101.3001.6650.13&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-13-102651547-blog-79505478.pc_relevant_multi_platform_whitelistv4&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-13-102651547-blog-79505478.pc_relevant_multi_platform_whitelistv4&utm_relevant_index=16







## 判断类型的方法



**7**种基本数据类型（**值类型**）：String、Number、boolean、null、undefined、symbol（es6新增） BigInt（es6新增）

引用数据类型 (**引用类型)**：object。包含 Function、Array、Date、RegExp、Error等都是属于 Object 类型 。

#### 一、typeof:

- 通常用来判断基本数据类型，它返回表示数据类型的字符串
- （返回结果只能包括number,boolean,string,function,undefined，object）
-  **注意，使用typeof来判断null和引用类型 返回的结果都是 'object'**

```js
typeof 1           //number
typeof 'a'         //string
typeof true        //boolean
typeof undefined   //undefined
typeof null        //object
typeof {}          //object
typeof [1,2,3]     //object
function Fn(){}    //function
typeof new Fn()    //object
typeof new Array() //object
```

**优点:可以快速检测出基本数据类型**

**缺点：无法检测出复杂数据类型 null为Object undefined为undefined**

#### 二、instanceof

使用instanceof，如：a instanceof A(**构造函数**) 根据instanceof的定义：判断参照对象（大写字母A）的prototype属性所指向的对象是否在被行测对象a的原型链上，**instanceof 只能用来判断两个对象是否属于实例关系**，而不能判断一个对象实例具体属于哪种类型

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

但是这种方式判断有个弊端：对于number,string,boolean这三种基本数据类型，只有通过构造函数定义比如：let num =new Number(1)；这样定义才能检测出。 let num = 1； 这样定义是检测不出来的。

**优点：可以检测出是否在被测对象的原型链上**

**缺点：对于基本数据类型，只有采用构造函数定义才能检测出来**

**简单实现instanceof:**

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
 
 

数字
var num = 1;
num.constructor
ƒ Number() { [native code] }
 
布尔值
true.constructor
ƒ Boolean() { [native code] }
 
字符串
"".constructor
ƒ String() { [native code] }
 
函数
var func = function(){}
func.constructor
ƒ Function() { [native code] }
 
数组
[].constructor
ƒ Array() { [native code] }
 
对象
var obj = {}
obj.constructor
ƒ Object() { [native code] }
 
```

-  这种方式解决了instanceof的弊端，可以检测出**除了undefined和null**的9种类型（**因为它两没有原生构造函数**） 

优点：既可以检测出基本数据类型，也可以检测出复杂类型(Object表示)

缺点：不可以检测出**undefined** 和 **null**  (因为它两没有原生构造函数)

#### 四、通过Object下的toString.call()方法来判断  ···**最常用最好用**···

所有typeof返回值为"object"的对象，都包含一个内部属性[[Class]]，我们可以把他看作一个内部的分类,而非传统意义上面向对象的类,这个属性无法直接访问，一般通过Object.prototype.toString(…)来查看。并且对于基本数据类类型null,undefined这样没有原生构造函数，内部的[[Class]]属性值仍然是Null和Undefined 

```js
Object.prototype.toString.call();
console.log(toString.call(123));          //[object Number]
console.log(toString.call('123'));        //[object String]
console.log(toString.call(undefined));    //[object Undefined]
console.log(toString.call(null));    			//[object null]
console.log(toString.call(true));         //[object Boolean]
console.log(toString.call({}));           //[object Object]
console.log(toString.call([]));           //[object Array]
console.log(toString.call(function(){})); //[object Function]
```

**缺点：无法检测出自定义的构造函数类型** **自定义构造函数只有 instanceof 可以判断出来好像**

##  == 与 === 

https://juejin.cn/post/6844903456407289869?searchId=20230728111323443BDE94EBABEF93BDF1

| 相等 ==                                                      | 全等===                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 先转换类型，再作“值”比较，最后返回值比较结果                 | 只有在相同类型下,才会比较其值                                |
| 1、如果两个值类型相同，转到进行 === 比较。                   | 1、如果类型不同，就[不相等]                                  |
| 2、如果两个值类型不同，他们可能相等。根据下面规则进行类型转换再比较： | 2、如果两个都是数值，并且是同一个值，那么[相等]；(**例外**)的是，如果其中至少一个是NaN，那么[不相等]。（判断一个值是否是NaN，只能用isNaN()来判断） |
| a、如果一个是null、一个是undefined，那么[相等]。规范中提到， 要比较相等性之前，不能将 null 和 undefined 转换成其他任何值，并且规定null 和 undefined 是相等的。null 和 undefined都代表着无效的值。 | 3、如果两个都是字符串，每个位置的字符都一样，那么[相等]；否则[不相等]。 |
| **b、如果一个是字符串，一个是数值，把字符串转换成数值再进行比较。** | 4、如果两个值都是true，或者都是false，那么[相等]。           |
| c、如果两边类型不同，如果有一边是 true ，把它转换成 1 再比较；如果是 false，把它转换成 0 再比较。 | 5、如果两个值都引用同一个对象或函数，那么[相等]；否则[不相等]。 |
| d、**如果一个是对象，另一个是数值或字符串，把对象转换成基础类型的值再比较。对象转换成基础类型，利用它的toString或者valueOf方法。js核心内置类，会尝试 valueOf先于toString；例外的是Date，Date利用的是toString转换。非js核心的对象，另说（比较麻烦，我也不大懂）** | 6、如果两个值都是null，或者都是undefined，那么[相等]。       |
| e、任何其他组合，都[不相等]。**[]==![]是成立的**             | --                                                           |

注意：

> 1.对于相等==中的b项：**如果一个是字符串，一个是数值，把字符串转换成数值再进行比较**。有以下注意点：
>
> - 字符串''转换成数字是0
> - 对于无法转换成数字的，转换出来为NaN，再进行判断
>
> 2.对于相等==中的d项：
>
> - 详情见 <a href='#anchor'>此处</a>







## bigInt

https://juejin.cn/post/6844903902295359502

除一元加号(`+`)运算符外，所有算术运算符都可用于`BigInt`   **+10n :error**

```js
10n + 20n;    // → 30n
10n - 20n;    // → -10n
+10n;         // → TypeError: Cannot convert a BigInt value to a number
-10n;         // → -10n
10n * 20n;    // → 200n
20n / 10n;    // → 2n
23n % 10n;    // → 3n
10n ** 3n;    // → 1000n

const x = 10n;
++x;          // → 11n
--x;          // → 9n
```

 处理大整数，因此BigInt中必须是整数，因此在除法中，会默认调用Math.floor()

```js
console.log(13n/2n)  //6n   
```



## 所有DOM距离相关

另：JS中的三大对象：Window、document、event：https://zhuanlan.zhihu.com/p/535556991

https://zhuanlan.zhihu.com/p/368206969

> **全局宽高度**
>
> 1. 屏幕高度:`window.screen.height` “整个电脑屏幕的高度”
> 2. 屏幕可用高度:`window.screen.availHeight` “其值为整个屏幕的高度-系统任务栏的高度”
> 3. 网页可视区域的高度:`document.documentElement.clientHeight` “不包括滚动条，`documentElement`相当于HTML,是body的父元素”
> 4. body标签的高度:`document.body.clientHeight` “body标签的高度”



> **元素自身属性宽高度** 
>
> ```css
> 				div {
>            width: 50px;
>            height: 50px;
>            padding: 5px;
>            border: 10px solid skyblue;
>            left: 3px;
>            overflow: scroll;
>         }		
> ```
>
> 1. 元素当前可见窗口宽度:`div.clientWidth` “`div.clientWidth = width + 2*padding - 滚动条宽度`”=>其实就是元素的可见内容的窗口宽度，只不过因为多了滚动条，要把滚动条宽度去掉。
>
> 2. 元素距离border的距离:`div.clientLeft` “`div.clientLeft = border-left(不是减去left,而是左left的宽度)`”
>
> 3. 元素的偏移距离:`div.offsetLeft`=> 元素的偏移距离首先要用偏离参照物，这个参照物就是距离当前元素最近的定位父元素(position!=static),也可以使用`div.offsetParent`来获取偏离参照物。元素的偏离参照物`offsetParent`获取方式有如下几种：
>
>    - 通过元素的`offsetParent`属性直接获取
>    - 元素`position:fixed`，则其`offsetParent`的值为`null`，此时相对html定位。
>    - 元素非`fixed`定位，其父元素无位设置定位，则`offsetParent`均为`null`,此时相对html定位。
>    - 元素非`fixed`定位，其父元素中有设置定位的，则其中离当前元素最近的父元素为`offsetParent`。
>
>    △ 元素的`offsetWidth` “`div.offsetWidth = width + 2*padding + 2*border`” =>我感觉元素的offsetWidth就是真实的元素的盒子宽度。
>
>    △ 元素的`offsetLeft` “`div.offsetLeft = 从div左侧border外到距离offsetParent左侧border外的距离`”==>相当于
>
>     `div.offsetLeft = div.left + offsetParent.padding + offsetParent.border`
>
>      即使定位父元素是可滚动的，该值也不会随着滚动而改变。
>
> 4. 元素的滚动宽度:`div.scrollWidth`,该元素具有滚动条，该宽度就是该元素滚动条从左拉到右时的累计宽度，倘若元素内部有确切宽度的子元素，则其计算公式可写为：
>
>    `div.scrollWidth = div.padding*2 + div.son.width + div.son.padding*2 +div.son.border*2`
>
> 5. 元素的滚动距离: `div.scrollLeft` “`div.scrollLeft = 可见元素的左侧到完整内容左侧的距离`”
>
>    即当前滚动条下，可见左侧到完整内容最左侧距离。当滚动条滑到最右侧时，`div.scrollLeft + div.clientWidth = div.scrollWidth`



> **鼠标事件相关的坐标距离**
>
> **clientX** = 鼠标点击位置距离浏览器**可视区域**左边的距离
> **offsetX** = 鼠标点击位置距离元素左边的距离，不包括左border,所以你点到border上会是负值。
> **pageX** = scrollLeft + clientX （**但是IE8不支持**）
> **layerX** = offsetX + 左border + 左边滚动条滚动的距离
> **x** = 鼠标点击位置距离浏览器可视区域的左边距离（相当于 clientX）。
> **screenX** = 鼠标点击位置距离电脑屏幕左边的距离。



## css中的不同定位

`static`:top、left等位置无效。

`relative`:可以相对于默认点位置进行偏移，即定位基点是元素的默认位置。可以搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，用来指定偏移的方向和距离。对于relative来说，`top`、`bottom`、`left`、`right`进行偏移时的距离是基于relative原来的位置（**`top`、`bottom`、`left`、`right`全为0或者说是基于static进行偏移的**）进行偏移的。

`absolute`:相对于上级元素（一般是父元素）进行偏移，即定位基点是父元素。**定位基点（一般是父元素）不能是`static`定位,否则定位基点就会变成整个网页的根元素`html`**.`absolute`定位也必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用。

`fixed`:相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。它如果搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，表示元素的初始位置是基于视口计算的，否则初始位置就是元素的默认位置。

`sticky`:很像`relative`和`fixed`的结合：`sticky`生效的前提是，必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，不能省略，否则等同于`relative`定位。它的具体规则是，当页面滚动，父元素开始脱离视口时（即部分不可见），只要与`sticky`元素的距离达到生效门槛，`relative`定位自动切换为`fixed`定位；等到父元素完全脱离视口时（即完全不可见），`fixed`定位自动切换回`relative`定位。



## Flex布局

http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

**Flex容器属性**

- Flex-wrap:默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。
  - nowrap(默认值):不换行
  - wrap：换行，第一行在上方
  - warp-reverse:换行，第一行在下方
- Justify-content:定义了在主轴上的对齐方式。
  - flex-start(默认值):左对齐
  - flex-end:右对齐
  - center:居中对齐
  - space-between:两端对齐，项目之间的间隔都相等.
  - space-around:每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

- Align-items:定义了在交叉轴上的对齐方式。
  - flex-start | flex-end | center ...
  - baseline:项目的第一行文字的基线对齐。
  - stretch(默认值):如果项目未设置高度或设为auto，将占满整个容器的高度。


**每个Flex项目属性**

- order:属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow:定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
- flex-shrink:定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- flex-basis:定义了在分配多余空间之前，项目占据的主轴空间（main size）。默认值为`auto`，即项目的本来大小。它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。
- flex:`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。
- align-self:允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。





## Grid布局

https://juejin.cn/post/6854573220306255880

设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

`display: grid`:指定一个容器采用网格布局。

`display: inline-grid`:指定一个容器为行内元素并采用网格布局。

**Grid容器属性**

- grid-template-columns,grid-template-rows:定义每一列的宽,定义每一行的高

  - **repeat()函数**:有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用`repeat(n,length)`函数，简化重复的值。其中 `n` 为重复的次数，`length`为每个项目的长度。`repeat()`重复某种模式也是可以的=>`repeat(2, 100px 20px 80px)`=>相当于定义了6个项目。

  - **auto-fill和auto-fit关键字**:有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill/fit`关键字表示自动填充。例如：`repeat(auto-fill/fit, 100px)`

    只有当容器足够宽，可以在一行容纳所有单元格，并且单元格宽度不固定的时候，才会有差异：`auto-fill`会用空格子填满剩余宽度，`auto-fit`则会尽量扩大单元格的宽度。

  - **fr 关键字**:如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。例如：`repeat(2, 1fr 2fr 1fr)`.`fr`可以与绝对长度的单位结合使用，这时会非常方便。`grid-template-columns: 150px 1fr 2fr;`

  - **minmax()函数**:产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。`minmax(100px, 1fr)`表示列宽不小于`100px`，不大于`1fr`。

  - **auto 关键字**:`auto`关键字表示由浏览器自己决定长度。auto等于该列单元格的最大宽度，除非单元格内容设置了`min-width`，且这个值大于最大宽度。

  - **网格线的名称**:`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。例如：

    ```css
     grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
     grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
    ```

- row-gap,column-gap:设置行与行的间隔（行间距）,设置列与列的间隔（列间距）。`gap`为简写形式。gap Flex也可以使用

- grid-template-areas:用于定义区域。

```css
grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
```

上面代码先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下：

```css
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
```

- grid-auto-flow:默认值是`row`,容器的子元素默认的放置顺序是"先行后列",也可以将它设成`column`，变成"先列后行"。还可以设成`row dense`和`column dense`：表示"先行后列"/"先列后行"，并且尽可能紧密填满，尽量不出现空格。

- justify-items/align-items：start | end | center | stretch  设置单元格内容的水平位置/垂直位置。`place-items`为合并简写形式。
- justify-content/align-content：start | end | center | stretch | space-around | space-between | space-evenly 属性是整个内容区域在容器里面的水平位置/垂直位置。`place-content`为合并简写形式。
- `grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

**Grid项目属性**

- 项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

  - `grid-column-start`属性：左边框所在的垂直网格线
  - `grid-column-end`属性：右边框所在的垂直网格线
  - `grid-row-start`属性：上边框所在的水平网格线
  - `grid-row-end`属性：下边框所在的水平网格线

  这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字。

  这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。例如：

  `grid-column-start: span 2`：该项目的左边框距离右边框跨越2个网格。

- grid-area:属性指定项目放在哪一个区域。

- justify-self:属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

- align-self:属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

  - start：对齐单元格的起始边缘。
  - end：对齐单元格的结束边缘。
  - center：单元格内部居中。
  - stretch：拉伸，占满单元格的整个宽度（默认值）。



## vertical-align

https://zhuanlan.zhihu.com/p/28626505



## 水平垂直居中的方式

https://juejin.cn/post/6844903679242305544

### 居中元素定宽高

​	...

### 居中元素不定宽高

- absolute + transform

  ```css
  /* 定位代码 */
  .wp {
      position: relative;
  }
  .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  /* 
  其中top是根据父元素的高度向下平移50%，left根据父元素的宽度向左平移50%，transform: translate(-50%, -50%)根据自身偏移50%。
  */
  ```

- writing-mode

- table

- css-table

- flex

- grid







## CSS中的百分比都是相对于谁的

https://juejin.cn/post/7012400693025718308

**包含块**：如果子元素不是**绝对定位**，则包含块为其父元素。如果资源司是绝对定位，则包含块为最近的有**相对定位**的祖元素。

#### width/height

当一个元素为其宽度分配一个百分比值时， `width` 是基于包含块的`width`, `height` 是基于包含块的 `height`。

#### padding/margin

对于 `padding`，垂直（`padding-top/padding-bottom`）或水平（`padding-left/padding-right`）都是基于包含块的 ==`width`==  来计算。

#### top/bottom/left/right

`top`、`bottom`基于包含块的`height`来计算，`left`、`right` 基于包含块的`width`来计算。

#### transform: translate()

一个用于动画/过渡的不可思议的属性，它也支持百分比值。然而，这个属性并不指其包含的块，而是指其**自身**。



## 原型对象/原型链

 https://blog.csdn.net/u012468376/article/details/53121081?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-53121081-blog-125742947.pc_relevant_multi_platform_featuressortv2dupreplace&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-53121081-blog-125742947.pc_relevant_multi_platform_featuressortv2dupreplace&utm_relevant_index=7



https://blog.csdn.net/u012468376/article/details/53127929

## 防抖与节流

```js
  //函数防抖--在一定时间内再次收到请求时，舍弃之前的请求，处理当前的请求
  var debounce = function(fn, t) {
    let clear = null;
    return function(...args) {
      clearTimeout(clear);
      clear = setTimeout(() => {
        fn(...args);
      }, t);
    }
};
  //函数节流--在一定时间内再次收到请求时，不响应收到的请求，继续处理当前请求，直到该事件结束。
  var throttle = function(fn,t){
    let finish = true;
    return function(...args){
      if(finish){
        finish = false;
        setTimeout(() => {
          fn(...args);
          finish = true;
        }, t);
    }
    }
  }
```



