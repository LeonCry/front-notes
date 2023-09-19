# JS剩余



## 杂项



> 1、一个数组的索引之外的值a[-1]的值为undefined
>
> 2、isNaN（）用来判断是否为数字，如果为数字则返回false，否则返回true；**任何类型的数字都算**，包括'1'也属于数字。isNaN（'1'）返回false
>
> 3、undefined 和 字符串 相加，会拼接字符串,undefined 和 数字相加，最后结果是**NaN**
>
> 4、null 和 字符串 相加，会拼接字符串,**null**和 **数字**相加，最后结果是 **数字**
>
> 5、在JavaScript中，形参的默认值是**undefined**
>
> 6、设置H5自定义属性： **<div data-index = "1"></>** 获取H5自定义属性:element.getAttribute('data-index')/`element.dataset.index` 或`element.dataset['index']`
>
> 7、函数.length表示的是该函数参数的个数。
>
> 8、 parseInt(a,b):第二个参数表示进制  ： 2 8 10 16 其他为NaN
>
> 9、indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。 
>
> 













## 其他问题



### 数字和字符串问题

这里的字符串是'123'之类的。

> 如果是数字+字符串/字符串+数字，最终结果是字符串，因为'+'在这里被当作了是字符串拼接；
>
> 如果是数字-字符串/字符串-数字，最终结果是Number；
>
> 如果是直接 +字符串，则最终结果是Number；
>
> 如果是直接 -字符串，则最终结果是Number；



### JS中Boolean类型值的判断

首先是== 和 ===的区别：

1- 对于基础类型Number、String、Boolean、null、undefined：

- 不同类型进行比较，== 比较的是转化为相同类型（**Number**）之后进行比较；===不同类型进行比较结果就是false
- 同种类型进行比较，直接进行值的比较

2- 对于复杂类型Array、Objict：== 和 ===是没有区别的：直接进行指针地址的比较；

3- 对于复杂类型和简单类型的比较，== 和 ===是有去别的：

- ==将高级类型转化为基础类型（**Number**）再进行比较；
- ===由于类型不同，结果为false

因此，Boolean == 进行比较时，不同类型的转化问题：

> 数据类型              转换为true的值              转换为false的值
>
> Boolean               true                         false
> String                任何非空的字符串               ''空字符串
> Number                任何非零数字值（包括无穷大）     0和NaN
> Object（复杂类型）      任何对象(包括空对象)            null
> Undefined（不属于对象，属于简单类型）  无               undefined

在进行比较时，首先进行类型转化，转化为**Number**型，再进行比较。

> 数据类型			具体数据			转换成Number型	
>
> 数字字符串		 '123'			     123          
>
> 非空字符串		 'abc'			     NaN
>
> 空字符串		 	  ''			      **0**
>
> **undefined**		 undefined		     **NaN**
>
> null			 null			      **0**
>
> 任意对象                {}、{a:1}                  NaN
>
> 单个数数组		 [1]、[0]		     1、0
>
> 多个数数组 		 [1,2,3,4]                  NaN
>
> 空数组			 []			      0

特例：**针对数组**：：：：：

“0”==[]：首先获取[]的原始值，即空字符串“”，然后进行两个字符串“0”与“”之间的比较。字符串之间的比较遵循的是逐个字符使用基于标准字典的 Unicode 值来进行比较的规则，所以这俩字符串不同。**false**

0==[]：有对象的话，先获取对象的原始值，如果原始值为number类型，直接与0比较；如果原始值为字符串类型，先转为number类型再比较；（在这里[]的原始值为“”，符合第二种情况） **true**



**总结**：

对于复杂类型进行比较时，== 和 === 时没有区别的，直接进行指针地址的比较；

对于简单类型进行比较时：

​	== 在进行比较时，先确定是否是同一类型，若是同一类型，则直接进行值的比较；若非同一类型，统一转化为**Number**类型再进行比较；

​	=== 在进行比较时，先确定是否是同一类型，若是同一类型，则直接进行值的比较；若非同一类型，结果为false；

对于复杂类型和简单类型进行比较时：

​	== 在进行比较时，将高级类型转化为基础类型(**Number**)再进行比较；

​	=== 直接返回false，因为类型不同。

null与undefined是==的**true**



### JS判断数据类型的方法

基本数据类型（**值类型**）：String、Number、boolean、null、undefined、symbol（es6新增的）

引用数据类型 (**引用类型)**：object。包含 **Function**(返回 function)、Array、Date、RegExp、Error等都是属于 Object 类型 。

#### 一、typeof

​	typeof 只能用来判断基本数据类型，返回结果是一个**字符串**。例如：

> ​	注意：typeof **null**和**引用类型**均 为 object

```js
typeof 1           //number
typeof 'a'         //string
typeof true        //boolean
typeof undefined   //undefined
typeof null        //object
typeof {}          //object
typeof [1,2,3]     //object
typeof new Fn()    //object new出来的一个新的对象  Fn为构造函数
typeof new Array() //object
typeof Fn		  //function
```

#### 二、instanceof

​	a instanceof A 是判断参照对象（A）的prototype属性所指向的对象是否在 a 的原型链上，返回结果是一个**Boolean**

​	因此，instanceof只能用来判断两个对象是否属于实例关系，而不能判断一个对象具体属于哪种类型

> ​	注意：instanceof后面一定要是**对象类型**，instanceof前面相当于它的**实例对象**

例如：

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
 
// 注意：instanceof后面一定要是对象类型，instanceof前面相当于它的实例对象
```

​	但是这种方法有个弊端：就是当验证对象是一个基本数据类型时，例如**Number、String、Boolean**，只能通过构造函数定义比如：let num =new Number(1)；这样定义才能检测出。即构造出基本数据类型的一个**实例对象**才可以进行比较。

```js
var x  = new Number(1);
console.log(x instanceof Number); //true

console.log(1 instanceof Number); //false
```



#### 三、constructor

​	constructor是原型对象的属性指向**构造函数**。因此 xxx.constructor 的结果时一个**字符串**： 'Function:数据类型'

```js
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
let obj = {};
let array = [1, 2, 3];
console.log(num.constructor); // [Function: Number]
console.log(date.constructor); // [Function: Date]
console.log(str.constructor); // [Function: String]
console.log(bool.constructor); // [Function: Boolean]
console.log(fn.constructor); // [Function: Function]
console.log(reg.constructor); // [Function: RegExp]
console.log(array.constructor); // [Function: Array]
console.log(obj.constructor); // [Function: Object]
console.log(udf.constructor);//Cannot read property "constructor" of undefined
console.log(nul.constructor);//Cannot read property "constructor" of null
```

​	这种方式解决了instanceof的弊端，可以检测出除了undefined和null的9种类型（因为它两没有原生构造函数，会报错）

#### 四、通过Object下的toString.call()方法来判断

所有typeof返回值为"object"的对象，都包含一个内部属性[[Class]]，我们可以把他看作一个内部的分类,而非传统意义上面向对象的类,这个属性无法直接访问，一般通过Object.prototype.toString(…)来查看。并且对于基本数据类类型null,undefined这样没有原生构造函数，内部的[[Class]]属性值仍然是Null和Undefined 

toString.call（xxx）返回的结果 是一个字符串 'object 数据类型'

例如：

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



### 函数里arguments的使用

​	当我们不确定有多少个参数传递的时候，可以用 arguments 来获取。在 JavaScript 中，arguments 实际上它是当前函数的一个内置对象。所有函数都内置了一个 arguments 对象，arguments 对象中存储了传递的所有实参。

- **arguments展示形式是一个伪数组，因此可以进行遍历。伪数组具有以下特点**

   ①：具有 **length** 属性

   ②：按索引方式储存数据

   ③：不具有数组的 push , pop 等方法

除了以上三点，其余和数组写法一样

arguments实际上是一个对象，其表现形式为：

arguments = {'1':xx,'2':xx,'3':xx};







### 作用域

JavaScript (ES6前) 中的作用域有两种：

- 全局作用域
- 局部作用域(函数作用域)：作用于函数内的代码环境，就是局部作用域。 因为跟函数有关系，所以也称为函数作用域



特别声明的是：JS没有块级作用域（ES6之前），块作用域由 `{}` 包括.



区别：

- 全局变量：在任何一个地方都可以使用，只有在浏览器关闭时才会被销毁，因此比较占内存
- 局部变量：只在函数内部使用，当其所在的代码块被执行时，会被初始化；当代码块运行结束后，就会被销毁，因此更节省内存空间



#### 作用域链

1. 如果函数中还有函数，那么在这个作用域中就又可以诞生一个作用域
2. 根据在内部函数可以访问外部函数变量的这种机制，用链式查找决定哪些数据能被内部函数访问，就称作作用域链
3. 作用域链：采取**就近原则**的方式来查找变量最终的值。





### 预解析

js引擎会把js里面所有的 **var** 还有 **function** 提升到**当前作用域**的最前面

变量提升: 变量的声明会被提升到**当前作用域**的最上面，变量的赋值不会提升

但是匿名函数 var xxx = function(){}是先把xxx提前声明，但是并不赋予function();

```js
// 匿名函数(函数表达式方式):若我们把函数调用放在函数声明上面
fn();
var  fn = function() {
    console.log('22'); // 报错
}


//相当于执行了以下代码
var fn;
fn();      //fn没赋值，没这个，报错
var  fn = function() {
    console.log('22'); //报错
}

```







### NEW关键字

new 在执行时会做四件事:

1. 在内存中创建一个新的空对象。
2. 让 this 指向这个新的对象。
3. 执行构造函数里面的代码，给这个新对象添加属性和方法
4. 返回这个新对象（所以构造函数里面不需要return）





### JS遍历对象的几种写法



#### 一、for...in

for … in 循环遍历对象自身的和继承的可枚举**属性**，即遍历出来的是**key**

```js
var dog = {
    name:'dog',
    age:15,
    sex:'fale'
};

for (let key in dog){
    console.log(key,dog[key])
}
```



#### 二、Object.keys()

Object.keys(obj)返回一个数组,包括对象自身的(不含继承的)所有**可枚举**属性(不含Symbol属性).即**key**

```js
var dog = {
    name:'dog',
    age:15,
    sex:'fale'
};

var keys = Object.keys(dog);
for (const k of keys) {
    console.log(k,dog[k]);
}
```



#### 三、Object.getOwnPropertyNames(obj)

作用与Object.keys()相同，(不含Symbol属性,但是包括不可枚举属性).返回一个属性数组，即**key**数组

```js
var dog = {
    name:'dog',
    age:15,
    sex:'fale'
};

var keys = Object.getOwnPropertyNames(dog);
console.log(keys)
for (const k of keys) {
    console.log(k,dog[k]);
}
```

#### 四、Reflect.ownKeys(obj)

返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.全部返回，也是 **key**数组

```js
var dog = {
    name:'dog',
    age:15,
    sex:'fale'
};

var keys = Reflect.ownKeys(dog);
console.log(keys)
for (const k of keys) {
    console.log(k,dog[k]);
}
```



### for in、for of、for each..的区别



> for...in主要用来遍历**对象**，遍历出来的是对象的**key数组**。`fot in循环里面的index是string类型的`



> for...of主要用来遍历数组和伪数组的可迭代对象（array、string、iterator）。遍历出来的是**value数组。**
>
> for...of遍历map和set时，返回的时key-value数组。
>
> ```js
> var map = new Map();
> map.set('name','dog');
> map.set('age',15);
> map.set('sex','fale');
>
> for (const [key,value] of map) {
>     console.log(key,value);
> }
> // name dog
> // age 15
> // sex fale
>
> for (const key_values of map) {
>     console.log(key_values);
> }
> // [ 'name', 'dog' ]
> // [ 'age', 15 ]
> // [ 'sex', 'fale' ]
>
> var s = 'abcdefg';
> for (const values of s) {
>     console.log(values);
> }
> //abcdefg
> ```
>
> 



> for...each 主要用来遍历**数组和集合（map、set）**，for...each的表示形式：
>
> array.foreach((value,key,array)=>{
>
> ​	......函数体方法
>
> })
>
> for...each会对每个数组元素执行函数体方法，函数中形参为三个，分别是值、索引、数组本身，执行函数体内的方法不会对元素组产生影响。foreach无法停止。
>
> 总是返回**undefined**；





### 数组的操作方法

|         方法名         |           说明            |         返回值          |
| :-----------------: | :---------------------: | :------------------: |
|      concat()       |    连接两个或多个数组 不影响原数组     |       返回一个新的数组       |
|       slice()       |  数组截取slice(begin,end)   |     返回被截取项目的新数组      |
|      splice()       | 数组删除splice(第几个开始要删除的个数) | 返回被删除项目的新数组，这个会影响原数组 |
| splice(插入位置,0,插入数据) | splice除了可以删除还可以以这种方式插入  | 返回被插入项目的新数组，这个会影响原数组 |
|                     |                         |                      |
|                     |                         |                      |
|                     |                         |                      |



### 将类数组、···转换成数组的方法



1、使用Array.prototype.slice.call()或者Array.prototype.slice.apply()；

2、使用[].slice.call()或者[].slice.apply()；这种方法和上面的方法是一样的，但是上面的方式效率相对较高；

3、使用Array.from()；

4、**使用Array.of()；**

5、使用new Array()；

6、[...(obox.children)]









### 数组的新方法

> for...each .....



#### every()

every()方法，针对[数组](https://so.csdn.net/so/search?q=%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)中的每一个元素进行比对，只要有一个元素比对结果为false则返回false，反之要所有的元素比对结果为true才为true

```js
arr.every((value,key,arr)=>{
  return (...)
})
```



#### some()

- some()方法，同样是针对数组中的每一个元素，但是这个方法是，只要有一个元素比对结果为true，返回结果就为true，反之要所有的元素比对结果为false才为false.如果找到第一个满足条件的元素，则终止循环，不再继续查找

```js
<body>
    <script>
        // some 查找数组中是否有满足条件的元素 
        var arr1 = ['red', 'pink', 'blue'];
        var flag1 = arr1.some(function(value) {
            return value == 'pink';
        });
        console.log(flag1);
        // 1. filter 也是查找满足条件的元素 返回的是一个数组 而且是把所有满足条件的元素返回回来
        // 2. some 也是查找满足条件的元素是否存在  返回的是一个布尔值 如果查找到第一个满足条件的元素就终止循环
    </script>
</body>

arr.some((value,key,arr)=>{
  return (...)
})
```



#### filter()筛选数组

- `filter()`方法返回一个新的数组，新数组中的元素是通过检查指定数组中**符合条件的元素**，主要用于筛选数组
- **注意它直接返回一个新数组**

```js
arr.filter((value,key,arr)=>{
  return (...)
})
```

如下所示，不管返回值是多少(此处是1)，返回的都是符合条件的val值。

```js
var arr = [1,2,3,4,5,6,7,8,9,10];
var newArr = arr.filter((val,key,arr)=>{
    if (val>5) {
        return 1
    }
})
console.log(newArr) //[ 6, 7, 8, 9, 10 ]
```



#### map()

`map()`方法返回一个新的数组，[数组](https://so.csdn.net/so/search?q=%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)中的元素为原始数组元素**调用函数处理后的值**。

```js
array.map((value, key, arr)=>{
  return (...)
})
```

如下所示：返回的是节点处理后的值，并且每个节点都要返回值。

```js
var arr = [1,2,3,4,5,6,7,8,9,10];
var newArr = arr.map((val,key,arr)=>{
    if (val>5) {
        return val*10
    }
    else{
        return 0;
    }
})
 console.log(newArr) //[0,0,0,0,0,60, 70, 80, 90, 100]
```



#### Reduce() 

`reduce()`方法接收一个函数`callbackfn`作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。

`reduce()`方法接收`callbackfn`函数，而这个函数包含四个参数：

```js
function callbackfn(acc,curValue,index,array){}
@param {Any} preValue 上一次之前计算过的值
@param {Any} curValue 当前遍历的值
@param {Number} index 当前遍历值的索引
@param {Array} array 当前遍历的数组
```

reduce 函数可以对一个[数组](https://so.csdn.net/so/search?q=%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)进行遍历，然后返回一个累计值，callback 接受这四个参数，经过处理后返回新的值，而这个累计值会作为新的 acc 传递给下一个 callback 处理。直到处理完所有的数组项。得到一个最终的累计值。

reduce 接受的第二个参数是一个初始值，它是可选的。如果我们传递了初始值，那么它会作为 acc 的第一个值。(**确定值类型**)传递给第一个 callback，此时 callback 的第二个参数 val 是数组的第一项；如果我们没有传递初始值给 reduce，那么数组的第一项会作为累计值传递给 callback，数组的第二项会作为当前项传递给 callback。

```js
//reduce方法可以这样写
arr.reduce((preValue,curValue,index,array)=>{},val);
```

```js
//对数组求和
let arr = [1, 2, 3];
let res = arr.reduce((preValue, v) => preValue + v, 94);
console.log(res); // 100
```

例如：对数组去重

```js
let arr = [1, 1, 1, 2, 3, 3, 4, 3, 2, 4];
let res = arr.reduce((preValue, v) => {
  if (acc.indexOf(v) < 0) preValue.push(v);
  return preValue;
}, []);
console.log(res); // [1, 2, 3, 4]
复制代码
```





### 字符串操作的方法

| 方法名                       | 说明                                       |
| ------------------------- | ---------------------------------------- |
| concat(str1,str2,str3…)🔥 | concat() 方法用于连接两个或对各字符串。拼接字符串🔥          |
| substr(start,length)🔥    | 从 start 位置开始(索引号), length 取的个数。🔥        |
| slice(start,end)          | 从 start 位置开始，截取到 end 位置 ，end 取不到 (两个都是索引号) |
| substring(start,end)      | 从 start 位置开始，截取到 end 位置 ，end 取不到 (基本和 slice 相同，但是不接受负) |
|                           |                                          |
|                           |                                          |





### DOM节点相关API

- `parentNode`属性可以返回某节点的父结点，注意是最近的一个父结点

- `parentNode.childNodes` 返回包含指定节点的子节点的集合，该集合为即时更新的集合，返回值包含了所有的子结点，包括**元素节点**，**文本节点**等

- `parentNode.children` 是一个只读属性，返回所有的子元素节点,它只返回子元素节点，其余节点不返回 （**这个是我们重点掌握的**）

- `firstChild` 返回第一个子节点，找不到则返回null,返回值包含了所有的子结点

- `lastChild` 返回最后一个子节点，找不到则返回null,返回值包含了所有的子结点

- 如果想要第一个子元素节点，可以使用 `parentNode.chilren[0]`,返回值仅包含元素节点

- 如果想要最后一个子元素节点，可以使用`parentNode.chilren[parentNode.chilren.length - 1]`,返回值仅包含元素节点

- `nextSibling` 返回当前元素的下一个兄弟元素节点，找不到则返回null,返回值包含了所有的子结点

- `previousSibling` 返回当前元素上一个兄弟元素节点，找不到则返回null同样，也是包含所有的节点

- 如果想要下一个/上一个子元素节点，自己封装一个：

- ```js
  function getNextElementSibling(element) {
      var el = element;
      while(el = el.nextSibling) {
          if(el.nodeType === 1){
              return el;
          }
      }
      return null;
  }

  ```

- `document.createElement()` 方法创建由 tagName 指定的HTML 元素

- `node.removeChild()`方法从 DOM 中删除一个子节点，返回删除的节点

- `node.appendChild(newnode)` 方法将一个节点添加到指定父节点的子节点列表**末尾**。类似于 CSS 里面的 after 伪元素。

- `node.insertBefore(newnode，selectNode)` 方法将一个节点添加到父节点的指定子节点**前面**。类似于 CSS 里面的 before 伪元素。

- `node.cloneNode()`方法返回调用该方法的节点的一个副本。 也称为克隆节点/拷贝节点.如果括号参数为空或者为 false ，则是浅拷贝，即只克隆复制节点本身，不克隆里面的子节点,如果括号参数为 true ，则是深度拷贝，会复制节点本身以及里面所有的子节点

- `addEventListener(type,listener[,useCapture])`第三个参数如果是 true，表示在事件捕获阶段调用事件处理程序；如果是 false (不写默认就是false),表示在事件冒泡阶段调用事件处理程序





### 事件对象

```js
eventTarget.onclick = function(event) {
   // 这个 event 就是事件对象，我们还喜欢的写成 e 或者 evt 
} 
eventTarget.addEventListener('click', function(event) {
   // 这个 event 就是事件对象，我们还喜欢的写成 e 或者 evt  
})

```

官方解释：event 对象代表事件的状态，比如键盘按键的状态、鼠标的位置、鼠标按钮的状态
简单理解：
事件发生后，跟事件相关的一系列信息数据的集合都放到这个对象里面
这个对象就是事件对象 event，它有很多属性和方法，比如“
谁绑定了这个事件
鼠标触发事件的话，会得到鼠标的相关信息，如鼠标位置
键盘触发事件的话，会得到键盘的相关信息，如按了哪个键
这个 event 是个形参，系统帮我们设定为事件对象，不需要传递实参过去
当我们注册事件时， event 对象就会被系统自动创建，并依次传递给事件监听器（事件处理函数）

| 事件对象属性方法            | 说明                                 |
| ------------------- | ---------------------------------- |
| e.target            | 返回触发事件的对象 标准                       |
| e.srcElement        | 返回触发事件的对象 非标准 ie6-8使用              |
| e.type              | 返回事件的类型 比如`click` `mouseover` 不带on |
| e.preventDefault()  | 该方法阻止默认行为 标准 比如不让链接跳转              |
| e.stopPropagation() | 阻止冒泡 标准                            |
|                     |                                    |

**e.target** 和 **this** 的区别：

- this 是事件绑定的元素， 这个函数的调用者（绑定这个事件的元素）
- e.target 是事件触发的元素。



### 鼠标键盘事件

鼠标事件对象	说明
e.clientX	返回鼠标相对于浏览器窗口可视区的X坐标
e.clientY	返回鼠标相对于浏览器窗口可视区的Y坐标
e.pageX（重点）	返回鼠标相对于文档页面的X坐标 IE9+ 支持
e.pageY（重点）	返回鼠标相对于文档页面的Y坐标 IE9+ 支持
e.screenX	返回鼠标相对于电脑屏幕的X坐标
e.screenY	返回鼠标相对于电脑屏幕的Y坐标


| 键盘事件       | 触发条件                                     |
| ---------- | ---------------------------------------- |
| onkeyup    | 某个键盘按键被松开时触发                             |
| onkeydown  | 某个键盘按键被按下时触发                             |
| onkeypress | 某个键盘按键被按下时触发，但是它不识别功能键，比如 ctrl shift 箭头等 |





### DOM距离相关

https://zhuanlan.zhihu.com/p/368206969

**offset系列**

```js
element.offsetParent：当前对象的最近的定位父级元素
element.offsetWidth：当前对象的宽度（width+padding+border）
element.offsetHeight：当前对象的高度（Height+padding+border）
element.offsetLeft：当前对象到其 offsetParent 左边的距离
element.offsetTop：当前对象到其 offsetParent 上边的距离 
offsetHeight 和 offsetWidth 是包含滚动条的宽度的
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190921102645346.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N0YW53dWM=,size_16,color_FFFFFF,t_70)

#### offsetParent的确定

元素自身有fixed定位，offsetParent的结果为null
元素自身无fixed定位，且父级元素都未经过定位，offsetParent的结果为<body>
元素自身无fixed定位，且父级元素存在经过定位的元素，offsetParent的结果为离自身元素最近的经过定位的父级元素
<body>元素的 offsetParent 是null



**client系列**

```js
clientWidth = width（可见区域）+ padding - 滚动条宽度（如果有）
clientHeight = height（可见区域）+ padding - 滚动条宽度（如果有）
clientLeft：相当于元素左border(border-left)的宽度
clientTop：相当于元素上border（border-top）的宽度
```



#### scroll系列

```js
scrollWidth = width（内容实际宽度，包括不可见区域） + padding
scrollHeight = height（内容实际高度，包括不可见区域） + padding
scrollLeft：指当前元素可见区左部，到完整内容左部的距离（也就是横向滚动条滚动的距离）。
scrollTop：指当前元素可见区顶部，到完整内容顶部的距离（也就是纵向滚动条滚动的距离）。
```



![img](http://m.qpic.cn/psc?/V53XnT3j0fjRVr1T6lKT1om64540i8Ds/ruAMsa53pVQWN7FLK88i5snavPgOORlTApiWibhb0CtcyetJ61e6zuUFCBK206WoerUWoGhL2ghZWzNCa*Y.mby8vMiP.wcF4pkl9mCFCjk!/b&bo=YQJaAmECWgIDFzI!&rf=viewer_4)



#### getBoundingClientRect方法简介

getBoundingClientRect 返回的是一个 DOMRect 对象，是一组矩形集合，我们这次所使用的返回值主要是left、top、bottom和right。其余的返回值width、height、x、y这次用不到,就不再讨论。

使用方法如下：

```js
let domToTop = dom.getBoundingClientRect().top  // dom 的顶边到视口顶部的距离
let domToLeft = dom.getBoundingClientRect().left // dom 的左边到视口左边的距离
let domToBottom = dom.getBoundingClientRect().bottom // dom 的底边到视口顶部的距离
let domToRight = dom.getBoundingClientRect().right // dom 的右边到视口左边的距离
```









#### 三、鼠标事件相关的坐标距离

**clientX** = 鼠标点击位置距离浏览器**可视区域**左边的距离
**offsetX** = 鼠标点击位置距离元素左边的距离，不包括左border。
**pageX** = scrollLeft + clientX （**但是IE8不支持**）
**layerX** = offsetX + 左border + 左边滚动条滚动的距离
**x** = 鼠标点击位置距离浏览器可视区域的左边距离（相当于 clientX）。
**screenX** = 鼠标点击位置距离电脑屏幕左边的距离。



![img](https://pic1.zhimg.com/80/v2-b6e3083649bb36b171a4b3466bfc1b98_720w.webp)



![img](https://pic3.zhimg.com/80/v2-5f2d5f0cbd9cfdfe16839c5ec90fbc3a_720w.webp)





### 改变this指向的方法

#### call（）

call()方法调用一个对象，简单理解为调用函数的方式，但是它可以改变函数的this指向
fun.call(thisArg,arg1,arg2,.....)
thisArg: 在 fun 函数运行时指定的 this 值
arg1,arg2: 传递的其他参数
返回值就是函数的返回值，因为它就是调用函数
因此当我们想改变 this 指向，同时想调用这个函数的时候，可以使用 call，比如继承

#### apply()

apply()方法调用一个函数，简单理解为调用函数的方式，但是它可以改变函数的 this指向
fun.apply(thisArg,[argsArray])
thisArg: 在 fun 函数运行时指定的 this 值
argsArray : 传递的值，必须包含在数组里面
返回值就是函数的返回值，因为它就是调用函数
版权声明：本文为CSDN博主「生命是有光的」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Augenstern_QXL/article/details/115219073

#### bind()

- `bind()`方法不会调用函数。但是能改变函数内部 `this`指向
- `fun.bind(thisArg,arg1,arg2,....)`
- 返回由指定的 `this`值和初始化参数改造的 原函数拷贝
- 因此当我们只是想改变 this 指向，并且不想调用这个函数的时候，可以使用bind

**call apply bind 总结：**

相同点：

都可以改变函数内部的 this指向

**返回值就是当前对象执行的该函数的返回值。**

区别点：

call和apply会调用函数，并且改变函数内部的this指向
call和apply传递的参数不一样，call 传递参数，apply 必须数组形式
bind不会调用函数，可以改变函数内部this指向
主要应用场景

call经常做继承
apply经常跟数组有关系，比如借助于数学对线实现数组最大值与最小值
bind不调用函数，但是还想改变this指向，比如改变定时器内部的this指向





### Object.entries(obj)

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





### Object.defineProperty()的理解

 **Object.defineProperty()** 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

 **Object.defineProperty(obj, prop, descriptor)**

这个方法接收三个参数:

1.属性所在的对象
2.属性的名字
3.一个描述符对象

这个描述符对象是个什么东西呢？
他可以是 数据属性：

1.configurable:表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，默认值为false。

2.enumerable：表示能否通过for in循环访问属性，默认值为false

3.writable：表示能否修改属性的值。默认值为false。

4.value：包含这个属性的数据值。默认值为undefined。

```js
Object.defineProperty(p1,"name",{
    configurable : false,
})
console.log(p1); //{ name: 'lisi' }
delete p1.name;
console.log(p1); //{ name: 'lisi' }
```

第三个参数除了可以是数据属性，也可以是访问器属性。

1.get：在读取属性时调用的函数，默认值是undefined 2..set：在写入属性的时候调用的函数，默认值是undefined

```js
var book = {
    _year : 2004,
    edition : 1
}

Object.defineProperty(book,"year",{
    get: function(){
        return this._year
    },
    set: function(newYear){
        if(newYear > 2004){
            this._year = newYear;
            this.edition += newYear - 2004
        }
    }
})

book.year = 2005;
console.log(book.edition); // 2
console.log(book._year); //2005

```

**第三个参数也可以定义多个属性！**



**get**

属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
默认为 undefined。

**set**

属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。
默认为 undefined。

拥有布尔值的键 `configurable`、`enumerable` 和 `writable` 的默认值都是 `false`。

属性值和函数的键 `value`、`get` 和 `set` 字段的默认值为 `undefined`。



### Object.assign()

Object.assign方法用来将源对象（source）的所有可[枚举](https://so.csdn.net/so/search?q=%E6%9E%9A%E4%B8%BE&spm=1001.2101.3001.7020)属性，复制到目标对象（target）。它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。

```js

let targetObj1 = { a: 1 };
let sourceObj1 = { b: 1 };
let sourceObj11 = { c: 3 };
Object.assign(targetObj1, sourceObj1, sourceObj11);
console.log(targetObj1);
//{ a: 1, b: 1, c: 3 }
```

Object.assign只拷贝自身属性，不可枚举的属性（enumerable为false）和继承的属性不会被拷贝。

对于嵌套的对象，Object.assign的处理方法是替换，而不是添加。

```js
var target = { a: { b: 'c', d: 'e' } }
 
var source = { a: { b: 'hello' } }
 
Object.assign(target, source);
// a: { b: 'hello' }   a: { b: 'hello' } 
```

Object.assign方法实行的是浅拷贝，而不是深拷贝。





### 浅拷贝和深拷贝

[浅拷贝](https://so.csdn.net/so/search?q=%E6%B5%85%E6%8B%B7%E8%B4%9D&spm=1001.2101.3001.7020)是拷贝了对象的引用，当原对象发生变化的时候，拷贝对象也跟着变化；深拷贝是另外申请了一块内存，内容和原对象一样，更改原对象，拷贝对象不会发生变化；浅拷贝是拷贝一层，深层次的对象级别的就拷贝引用；深拷贝是拷贝多层，每一级别的数据都会拷贝出来；

其实总结来看，浅拷贝的时候如果数据是基本数据类型，那么就如同直接赋值那种，会拷贝其本身，如果除了基本数据类型之外还有一层对象，那么对于浅拷贝而言就只能拷贝其引用，对象的改变会反应到拷贝对象上；但是深拷贝就会拷贝多层，即使是嵌套了对象，也会都拷贝出来。





### js柯里化函数

​	bind()其实就是一种柯里化函数。

```js
function bind(callback,context){
   context=context||window;
   //把callback方法中的this预先处理为context
   return function(){
       callback.call(context)
    }
   
}
```

​	返回一个函数， var x = xxx.bind();x()才会进行调用。

核心原理：利用函数执行可以形成一个不销毁的私有作用域，把预先处理的内容都存在这个不销毁的作用域里面，并且返回一个小函数，以后要执行的就是这个小函数。

**柯里化函数的应用：**

参数复用：即如果函数有重复使用到的参数，可以利用柯里化，将复用的参数存储起来，不需要每次都传相同的参数
延迟执行：传入参数个数没有满足原函数入参个数，都不会立即返回结果，而是返回一个函数。（bind方法就是柯里化的一个示例）
函数式编程中，作为compose, functor, monad 等实现的基础


**函数柯里化的优缺点**
优点：

柯里化之后，我们没有丢失任何参数：log 依然可以被正常调用。
我们可以轻松地生成偏函数，例如用于生成今天的日志的偏函数。
入口单一。
易于测试和复用。
缺点：

函数嵌套多
占内存，有可能导致内存泄漏（因为本质是配合闭包实现的）
效率差（因为使用递归）
变量存取慢，访问性很差（因为使用了arguments）






### JS toString()方法

- toString()方法可以根据所传递的参数把数值转换为对应进制的数字字符串。参数范围为 2~36 之间的任意整数。

```js
  var a = 32;
    console.log(a.toString(2));  //返回字符串100000
    console.log(a.toString(4));  //返回字符串200
    console.log(a.toString(16));  //返回字符串20
```

- 数值直接量不能直接调用 toString() 方法，必须先使用小括号或其他方法转化数字。或者1 .toString()
- 当我们对一个自定义函数调用toString()方法时，可以得到该函数的源代码；如果对内置函数使用toString()方法时，会得到一个’[native code]'字符串。因此，可以使用toString()方法来区分自定义函数和内置函数





### 原型对象/原型链

 https://blog.csdn.net/u012468376/article/details/53121081?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-53121081-blog-125742947.pc_relevant_multi_platform_featuressortv2dupreplace&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-53121081-blog-125742947.pc_relevant_multi_platform_featuressortv2dupreplace&utm_relevant_index=7



https://blog.csdn.net/u012468376/article/details/53127929

**hasOwnProperty() 方法判断这个对象的来源**

 hasOwnProperty方法，可以判断一个属性是否来自对象本身(true)。还是他的原型对象或不存在(false)。

### 词法作用域

 https://zhuanlan.zhihu.com/p/125568209

​   无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数**被声明时所处的位置决定**，这就是JavaScript的词法作用域。

```js
var a = 1;
function bar(){
 console.log(a);
}
function foo(){
 var a = 2;
 bar();
}
foo();//1
```



### 闭包与return function

https://blog.csdn.net/weixin_42165445/article/details/100899287

个人理解：：

```js
    function makeCounter(){  //第一层函数
        var count = 0;
        function counter(){     //嵌套函数
            count = count +1;
            return count;
        }
        return counter();    //将嵌套函数返回
    }
  
    var doCount = makeCounter();  
    console.log(doCount);
    console.log(doCount);
    console.log(doCount);  //将结果重复输出三次 输出3个1
```

​	在函数 makeCounter()中，return counter()时，自动调用了 counter()函数，因此 counter()函数已经调用完成，所以makeCounter()函数就没有保留的必要了，也就是不存在闭包的情况。

​	但是当是这样的一种情况的话：

```js
    function makeCounter(){  //第一层函数
        var count = 0;
        function counter(){     //嵌套函数
            count = count +1;
            return count;
        }
        return counter;    //将嵌套函数返回
    }
  
    var doCount = makeCounter();  
    console.log(doCount());
    console.log(doCount());
    console.log(doCount());  // 1,2,3
```

​	此时就存在闭包的情况，因为makeCounter()返回值是一个函数，并没有被调用，因此，需要对函数内用到的变量一直保留，就会出现闭包现象。

或者等价以下代码：

```js
    function makeCounter(){  //第一层函数
        var count = 0;

        return function(){     //嵌套函数
            count = count +1;
            return count;
        };
    }
  
    var doCount = makeCounter();  
    console.log(doCount());
    console.log(doCount());
    console.log(doCount());  //1,2,3
```





### return function(){} 和 return function(){}()的区别：

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



### 闭包：

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





### JS中Map,Set,Array,Object之间的相互转换

**Object.entries**获取对象的键值对
**Object.FromEntries**把键值对列表转成对象
**Object.entries和Object.fromEntries**之间是可逆的。

```js
Object转Map

let obj={foo:'hello',bar:100};
let map=new Map(Object.entries(obj));
console.log(map)

Map转Object

let map=new Map([['foo','hello'],['bar',100]]);
let obj=Object.fromEntries(map);
console.log(obj);

Object转Array

let obj={'foo':'hello','bar':100};
let arr=Object.entries(obj);
console.log(arr);

Array转成Object

let arr=[['foo','hello'],['bar',100]];
let obj=Object.fromEntries(arr);
console.log(obj);

Array转Set

let arr=[['foo','hello'],['bar',100]];
let set=new Set(arr);
console.log(set)
```





### this指向

https://blog.csdn.net/weixin_37722222/article/details/81625826?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-81625826-blog-124752030.t5_layer_eslanding_D_0&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-81625826-blog-124752030.t5_layer_eslanding_D_0&utm_relevant_index=1

1！ 普通this==》 谁调用，this就是谁，注意 注册在外面的function 被 obj里面调用仍然是window，因为是window在调用；

2！箭头this==》箭头函数由于没有this和arrguments，所以找this不从箭头函数里面看，向上层作用域查找(函数作用域，对象没有作用域)，查找到上层作用域的this，就是箭头函数的this（定义时）。**函数定义的时候，作用域的this**



### `Promise/async awit`

​	promise用来创建一个异步处理进程：

构造方法：

```js
let promies = new Promise((resolve, reject) => {
 resolve(); //异步处理 
});
```

Promise实际上就是一个构造函数，其出现的目的是为了解决异步编程中的回调地狱问题。是异步编程中的一个新的解决方案。

async/await: 回调地狱的终极解决方案

Promise可以封装一个异步操作并且获得其异步操作成功或失败的值。

**Promise状态**

promise状态只有三种，且其中任意一种改变之后都不会再次改变：

​	**pending**：未决定的、未完成的。

​	**fullfiled、resolved**：完成

​	**rejected**：失败

**promise的基本流程：**

```js
var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("OK");
    }, 1000);
})

p.then(value => {
    console.log("value", value);
}, reason => {
    console.log("reason", reason);
})
//结果：value OK
```



**Promise的几个关键问题：**

​	**`Promise里面的函数是同步执行的。`**

- 如何改变promise的状态：

  ​	resolve(value):从pending改变为resolved;

  ​	reject(reason):从pending改变为rejected;

  ​	抛出异常：从pending改变为rejected;

- 一个 promise 指定多个成功/失败回调函数, 都会调用吗?

  ​    	当promise改变应用状态时都会进行调用。

-  改变 promise 状态和指定回调函数谁先谁后?

  ​	都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调

- promise.then()返回的新 promise 的结果状态由什么决定?

  ​	简单表达: 由 then()指定的回调函数执行的结果决定

  ​	详细表达:
  ​	① 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常
  ​	② 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值
  ​	③ 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果

- promise 如何串连多个操作任务?

  ​	 promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用，通过 then 的链式调用串连多个同步/异步任务

- promise 异常传透?

  ​	当使用 promise 的 then 链式调用时, 可以在最后指定失败的回调,前面任何操作出了异常, 都会传到最后失败的回调中处理

-  中断 promise 链?

  ​	当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数，办法: 在回调函数中返回一个 pendding 状态的 promise 对象





async function xxx(){}返回的是一个Promise对象。

await必须在async里面执行，await可以获得当前异步任务的结果。await后面的语句必须等待await里面的语句执行完毕之后才能执行。

```js
async function names(xxx) {
    var p = new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('OK');
        }, 1000);
    })
    var res = await p;
    console.log(889);
    console.log(res);
}
var res = names("a");
//889
//OK
```



## coding 代码

### NEW关键字自己实现

```js
//new在进行调用的时候实际上进行了以下四个操作；
//首先先写一个构造函数

function Constructor(name, age) {
    this.name = name;
    this.age = age;
}

Constructor.prototype.printInfo = function () {
    console.log("我的名字：" + this.name + "我的年龄：" + this.age);
}

function myNew(constructor,...args) {

    //操作1：首先在内存中开辟一块空间，生成一个新的空对象。
    var obj = {};// let obj = Object.create({});
    //操作2：将obj的[[prototype]]属性指向构造函数constrc的原型（即obj.[[prototype]] = constrc.prototype）。
    obj.__proto__ = constructor.prototype;// Object.setPrototypeOf(obj,Constructor.prototype);
    //以上两步合写：    var obj = Object.create(constructor.prototype)；
    //操作2：改变this指向，将this指向这个新的对象。执行构造函数，赋予该对象属性和方法。
    var result = constructor.apply(obj,args);
    //操作4：返回该对象。
    return result instanceof Object?result:obj;
}


var p = myNew(Constructor,'李',18);
p.printInfo();
//我的名字：李我的年龄：18
```

### 实现浅拷贝与深拷贝

​	**实现浅拷贝：**

```js
var oldObj = {
    'a1':1,
    'b1':2,
    'c1':{
        'c11':11,
        'c12':12,
        'c13':{
            'c131':131,
            'c132':132,
            'c133':133,
        }
    }
}
var newObj = {};

//浅拷贝的几种方式：
//警告：newObj=oldObj 不属于深浅拷贝。

//1:Object.assign();
Object.assign(newObj,oldObj);
console.log(newObj===oldObj);//false
newObj.c1.c11 = 0;
console.log(oldObj.c1.c11);//0

//2 ES6展开运算符
newObj = {...oldObj};
console.log(newObj===oldObj);//false
newObj.c1.c11 = 0;
console.log(oldObj.c1.c11);//0

//3 循环遍历--仅遍历一层。
for (const key in oldObj) {
    newObj[key] = oldObj[key];
}
console.log(newObj===oldObj);//false
newObj.c1.c11 = 0;
console.log(oldObj.c1.c11);//0
```

​	**实现深拷贝**：

```js
var oldObj = {
    'a1':1,
    'b1':2,
    'c1':{
        'c11':11,
        'c12':12,
        'c13':{
            'c131':131,
            'c132':132,
            'c133':133,
        }
    }
}
var newObj = {};

//深拷贝的几种方式：

//1、JSON.parse(JSON.stringify())
newObj = JSON.parse(JSON.stringify(oldObj));
console.log(newObj===oldObj);//false
newObj.c1.c11 = 0;
console.log(oldObj.c1.c11);//11

// 2、通过递归--每层遍历

function deepClone(oldObj) {
    let newObj = {};
    for (const key in oldObj) {
            if (typeof oldObj[key] !== 'object') {
                newObj[key] = oldObj[key];
            }
            else{
                newObj[key] = deepClone(oldObj[key]);
            }
    }
    return newObj;
}

newObj = deepClone(oldObj);
console.log(newObj===oldObj);//false
newObj.c1.c11 = 0;
console.log(oldObj.c1.c11);//11

```



### 封装一个Promise

首先，封装一个Promise大致需要如下几个步骤：

- 定义整体框架，包括Promise构造函数及构造函数的.resolve()函数/.reject()函数/.all()函数/.race()函数。以及Promise实例对象的.then()函数/.catch()函数。
- 实现Promise的构造函数的具体实现。
- Promise构造函数的.resolve()函数/.reject()函数的实现。
- throw抛出异常改变状态。
- Promise对象状态只能更改一次的实现。
- Promise实例对象的.then()执行回调。
- 异步任务回调的执行。
- 指定多个回调的实现。
- 同步修改状态then方法结果返回。
- 异步修改状态then方法结果返回。
- then方法完善与优化。
- catch方法-异常穿透与值的传递。
- resolve方法封装。
- reject方法封装。
- all方法封装。
- race方法封装。
- then方法回调的异步执行。

```js
//首先，先写出来一个简单的Promise实例，对比实例进行实现。
//1、构造函数

// var p = new Promise((resolve,reject)=>{
//     //2、resolve、reject函数的实现==分别在同步任务和异步任务中实现。
//     setTimeout(() => {
//         reject('OK');
//     }, 1000);
//     resolve('fail');
//     //3、异常穿透
//     throw('Error');
// })
// //4、状态改变
// console.log("p1",p);
// //5、then方法实现
// var rec = p.then(value=>{
//     console.log(value);
// },reason=>{
//     console.log(reason);
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             resolve('OK!');
//         }, 1000);
//     })
// })
// //6、可以多次调用回调函数
// p.then(value=>{
//     console.log("2",value);
// },reason=>{
//     console.log("2",reason);
// })
// //7、then方法返回新promise对象
// console.log("p2",rec);
// console.log("++++++++++++++++++++++++++++++++++")

//具体实现

//首先，先写出Promise构造函数,构造函数里有一个函数，叫exactor吧。因为是同步任务，所以exactor在构造函数里会立即执行。
function MyPromise(exactor) {
    //由于每个Promise实例对象里面都有promiseStatus和promiseResult，因此我们也定义这两个属性。
    this.promiseStatus = 'pending';
    this.promiseResult = null;
    //异步任务的回调函数们，为什么用数组，因为状态改变可以触发多个回调函数。
    this.callBacks = [];
    //由于exactor函数内有两个参数，分别是resolve和reject，因此，我们可以在构造函数里先定义这两个属性。
    //其实resolve和reject也是函数。

    //另外，这里有个小陷阱，就是resolve在实际调用的时候时window进行调用的，这里我们要对this进行更改指向。
    //当resolve函数实现时，将value放入promiseResult结果中，并且将promiseStatus状态更改为fullfilled
    const that = this;
    this.resolve = function (value) {
        //只有当状态promiseStatus是pending的时候，我们才会对状态进行改变。即状态只改变一次。
        if (that.promiseStatus === 'pending') {
            that.promiseResult = value;
            that.promiseStatus = 'fullfilled';
            //此时说明异步任务已经完成，.then的回调函数hasResolved开始调用
            that.callBacks.forEach(item => {
                item.hasResolved(that.promiseResult);
            })
        }
    };
    //同理reject函数进行调用的时候也和resolve一样。
    this.reject = function (reason) {
        //只有当状态promiseStatus是pending的时候，我们才会对状态进行改变。即状态只改变一次。
        if (that.promiseStatus === 'pending') {
            that.promiseResult = reason;
            that.promiseStatus = 'rejected';
            //此时说明异步任务已经完成，.then的回调函数hasResolved开始调用
            that.callBacks.forEach(item => {
                item.hasRejected(that.promiseResult);
            })
        }
    }
    //立即执行exactor函数。
    //由于异常是在exactor函数执行时产生的，因此我们可以用try...catch进行捕获。
    try {
        exactor(this.resolve, this.reject);
    } catch (error) {
        //捕获到错误之后，也是执行reject函数，代表失败
        this.reject(error);
    }
}

//然后，我们再写Promise实例对象的.then()方法的具体实现。
//.then()方法接收两个参数，这两个参数是两个函数，分别是成功时调用的函数和失败时调用的函数，我们称之为
//hasResolved和hasRejected
MyPromise.prototype.then = function (hasResolved, hasRejected) {
    //首先要先对参数进行判断是否为一个函数
    if (typeof hasResolved !== 'function') {
        //如果不是函数，我们为其新创建一个默认函数
        hasResolved = value => value;
    }
    if (typeof hasRejected !== 'function') {
        //如果不是函数，我们为其新创建一个默认函数
        hasRejected = reason => {throw reason};
    }


    //.then返回一个新的Promise对象，为什么return写在这里，请看【注释001】。
    return new MyPromise((resolve, reject) => {
        const that = this;
        //对代码进行封装
        function callback(type) {
             //如果Promise的then方法抛出了错误，则返回失败类型的promise
             try {
                var res = type(that.promiseResult);
                //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是Promise对象
                // 则根据其返回的Promise结果进行返回
                if (res instanceof MyPromise) {
                    //神奇点
                    res.then(v => {
                        //如果是成功Promise，则返回成功Promise
                        resolve(v);
                    }, r => {
                        //如果是失败Promise，则返回失败Promise
                        reject(r);
                    })
                }
                //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是非Promise对象
                // 则直接返回成功状态的Promise的对象
                else {
                    resolve(res);
                }
            } catch (error) {
                //如果Promise的then方法抛出了错误，则返回失败类型的promise
                reject(error);
            }
        }
        //hasResolved和hasRejected函数都各自有一个参数，即value和reason，即Promise返回的结果。
        //我们知道，Promise返回的结果再Promise构造函数this.promiseResult上，而then方法是Promise实例对象
        //进行调用的，因此，我们可以用this.promiseResult来获得每个Promise实例对象上的结果值。
        //如果是状态是成功的，则调用hasResolved，
        if (this.promiseStatus === 'fullfilled') {
            //如果Promise的then方法抛出了错误，则返回失败类型的promise
            // try {
            //     var res = hasResolved(this.promiseResult);
            //     //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是Promise对象
            //     // 则根据其返回的Promise结果进行返回
            //     if (res instanceof MyPromise) {
            //         //神奇点
            //         res.then(v => {
            //             //如果是成功Promise，则返回成功Promise
            //             resolve(v);
            //         }, r => {
            //             //如果是失败Promise，则返回失败Promise
            //             reject(r);
            //         })
            //     }
            //     //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是非Promise对象
            //     // 则直接返回成功状态的Promise的对象
            //     else {
            //         resolve(res);
            //     }
            // } catch (error) {
            //     //如果Promise的then方法抛出了错误，则返回失败类型的promise
            //     reject(error);
            // }
            //try..cash以上代码等同于：
            //为什么要加settimeout，因为.then方法应该时异步执行的。
            setTimeout(() => {
                callback(hasResolved);
            });
        }
        //如果状态是失败的，则调用hasRejected，
        if (this.promiseStatus === 'rejected') {
            //如果Promise的then方法抛出了错误，则返回失败类型的promise
            // try {
            //     var res = hasRejected(this.promiseResult);
            //     //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是Promise对象
            //     // 则根据其返回的Promise结果进行返回
            //     if (res instanceof MyPromise) {
            //         //神奇点
            //         res.then(v => {
            //             //如果是成功Promise，则返回成功Promise
            //             resolve(v);
            //         }, r => {
            //             //如果是失败Promise，则返回失败Promise
            //             reject(r);
            //         })
            //     }
            //     //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是非Promise对象
            //     // 则直接返回成功状态的Promise的对象
            //     else {
            //         resolve(res);
            //     }
            // } catch (error) {
            //     //如果Promise的then方法抛出了错误，则返回失败类型的promise
            //     reject(error);
            // }
            //try..cash以上代码等同于：
            //为什么要加settimeout，因为.then方法应该时异步执行的。
            setTimeout(() => {
                callback(hasResolved);
            });
        }
        //如果是pending，即存在异步任务,则我们需要等待任务执行完毕之后才能调用回调函数。
        if (this.promiseStatus === 'pending') {
            //这个时候，我们需要将回调函数放入this.callBacks里面，交给Promise构造函数进行调用。
            //由于Promise异步任务执行结果我们是不可知的，因此，我们需要将hasResolved,hasRejected两个
            //回调函数都传出去。
            //为什么用数组进行存储，因为状态改变可以触发多个回调函数。每进行一次then，就将回调函数存入数组
            //等待异步任务完成之后，一起调用。
            this.callBacks.push(
                {
                    hasResolved: function () {
                        //如果Promise的then方法抛出了错误，则返回失败类型的promise
                        // try {
                        //     var res = hasResolved(that.promiseResult);
                        //     //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是Promise对象
                        //     // 则根据其返回的Promise结果进行返回
                        //     if (res instanceof MyPromise) {
                        //         //神奇点
                        //         res.then(v => {
                        //             //如果是成功Promise，则返回成功Promise
                        //             resolve(v);
                        //         }, r => {
                        //             //如果是失败Promise，则返回失败Promise
                        //             reject(r);
                        //         })
                        //     }
                        //     //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是非Promise对象
                        //     // 则直接返回成功状态的Promise的对象
                        //     else {
                        //         resolve(res);
                        //     }
                        // } catch (error) {
                        //     //如果Promise的then方法抛出了错误，则返回失败类型的promise
                        //     reject(error);
                        // }
                        //try..cash以上代码等同于：
                        //为什么要加settimeout，因为.then方法应该时异步执行的。
                        setTimeout(() => {
                            callback(hasResolved);
                        });
                    },
                    hasRejected: function () {
                        //如果Promise的then方法抛出了错误，则返回失败类型的promise
                        // try {
                        //     var res = hasResolved(that.promiseResult);
                        //     //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是Promise对象
                        //     // 则根据其返回的Promise结果进行返回
                        //     if (res instanceof MyPromise) {
                        //         //神奇点
                        //         res.then(v => {
                        //             //如果是成功Promise，则返回成功Promise
                        //             resolve(v);
                        //         }, r => {
                        //             //如果是失败Promise，则返回失败Promise
                        //             reject(r);
                        //         })
                        //     }
                        //     //【返回新的Promise对象注释】：进行类型判断，如果回调函数返回结果是非Promise对象
                        //     // 则直接返回成功状态的Promise的对象
                        //     else {
                        //         resolve(res);
                        //     }
                        // } catch (error) {
                        //     //如果Promise的then方法抛出了错误，则返回失败类型的promise
                        //     reject(error);
                        // }
                        //try..cash以上代码等同于：
                        //为什么要加settimeout，因为.then方法应该时异步执行的。
                        setTimeout(() => {
                            callback(hasResolved);
                        });
                    }
                })
        }

    });
    //【注释001】：
    //接下来写then的返回值，由于.then()返回也是也Promise对象，而且当.then运算的值是非Promise对象时，如123
    //其返回的时成功状态的Promise对象，其成功结果为该值123,当.then运算的时Promise对象时，返回的就是
    //Promise对象，其成功状态与否与运算时Promise对象成功/失败状态一致。

    // return new MyPromise((resolve,reject)=>{
    //     //先进行对象判断。是否为Promise对象。
    //     if (hasResolved() instanceof MyPromise) {
    //         ...
    //     }
    // })

    //从上述可以发现，进行对象判断时，又对回调函数hasResolved()进行了一遍执行，因此，我们只能将return将
    //整个.then函数进行包裹。并先进行判断返回状态，再进行判断对象类型。

}

//然后我们写Promise实例对象的catch()方法的具体实现
//.catch()方法接收一个参数，就是reason，失败时调用的函数，等同于then中的第二个参数 reason函数
MyPromise.prototype.catch = function (reason){
    //因为then方法已经实现，可以直接调用then方法的第二个参数。且catch也返回一个Promise对象
    return this.then(undefined,reason);
}

//然后写promise 构造函数的 一个resolve方法,可以接收一个promise对象或基本数据
MyPromise.resolve = function(value){
    //该方法就是返回一个成功的Promise对象
    return new MyPromise((resolve,reject)=>{
        //是一个promise对象
        if (value instanceof MyPromise) {
            value.then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }
        //非promise对象，直接返回成功的promise
        else{
            resolve(value);
        }
    })
}

//然后写promise 构造函数的 一个reject方法,可以接收一个promise对象或基本数据，永远返回reject失败的promise
MyPromise.reject = function(reason){
    //该方法就是返回一个成功的Promise对象
    return new MyPromise((resolve,reject)=>{
        //是一个promise对象
        if (value instanceof MyPromise) {
            value.then(v=>{
                reject(v);
            },r=>{
                reject(r);
            })
        }
        //非promise对象，直接返回成功的promise
        else{
            reject(value);
        }
    })
}

//然后写promise 构造函数的.all()方法。接收一个promise对象数组，返回一个成功/失败的Promise对象
MyPromise.all = function(promises){
    return new MyPromise((resolve,reject)=>{
        let count = 0;
        let resArr = [];
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v=>{
                count++;
                resArr[i] = v;
            },r=>{
                reject(r);
            })
        }
        if (count==promises.length) {
            resolve(resArr);
        }
    })
}
//然后写promise 构造函数的.race()方法。接收一个promise对象数组，谁先完成返回谁
MyPromise.race = function(promises){
    return new MyPromise((resolve,reject)=>{
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v=>{
                resolve(v);
            },r=>{
                reject(r);  
            })
        }
    })
}



//我的自定义Promise的实现
var p = new MyPromise((resolve, reject) => {
    // reject('e');
    // reject('fail');
    // throw('error');
    setTimeout(() => {
        reject('success');
    }, 2000);
});
console.log("P:", p);
// p.then(value=>{
//     console.log("成功状态！",value);
// },reason=>{
//     console.log("失败状态！",reason);
// })

var nextP = p.then(value => {
    console.log("2成功状态！", value);
    return new MyPromise((resolve, reject) => {
        resolve('ookk');
    })
}, reason => {
    console.log("2失败状态！", reason);
    return new MyPromise((resolve, reject) => {
        resolve('success');
    })
})
console.log('nextP:', nextP);
```



### Promise实现红绿灯交替

```js
var loop = function () {

    Promise.resolve().then(value => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('red');
                resolve();
            }, 3000);
        })
    }).then(value => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('green');
                resolve();
            }, 2000);
        })
    }).then(value => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('yellow');
                resolve();
            }, 1000);
        })
    }).then(value => {
        loop();
    })
}
loop();

```



### 实现并发限制的promise函数

```js
// 有 8 个图片资源的 url，已经存储在数组 urls 中，而且已经有一个函数 function loadImg，
// 输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。
// 但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。
// 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

var urls = [
    '1https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 
    '2https://www.kkkk1000.com/images/getImgData/gray.gif', 
    '3https://www.kkkk1000.com/images/getImgData/Particle.gif', 
    '4https://www.kkkk1000.com/images/getImgData/arithmetic.png', 
    '5https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 
    '6https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 
    '7https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 
    '8https://www.kkkk1000.com/images/wxQrCode2.png'
    ];
var loadImg = function(url) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('一张图片加载完成');
                resolve(url);
            }, 1000);
        })
};
    
//maxRequest:最大并发数
//urls:图片地址
//fn:图片下载完成执行的函数。
function limitRequest(maxRequest,urls,fn,i,result,len) {
    return new Promise((resolve,reject)=>{
        while (i<maxRequest&&urls.length!=0) {
            i++;
            let url = urls.shift();
            fn(url).then(value=>{
                i=maxRequest-1;
                count++;
                console.log(value);
                console.log(count);
                result.push(value);
            }).then(()=>{
                //链式调用：每当有一个图片下载完毕并处理完结果之后再次执行该函数，再次进行判断直到所有下载完毕
                //例如，最大并发数是2；则在第一次limitRequest函数执行时，同时进行了两次fn的执行，因为while同步任务
                //fn微任务放入任务队列种去了。此时while执行完毕。开始执行任务队列种任务。
                //执行快的url将返回一个结果再进行调用then，使i = 1，说明完成了一个，要求再调用一个，则在then后再执行
                //limitRequest将其中一个任务加入任务队列。
                if(count==len){
                    resolve();
                }
              limitRequest(maxRequest,urls,fn,i,result,len).then(()=>{
                  resolve();
              });
            })
        }
    })
}
var result = [];
var count = 0;
limitRequest(2,urls,loadImg,0,result,urls.length).then(()=>{console.log(result)});

```



### 类的继承的几种写法

**1、原型链继承**

​	核心：将父类的实例作为子类的原型

```js
//构造函数
function Animal(name) {
	this.name = name || 'Animal';
	this.sleep = function() {
		console.log(this.name + '正在睡觉！');
	};
}
//原型上面的方法：
Animal.prototype.eat = function(food) {
	console.log(this.name + '正在吃:' + food);
}
// 1、原型链继承
//核心：将父类的实例作为子类的原型
function Dog(name) {
    this.name = name || 'dog';
}
//将Animal的实例挂载到了Dog的原型链上
Dog.prototype = new Animal();

var dog = new Dog("旺财");
console.log(dog.name);
dog.sleep();
console.log(dog instanceof Animal);		//true
console.log(dog instanceof Dog);		//true


//===========================================================//
//为什么不能Dog.prototype = Animal.prototype
function Dog(name) {
    this.name = name || 'dog';
}
//将Animal的实例挂载到了Dog的原型链上
Dog.prototype = Animal.prototype;
var dog = new Dog("旺财");
console.log(dog.name);
dog.eat('bone');
dog.sleep(); //报错，因为sleep在实例对象上，不在原型对象上。
console.log(dog instanceof Animal);		//true
console.log(dog instanceof Dog);		//true
//===========================================================//
```

优点：

- 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
- 父类新增原型方法/原型属性，子类都能访问的到
- 简单

缺点：

- 要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中（因为Dog.prototype = new Animal();一旦执行将会覆盖原来的prototype）;
- 无法实现继承多个
- 来自原型对象的所有属性被所有实例共享
- 创建实例时，无法向构造函数传参（Dog.prototype = new Animal("旺财") 是不可以的。）

**2、构造继承**

​	核心：使用父类的构造函数增强子类实例，等于是复制父类的实例属性给子类（没用到原型）

```js
// 2、构造继承
function Dog(name) {
    //Animal.call(this);一定要放在前面，防止属性被覆盖
    Animal.call(this);
    this.name = name || 'dog';
}
var dog = new Dog("旺财");
console.log(dog.name);
dog.sleep();
dog.eat('bone');//报错
console.log(cat instanceof Animal);		//false
console.log(dog instanceof dog);		//true
```

优点：

- 创建实例时，可以向构造 器传递参数
- 可以实现多继承（call多个父类对象）

缺点：

- 实例并不是父类的实例，只是子类的实例
- 只能继承父类的实例属性和方法，不能继承原型属性/方法
- 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

**3、实例继承**

​	核心：为父类实例添加新特性，作为子类实例返回

```js
// 3、实例继承
function Dog(name){
    var instance = new Animal();
    instance.name = name || 'dog';
    return instance;
}
var dog = new Dog("旺财");
console.log(dog.name);
dog.sleep();
dog.eat('bone');
console.log(dog instanceof Animal);		//true
console.log(dog instanceof Dog);		//false
```

优点：

- 不限制调用方式，不管是new子类()还是子类()，返回的对象都具有相同的效果

缺点：

- 实例是父类的实例，不是子类的实例
- 不支持多继承



**4、拷贝继承**

​	核心：就是将父类种所有的属性都拷贝出来。个人认为不属于继承。

**5、组合继承**

​	核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

```js
// 5、组合继承

function Dog(name) {
    Animal.call(this);
    this.name = name || 'dog';
}

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

var dog = new Dog("旺财");
console.log(dog.name);
dog.sleep();
dog.eat('bone');
console.log(dog instanceof Animal);		//true
console.log(dog instanceof Dog);		//true
```

**特点：**

- 弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
- 既是子类的实例，也是父类的实例
- 不存在引用属性共享问题
- 函数可复用
- 可传参

**缺点：**

- 调用了俩次构造函数，生成了俩份实例（子类实例将子类原型上的那份屏蔽了）

**6、寄生组合继承**

​	核心：通过寄生方式，砍掉父类的实例属性，这样，在调用俩次父类的构造的时候，就不会初始化俩次实例方法/属性，避免了组合继承的缺点

```js
// 6、寄生组合继承
function Dog(name) {
    Animal.call(this);
    this.name = name || 'dog';
}

(function(){
    var Super = function(){};
    Super.prototype = Animal.prototype;
    Dog.prototype = new Super();
})()
var dog = new Dog("旺财");
console.log(dog.name);
dog.sleep();
dog.eat('bone');
console.log(dog instanceof Animal);		//true
console.log(dog instanceof Dog);		//true
```

**特点：**

- 基本上是完美的

**缺点：**

- 实现起来较为复杂



### 实现节流防抖

浏览器的[scroll](https://so.csdn.net/so/search?q=scroll&spm=1001.2101.3001.7020)（滚动条滚动）、keypress（按动按键）、mousemove（鼠标移动）等等input输入框事件在出发时，都是会不断的调用绑定在事件上的回调函数高频触发，如果回调函数复杂就会导致响应跟不上触发，有可能会造成页面的卡顿，极大地浪费资源，降低前端的性能。

**防抖(debounce)**

> 作用：对在短时间内多次触发事件的[回调](https://so.csdn.net/so/search?q=%E5%9B%9E%E8%B0%83&spm=1001.2101.3001.7020)函数，只执行最后一次，或者只在最开始时执行。
>
> 人话：如果回调函数在要触发的时候来了新的响应，则舍弃当前的，响应新的，时间重置。
>
> 1.输入框中频繁的输入内容，搜索或者提交信息；
> 2.频繁的点击按钮，触发某个事件；
> 3.监听浏览器滚动事件，完成某些特定操作；
> 4.用户缩放浏览器的resize事件；

```js
//防抖
// 用法：
// resizeFun = function(){
//     console.log("改变窗口大小。");
// }
// let resizeDebounce = debounce(resizeFun,1000);
// window.addEventListener('resize',resizeDebounce(value));

//fn:回调函数
//delay:延时
//防抖用到了闭包的概念
function debounce(fn, delay) {
    //首先在debounce种设置了timer，而debounce返回的是一个函数（非立即执行的），且用到了timer
    //因此，timer会被一直保留用于返回函数的使用。
    let timer = null;
    return function () {
        let that = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(that,args);
        }, delay);
    }
}
function res(value) {
    console.log('res'+value);
}
let debounces = debounce(res, 1000);
debounces(1);
debounces(2);
```



**节流(throttling)**

> 节流就是指连续触发事件但是在 n 秒中只执行一次函数。
>
> 1.监听页面的滚动事件；
> 2.鼠标移动事件；
> 3.用户频繁点击按钮操作；

```js
//节流
function throttle(fn,delay) {
    var timer = null;
    return function(){
        let that = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(that,args);
                timer = null;
            }, delay);
        }
    }
}
```



### 实现柯里化函数

实例：

```js
// 函数柯里化，利用递归和闭包实现
const curry = function(fn) {
  const len = fn.length; // 获取初始函数fn的形参个数
  
  // curry返回改造后的函数
  return function t() {
    const innerLength = arguments.length; // 获取t的实参个数
    const args = Array.prototype.slice.call(arguments); // 将类数组arguments对象转为真正的数组（类数组arguments对象是函数传入的实际参数，类似数组，拥有数组属性，但不是数组）
      
    if (innerLength >= len) { // 递归出口，如果t实参个数已经大于fn形参个数,则终止递归
      return fn.apply(undefined, args) // 执行改造后的函数

    } else { // 如果t的实参个数少于fn的形参个数，说明柯里化并没有完成，则继续执行柯里化
      return function () {
        const innerArgs = Array.prototype.slice.call(arguments); // 将类数组arguments对象转为真正的数组（类数组arguments对象是函数传入的实际参数，类似数组，拥有数组属性，但不是数组）
        const allArgs = args.concat(innerArgs);
        return t.apply(undefined, allArgs)
      }
    }
  }
}

// 测试
function add (num1, num2, num3, num4, num5) {
  return num1 + num2 + num3 + num4 + num5;
}


const finalFun = curry(add);
const result1 = finalFun(1)(2)(3)(4)(5);
const result2 = finalFun(1, 2)(3)(4)(5);
const result3 = finalFun(1,2,3)(4)(5);
const result4 = finalFun(1,2,3)(4, 5);

console.log(result1, result2, result3, result4); // 15 15 15 15

```

**MY:**

```js
// 将add改造成柯里化函数。柯里化函数涉及到闭包的知识

function add (num1, num2, num3, num4, num5) {
    console.log(num1 + num2 + num3 + num4 + num5)
    return num1 + num2 + num3 + num4 + num5;
  }
  //将函数改造成柯里化的函数
function curryFunction(fn) {
    //获取改造函数的参数个数
    let fnLen = fn.length;
    let that = this;
    //用于存储所有参数
    let params = [];
    return function cur(){
        //获取当前函数的参数
        let arg = arguments;
        //放入进行存储
        params.push(...arg);
        //如果未达到参数要求
        if (arg.length<fnLen) {
            fnLen-=arg.length;
            //继续重复进行
            return cur;
        }
        //达到参数要求，则执行add函数
        else{
            add.apply(that,params);
        }
    }
}
var curryAdd = curryFunction(add);
curryAdd(1,2)(3)(4)(5);
```



### 实现一个bind()和call()函数

```js
// bind函数其实就是柯里化函数的变种
var obj = {
    init: 1,
    add: function(a, b) {
        console.log("hello")
        console.log(a + b + this.init);
    }
}
var obj2 = {
    init: 2,
}

var addV = obj.add;
// 真正bind
// addV.bind(obj2,1,2)();

// 我的bind
Function.prototype.myBind = function(self,...args){
    if (typeof this !== "function") {
        throw new Error('type error');
    }
    let fn = this; //因为调用者是函数addV，因此this也是该函数addV
    
    return function(){
        fn.apply(self,args);
    }
}
// addV.myBind(obj2,1,2)();

//call方法的实现
Function.prototype.myCall = function(self,...args){
    if (typeof this !== "function") {
        throw new Error('type error');
    }
    let fn = this;
    //给self对象上添加fn函数
    self.fn = fn;
    //然后执行该方法
    self.fn(...args);
    //然后在该对象上删除该方法
    delete self.fn;
}

addV.myCall(obj2,1,2);
```



### 拖曳功能

待定。





### Array.prototype.reduce() 的实现

```js
var arr = [1,2,3,3,4,5,5,6,7,8,9,9,10];
//用reduce对arr进行去重
//利用自带的reduce可以这样写：
var re = arr.reduce((acc,val,index,array)=>{
    if(acc.indexOf(val)==-1){
        acc.push(val);
    }
    return acc;
},[]);
console.log("JS自带reduce：",re);

//自定义实现reduce()

//其中callback为回调函数，defaultValue为初始值:注意变量提升
Array.prototype.myReduce = function(callback,defaultValue){
    //初始值设置
    curResult = 0;
    if (defaultValue!=undefined) {
        curResult = defaultValue;
    }
    //调用该函数的数组
    var arr = this;
    //判断是否为数组
    if (arr instanceof Array) {
        for (let i = 0; i < arr.length; i++) {
          var curResult = callback(curResult,arr[i],i,arr);
        }
        return curResult;
    }
    else{
        throw new Error("非数组！");
    }
}
//利用自定义实现
var re = arr.myReduce((acc,val,index,array)=>{
    if(acc.indexOf(val)==-1){
        acc.push(val);
    }
    return acc;
},[]);
console.log("自定义实现reduce：",re);

```



### Array.prototype.filter() 的实现

```js
//arr.filter的特点就是如果返回的是true，则表示返回当前的值，否则不返回，且不对原数组进行更改。
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var res = arr.filter((value, index, array) => {
    if (value > 5) {
        return array;
    }
})
console.log(res);


//用我的filter：
Array.prototype.myFilter = function (callback) {
    var arr = this;
    if (arr instanceof Array) {
        var res = [];
        for (let i = 0; i < arr.length; i++) {
            if (callback(arr[i], i, arr)) {
                res.push(arr[i]);
            }
        }
        return res;
    }

    throw new Error('非数组');
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var res = arr.myFilter((value, index, array) => {
    if (value > 5) {
        return 1;
    }
})
console.log(res);


```



### Array.prototype.map() 的实现

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var res = arr.map((value, index, array) => {
    if (index < 5) {
        return value * 10;
    }
    return value / 10;
})
//map会对返回的值进行根据返回的值进行赋值，无返回值则不进行赋值
console.log(res, arr);


// 我的map

Array.prototype.map = function (callback) {
    var arr = this;
    var res = [];
    if (arr instanceof Array) {
        for (let i = 0; i < arr.length; i++) {
            var ans = callback(arr[i], i, arr);
            ans ? res[i] = ans : res[i] = undefined;
        }
        return res;
    }
    throw new Error('error');
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var res = arr.map((value, index, array) => {
    if (index < 5) {
        return value * 10;
    }
    return value / 10;
})
//map会对返回的值进行根据返回的值进行赋值，无返回值则不进行赋值
console.log(res, arr);
```



### instanceof的实现

```js

function Animal(name) {
    this.name = name;
}

var dog = new Animal('旺财');
var cat = new Animal('maio');

//我的instanceof
function myInstanceof(obj,constr) {
    
    //判断第二个参数是不是构造函数
    if (constr.prototype === undefined) {
        throw new Error('error!')
    }

    if (obj==null) {
        return false;
    }

    if (obj.__proto__===constr.prototype) {
        return true;
    }
    else{
        return myInstanceof(obj.__proto__,constr);
    }

}

```



### 封装一个类型判断函数

```js


//我的类型判断函数
function MyTypeof(obj) {
    
    //先进行基础的类型判断
    var base = typeof(obj);
    if (base!=='object') {
        return base;
    }
    //如果是复杂类型
    else{
        return Object.prototype.toString.call(obj).slice(8,-1);
    }

}

var arr = 0.1;
console.log(MyTypeof(arr))
```





### 实现一个类可以进行链式调用

```js
function MyClass(name) {
    this.name = name;

    this.then = function(name){
        return new MyClass(name);
    }
	//这里不要再出错了！
    this.printf = function(){
        console.log("my name is" + this.name);
    }
}
var c1 = new MyClass('xiao');
c1.then('xiao').then('xxx').printf();
```



### 实现简单的Vue





### 实现简单的Diff算法





#### AJAX的实现





### 封装一个axios

