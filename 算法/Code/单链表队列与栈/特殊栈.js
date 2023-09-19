// @ts-nocheck
//实现一个特殊栈,在基本功能的基础上,实现返回栈中最小元素的功能,pop,push,getmin的时间操作复杂度都为O(1)
const specialStack = (maxSize) => {
  let head = 0;
  let size = 0;
  let value = [];
  let minArr = [];
  return {
    push:(val)=>{
      if (size===maxSize) return "max..."
      value[head] = val;
      minArr[head-1]?minArr[head] = minArr[head-1]:minArr[head] = val;
      minArr[head-1]<val?minArr[head] = minArr[head-1]:minArr[head] = val;
      head++;
      size++;
    },
    pop:()=>{
      if (size===0) return "no number..";
      let re = value[head-1];
      head--;
      size--;
      return re;
    },
    getMin:()=>{
      return minArr[head];
    } 
  }
}


const stack = specialStack(5);
stack.push(3);
stack.push(2);
stack.push(1);
stack.push(4);
console.log(stack.pop());
console.log(stack.getMin());
console.log(stack.pop());
console.log(stack.getMin());
console.log(stack.pop());
console.log(stack.getMin());
console.log(stack.pop());
console.log(stack.getMin());