# JS知识点-1

## Js数组的方法/字符串的方法

### 数组的方法

**1.join()**

join(): 将数组的元素组起一个**字符串**，省略的话则用默认用逗号为分隔符，该方法只接收一个参数：即分隔符。	

```js
var arr = [1,2,3];
arr.join('-');
//结果为1-2-3
```

> join 方法 `不修改原素组`   `返回新字符串`

**2.push()和pop()**

push(): 可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。 

> push:`修改原素组`   `返回修改后数组长度`  `可接收多个参数`

pop()：数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。

> pop:`修改原素组`   `返回被移除的项`  `移除最后一项`

3、**shift() 和 unshift()**

shift()：删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 。 

> shift:`修改原素组`   `返回被移除的项`  `移除第一项`

unshift:将参数添加到原数组开头，并返回数组的长度 。

> unshift:`修改原素组`   `返回修改后数组长度`  `可接收多个参数`

**4.sort()**

sort()：按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。

在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串.

> sort:`修改原素组`   `返回修改后的数组`

**5.reverse()**

reverse()：反转数组项的顺序。

> reverse:`修改原素组`   `返回修改后的数组`

**6、concat()**

arr.concat(arr1,arr2) ：将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，**它只是复制当前数组并返回副本（浅拷贝）。**

> concat:**`不修改原素组`   `返回新数组`**

**7、slice()**

slice()：返回从原数组中指定开始下标到结束下标之间的项组成的新数组。slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。在没有给 slice()方法传递参数的情况下，**它只是复制当前数组并返回副本（浅拷贝）。**

> slice:**`不修改原素组`  `返回被截取的数组`**

**8、splice()**

splice()：很强大的数组方法，它有很多种用法，可以实现删除、插入和替换。

删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。

插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。例如，splice(2,0,4,6)会从当前数组的位置 2 开始插入4和6。
替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,4,6)会删除当前数组位置 2 的项，然后再从位置 2 开始插入4和6。

splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项，如果没有删除任何项，则返回一个空数组。

> splice:`修改原素组`   `返回被删除的项`

**9、indexOf()和 lastIndexOf()**

indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。 
lastIndexOf：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的末尾开始向前查找。

这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会使用全等操作符。

**10 find()方法** 返回的是第一个成功查找到的值

find方法更适用于**取出对象数组中的某一项**,返回return 为 true的值.

使用方法:arr.find((item,index,arr)=>{...},thisValue)

取出数组对象中的某一项

arr.find(item=>item.id===1);

**11 findIndex()方法**

findIndex方法更适用于**取出对象数组中的某一项属性为xxx的下标**,返回return 为 true的值.

**12 includes()方法**

includes方法可以判断xxx是否存在于数组的某一项中,如果存在返回true

使用方法: includes(xxx,index):从index开始寻找是否存在xxx

**数组的迭代方法:**

> 具体有:
>
> forEach():循环遍历，相当于for，里面 return 相当于 continue;
>
> map(): 用来映射数组，里面 return 返回新数组的值(**return 什么返回的数组就是什么**)，特点是返回的数组和原数组长度一样，即使不return.
>
> filter():用来过滤数组，**return 必须是 boolean**，return为true,则表示新数组有该值的原始值.新数组长度取决于返回的值的多少。
>
> every():判断数组是不是满足所有条件，只有所有的都满足条件返回的是true只要有一个不满足返回的就是false(默认值)
>
> some():判断数组是不是有满足条件的,只有有一个满足条件返回的是true  只要都不满足返回的就是false
>
> find():...
>
> findIndex():...
>
> const res = reduce((prev,item,index,arr)=>{}):返回叠加后的效果 prev是叠加后的值 需要return 出去才行,最终接收到的`res`是最终叠加的值。

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

**10、Array.prototype.at()**

arr.at(index)可以快速取出arr在index位置处的value值，**index可以取负值，表示从末尾向前数。**

**11、Array.prototype.flat(n)**

数组扁平化方法，其中n是扁平化深度。 不填n默认只展开一层，n可取Infinity，表示一直往下展开，直到不能再展。

> **如何自己实现该方法？？**
>
> 可以用如下方法：
>
> ```js
> const arr = [1, 2, [3, 4]];
> var newArr = [].concat(...arr);
> // [1, 2, 3, 4]
> ```
>
> 首先，...arr会将数组变成这种形式=> 1,2,[3,4]
>
> 而concat()可以接收多个参数，既可以是单个数字，也可以是数组，数组会默认将其展开。
>
> 如果是多维，可以采用迭代的方法。

### 字符串的方法

> 思考？ 为什么字符串的方法都不改变原字符串？？
>
> JavaScript中的字符串是不可变的（immutable）。这意味着一旦创建了一个字符串，它的值就不能被改变。字符串的方法并不会直接修改原始字符串，而是返回一个新的字符串作为结果。
>
> 这种设计是基于字符串的不可变性。由于字符串是不可变的，任何对字符串的操作都会生成一个新的字符串，而不会改变原始字符串的值。这样的设计有以下几个优点：
>
> 1. 可靠性：不可变的字符串可以确保字符串的值在使用过程中不会被意外修改，从而提高代码的可靠性和可维护性。
> 2. 缓存优化：由于字符串是不可变的，可以对字符串进行缓存和重用。如果两个字符串具有相同的值，那么它们可以共享同一个内存空间，从而减少内存的使用。
> 3. 线程安全：不可变的字符串在并发环境中是线程安全的，因为它们的值不会被修改。

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

```js
//根据 空字符串 分割数组
var str = '君不见黄河之水天上来';
var arr = str.split('');
console.log(arr) // ["君","不","见","黄","河","之","水","天","上","来"]

//根据 空格 分割数组
var str = '君不见 黄河 之水 天上来';
var arr = str.split(' ');
console.log(arr) // ["君不见","黄河","之水","天上来"]


//返回长度小于等于2的数组, 根据 / 分割数组 ====== 返回前两个满足条件的数组
var str = '君不见/黄河/之水/天上来';
var arr = str.split('/', 2);
console.log(arr) // ["君不见","黄河"]


//根据 / 分割数组 返回前3个满足条件的数组
let str = '君不见/黄河/之水/天上来';
console.log(str.split('/',3));
//[ '君不见', '黄河', '之水' ]
```

**5、concat([string[,string2…]])**
连接字符串，返回新的字符串，**不会修改原字符串**，可添加多个参数字符。

`不修改原字符串`   `返回新字符串`

**6、charAt(index)**
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

**matchAll(str)**：是一个Generator函数，需要next()获得下一个符合的值，直到done:true;

```js
console.log('string'.match(/\w*$/)) //["string", index: 0, input: "string"]
console.log('string'.match('rin')) //["rin", index: 2, input: "string"]
console.log('string'.match(/^a*$/))  //null
```

**16、search(str)**
用法等同于indexof，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。

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
用str从头部开始填充原字符串，直到其长度达到length，**不会修改原字符串。**

```js
var str='string'
console.log(str.padStart(10,'start')) //starstring  str的长度为6，在头部添加四个字符
console.log(str) //string
```

**21、padEnd(length,str)**
用str从尾部开始填充原字符串，直到其长度达到length，**不会修改原字符串。**

**22 includes("xxx",index)**

从第index个位置开始查找有内有"xxx"这个字符串.



## 手写new？

https://juejin.cn/post/6968856664560648199

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

具体：

>**`new` 运算符创建一个用户定义的对象数据类型的实例或者具有构造函数内置对象的实例**。

它进行的操作：

- 首先创建一个新的空对象
- 然后将空对象的__proto__指向构造函数的原型
  - 它将新生成的对象的 `__proto__` 属性赋值为构造函数的 `prototype` 属性，使得通过构造函数创建的所有对象可以共享相同的原型。
  - 这意味着同一个构造函数创建的所有对象都继承自一个相同的对象，因此它们都是同一个类的对象。
- 改变 `this` 的指向，指向空对象
- 对构造函数的返回值做判断，然后返回对应的值
  - 一般是返回第一步创建的空对象；
  - 但是当 **构造函数有返回值时** 则需要做判断再返回对应的值，是 **对象类型则返回该对象**，是 **原始类型则返回第一步创建的空对象**。



> 也就是说，obj在更改了this指向后(`可以看成obj.构造函数，那么构造函数里的this.xxx，都是obj里面的了，所以obj就有值了，但是是引用`)，最终返回的应该是obj，构造函数没有返回值，所以res为undefind。但是如果构造函数里有返回值，new 操作符会认为，如果是基本类型，那么会自动忽略，仍旧返回obj，如果返回的是一个对象，那new 操作符无效，直接返回一个对象。



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
    - entries：返回一个包含集合中所有键值对的数组
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

## This指向问题

### **this默认绑定**

函数调用时无任何调用前缀的情景，默认绑定时this指向全局对象，但需要注意的是，在严格模式环境中，this默认指向undefined

###  **this隐式绑定**

#### **1.隐式绑定**

如果函数调用时，前面存在调用它的对象，那么this就会隐式绑定到这个对象上，如果函数调用前存在多个对象，this指向距离调用自己最近的对象

####  **2.隐式丢失**

在特定情况下会存在隐式绑定丢失的问题，最常见的就是作为参数传递以及变量赋值，

- 参数传递的情况如下：

```js
var name = '行星飞行';
let obj = {
    name: '听风是风',
    fn: function () {
        console.log(this.name);
    }
};

function fn1(param) {
    param();
};
fn1(obj.fn);//行星飞行
```

在上述代码中，fn1中的参数接收一个函数，obj.fn只是将函数fn的引用地址传出去了，并没有在obj内调用，所以fn1执行的时候this是window.

- 变量赋值的情况，其实本质上与传参相同：

  ```js
  var name = '行星飞行';
  let obj = {
      name: '听风是风',
      fn: function () {
          console.log(this.name);
      }
  };
  let fn1 = obj.fn;
  fn1(); //行星飞行
  ```

  ```js
  var name = '行星飞行';
  let obj = {
      name: '听风是风',
      fn: function () {
          console.log(this.name);
      }
  };
  let obj1 = {
      name: '时间跳跃'
  }
  obj1.fn = obj.fn;
  obj1.fn(); //时间跳跃
  ```
  
  

### 显式绑定

显式绑定是指我们通过call、apply以及bind方法改变this的行为，相比隐式绑定，我们能清楚的感知 this 指向变化过程。

注意，如果在使用call之类的方法改变this指向时，指向参数提供的是null或者undefined，那么 this 将指向全局对象。

1.call、apply与bind都用于改变this绑定，但call、apply在改变this指向的同时还会执行函数，而bind在改变this后是返回一个全新的boundFcuntion绑定函数，这也是为什么上方例子中bind后还加了一对括号 ()的原因。

2.bind属于硬绑定，返回的 boundFunction 的 this 指向无法再次通过bind、apply或 call 修改；call与apply的绑定只适用当前调用，调用完就没了，下次要用还得再次绑。

3.call与apply功能完全相同，唯一不同的是call方法传递函数调用形参是以散列形式，而apply方法的形参是一个数组。在传参的情况下，call的性能要高于apply，因为apply在执行时还要多一步解析数组。

### 箭头函数的This

箭头函数中没有`this`绑定，必须通过查找作用域链来决定其值。 如果箭头函数被非箭头函数包含，则`this`绑定的是最近一层非箭头函数的`this`，否则`this`的值则被设置为全局对象。

其实就是相当于箭头函数外的`this`是缓存的该箭头函数上层的普通函数的`this`。如果没有普通函数，则是全局对象（浏览器中则是`window`）。 也就是说无法通过`call`、`apply`、`bind`绑定箭头函数的`this`(它自身没有`this`)。而`call`、`apply`、`bind`可以绑定缓存箭头函数上层的普通函数的`this`。

### `DOM`事件处理函数调用This

#### script标签里 addEventerListener、attachEvent、onclick函数调用

script标签里的 `onclick`和`addEventerListener`是指向绑定事件的元素。 一些浏览器，比如`IE6~IE8`下使用`attachEvent`，`this`指向是`window`。 顺便提下：面试官也经常考察`ev.currentTarget`和`ev.target`的区别。 `ev.currentTarget`是绑定事件的元素，而`ev.target`是当前触发事件的元素。比如这里的分别是`ul`和`li`。 但也可能点击的是`ul`，这时`ev.currentTarget`和`ev.target`就相等了。

#### 内联事件处理函数调用

调用的是写在script里面的是window，调用的函数直接写到了内联对象里面的是事件调用者本身。



### 优先级

箭头函数的`this`是上层普通函数的`this`或者是全局对象（浏览器中是`window`），所以排除，不算优先级。

显式绑定 > 隐式绑定 > 默认绑定

new绑定 > 隐式绑定 > 默认绑定

为什么显式绑定不和new绑定比较呢？因为不存在这种绑定同时生效的情景，如果同时写这两种代码会直接抛错，所以大家只用记住上面的规律即可。







https://zhuanlan.zhihu.com/p/42145138

This指向问题：https://www.ruanyifeng.com/blog/2018/06/javascript-this.html

为什么多次bind只取第一次的原因：https://blog.csdn.net/qq_51368103/article/details/126309800?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3-126309800-blog-85764358.235%5Ev38%5Epc_relevant_sort&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3-126309800-blog-85764358.235%5Ev38%5Epc_relevant_sort&utm_relevant_index=4

bind和new共同作用时this的取向：https://www.jianshu.com/p/3273b5f51275

练习：https://juejin.cn/post/6946021671656488991

`实在不理解就记住this指向排序：`:https://juejin.cn/post/6844903941021384711



 **普通函数中的this:**

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

   

**总结：**

> 非箭头函数里面的this是被怎么样的方式调用时绑定的。
>
> 箭头函数里面的this是函数被创建时绑定的。所谓的定义时候绑定，就是t**his是继承自**`·父·`**执行上下文！！**
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



## Promise

https://es6.ruanyifeng.com/#docs/promise

Promise只有执行到resolve()或者reject()时才会由pending状态转为fullfill或者fail状态，然后才会执行后面的.then方法。



## promise async awit

https://juejin.cn/post/7144308012952322084



## import和request的区别

https://juejin.cn/post/6844903912487518221

require,exports,module.exports属于CommonJS规范,import,export,export default属于ES6规范

require支持动态导入,动态匹配路径,import对这两者都不支持

require是运行时调用,import是编译时调用

require是赋值过程,import是解构过程

对于export和export default 不同的使用方式,import就要采取不同的引用方式,主要区别在于是否存在{},export导出的,import导入需要{},导入和导出一一对应,export default默认导出的,import导入不需要{}

exports是module.exports一种简写形式,不能直接给exports赋值

当直接给module.exports赋值时,exports会失效.

## JS中的构造函数、原型及原型链

**构造函数：**

典型的面向对象编程语言（比如C++和Java），存在“类”（class）这个概念。所谓“类”就是对象的模板，对象就是“类”的实例。但是，在JavaScript语言的对象体系(**ES6之前**)，不是基于“类”的，而是基于构造函数（constructor）和原型链（prototype）。

**函数体内使用this关键字，代表所要生成的对象实例。**

new命令的作用，就是执行一个构造函数，并且返回一个对象实例。使用`new`命令时，它后面的函数调用就不是正常的调用，而是依次执行下面的步骤。

**a：创建一个空对象，作为将要返回的对象实例。**

**b：将空对象的原型指向了构造函数的prototype属性。**

**c：将空对象赋值给构造函数内部的this关键字。（this指向要返回的对象实例）**

**d：开始执行构造函数内部的代码。**

也就是说，构造函数内部，this指向的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。构造函数之所谓构造函数，意思是这个函数的目的就是操作一个空对象（即this对象），将其构造为需要的样子。

```js
function Person(name, age, job) {
 this.name = name;
 this.age = age;
 this.job = job;
 this.sayName = function() { alert(this.name) } 
}
var person1 = new Person('Zaxlct', 28, 'Software Engineer');
var person2 = new Person('Mick', 23, 'Doctor');

```

上面的例子中 person1 和 person2 都是 Person 的**实例**。这两个**实例**都有一个 `constructor` （构造函数）属性，该属性（是一个指针）指向 Person。 在构造函数内部，this.constructor就已经指向了Person了，这是因为每当定义一个对象的时候，对象中都会包含一些预定义的属性，其中constructor就是已预定义的属性了。

即：

```js
  console.log(person1.constructor == Person); //true
  console.log(person2.constructor == Person); //true
```

**实例的构造函数属性（constructor）指向构造函数。**

在 JavaScript 中，每当定义一个对象（函数也是对象）时候，对象中都会包含一些预定义的属性。其中每个**函数对象**都有一个`prototype` 属性，这个属性指向函数的**原型对象**。









**原型、原型链**：

https://juejin.cn/post/7233228344418238522

<img src="/Users/ll/Documents/笔记/前端笔记/js知识点/JS知识点-1.assets/image-20230727144804533.png" alt="image-20230727144804533" style="zoom:50%;" />

- 每个对象都有 __proto__ 属性，但只有函数对象才有 prototype 属性。
- 原型对象（Person.prototype）是 构造函数（Person）的一个实例。
- 所有*函数对象*的**proto**都指向Function.prototype，它是一个空函数（Empty function）
- 所有的构造器都来自于 `Function.prototype`（这是一个对象），甚至包括根构造器`Object`及`Function`自身。所有构造器都继承了`Function.prototype`的属性及方法。如`length、call、apply、bind`





特殊：

`Function.prototype`它是函数对象，但它很特殊，他没有prototype属性（前面说道函数对象都有prototype属性）

> 那么`Function.prototype` 为什么是函数对象呢？
>
> 前面说过，构造函数的原型对象其实就是构造函数的一个实例，对于Function而言，我们之前也说过，new Function()得到的其实是一个函数对象，实例对象是一个函数对象，那么其原型对象也就是一个函数对象。

Object.prototype._ proto _ 到顶了为null



## call、apply、bind的实现

 

#### call的自我实现

```js
Function.prototype.myCall = function(obj,...args){
    obj = obj===undefined||obj===null ? window||global : obj; //如果传进来的对象是null或者undefinded则绑定全局对象
    obj.fn = this;	//给需要绑定的对象身上的fn属性绑定fn函数
    obj.fn(...args);//执行，并且附带参数
    delete obj.fn;	//将原先绑定上的fn属性给删除掉
}
fn.myCall(obj,2,3); 
```

### apply的自我实现

与call非常相似，只不过是将参数改成了数组形式。

```js
Function.prototype.myApply = function(obj,argArray){
    obj = obj===undefined||obj===null ? window||global : obj;
    obj.fn = this;
    obj.fn(...argArray);
    delete obj.fn;
}
```

### bind的自我实现

bind的特点：

- 可以修改函数this指向。

- bind返回一个绑定了this的新函数`boundFcuntion`。

- 支持参数补全，我们在返回`bound`函数时已传递了部分参数2，在调用时`bound`补全了剩余参数。即bind一次，补全的时候属于调用了。

  ```js
  let res = fn.bind(obj,2);
  res(3,4); // 9
  ```

- `boundFunction`的this无法再被修改，使用`call、apply`也不行。

```js
//箭头函数的形式
Function.prototype.myBind = function(obj,...args){
    obj = obj===undefined||obj===null ? window||globalThis : obj; //如果传进来的对象是null或者undefinded则绑定全局对象
    return (...args2)=>{  //返回一个箭头函数，箭头函数没有自己的this,因此他的this是箭头函数外层的this
        this.call(obj,...args,...args2); //此处的this就是调用的函数，采用了闭包
    }
}

//普通函数的形式
Function.prototype.myBind = function(obj,...args){
    obj = obj===undefined||obj===null ? window||globalThis : obj; 
  	let that = this;
    return return function Bound(...args2){  //返回一个箭头函数，箭头函数没有自己的this,因此他的this是箭头函数外层的this
        that.call(obj,...args,...args2); //此处的this就是调用的函数，采用了闭包
    }
}
```

`bind方法还有一个少见的特性:`

通过`bind`返回的`boundFunction`函数也能通过`new`运算符构造，只是在构造过程中，`boundFunction`已经确定的`this`会被忽略，且返回的实例还是会继承构造函数的构造器属性与原型属性，并且能正常接收参数。

我们在模拟`bind`方法时，返回的`bound`函数在调用时得考虑new调用与普通调用，毕竟两者this指向不同。

再说直白一点，如果是new调用，bound函数中的this指向实例自身，而如果是普通调用this指向`obj`.

构造函数实例的constructor属性永远指向构造函数本身:

```js
function Fn(){};
var o = new Fn();
console.log(o.constructor === Fn);//true
```

而构造函数在运行时，函数内部this指向实例，所以this的constructor也指向构造函数：

```js
function Fn() {
    console.log(this.constructor === Fn); //true
};
var o = new Fn();
console.log(o.constructor === Fn); //true
```

所以我就用constructor属性来判断当前bound方法调用方式，毕竟只要是new调用，`this.constructor === Fn`一定为true。

```js
//最终版
Function.prototype.myBind = function(obj,...args){
    if(typeof this !== 'function'){ //进行判断，是不是函数进行调用
        throw new Error("Not Function");
    }
    obj = obj===undefined||obj===null ? window||globalThis : obj;  //判断强邦对象是不是undefined和null
  	let that = this; 
    return function Bound(...args2){  //返回一个函数
        if (this.constructor===Bound) { //如果是new出来的，则换绑
            that.call(this,...args,...args2);
            this.__proto__ = that.prototype;
        }
        else{
            that.call(obj,...args,...args2);
        }
    }
}
```







## JS的执行流程

https://blog.csdn.net/qq_41161604/article/details/120116104

同步&异步执行机制：https://juejin.cn/post/6844903512845860872

JS事件循环：https://juejin.cn/post/6844903638238756878

JS调用栈：https://zhuanlan.zhihu.com/p/100440223





## 作用域、作用域链

作用域链取值：**要到创建这个函数的那个域”。 作用域中取值,这里强调的是“创建”，而不是“调用”**，切记切记——其实这就是所谓的"静态作用域"。

我们知道JavaScript属于解释型语言，JavaScript的执行分为：解释和执行两个阶段,这两个阶段所做的事并不一样：

**解释阶段：**

- 词法分析
- 语法分析
- 作用域规则确定

**执行阶段：**

- 创建执行上下文
- 执行函数代码
- 垃圾回收

JavaScript解释阶段便会确定作用域规则，因此作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。执行上下文最明显的就是this的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。

词法作用域

**词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。**

**词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。**

`作用域是指程序代码中定义变量的区域,JavaScript采用词法作用域，也就是静态作用域.`

> 作用域和执行上下文之间最大的区别是： **执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变!!!**

https://juejin.cn/post/6844903797135769614



**番外------作用域链与原型链的区别：**

当访问一个变量时，解释器会先在当前作用域查找标识符，如果没有找到就去父作用域找，作用域链顶端是全局对象window，如果window都没有这个变量则报错。

当在对象上访问某属性时，首选i会查找当前对象，如果没有就顺着原型链往上找，原型链顶端是null，如果全程都没找到则返一个undefined，而不是报错。





## 执行上下文

当JS解析到某个可执行片段时，会做一些执行前的准备工作，这个准备工作就叫做执行上下文。

执行上下文的类型：全局执行上下文、函数执行上下文、Eval执行上下文

**执行上下文是 JavaScript 执行一段代码时的运行环境**

https://juejin.cn/post/6954966248233009182

### `变量提升 以及 var let const 的不同`

以var声明的变量 只有 全局作用域 和 函数作用域，没有块级作用域。

https://juejin.cn/post/7007224479218663455

块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了。

<img src="/Users/ll/Documents/笔记/前端笔记/js知识点/JS知识点-1.assets/image-20230726132635366.png" alt="image-20230726132635366" style="zoom:50%;" />

变量提升与函数提升的优先级：函数式声明会**第一时间**将声明和**表达式**(声明内容)提升到最前面。(类似C/C++)

函数提升优先级**高于**变量提升，且**不会**被同名变量**声明**覆盖，但是会被变量**赋值**后覆盖。而且存在同名函数与同名变量时，优先执行函数。

```js
console.log(a);      //f a()
console.log(a());      //1  
var a=1;
function a(){
    console.log(1);
}
console.log(a);       //1   
a=3
console.log(a())      //a not a function
```

它的过程就相当于

```js
var a=function (){   //声明一个变量a指向
    console.log(1)
}
var a;
console.log(a)  //如果a不优先执行含函数，这里是返回undefined;
console.log(a())
a=1    //这里函数与变量
console.log(a)
a=3
console.log(a())
```

已经声明了的变量或函数，再声明一次并不会使其`undefinded`，而是这一行无效。为什么？

例如：

```js
var a = 10;
var a;
console.log(a);//10
//等效于==>变量提升
var a;
var a;
a = 10;
console.log(a);//10
```

```js
console.log(a.toString());      //1
var a = function(){
    console.log(2);
}
function a(){
    console.log(1);
}
console.log(a.toString());       //2 


// 过程相当于

var a = function a(){
    console.log(1);
}
var a;
console.log(a.toString());      //1

a = function(){
    console.log(2);
}
console.log(a.toString());       //2 
```



## JS执行流程、作用域、作用域链、变量提升、执行上下文总结

<img src="/Users/ll/Documents/笔记/前端笔记/js知识点/JS知识点-1.assets/image-20230726133533038.png" alt="image-20230726133533038" style="zoom:50%;" />

https://zhuanlan.zhihu.com/p/99175531



​	JS是一种解释型的语言，其运行时是按照写的代码的顺序一句一句进行执行的，当然，JS在进行执行的时候共有两个阶段，编译阶段和执行阶段。如上图，在输入一段JS代码后，JS首先会进入编译阶段，经过编译后，会生成两部分内容：执行上下文和可执行代码。执行上下文主要是指JS在执行一段代码的执行环境，确定当前环境(函数)在执行期间用到的变量、对象、函数、`确定this???`等。

  在全局环境下，会创建一个全局执行上下文，全局执行上下文中存放着变量环境对象和词法环境对象。在ES5之后，变量环境对象中主要存储的是var的声明和函数的声明，词法环境中主要是存储的let、const的声明。在变量环境对象中，会出现`变量提升`的现象，所以变量提升是出现在**编译阶段的执行上下文的变量环境对象中**。如上图代码中：

```js
print(); // 1
console.log(str); // 2
var str = 'hello world!'; // 3
function print() { // 4
    console.log(str)
}
```

首先进入**编译阶段**：

- 1和2 不是声明语句，而是可执行代码，JS引擎不予编译，不做任何处理；
- 3 是一个变量声明语句：通过var声明的str变量，则放入到变量环境对象中，并初始化为undefinded；
- 4是一个函数声明语句：JS引擎发现一个通过函数声明的函数，所以JS会将函数定义部分存到堆中(因为函数的本质就是对象)，并在变量环境对象中声明一个print变量，将其引用地址交予print。

这样就生成了变量环境对象，类似如此：

```js
Variable Environment:
    str -> undefined,
    print -> function () { console.log(str) };
```

接着JS引擎会把声明之外的代码编译成字节码（可执行代码），也就是下面这一段模拟代码：

```js
print();
console.log(str);
str = 'hello world!';
```

另外，JS采用的是词法作用域，即作用域在编写代码的时候就已经确定了。作用域、作用域链是在编译阶段完成的。

然后就进入了**执行阶段**：

JS引擎开始执行上述“可执行代码”，按照顺序一行一行的执行，过程如下：

- 执行到print函数时，JS引擎会先在词法环境中查找，查不到再开始在变量环境对象中寻找该函数，由于变量环境对象中print存在该函数的引用，所以JS引擎便开始执行该函数，在进入到print( )函数时，也会有一个完整的编译阶段和执行阶段，此时创建的便是print函数的执行上下文环境。由于该函数的执行上下文环境中没有声明语句，只有执行代码。但其实在print( )函数的执行上下文环境中的变量环境对象中是存在arguments、length以及`[[scope]]`(**scope是该函数的外部执行环境中的一些变量，这也就是作用域链的体现**)等变量的。所以在执行`console.log(str)`代码时，会首先从print函数上下文的词法环境对象中查找，没有再查变量环境对象，没有再查[[scope]]作用域链，在外层，也就是全局执行上下文的变量环境对象中发现了str,其值为undefinded，该函数的执行结果便是undefinded

- console.log(str)--查找到str为undefinded.输出undefinded.

- str = 'hello world!'--为赋值语句，此时全局执行上下文中的变量环境对象中的str改变为str -> hello,world.

  ```js
  Variable Environment:
      str -> 'hello world!',
      print -> function () { console.log(str) };
  ```

整个流程大致差不多这样。

