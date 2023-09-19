// 算法描述:[先分,再合,先归,再并,所以叫归并排序]
// 归并排序是一种递归排序,归并排序的具体算法思路为:
// 分解:
// 首先将整个数组进行分,递归的向下分,每次递归都分成左右两个子数组->
// 然后再对左右两个子数组进行递归的分成左右两个子数组,直到分到左右两个子数组每个数组只有一个元素
// 完成分解部分后就开始合并部分
// 合并:
// 合并的话从底向上的进行合并,也就是从分成的最后两个子数组,即每个子数组都只有一个元素的开始合并,合并的具体过程为:
// 对这两个子数组开始从左向右进行遍历,并且分别比较左右两个数组当前索引下值的大小,并放入一个新数组:
// 例如:左子数组第一个数比右子数组的第一个数大,那么新数组就push(右子数组的数),然后右数组下标+1,再比较左子数组当前下标与右子数组的大小,再push
// 直到左右两个子数组中其中一个子数组遍历到头,所有的元素都已经push完毕,此时再将领一个子数组所有数挨个push到新数组中(这很保险,因为子数组也是经过排序好了的)
// 新数组组件完毕后,再根据当前递归时的left right索引对原数组进行赋值.
// 递归完毕时,算法执行完毕.

// 实现:主函数
// @ts-nocheck
const divideAndMergeSort = (arr) => {
  let left = 0;
  let right = arr.length - 1;
  //进行彻底的分解
  divide(arr,left,right);
  return arr;
}

//分解函数
const divide = (arr,left,right) => {
  //left<right说明还有分解的空间,如果left>=right了,说明已经分解到头了,不能再分解了
  if (left<right) {
    //取当前分解下的中间值,准备再次进行分解
    let mid = Math.floor((left+right)/2);
    //继续向左进行分解
    divide(arr,left,mid);
    //继续向右分解
    divide(arr,mid+1,right);
    //分解到最后,合并
    merge(arr,left,right);
  }
}

//合并函数
const merge = (arr,left,right) => {
  //这个temp就是上述的新数组
  let temp = [];
  //取中间的值,为的是将左右子数组分隔开,好进行合并
  let mid = Math.floor((left+right)/2);
  //用来在左子数组遍历的索引
  let l = left;
  //用来在右子数组遍历的索引
  let r = mid+1;
  //这个while是用来进行比较左右子数组,看左右子数组在l r索引下,哪个元素小,就先放到新数组里面,然后索引++,再次比较,再次放到新数组里面.
  while(l<=mid&&r<=right){
    if (arr[l]<=arr[r]) {
      temp.push(arr[l]);
      l++;
    }
    else{
      temp.push(arr[r]);
      r++;
    }
  }
  //上述while条件结束后,必定剩下一个子数组没有遍历完.这两个for循环其实是需要加一个判断条件的,其实不加也可以.
  //这两个for循环就是将剩下的元素子元素放到新数组里面
  for (let i = l; i <= mid; i++) {
    temp.push(arr[i]);
  }
  for (let i = r; i <= right; i++) {
    temp.push(arr[i]);
  }
  //这里就是用新数组排序好的值替代原数组中的值
  for (let i = left; i <= right; i++) {
    arr[i] = temp.shift();
  }
}



const arr = [25,14,21,9,30,18,6,0,12,15,27,6,10,33];
console.log(divideAndMergeSort(arr));