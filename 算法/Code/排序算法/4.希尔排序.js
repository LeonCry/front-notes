// 算法描述:[为什么叫希尔排序,因为发明这个排序的人叫希尔.希尔排序又叫缩小增量排序]
// 希尔排序也是一种插入排序,又被称为缩小增量排序,该算法主要特点在于增量 增量缩小 gap
// 该算法先将整个待排序的数组按增量分为若干个子数组:第一次的增量gap=length/2
// 这个数组怎么分呢,例如gap = 5,则是数组下标1,6,11,16...的为一组,然后对每一个数组进行插入排序
// 然后缩小增量,gap = gap/2,继续将分完的数组进行插入排序,直到gap=0为止
// 

// 实现
// @ts-nocheck
const ShellSort = (arr) => {
  let length = arr.length;
  //初始增量
  let gap = Math.floor(length / 2);
  //初始每个数组大小
  let size = 2;
  while(gap > 0){
    //每一个子数组
    for (let i = 0; i < gap; i++) {
      //对每一个子数组内部进行遍历,j从1开始,因为插入排序的第0个数是默认排好了的,不需要在进行操作了.
      for (let j = 1; j < size; j++) {
        //子数组内部的当前下标index=第i个子数组+内部第j个数*步长gap
        let innerIndex = i + j*gap;
        //当前值
        let currValue = arr[innerIndex];
        //接下来就是像插入排序一样一个一个的向前找,searchIndex就是在子数组中向前找的索引
        let searchIndex = innerIndex;
        //innerIndex!=i的意思是当前的索引如果不是这个子数组的第一个数索引
        while(searchIndex!=i){
          //这相当于在子数组中向前查找一个
          searchIndex -= gap;
          //如果当前值比searchIndex下比较的值还要小,就继续往前找
          if (currValue < arr[searchIndex]) {
            arr[searchIndex+gap] = arr[searchIndex];
            arr[searchIndex] = currValue;
            continue;
          }
          //如果当前值比searchIndex下要比较的值大,则说明已经找到了正确位置,则直接结束当前循环
          else{
            break;
          }
        }
      }
    }
    //进一步缩小增量
    gap = Math.floor(gap / 2);
    size = length / gap;
  }
  return arr;
}



const arr = [25,14,21,9,30,18,6,0,12,15,27,6,10,33,23];
console.log(ShellSort(arr));