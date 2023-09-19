# JS知识点-0

## BFC

官方定义：BFC（Block Formatting Context）块格式化上下文， 是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

说人话：BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。 我们经常使用到BFC，只不过不知道它是BFC而已。

### 如何创建一个BFC

常用的方式有以下几种：

浮动元素（元素的float不是 none，指定float为left或者right就可以创建BFC）

绝对定位元素（元素的 position 为 absolute 或 fixed）

display:inline-block，display:table-cell，display:flex，display:inline-flex

overflow指定除了visible的值

### BFC有什么特点

在BFC中，块级元素从顶端开始垂直地一个接一个的排列。（当然了，即便不在BFC里块级元素也会垂直排列）

如果两个块级元素属于同一个BFC，它们的上下margin会重叠（或者说折叠），以较大的为准。但是如果两个块级元素分别在不同的BFC中，它们的上下边距就不会重叠了，而是两者之和。

BFC的区域不会与浮动的元素区域重叠，也就是说不会与浮动盒子产生交集，而是紧贴浮动边缘。

计算BFC的高度时，浮动元素也参与计算。BFC可以包含浮动元素。（利用这个特性可以清除浮动）

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

### BFC有什么用

#### 1、解决外边距折叠问题、外边距塌陷

外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。

对第一个div的margin-bottom设置为10px，第二个div的margin-top设置为20px，我们可以看到两个盒子最终的边距是20px，是两者之中较大的一个。这就是外边距重叠的问题。

为了解决这个问题，我们可以让这两个div分属于不同的BFC，或者只要把其中一个div放到BFC中就可以。原因是：BFC就是页面上的一个隔离的独立容器，容器里面的元素不会对外边产生影响。

#### 2、制作两栏布局

**BFC****的区域不会与浮动的元素区域重叠。**

我们可以利用这个特性来创建CSS中常用的两栏布局（左边宽度固定，右边宽度自适应）。

HTML：

![img](file:////Users/leonli/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

 

#### 3、清除元素内部的浮动

这里清除浮动的意思并不是清除你设置的元素的浮动属性，而是清除设置了浮动属性之后给别的元素带来的影响。例如我们给子元素设置浮动，那么父元素的高度就撑不开了。 

BFC有一个特性：计算BFC的高度时，浮动元素也参与计算，利用这个特性可以清除浮动。

https://blog.csdn.net/weixin_43974265/article/details/115416184

 

## 三栏布局 ：grid 重点

...

## Canvas api 未知点

 

## 重绘与重排

 当盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来之后，浏览器便把这些原色都按照各自的特性绘制一遍，将内容呈现在页面上。

### 重绘（repaint或redraw）：

重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。重绘发生在元素的可见的外观被改变，但并没有影响到布局的时候。比如，仅修改DOM元素的字体颜色（只有Repaint，因为不需要调整布局）

### 重排（重构/回流/reflow）：

当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。

触发重排的条件：任何页面布局和几何属性的改变都会触发重排： 

页面渲染初始化(无法避免)

添加或删除可见的DOM元素

元素位置的改变，或者使用动画

元素尺寸的改变——大小，外边距，边框

浏览器窗口尺寸的变化

填充内容的改变，比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变

重排必定会引发重绘，但重绘不一定会引发重排。

### 如何避免触发回流和重绘：

避免频繁使用 style，而是采用修改class的方式。

将动画效果应用到position属性为absolute或fixed的元素上。

也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘

使用createDocumentFragment进行批量的 DOM 操作。

对于 resize、scroll 等进行防抖/节流处理。

避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。

利用 CSS3 的transform、opacity、filter这些属性可以实现合成的效果，也就是GPU加速。



## 杂项

Flex容器默认属性：align-items:stretch列等高

需要更改: align-items:flex-start

Vw?vh?:::

前面聊两个相对的单位em和rem，不过随着时代的发展，em和rem对于有些移动端的内容显示虽然可以达到效果，所以又衍生了两个单位vw和vh。

两个也是相对单位不过其相对的是视口（非body标签定义的宽度）的，

vw： viewport width 意思是视口的宽度

vh： viewport height 意思是视口的高度。

现在说一下具体的单位大小都是各自的百分之一。

1vw = 1/100 * 视口宽度。

1vh =1/100 * 视口高度

如果这样看有人想到这个不就是百分比吗？前面在定义宽度和高度的时候也是使用了。

两者自然有不同，其和em和rem的区别有点相似，就是百分比相对于父类，而vm是相对于视口。

虽然两个单位表示了两个方向作为参考依据，但是一般的时候使用的vw而不是使用vw和vh一起使用，因为在推动窗口的时候希望按比例缩放的

## 拖拽功能

```html
 <div class="box">
        <div class="left" ondragover="dragoverx(event)" ondrop="dropx(event)"></div>
        <div class="middle"  ondragover="dragoverx(event)" ondrop="dropx(event)">
            <div id="tars" class="target" draggable="true" ondragstart="dragstartx(event)">拖拽</div>
        </div>
        <div class="right"  ondragover="dragoverx(event)" ondrop="dropx(event)"></div>
    </div>

<script>
    // 开始拖拽,对应拖拽元素
    // dataTransfer对象用于保存拖拽元素的信息，setData就是保存信息函数，函数包含两个参数
    // 第一个参数为保存信息的MIME类型，第二个参数为保存信息。
    // 例子里的drag函数就是当元素被拖拽时把元素的id记录在dataTransfer对象中（当元素在被拖入元素容器内放置时会使用该信息）。
    function dragstartx(e) {
        var data = e.dataTransfer.setData("Text",e.target.id);
    }
    // 拖拽元素在框内移动时,对应框
    // preventDefault函数则是不要执行与事件关联的默认动作。
    // 因为元素是默认禁止其他元素在范围内拖动的，需要通过调用preventDefault函数来解禁。
    function dragoverx(e) {
        e.preventDefault();
    }
    // 放下拖拽，对应框
    // 在ondrop函数内同样需要调用preventDefault函数，原因同上。
    // 第二句则是读取从之前的drag函数中的保存信息（即拖入元素的id），第三句则是把拖入元素拼为元素容器的最后一个子元素。
    function dropx(e) {
        e.preventDefault();
        var el = e.dataTransfer.getData("Text");
        console.log(this);
        e.target.appendChild(document.getElementById(el));
    }
</script>
```

## Grid

1.简单grid

```css
.grid{
    display: grid;
     /* 下面句的意思就是这个容器里面的子元素分成三列，每列都是200px宽 */
    grid-template-columns: 200px 200px 200px;
    /* 下面这句的意思就是这个容器里面的子元素分成俩行，每行都是200px的高 */
    grid-template-rows: 200px 200px;
    /* 处理完之后发现 每一个子元素的宽高都变成了192px * 192px */
    /* 由于我们给子元素加了2px的边框，最后展现的192px * 192px也就清楚了
    ，grid布局还将容器下的所有子元素变成了box-sizing: border-box;怪异盒模型。 */
}
```

现在上面的这种方法只是给子元素写固定的宽度高度，这并不是我们想要的，它并不会随着浏览器宽度高度的变化而进行变化，我们要的是能够自适应的

2.自适应

CSS 栅格布局带来了一个全新的值:fraction单位，fraction单位通常简写为fr，它允许你根据需要将容器拆分为多个块。

```css
.grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 200px 200px;
}
```

结果是栅格布局将会把整个宽度分成三个 fraction，每列占据一个 fraction 单位。

如果我们将grid-template-columns的值更改为1fr 2fr 1fr，第二列的宽度将会是其它两列的两倍。总宽现在是四个 fraction 单位，第二列占据两个 fraction 单位，其它列各占一个 fraction。

3.高级响应

然而，上面列子并没有给出我们想要的响应性，因为[网格](https://so.csdn.net/so/search?q=网格&spm=1001.2101.3001.7020)总是三列宽。我们希望网格能根据容器的宽度改变列的数量。

#### repeat()

首先我们学习repeat()函数。这是一个强大的指定列和行的方法。让我们使用repeat()函数来更改网格:
 容器CSS更改为：

```css
.grid{
    display: grid;
    grid-template-columns: repeat(3,200px);
    grid-template-rows: repeat(2,200px);
}
```

在上面代码中，repeat(3, 100px)等于100px 100px 100px。第一个参数指定行与列的数量，第二个参数指定它们的宽度，因此它将为我们提供与开始时完全相同的布局。

#### auto-fit

然后是auto-fit。让我们跳过固定数量的列，将3替换为自适应数量：

现在，栅格将会根据容器的宽度调整其数量。它会尝试在容器中容纳尽可能多的 100px 宽的列。但如果我们将所有列硬写为 100px，我们将永远没法获得所需的弹性，因为它们很难填充整个宽度。

#### minmax()

为了解决上述问题，我们需要minmax()。我们将 100px 替换为 minmax(100px, 1fr)，代码如下：

```css
.grid{

  display: grid;

  grid-template-columns: repeat(auto-fit,minmax(160px,1fr));

  grid-template-rows: repeat(2,200px);

} 
```

现在的效果堪称完美。minmax()函数定义的范围大于或等于 min， 小于或等于 max。

因此，现在每列将至少为 100px。但如果有更多的可用空间，栅格布局将简单地将其均分给每列，因为这些列变成了 fraction 单位，而不是 100px。

## 文件上传和下载 == 大文件分片上传和下载

### 一、a标签下载

```js
•	function download() {
•	    var url = "http://127.0.0.1:5500/test.html";
•	    fetch(url).then((res)=>{
•	        res.blob().then((blob)=>{
•	            const blobUrl = window.URL.createObjectURL(blob);
•	            const fileName = 'user.html';
•	            const a = document.createElement("a");
•	            a.href = blobUrl;
•	            a.download = fileName;
•	            a.click();
•	            document.removeChild(a);
•	        })
•	    })
•	}

```

优点：

可以下载txt、png、pdf等类型文件

download的属性是HTML5新增的属性 href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式；所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)

**缺点**：

·    a标签只能做get请求，所有url有长度限制

·    无法获取下载进度

·    无法在header中携带token做鉴权操作

·    跨域限制

·    无法判断接口是否返回成功

·    IE兼容问题

### 二、ajax下载--切片下载/切片上传

Hard

项目亮点

 

## JS选取DOM元素的方法，js5种不同的选择器

1.document.querySelector("选择的元素") （最常用的） document.querySelectorAll("所有选择的元素") （返回伪[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)）

2.getElementById（'idBox'） 通过ID选取元素

3.getElementsByClassName（'classBox'） 通过类选择元素（返回伪数组）

4.getElementsByTagName（'div'） 通过标签名选取元素（返回伪数组）

5.getElementsByName （'nameBox'） 通过名称name选取元素（返回伪数组）



## JS 深浅拷贝？

https://blog.csdn.net/weixin_37719279/article/details/81240658?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-81240658-blog-120121145.pc_relevant_aa_2&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-81240658-blog-120121145.pc_relevant_aa_2&utm_relevant_index=1

通俗的讲：

[浅拷贝](https://so.csdn.net/so/search?q=浅拷贝&spm=1001.2101.3001.7020)是拷贝了对象的引用，当原对象发生变化的时候，拷贝对象也跟着变化；深拷贝是另外申请了一块内存，内容和原对象一样，更改原对象，拷贝对象不会发生变化；

深层次：

浅拷贝是拷贝一层，深层次的对象级别的就拷贝引用；深拷贝是拷贝多层，每一级别的数据都会拷贝出来；

其实总结来看，浅拷贝的时候如果数据是基本数据类型，那么就如同直接赋值那种，会拷贝其本身，如果除了基本数据类型之外还有一层对象，那么对于浅拷贝而言就只能拷贝其引用，对象的改变会反应到拷贝对象上；但是深拷贝就会拷贝多层，即使是嵌套了对象，也会都拷贝出来。

### 实现浅拷贝的第一种方法

```js
var originObj = {
    a:1,
    b:{
        c:2,
        d:4,
    },
    c:[1,2,3,4],
    d:function(){
        console.log("hhh")
    }
}

var newObj = simpleCopy(originObj);
// originObj.b = {y:1,h:0};
// 为什么newObj不会改变？===>因为此时b已经更改地址了，不再指向原来的地址
// console.log(newObj);
originObj.b.c = 1000;
// 为什么newObj改变了===>因为此时b没有更改地址，而且因为是浅拷贝，所以拷贝了原对象的b对象的引用
console.log(newObj)

// 实现浅拷贝
function simpleCopy(obj) {
    // 先新建一个空对象，因为浅拷贝是拷贝一层，深层次的对象级别，就只拷贝引用了
    var newObj = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```

### 实现浅拷贝的第二种方法：js自带的API ：Object.assign

 ES6中的Object.assign方法，Object.assign是ES6的新函数。Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 Object.assign() 进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。

Object.assign(target, ...sources)

参数：

​	target：目标对象。
​			sources：**任意多个源对象。**
​			返回值：目标对象会被返回。 

### 深拷贝的实现方式

**对象只有一层的话可以使用上面的：`Object.assign()函数`**  这时候也不用分 深浅拷贝了(笔者注)

**递归拷贝**

```js
var newObj = {};
var oldObj = {
    ob1:{
        str:"hello",
        arr:[1,2,3,4],
        x:function(){
            alert('111');
        }
    },
    num:1,
}
var n = deepClone({},oldObj);
oldObj.ob1.str = "sss";
console.log(n);

// 深拷贝
function deepClone(newObj,oldObj) {
    var news = newObj;
    // 对旧对象进行属性遍历
    for (const key in oldObj) {
        if (Object.hasOwnProperty.call(oldObj, key)) {
            // 如果该属性是object-进行深拷贝
            if(typeof oldObj[key] === "object"){
                // 判断是数组还是对象
                news[key] = (oldObj[key].constructor === Array) ? []:{};
                // 这一段表示 自递归,相当于 deepClone(news,oldObj[key]),一般用在匿名函数里面
                arguments.callee(news[key],oldObj[key]);
            }
            // 如果不是object
            else{
                news[key] = oldObj[key];
            }
            
        }
    }
    return news;
}
```

**使用Object.create()方法**

直接使用var newObj = Object.create(oldObj)，可以达到深拷贝的效果。



## For in for of 区别

**for in**

for in 可以用来[遍历](https://so.csdn.net/so/search?q=遍历&spm=1001.2101.3001.7020)数组和对象，但是值得注意的是for in遍历的是其索引或者属性，for in 更适合用来遍历对象

```js
//for in  遍历数组，操作的是其索引值
var arr=['tom','jack','john'];
for(var i in arr){
    console.log(i);//0,1,2
}
//for in  遍历对象，操作的是属性
var obj={name:'tom',age:'18'};
for(var key in obj){
    console.log(key);//name age
}
```

**for of**

for of 可以用来遍历[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)，字符串，Maps和Sets，遍历的是其内容,不可循环普通对象，除非一个数据结构只有部署了 Symbol.iterator 属性, 才具有 iterator接口可以使用 for of循环。

```js
//for of 遍历数组，遍历的是其值
var arr=['tom','jack','john'];
for(var i of arr){
    console.log(i);//tom jack john
}
 
//for of 遍历字符串
var str='asv';
for(var i of str){
    console.log(i);// a s v
}
```

**哪些数据结构部署了 Symbol.iteratoer属性了呢?**

- 数组 Array
- Map
- Set
- String
- arguments对象
- Nodelist对象, 就是获取的dom列表集合

如果想让对象可以使用 for of循环怎么办?使用 Object.keys() 获取对象的 key值集合后,再使用 for of 或者使用内置的Object.values()方法获取对象的value值集合再使用for of

**forEach**

[forEach](https://so.csdn.net/so/search?q=forEach&spm=1001.2101.3001.7020)用来遍历数组，会遍历数组的每一项，不用因为return等就可以中断遍历(但是会中断后面的操作，类似continue)，不会生成新数组，不会改变原数组，代码如下：

```js
//forEach遍历数组的每一项，不会因为return操作就中断遍历
//参数一：数组的值；参数二：数组的索引；参数三：数组
var arr=['tom','jack','mike'];
arr.forEach((value,index,array)=>{
    if(value=='tom'){return;}
    console.log(value,index,array);
    //jack 1 [ 'tom', 'jack', 'mike' ]
    //mike 2 [ 'tom', 'jack', 'mike' ]
});
```

**map**

map和forEach一样也会遍历数组的每一项，不同的是Map会生成一个新数组，但不会改变原数组，并且Map也不会对空数组进行检测，代码如下：

```js
//map遍历数组
var arr=['tom','jack','mike'];
var arr2=arr.map((value,index,array)=>{
    if(value=='tom'){return 'tom';}
    console.log(value,index,array);
    //jack 1 [ 'tom', 'jack', 'mike' ]
    //mike 2 [ 'tom', 'jack', 'mike' ]
});
console.log('新数组为:',arr2);//新数组为: [ 'tom', undefined, undefined ]
```

**filter**

filter遍历数组的每一项内容，意为过滤，会返回一个新的数组，代码如下：

```js
//filter
var arr1=['tom','jack','mike'];
var arr2=arr1.filter((value)=>{
    if(value!='tom'){
        return value;
    }
});
console.log(arr2);//[ 'jack', 'mike' ]
```



## js柯里化函数

”函数[柯里化](https://so.csdn.net/so/search?q=柯里化&spm=1001.2101.3001.7020)”是指将多变量函数拆解为单变量的多个函数的依次调用， 可以从高元函数动态地生成批量的低元的函数。简单讲：就是利用函数执行，可以形成一个不销毁的私有作用域，把预先处理的内容都存在这个不销毁的作用域里面，并且返回一个函数，以后要执行的就是这个函数。

```js

// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3
```

实际上就是把add函数的x，y两个参数变成了先用一个函数接收x然后返回一个函数去处理y参数。现在思路应该就比较清晰了，就是只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

currying返回的是一个函数

#### 来列一列Currying有哪些好处呢？

##### 1. 参数复用

```jsx
// 正常正则验证字符串 reg.test(txt)

// 函数封装后
function check(reg, txt) {
    return reg.test(txt)
}

check(/\d+/g, 'test')       //false
check(/[a-z]+/g, 'test')    //true

// Currying后
function curryingCheck(reg) {
    return function(txt) {
        return reg.test(txt)
    }
}

var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

hasNumber('test1')      // true
hasNumber('testtest')   // false
hasLetter('21212')      // false
```

上面的示例是一个正则的校验，正常来说直接调用check函数就可以了，但是如果我有很多地方都要校验是否有数字，其实就是需要将第一个参数reg进行复用，这样别的地方就能够直接调用hasNumber，hasLetter等函数，让参数能够复用，调用起来也更方便。

```js
var currying=function(fn){
  var args=[];
  return function cb(){
    if(arguments.length===0){
      return fn.apply(this,args)
    }
    console.log(arguments)
   Array.prototype.push.apply(args,[].slice.call(arguments))
    //args.push([].slice.call(arguments))
    console.log(args)
    return cb
  }
}
 function add(a,b,c){
  console.log(a+b+c);
 }
  var s=currying(add);
  s(1)(2)(3)();
```

##### 2. 提前确认

```jsx
var on = function(element, event, handler) {
    if (document.addEventListener) {
        if (element && event && handler) {
            element.addEventListener(event, handler, false);
        }
    } else {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    }
}

var on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

//换一种写法可能比较好理解一点，上面就是把isSupport这个参数给先确定下来了
var on = function(isSupport, element, event, handler) {
    isSupport = isSupport || document.addEventListener;
    if (isSupport) {
        return element.addEventListener(event, handler, false);
    } else {
        return element.attachEvent('on' + event, handler);
    }
}
```

##### 3. 延迟运行

参数复用那个例子就有延迟执行的意思  像我们js中经常使用的bind，实现的机制就是Currying.

```jsx
Function.prototype.bind = function (context) {
    var _this = this
    var args = Array.prototype.slice.call(arguments, 1)
 
    return function() {
        return _this.apply(context, args)
    }
}
```

Currying 封装

```jsx
// 支持多参数传递
function progressCurrying(fn, args) {

    var _this = this
    var len = fn.length;
    var args = args || [];

    return function() {
        var _args = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(args, _args);

        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (_args.length < len) {
            return progressCurrying.call(_this, fn, _args);
        }

        // 参数收集完毕，则执行fn
        return fn.apply(this, _args);
    }
}
```

**我的封装**

```js
// 函数柯里化用到了闭包的概念
var currying = function(fn){
    // 用来存放所调用函数的所有参数
    var allArgs = [];
    return function cu(){
        // 如果不再传入的参数,则表明currying进程已完毕
        if(arguments.length===0){
            // 用apply进行调用(因为参数支持 数组)
            return fn.apply(this,allArgs);
        }
        // 如果还有长度,则递归调用,将所有的参数都放到allArgs里面
        else{
            allArgs.push(...Array.from(arguments));
            return cu;
        }
    }

}
function add(a,b,c,d) {
    return a+b+c+d;
}

var result = currying(add);
console.log(result(1)(2)(3)(4)());
```

## js .toString方法

- toString()方法可以根据所传递的参数把数值转换为对应进制的数字字符串。参数范围为 2~36 之间的任意整数。

```js
    var a = 32;
    console.log(a.toString(2));  //返回字符串100000
    console.log(a.toString(4));  //返回字符串200
    console.log(a.toString(16));  //返回字符串20
```

- 数值直接量不能直接调用 toString() 方法，必须先使用小括号或其他方法转化数字。
- 对象Object类型及自定义对象类型加括号返回[object Object]
- 类型识别
  - 常常使用Object.prototype.toString()来进行类型识别，返回代表该对象的[object 数据类型]字符串表示,Object.prototype.toString()可以识别标准类型及内置对象类型，但不能识别自定义类型

```js
console.log(Object.prototype.toString.call("jerry"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]

console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]
console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
function Person(){};
console.log(Object.prototype.toString.call(new Person));//[object Object]
//除了类型识别之外，还可以进行其他识别，如识别arguments或DOM元素
(function(){
    console.log(Object.prototype.toString.call(arguments));//[object Arguments]
})()
console.log(Object.prototype.toString.call(document));//[object HTMLDocument]
```

- 当我们对一个自定义函数调用toString()方法时，可以得到该函数的源代码；如果对内置函数使用toString()方法时，会得到一个’[native code]'字符串。因此，可以使用toString()方法来区分自定义函数和内置函数



## JS中的Generator函数

 Generator 函数的定义

语法上，Generator 函数是一个状态机，封装了多个内部状态。
形式上，Generator是一个函数。不同于普通函数，是可以暂停执行的，所以函数名之前要加星号，以示区别。
整个Generator函数就是一个封装的异步任务，或者说是异步任务的容器，异步操作需要暂停的地方，都用yield语句。

1. function 关键字和函数之间有一个星号(*),且内部使用yield表达式，定义不同的内部状态。
2. 调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象。

要创建一个 generator，我们需要一个特殊的语法结构：`function*`，即所谓的 “generator function”。

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" 创建了一个 "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]
```

到目前为止，上面这段代码中的 **函数体** 代码还没有开始执行：

一个 generator 的主要方法就是 next()。当被调用时（译注：指 next() 方法），它会恢复上图所示的运行，执行直到最近的 yield <value> 语句（value 可以被省略，默认为 undefined）。然后函数执行暂停，并将产出的（yielded）值返回到外部代码。
next() 的结果始终是一个具有两个属性的对象：

value: 产出的（yielded）的值。
done: 如果 generator 函数已执行完成则为 true，否则为 false。
例如，我们可以创建一个 generator 并获取其第一个产出的（yielded）值：

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}

```

**Generator 是可迭代的**

当你看到 `next()` 方法，或许你已经猜到了 generator 是可迭代（iterable）的。（译注：`next()` 是 iterator 的必要方法）

我们可以使用 `for..of` 循环遍历它所有的值：

这是因为当 `done: true` 时，`for..of` 循环会忽略最后一个 `value`。因此，如果我们想要通过 `for..of` 循环显示所有的结果，我们必须使用 `yield` 返回它们：不能用return

#### 运用场景

**代替递归**：:斐波那契数列的实现

```js
function * fibonacci(seed1, seed2) {
while (true) {
yield (() => {
seed2 = seed2 + seed1;
seed1 = seed2 - seed1;
return seed2;
})();
}
}
const fib = fibonacci(0, 1);
fib.next(); // {value: 1, done: false}
fib.next(); // {value: 2, done: false}
fib.next(); // {value: 3, done: false}
fib.next(); // {value: 5, done: false}
fib.next(); // {value: 8, done: false}

```

试一试？ 用 Generator做一下其他递归？



## 伪数组转数组的方法

 **伪数组的介绍：**
伪数组我们可以理解为类似数组的一个集合，我们常见的有：一个是**arguments**还有一个是**DOM的children属性，字符串，获取回来的子节点集合**。他们与数组一样，具有索引(下标)和length属性。可以通过for循环写循环语句去循环遍历。

**伪数组转为数组的方法**

1、使用Array.prototype.slice.call()或者Array.prototype.slice.apply()；

2、使用[].slice.call()或者[].slice.apply()；这种方法和上面的方法是一样的，但是上面的方式效率相对较高；

3、使用Array.from()；

4、使用Array.of()；

5、使用new Array()；

6、[...(obox.children)]



 ## JS杂项

arr.slice(8,-1) 表示的是 arr数组第8个到第倒数第1个范围截取；

 parseInt(a,b):第二个参数表示进制  ： 2 8 10 16 其他为NaN

 冒泡 捕获执行顺序问题：

Js事件执行满足先绑定，先执行的机制，事件捕获和冒泡的顺序是：先捕获后冒泡。

 

 

 

 

 

 

 

 

 

 

 