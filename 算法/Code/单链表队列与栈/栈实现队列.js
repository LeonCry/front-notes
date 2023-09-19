//什么叫栈实现队列?
//栈实现队列是给你一个栈的黑盒,你只能用栈有关的属性和方法来实现队列的结果.
//做法:
//可以再声明一个数组Arr,在向栈内放数据的时候正常放,出的时候,将栈内的数据根据栈的方法放入到声明的数组Arr内,然后再Arr内推出即可.
//只有当Arr中的所有数据推出之后,才能再将栈中的数据放入到Arr中.
// @ts-nocheck
const stacks = () => {
  let arr = [];
  return {
    pop:() => {
      return arr.pop();
    },
    push:(val) => {
      arr.push(val);
    },
    getArr:() => {
      return arr;
    }
  }
}

const queues = (sta) => {
  let arr = [];
  return {
    pop:() => {
      if (arr.length) return arr.pop();
      //注意点:length需要提前取并保存,因为每次进行pop之后,其length会改变.
      let length = sta.getArr().length;
      for (let i = 0; i < length; i++) {
        arr.push(sta.pop());
      }
      return arr.pop();
    },
    push:(val) => {
      sta.push(val);
    },
    getArr:() => {
      return arr;
    },
    getFromArr:() => {
      return sta.getArr();
    }
  }
}


let sta = stacks();
let que = queues(sta);

sta.push(1);
sta.push(2);
sta.push(3);
sta.push(4);
sta.push(5);
que.push(5);
que.push(6);
que.push(7);
console.log(que.pop());