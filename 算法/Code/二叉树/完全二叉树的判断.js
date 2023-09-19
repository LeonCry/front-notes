//题目详情:判断一颗二叉树是不是完全二叉树.
// @ts-nocheck
const isWonTree = (head) => {
  //先按层遍历
  let queue = [];
  //用来判断第一次遇到子节点不全的情况,后续节点遍历都必须是叶子结点.
  let isLast = false;
  queue.unshift(head);
  while (queue.length) {
    let cur = queue.shift();
    //不是last情况的时候
    if (!isLast) {
      //左右节点都存在的情况下
      if (cur.left && cur.right) {
        queue.unshift(cur.left);
        queue.unshift(cur.right);
      }
      //只有右节点,没有左节点,则不是完全二叉树
      if (!cur.left && cur.right) return false;

      //只有左节点,没有右节点,则后续的节点必须是叶子节点
      if (cur.left && !cur.right) {
        isLast = true;
      }
    }
    //是last的时候的情况
    else{
      //但凡有一个不是叶子节点,则直接false
      if (cur.left || cur.right) {
        return false;
      }
    }
  }
  return true;
};

//创建一个二叉树
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  set(left, right) {
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
console.log(isWonTree(head));
