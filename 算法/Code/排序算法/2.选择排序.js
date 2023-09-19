// 算法描述:[因为在每次遍历中都要选择一个最大最小元素,所以叫选择排序.]
// 首先在未排序序列中循环遍历找到最小（大）元素，将其与遍历起始位置[0]进行交换;
// 然后,再次对剩余元素进行遍历,找到最小（大）元素，将其与当前遍历起始位置[1]进行交换;
// 以此类推，直到所有元素均排序完毕。

// 实现
// @ts-nocheck
const selectionSort = (arr) => {
  //第一层遍历,每一次遍历都能找到数组中最小的一个数
  for (let i = 0; i < arr.length; i++) {
    //保存最小值的index,这里要用i,因为此时找到的最小的值已经是i了
    let minIndex = i;
    //第二层遍历,用来找数组中最小的一个数,从i开始是因为没次遍历完都已经找到了最小值并放在了最前面
    for (let j = i; j < arr.length; j++) {
      if (arr[j]<arr[minIndex]) {
        minIndex = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}



const arr = [25,14,21,9,30,18,6,0,12,15,27,6,10,33];
console.log(selectionSort(arr));

//算法分析:最佳情况：T(n) = O(n2) 最差情况：T(n) = O(n2) 平均情况：T(n) = O(n2)