// @ts-nocheck
//这是先序遍历的非递归方法:
const preOrder = (head) => {
  let saveNode = [];
  saveNode.push(head);
  while(saveNode.length){
    let cur = saveNode.pop();
    console.log(cur.value);
    if(cur.right) saveNode.push(cur.right);
    if(cur.left) saveNode.push(cur.left);
  }
}
//这是中序遍历的非递归方法:
const midOrder = (head) => {
  let saveNode = [];
  saveNode.push(head);
  while(saveNode.length){
  while(head.left){
    saveNode.push(head.left);
    head = head.left;
  }
  head = saveNode.pop();
  console.log(head.value);
  if (head.right) {
    saveNode.push(head.right);
    head = head.right;
  }
}
}
//这是后序遍历的非递归方法:
const afterOrder = (head) => {
  let saveNode = [];
  let savePrint = [];
  saveNode.push(head);
  while(saveNode.length){
    let cur = saveNode.pop();
    savePrint.push(cur.value);
    if(cur.left) saveNode.push(cur.left);
    if(cur.right) saveNode.push(cur.right);
  }
  while(savePrint.length){
    console.log(savePrint.pop());
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


//前序遍历
let head = A;
// preOrder(head);
// afterOrder(head);
midOrder(head);
