// @ts-nocheck
//队列的表现:先进后出 后进先出
class LinkNode {
  constructor(value,node){
    this.value = value;
    this.next = node;
  }
}

let queue = {
  cur:null,
  head:null,
  push:function(node){
    if(this.cur===null||this.head===null){
      this.cur = node;
      this.head = node;
    }
    else{
      this.cur.next = node;
      this.cur = node;
    }
  },
  pop:function(){
    if(this.head===null) return "error";
    let re = this.head;
    this.head = this.head.next;
    return re.value;
  },
}

//测试样本
let node6 = new LinkNode(6, null);
let node5 = new LinkNode(5, null);
let node4 = new LinkNode(4, null);
let node3 = new LinkNode(3, null);
let node2 = new LinkNode(2, null);
let node1 = new LinkNode(1, null);
//测试输出
queue.push(node1);
queue.push(node2);
queue.push(node3);
queue.push(node4);
queue.pop();
queue.pop();
queue.pop();
queue.pop();
queue.pop();
queue.push(node5);
queue.push(node6);
queue.pop();
queue.pop();

//数组的实现 -- 从链表与数组实现队列的方法可以发现 在之前实现的代码:链表与数组实现栈中出现了一处错误的
let queueArr = (max) => {
  let cur = 0;
  let head = 0;
  let size = 0;
  let maxLength = max;
  let value = [];
  return {
    push:(val)=>{
      if(size===maxLength) return "max...";
      value[cur] = val;
      cur < maxLength-1 ? cur++ : cur = 0;
      size++;
    },
    pop:()=>{
      if(size===0) return "no number...";
      let re = value[head];
      head < maxLength-1 ? head++ : head = 0;
      size--;
      return re;
    },
    getArr:()=>{
      return value;
    }
  }
}

let ququque = queueArr(5);
ququque.push(1);
ququque.push(2);
ququque.push(3);
ququque.push(4);
ququque.push(5);
console.log(ququque.pop());
console.log(ququque.pop());
console.log(ququque.pop());
console.log(ququque.pop());
console.log(ququque.pop());
ququque.push(6);
ququque.push(7);
ququque.push(8);
console.log(ququque.pop());
console.log(ququque.pop());
console.log(ququque.pop());
console.log(ququque.getArr());