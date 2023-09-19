//题目描述 Trie:
// 请你实现 Trie 类：
// 1. Trie() 初始化前缀树对象。
// 2. void insert(String word) 向前缀树中插入字符串 word 。
// 3. boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
// 4. Number startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 number ；否则，返回 0 。

//如何实现?
//前缀树实际上是一个单链表(错,是多输出节点链表),在链表中next连接着下一个节点,有一个头节点head,
//每个节点中都有属性p:代表pass 通过了几次,e:代表字符串在此节点结束的次数
//在表示前缀树时其实有两种方法:由于是一个多输出链表,所以表示的时候,一种是用数组来表示,一种是用map进行表示

//实现
class Trie {
  constructor(){
    this.pass = 0;
    this.end = 0;
    //此处采用数组来表示
    this.next = [];
  }
  //插入方法
  insert(str){
    let head = this;
    for (let i = 0; i < str.length; i++) {
      //ASCII差值表示
      let n = str.charCodeAt(i) - 'a'.charCodeAt(0);
      //如果当前节点的下一个节点没有值,则新建一个节点
      if (!head.next[n]) head.next[n] = new Trie();
        head = head.next[n];
        head.pass++;
        i===str.length-1?head.end++:null;
    }
  }
  //查询字符串方法
  search(str){
    let head = this;
    for (let i = 0; i < str.length; i++) {
      let n = str.charCodeAt(i) - 'a'.charCodeAt(0);
      if (!head.next[n]) return false;
        head = head.next[n];
        if(i===str.length-1&&head.end!=0){
          return true;
        }
    }
    }
    //查询以前缀的单词个数
    startsWith(str){
    let head = this;
    for (let i = 0; i < str.length; i++) {
      let n = str.charCodeAt(i) - 'a'.charCodeAt(0);
      if (!head.next[n]) return head.pass;
        head = head.next[n];
        if(i===str.length-1&&head.end!=0){
          return head.pass;
        }
    }
    }
  }

let head = new Trie();
head.insert("abc");
head.insert("abcd");
head.insert("abcde");
head.insert("abcef");
console.log(head.search("abc"));
console.log(head.startsWith("abc"));
// console.log(head.search("abc"));
