// @ts-nocheck
//这是先序遍历的非递归方法:
const preOrders = (head) => {
  let saveNode = [];
  saveNode.push(head);
  while(saveNode.length){
    let cur = saveNode.pop();
    console.log(cur.value);
    if(cur.right) saveNode.push(cur.right);
    if(cur.left) saveNode.push(cur.left);
  }
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


//进行序列化--前序遍历的方式进行序列化
//前序遍历
const preOrder = (head,saveArr) => {
  if (!head) {
    saveArr.push(head);
    return;
  }
  saveArr.push(head.value);
  preOrder(head.left,saveArr);
  preOrder(head.right,saveArr);
}
//前序遍历序列化
const serialization = (head) => {
  let saveArr = [];
  preOrder(head,saveArr);
  return saveArr;
}
const res = serialization(head);
// console.log(res); //序列化完毕

//进行反序列化--前序遍历的方式进行反序列化
const serializationReverse = (arr) => {
  let head = new BinaryTree(arr.shift());
  if (!arr.length||!head) {
    return null;
  }
  head.left = serializationReverse(arr);
  head.right = serializationReverse(arr);
  return head;
}

let node = serializationReverse(res);
preOrders(node);