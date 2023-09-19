// @ts-nocheck
//栈的表现:先入后出
class LinkNode {
  constructor(value,node){
    this.value = value;
    this.next = node;
  }
}
//实现栈
const setStack = () => {
  let pre = null;
  return (node)=>{
    node.next = pre;
    pre = node;
    return node;
  }
}
//测试样本
let node6 = new LinkNode(6, null);
let node5 = new LinkNode(5, null);
let node4 = new LinkNode(4, null);
let node3 = new LinkNode(3, null);
let node2 = new LinkNode(2, null);
let node1 = new LinkNode(1, null);
//输出
let stack = setStack();
stack(node1);
stack(node2);
stack(node3);
stack(node4);
stack(node5);
let h = stack(node6);


//数组实现栈
const stackArr = () => {
  let stacks = {
    head:-1,
    value:[],
  }
  return {
    push:(val) => {
      stacks.head++;
      stacks.value[stacks.head] = val;
    },
    pop:() => {
      if (stacks.head<0) return new Error("no value");
      stacks.head--;
      return stacks.value[stacks.head+1];
    },
  }
}
//测试输出
let stacks = stackArr();
stacks.push(1);
stacks.push(2);
stacks.push(3);
stacks.push(4);
console.log(stacks.pop());
console.log(stacks.pop());
console.log(stacks.pop());
console.log(stacks.pop());
stacks.push(5);
stacks.push(6);
console.log(stacks.pop());
console.log(stacks.pop());