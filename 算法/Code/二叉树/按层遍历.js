// @ts-nocheck
// 实现按层遍历
const orderedByFloor = (head) => {
  let queue = [];
  queue.push(head);
  while(queue.length){
    head = queue.shift();
    console.log(head.value);
    if (head.left) queue.push(head.left);
    if (head.right) queue.push(head.right);
  }
}

//创建一个二叉树
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
orderedByFloor(head);