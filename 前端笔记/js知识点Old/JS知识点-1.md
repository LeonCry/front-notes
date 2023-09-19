# JS知识点-1

## Js数组的方法/字符串的方法  数组的map方法

### 数组的方法

**1.join()**

join(separator): 将数组的元素组起一个**字符串**，以separator为分隔符，省略的话则用默认用逗号为分隔符，该方法只接收一个参数：即分隔符。

```js
var arr = [1,2,3];
arr.join('-');
//结果为1-2-3
```

> `不修改原素组`   `返回新数组`

**2.push()和pop()**

push(): 可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。 

> `修改原素组`   `返回修改后数组长度`  `可接收多个参数`

pop()：数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。

> `修改原素组`   `返回被移除的项`  `移除最后一项`

3、**shift() 和 unshift()**

shift()：删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 。 

> `修改原素组`   `返回被移除的项`  `移除第一项`

unshift:将参数添加到原数组开头，并返回数组的长度 。

> `修改原素组`   `返回修改后数组长度`  `可接收多个参数`

**4.sort()**

sort()：按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。

在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串，因此会出现以下的这种情况：

> `修改原素组`   `返回修改后的数组`

**5.reverse()**

reverse()：反转数组项的顺序。

> `修改原素组`   `返回修改后的数组`

**6、concat()**

arr.concat(arr1,arr2) ：将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本。

> `不修改原素组`   `返回新数组`

**7、slice()**

slice()：返回从原数组中指定开始下标到结束下标之间的项组成的新数组。slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。

> `不修改原素组`  `返回被删除的项`

**8、splice()**

splice()：很强大的数组方法，它有很多种用法，可以实现删除、插入和替换。

删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。

插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。例如，splice(2,0,4,6)会从当前数组的位置 2 开始插入4和6。
替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,4,6)会删除当前数组位置 2 的项，然后再从位置 2 开始插入4和6。

splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项，如果没有删除任何项，则返回一个空数组。

> `修改原素组`   `返回被删除的项`

**9、indexOf()和 lastIndexOf()**

indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。 
lastIndexOf：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的末尾开始向前查找。

这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会使用全等操作符。

##### 数组的迭代方法 -- 见 js-0

ES5新增了两个归并数组的方法：reduce（）和 reduceRight()，这两个方法都会迭代数组所有的项，然后构建一个最终的值返回。

这两个方法都接收两个参数：一个在每一项上面调用的函数和（可选）作为归并基础的初始值。

给reduce和reduceRight这两个方法的函数都接收四个参数值：前一个值，当前值，索引，数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数是数组的第二项。reduceRight（）与reduce（）使用一样，只不过是从后往前遍历。

`不修改原素组`   `返回计算结果`

```js
var arr = [2,7,2,9,1,5];
console.log(arr.reduce((pre,cur,index,arr)=>{
    return pre+cur;
}))
```

### 字符串的方法

**1、slice(start,end)**
截取字符串，返回截取的字符，**不会修改原字符串**，包含两个参数，start是开始从该索引值开始截取(当参数为负数时从字符串末尾开始计算，例如-1则是最后一个字符串)，end（可选，默认到字符串结尾）是到此索引值为止（不包括end索引值对应的字符）。无参数时返回字符串本身。
`不修改原字符串`   `返回新字符串`

**2、substr(start,length)**
截取字符串，返回截取的字符，**不会修改原字符串**，包含两个参数，start是开始从该索引值开始截取(当参数为负数时从字符串末尾开始计算，例如-1则是最后一个字符串)，length（可选，默认到字符串长度）截取的字符长度。

`不修改原字符串`   `返回新字符串`

**3、substring(start,end)**

截取字符串，返回截取的字符，**不会修改原字符串**，包含两个参数，start是开始从该索引值开始截取(当参数为负数时返回字符串本身)，end（可选，默认到字符串结尾）是到此索引值为止（不包括end索引值对应的字符）。当两个参数都为负数时返回空，无参数时返回字符串本身。当第一个参数大于第二个参数时，两个参数会掉换，小的参数为start，大的为end。
`不修改原字符串`   `返回新字符串`

**4、split(separator，limit)**
将字符串切割成多个片段，返回一个由片段组成的数组。**不会修改原字符串**，包含两个参数，第一个是字符串或 正则表达式 对象，它标识了分隔字符串时使用的是一个还是多个字符。如果忽略该选项，返回包含整个字符串的单一元素数组。 第二个参数limit(可选，默认字符串长度)用来限制返回数组中的元素个数。
**5、concat([string[,string2…]])**
连接字符串，返回新的字符串，**不会修改原字符串**，可添加多个参数字符。

`不修改原字符串`   `返回新字符串`

**6、chatAt(index)**
查询字符串中索引值对应的字符，返回该字符。参数默认为0，查询索引超过字符串中的索引返回空。

 **7、charCodeAt(index)**
查询字符串中对应索引值的字符代表的Unicode编码，返回该编码。参数默认为0，查询索引超过字符串中的索引返回NaN。

**9、indexOf(str,start)**
查询字符首次出现在字符串中的索引值，返回该索引值。第一个参数为查询字符，字符不存在，返回-1，查询多个字符时，返回第一个字符的索引值。 第二个参数为查询索引值起点（默认为0）。

**10、lastIndexOf(str,start)**

从字符串末尾开始查询字符首次出现在字符串中的索引值，返回该索引值。第一个参数为查询字符，字符不存在，返回-1，查询多个字符时，返回第一个字符的索引值。 第二个参数为查询索引值起点（默认为0，字符串末尾开始）。

**11、toLowerCase()**
将字符串转换成小写，返回新字符串。**不会修改原字符串**

**12、toUpperCase()**
将字符串转换成大写，返回新字符串。**不会修改原字符串**

**13、trim()**
去除字符串两端的空格，返回新字符串，**不会修改原字符串**

**14、replace(seatchValue,replaceValue)**
替换字符串中的字符，返回新字符，**不会修改原字符串**。

**15、match(str)**
确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。参数既可以是正则表达式也可以是字符串。

```js
console.log('string'.match(/\w*$/)) //["string", index: 0, input: "string"]
console.log('string'.match('rin')) //["rin", index: 2, input: "string"]
console.log('string'.match(/^a*$/))  //null
```

**16、search(str)**
用法等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。

**17、includes(str)**
判断字符串中是否存在某字符，返回Boolean值。

**18、startsWith(str)**
判断字符是否为字符串的头部，返回Boolean值。

**19、repeat(Number)**
重复字符串，返回新字符串。**不会修改原字符串**。

**20、localeCompare(str)**
用本地特定的顺序来比较两个字符串。大于返回1，小于返回-1，相等返回0。什么是本地顺序，其实我感觉就是字母顺序表，z最大。

```js
console.log('ab'.localeCompare('ac')) //-1 第一个字符相等，第二个c>b 返回-1
console.log('ab'.localeCompare('ab'))  //0
console.log('ab'.localeCompare('z'))  //-1 a<z,返回-1
```

**21、padStart(length,str)**
在长度不够的字符串开头添加字符，返回新字符串，**不会修改原字符串。**

```js
var str='string'
console.log(str.padStart(10,'start')) //starstring  str的长度为6，在头部添加四个字符
console.log(str) //string
```

**21、padEnd(length,str)**
在长度不够的字符串末尾添加字符，返回新字符串，**不会修改原字符串。**

**22、可以通过for…of遍历字符**



## 手写new？

如以下[构造函数](https://so.csdn.net/so/search?q=%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0&spm=1001.2101.3001.7020),使用new关键字：

 ```js
function One(name, age) {
    this.name = name;
    this.age = age;
}
let a = new One();
console.log(a);
 ```

手写new，分四步骤：

> 1、创建一个新对象。
> 2、让这个新的对象的原型指向该构造函数的原型对象。
> 3、执行构造函数，并且将构造函数指向新的对象。
> 4、拿到构造函数最后返回的结果，判断是否是对象或者函数，如果是的话，则直接
> 返回。如果不是则返回新创建的对象。

```js


//Fun为构造函数, args表示传参
function myNew(Fun, ...args) {
    // 1.在内存中创建一个新对象
    let obj = {};
    
    // 2.把新对象的原型指针指向构造函数的原型属性
    obj.__proto__ = Fun.prototype;
    
    // 3.改变this指向，并且执行构造函数内部的代码（传参）
    let res = Fun.apply(obj, args);
    
    // 4.判断函数执行结果的类型
    if (res instanceof Object) {
        return res;
    } else {
        return obj;
    }
}

let obj = myNew(One, "XiaoMing", "18");
console.log("newObj:", obj);

```

mynew

```js
function Person(name,age) {
    this.name = name;
    this.age = age;
}

var per = new Person("小明",88);
console.log(per.__proto__.constructor);
var per2 = myNew(Person,"小明",88);
console.log(per2.__proto__.constructor);

function myNew() {
    var arg = [];
    arg = Array.prototype.slice.call(arguments);
    var fn = arg[0];
    arg = arg.slice(1);
    // 1.先在内存中创建一个对象
    var obj = {};
    // 2.让新的对象的原型指向构造函数的原型对象
    obj.__proto__ = fn.prototype;
    // 3.改变this指向,并传参
    var res = fn.apply(obj,arg);
    // 4.判断函数类型并返回
    return res instanceof Object ? res:obj;
}
```



## map() set()

Set实例的属性和方法

- Set的属性：
  - size：返回集合所包含元素的数量
- Set的方法：
  - 操作方法
    - add(value)：向集合添加一个新的项
    - delete(value)：从集合中移除一个值
    - has(value)：如果值在集合中存在，返回true,否则false
    - clear(): 移除集合里所有的项
  - 遍历方法
    - keys()：返回一个包含集合中所有键的数组
    - values()：返回一个包含集合中所有值的数组
    - entries：返回一个包含集合中所有键值对的数组(感觉没什么用就不实现了)
    - forEach()：用于对集合成员执行某种操作，没有返回值



Map的属性和方法

属性：

- size：返回字典所包含的元素个数

操作方法：

- set(key, val): 向字典中添加新元素
- get(key):通过键值查找特定的数值并返回
- has(key):如果键存在字典中返回true,否则false
- delete(key): 通过键值从字典中移除对应的数据
- clear():将这个字典中的所有元素删除

遍历方法：

- keys():将字典中包含的所有键名以数组形式返回
- values():将字典中包含的所有数值以数组形式返回
- forEach()：遍历字典的所有成员



ES6为Array增加了from函数用来将其他对象转换成数组。

当然，其他对象也是有要求，也不是所有的，可以将两种对象转换成数组。

1.部署了Iterator接口的对象，比如：Set，Map，Array。

2.类数组对象，什么叫类数组对象，就是一个对象必须有length属性，没有length，转出来的就是空数组。

## 箭头函数This指向问题

 普通函数中的this:

1. 在大环境下函数调用就是window

2. 有对象调用就是obj

   像这种

   ```js
   var obj = {
     a:{
       b:function(){
         clg(this)
       }
     }
   }
   var t = obj.a.b;
   t();
   ```

   输出的话是window，因为 var t = obj.a.b 是定义，并没有调用它。当然如果是obj.a.b()，那就是a了。

   3. 构造函数调用this是实例对象的this
   4. apply和call的this是改变的对象

   箭头函数中的this：箭头函数里面的this是函数被创建时绑定的。所谓的定义时候绑定，就是t**his是继承自父执行上下文！！**注意：简单对象（非函数）是没有执行上下文的！

   ​

**总结：**

> 非箭头函数里面的this是被怎么样的方式调用时绑定的。
>
> 箭头函数里面的this是函数被创建时绑定的。所谓的定义时候绑定，就是t**his是继承自父执行上下文！！**
>
> 注意：简单对象（非函数）是没有执行上下文的！

另外，在对象中：

```js
var str = 'window';  
 
const obj = {
    str:'obj',
    fn: ()=>{
	    console.log(this.str);	
    }
}
obj.fn();
//相当于
obj.fn = ()=>{
    console.log(this.str);	
}
//window
```

还有 函数中：

```js
var a=11
function test1(){
  this.a=22;
  let b=function(){
    console.log(this.a);
  };
  b();
}
var x=new test1();
输出11
//其中 b=function(){} 在执行时是window
```

```js
var a=11;
function test2(){
  this.a=22;
  let b=()=>{console.log(this.a)}
  b();
}
var x=new test2();
//输出22

```



## 1234[‘toString’]-['length']是什么意思？

 []是javascript中一种调用属性/方法名的一种写法，任何JS中调用可以写“.”的地方都可以用[]替代。

**方法名的length代表这个这个方法的参数arguments数组的长度。**

本题就可以翻译成 1234.toString.length

所以在本题中，我们会发现，用[]的方式，number类型变量 1234调用了它的 **toString方法名**下的length属性。

   **注意**：这里是 toString方法名，不是调用了toString方法。方法名：1234['toString']   方法：1234[‘toString’](）

2.函数的length

  1234['toString']的length是toString这个方法的参数arguments数组的长度。

​	1234[‘toString’](）的length是1234变成字符串后 '1234'这个字符串的长度。

3.number类型的toString()方法

 在JS六个基本类型（number，string，boolean，null，undefined，object）中，number的toString方法中会有一个隐藏默认参数10，也就是说我的数字按照2-36范围内的任意整数值进行进制转换。

   所以1234的toString方法等价于 1234.toString(10)，toString的arguments[0]=10；

​	 所以我们经历三个曲折，得出最后的答案 1.



 