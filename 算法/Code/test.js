//just for test 
// @ts-nocheck
//二叉树类
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
A.left = B;
A.right = C;
B = new BinaryTree("BBBB");
A.left = B;
console.log(B);
console.log(A);