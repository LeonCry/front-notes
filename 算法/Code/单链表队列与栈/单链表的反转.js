// @ts-nocheck
//实现单链表
class LinkNode {
  constructor(value, node) {
    this.value = value;
    this.next = node;
  }
}
//测试样本
let node6 = new LinkNode(6, null);
let node5 = new LinkNode(5, node6);
let node4 = new LinkNode(4, node5);
let node3 = new LinkNode(3, node4);
let node2 = new LinkNode(2, node3);
let node1 = new LinkNode(1, node2);

//默认输出
let head = node1;
while (head != null) {
  console.log(head.value);
  head = head.next;
}

//实现单链表的反转
head = node1;
let pre = null;
let after = null;
while (head != null) {
  after = head.next;
  head.next = pre;
  pre = head;
  head = after;
}
//单链表反转输出
head = node6;
while (head != null) {
  console.log(head.value);
  head = head.next;
}
