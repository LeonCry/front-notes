// @ts-nocheck
// 按层的方式进行序列化:
const serzaByFloor = (head) => {
  let stack = [];
  let serza = [];
  stack.push(head);
  while(stack.length){
    let cur = stack.shift();
    if (!cur) {
      serza.push(cur);
      continue;
    }
    serza.push(cur.value);
    stack.push(cur.left);
    stack.push(cur.right);
  }
  return serza;
}

// 按层的方式进行反序列化:
const serzaReverse = (arr) => {
  let queue = [];
  let head = new BinaryTree(arr.shift());
  queue.push(head);
  while(queue.length){
    let cur = queue.shift();
    if(!cur) continue;
    let left = arr.shift();
    let right = arr.shift();
    if (left) left = new BinaryTree(left);
    if (right) right = new BinaryTree(right);
    queue.push(left,right);
    cur.left = left;
    cur.right = right;
  }
  return head;
}

// 创建一个二叉树
class BinaryTree{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
  set(left,right){
    this.left = left;
    this.right = right;
  }
}

let A = new BinaryTree("A");
let B = new BinaryTree("B");
let C = new BinaryTree("C");
let D = new BinaryTree("D");
let E = new BinaryTree("E");
let F = new BinaryTree("F");
let G = new BinaryTree("G");
A.left = B;
A.right = C;
B.left = D;
B.right = E;
C.left = F;
C.right = G;
const head = A;
//进行按层的序列化
let serza = serzaByFloor(head);
// console.log(serza);

//按层的方式进行反序列化
let nodes = serzaReverse(serza);
console.log(nodes);