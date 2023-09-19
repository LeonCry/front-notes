# [Vue_1] mustache 模板引擎

[toc]



-----

## 已有的模板解析方式

### 1. 纯DOM解析

​	就是在JS里面对Dom进行增删改查的操作。写起来非常复杂，并且已不再使用。

### 2. 数组join()方法解析

​	join方法就是将类似html片段字符串用数组方法的join方法进行拼接，然后再用DOM的innerHtml方法进行拼接上去。具体如下：

```html
<body>
  <ul id="list"></ul>
</body>
<script>
  //数据：
  var arr = [{"name":"小红","age":12,"sex":女},{"name":"小蓝","age":13,"sex":男}];
  var list = document.getelementById('list');
  for (let i = 0;i<arr.length;i++){
  list.innerHTML += [
    '<li>',
    	'<div class="hd">' + arr[i].name + '的信息</div>',
    		'<div class="bd">',
    			'<p>年龄:'+ arr[i].age +'</p>',
    			'<p>性别:'+ arr[i].sex +'</p>',
    			'</div>',
    	'<div/>',
    '</li>'
  ].join('');
  }
</script>
```



### 3. ES6新语法`${a}`模板字符串解析

​	具体如下：

```js
var arr = [{"name":"小红","age":12,"sex":女},{"name":"小蓝","age":13,"sex":男}];
  var list = document.getelementById('list');
  for (let i = 0;i<arr.length;i++){
  list.innerHTML += `
  	<li>
    	<div class="hd">${arr[i].name}的信息</div>
    		<div class="bd">
    			<p>年龄:${arr[i].age}</p>
    			<p>性别:${arr[i].sex}</p>
    			</div>
    	<div/>
    </li>
  	`
  };
```

### 4. mustache模板解析

​	更加优雅！





## mustache的基本使用

​	mustache是最早的模板引擎，比vue要早的多，他的底层实现原理非常具有创造性和轰动性。

	### 使用

```js
var data = {
    arr:[{"name":"小红","age":12,"sex":'女'},{"name":"小蓝","age":13,"sex":'男'}]
  };
  var template = `
    <ul>
      {{#arr}}
      <li>
        <div class="hd">{{name}}的基本信息</div>
        <div class="bd">
          <p>姓名 {{name}}</p>
          <p>年龄 {{age}}</p>
          <p>性别 {{sex}}</p>
        </div>
      </li>
      {{/arr}}
    </ul>
  `;
  const tem = Mustache.render(template,data);
  let div = document.getElementById('box');
 	div.innerHTML = tem;
```

tem的值为:

```html

    <ul>
      <li>
        <div class="hd">小红的基本信息</div>
        <div class="bd">
          <p>姓名 小红</p>
          <p>年龄 12</p>
          <p>性别 女</p>
        </div>
      </li>
      <li>
        <div class="hd">小蓝的基本信息</div>
        <div class="bd">
          <p>姓名 小蓝</p>
          <p>年龄 13</p>
          <p>性别 男</p>
        </div>
      </li>
    </ul>
 
```



## 简单模板引擎实现

用正则表达式可以实现简单模板的数据填充。

```js
  var template = `我是{{name}},我想要{{doing}}`;
  var data = {
    name:"小红",
    doing:"吃饭"
  }
  //正则表达式
  var reg = /\{\{(\w+)\}\}/g;
	//findstr:查找到的字符串
	//captured:捕获到的字符串 正则表达式中(..)
	//index:查找到的位置
	//oriData:原字符串
  var after = template.replace(reg,(findstr,captured,index,oriData)=>{
    return data[captured];
  });
  console.log(after);

	//结果:
	我是小红,我想要吃饭

```

用正则表达式的方式确实可以得到数据补充后的结果，但是其功能太单一，无法实现数组的循环嵌套，所以这其实不是mustache的底层机制，只是一种最简单的模板引擎机制。



## 探求Mustache的底层机制

其模板解析原理为：

	1. **将模板字符串编译为tokens形式**
	1. **将tokens结合数据，解析为dom字符串**

在第 **1** 步中，假设模板字符串为：

```html
<h1>我买了一个{{thing}}，好{{mood}}啊</h1>
```

那么mustache会将该模板字符串解析为如下token形式：

```js
[
	["text","<h1>我买了一个”]，
	["name","thing"],
	["text",",好"]，
	["name","mood"],
	["text","阿</h1>"]
]
```

当模板字符串中有循环存在时，它将被编译为嵌套更深的tokens:

```html
	<div>
		<ul>
      {{#arr}}
      <li>{{.}}</li>
      {{/arr}}
    </ul>
  </div>	
```

其将会解析为：

```js
[
	["text","<div><ul>”]，
	["#","arr",[
     ["text","<li>”]，
     ["name","."],
     ["text","</li>”]，
  ]],
	["text","</ul></div>"]，
]
```

