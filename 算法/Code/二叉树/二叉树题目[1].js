//题目描述:给定一个多叉树,请设计一个方法,将多叉树转换为二叉树,转换方法具体为:
//有一节点A,A有三个子节点,转换之后应该为A的第一个子节点应该为A的左子节点B,其他子节点应该为B的右子节点向下顺延..同理B的子节点也一样
// @ts-nocheck
//设计
//将多叉树转换为二叉树的方法,这种情况的话就应该用后序遍历.对于二叉树而言是左右中,但是对于多叉树而言,就是所有子节点中
const mutilToBinary = (head) => {
  if (!head.next.length) {
    return;
  }
  //这是后序遍历,进行后序遍历的话,会更简单一点,因为如果从前面开始遍历的话,后面子节点该如何操作将复杂度大大增加. 
  head.next.forEach(item => {
    mutilToBinary(item);
  });
  //后序遍历完成之后,从最后一个节点开始,取出节点的next数组中第一个作为左子节点,剩下的将作为左子结点的右子节点挂载.
  let left = head.next[0];
  let rights = head.next.slice(1);
  head.left = left;
  //清空是为了方便二叉树转多叉树的时候
  head.next = [];
  let cur = head.left;
  while (rights.length) {
    cur.right = rights.shift();
    cur = cur.right;
  }
}
//将二叉树转换为多叉树的方法,由于这道题的特殊性,二叉树的性质已经确定,所以可以一直左子树的往下遍历即可.
const binaryToMutil = (head) => {
  while(head.left){
    head.next.push(head.left);
    let left = head.left;
    let right = left.right;
    while (right){
      head.next.push(right);
      right = right.right;
    }
    left.right = null;
    head = head.left;
  }
}


//多叉树类
class MutilTree{
  constructor(value){
    this.value = value;
    this.next = [];
    this.left = null;
    this.right = null;
  }
  set(node){
    this.next.push(node);
  }
  init(nodes){
    this.next = nodes;
  }
}
//初始化题目
let A = new MutilTree("A");
let B = new MutilTree("B");
let C = new MutilTree("C");
let D = new MutilTree("D");
let E = new MutilTree("E");
let F = new MutilTree("F");
let G = new MutilTree("G");
let H = new MutilTree("H");
let I = new MutilTree("I");
A.init([C,B,D]);
C.init([E,F]);
let head = A;
mutilToBinary(head);
binaryToMutil(head);