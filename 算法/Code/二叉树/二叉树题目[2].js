// @ts-nocheck
//题目描述:求二叉树的最宽的层为多宽
//这道题其实就是先用二叉树的层遍历,遍历的时候要对每一层的宽度进行记录,然后进行比较

// 实现按层遍历
const orderedByFloor = (head) => {
  let queue = [];
  //去一个变量记录当前的下一层一共会有多少个,比如4个,那么在下一层层遍历的时候,每遍历到一个节点4--
  //当4=>0的时候就说明这一层遍历完了,该下一层了.由此循环可得层最大的数
  let preMax = 1;
  let aftMax = 0;
  //这是全局max
  let allMax = 1;
  queue.push(head);
  while(queue.length){
    head = queue.shift();
    //当前层节点遍历完了,开始下一层节点
    if(!preMax){
      preMax = aftMax;
      allMax = allMax < aftMax ? aftMax : allMax;
      aftMax = 0;
    }
    preMax--;
    if (head.left) {queue.push(head.left);aftMax++;};
    if (head.right) {queue.push(head.right);aftMax++;};
  }
  return allMax;
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