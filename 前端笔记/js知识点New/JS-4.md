# JS-4

## JS中Map,Set,Array,Object之间的相互转换

**Object.entries**获取对象的键值对
**Object.FromEntries**把键值对列表转成对象
**Object.entries和Object.fromEntries**之间是可逆的。

```JS
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



## 数组

new Array(n):表示创建n个空数组；

#### Array keys() 方法/Array values()方法

创建一个 Array Iterator 对象，只包含数组的键，然后遍历每个键：

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var fk = fruits.keys();

for (x of fk) {
  document.getElementById("demo").innerHTML += x + "<br>";
}
或者用 [...fk];
```

Iterator 可用于转换成数组。 Array.from()







## 基本包装类型

https://blog.csdn.net/lq313131/article/details/126378369

在 ES 中，数据类型分为基本数据类型和引用数据类型。

而基本包装类型，严格来说不属于上面两个中的任意一个，但是又和这两种类型息息相关。

基本数据类型和引用类型这两个类型其中一个很明显的区别是，引用类型有自己内置的方法，也可以自定义其他方法用来操作数据，而基本数据类型不能像引用类型那样有自己的内置方法对数据进行更多的操作。

但基本数据类型真的没有吗？对于部分基本类型来说确实是这样的。

按照最新 ES 标准定义，基本数据类型(primitive value)包括 Undefined, Null, Boolean, Number, Symbol, String。

为了便于操作基本类型值，ECMAScript提供了3个特殊引用类型（基本包装类型）：Boolean, Number, String。

基本包装类型和其他引用类型一样，拥有内置的方法可以对数据进行额外操作。

每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型对象，从而可以调用一些方法操作这些数据。

```js
var str = 'test';
//substring(start,end) 表示截取从start到end的字符串，不包括end。
var str2 = str.substring(2);
console.log(str2); //st

```

上面 str 变量存储的值是一个字符串，‘test’ 字符串是基本数据类型 String 类型的值。然而它调用了substring方法，并将结果保存在了str2中。

为什么它不是对象却能调用对象的方法呢？

**☆ 因为在执行第二行代码时，JS会自动进行下面的步骤：**

```js
1、自动创建 String 类型的一个实例（和基本类型的值不同，这个实例就是一个基本包装类型的对象）

var str = new String()

2、调用实例（对象）上指定的方法

var str2 = str.substring()

3、销毁这个实例

str = null

经过上面的加工后，基本字符串变的跟对象一样，上面这三个步骤也适用于Boolean、Number类型。

```

**❤ 引用类型和基本包装类有什么不同呢？**

最主要的区别就是对象的生存期。

● 引用类型：使用new操作符创建的引用类型实例，在执行流离开当前作用域之前一直都保存在内存中
● 基本包装类型：只存在一行代码的执行瞬间，然后立即销毁

**❤ JS什么时候会自动创建一个对应的基本包装类型对象呢？**
取决于当前执行的代码是否是为了获取他的值。每当读取一个基本类型的值，也就是当我们需要从内存中获取到它的值时（这个访问过程称为读取模式），这时，后台就会自动创建一个基本包装类型的对象。



## js ==

https://zhuanlan.zhihu.com/p/21650547

那么字符串转化为数字的规则是怎样的呢？规范中描述得很复杂，但是大致说来，就是把字符串两边的空白字符去掉，然后把两边的引号去掉，看它能否组成一个合法的数字。如果是，转化结果就是这个数字；否则，结果是NaN。例如：

```js
Number('123') // 结果123
Number('1.2e3') // 结果1200
Number('123abc') // 结果NaN
Number('\r\n\t123\v\f') // 结果123
```

当然也有例外，比如空白字符串转化为数字的结果是0。即

```js
Number('') // 结果0
Number('\r\n\t \v\f') // 结果0
```

前面说得很乱，根据我们得到的最终的图3，我们总结一下==运算的规则：

- **undefined == null**，结果是**true**。且它俩与所有其他值比较的结果都是**false**。
- **String == Boolean**，需要两个操作数同时转为Number。
- **String/Boolean == Number**，需要String/Boolean转为Number。
- **Object == Primitive**，需要Object转为Primitive(具体通过**valueOf**和**toString**方法)。



## this 指向

https://blog.csdn.net/weixin_37722222/article/details/81625826?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-81625826-blog-124752030.t5_layer_eslanding_D_0&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-81625826-blog-124752030.t5_layer_eslanding_D_0&utm_relevant_index=1

1！ 普通this==》 谁调用，this就是谁，注意 注册在外面的function 被 obj里面调用仍然是window，因为是window在调用；

2！箭头this==》箭头函数由于没有this和arrguments，所以找this不从箭头函数里面看，向上层作用域查找(函数作用域，对象没有作用域)，查找到上层作用域的this，就是箭头函数的this（定义时）。





## 杂项

#### JavaScript toPrecision()

把数字格式化为指定的长度:

var num = new Number(13.3714);

var n=num.toPrecision(2);

*n* 输出结果:

13

#### JavaScript toFixed()

把数字转换为字符串，结果的小数点后有指定位数的数字：

var num = 5.56789;
var n=num.toFixed(2);

*n* 输出结果:

5.57



在Promise中, 不管resolve在哪个位置, 都是最后才执行,因为JS事件循环，是执行完这堆同步代码，才轮到`event loop`去检测`microtask`。





















