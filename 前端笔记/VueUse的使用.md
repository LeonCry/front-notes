# VueUse的使用

[toc]



中文文档：http://www.vueusejs.com/guide/config.html

## 配置

### 事件过滤器

`throttleFilter` 和 `debounceFilter` 来控制事件触发频率:

- throttleFilter：节流

- debounceFilter：防抖

`pausableFilter`:可以暂停一些事件。



### 响应式时机

`flush option`：回调的触发时机:

**flush option (default: `'pre'`)**

- `'pre'`: 在同一个'tick'中缓冲无效的副作用函数调用并在渲染之前更新它们
- `'post'`: 像'pre'一样是异步的，但在组件更新后触发，因此您可以访问更新后的 DOM
- `'sync'`: 强制副作用函数始终同步触发

> 何为回调的触发时机?
>
> 当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。
>
> 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。
>
> 如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项



### 双向绑定V-model的VueUse版本 useVModel()

一般情况下,想进行双向数据绑定,需要在父组件中用 

`v-model:xxx="xxx"`

然后再在子组件中

`const props = defineProps({xxx...})`

`const emits = defineEmits(["update:xxx"])`

进行修改的时候需要@update:xxx才可以.

在使用useVModel()时,会默认进行双向绑定,且当检测到xxx被修改了的时候,会默认执行回调函数update:xxx,不会在代码中体现,默认执行emit('update:flag',flag)，参数是**当前双向绑定的值**,当然,若不想用默认回调,也可以自己定义回调.

使用方法:

在子组件中:

`const xxx = useVModel(props,"xxx",emits)`

即可.

### 其他Usage

https://juejin.cn/post/7122245068534054943

- `useAsyncState`:响应式获取异步状态。不会阻塞setup 函数，在promise完成后，将自动触发。

- `onClickOutside`:检测点击位置是否在元素之外。
- `useFocusTrap`:将键盘焦点锁定在一个特定的DOM元素上，不是在整个页面中循环，而是在浏览器本身中循环，键盘焦点只在该DOM元素中循环。
- `useHead`:...
- `useStorage`:自动将 `ref` 同步到 localstorage.
- `useVModel`:使双向数据绑定更容易。
- `useImage`:访问图像本身的加载和错误状态及响应式图像。
- `useDark`：黑暗模式。
- `useRefHistory`:跟踪响应式数据的变化。
- `intersectionobserver`:当确定两个元素是否重叠时，它就会调用一个回调，确定目标元素是否可见。
- `useTransition`:过渡动画。
- `useInterval`:`延时重复调用`能力的封装。



