//算法描述:[基数排序就是我之前学的时候认为的桶排序]
//就是先分成10个桶,分别为0,1,2,3,4,5,6,7,8,9...
//然后先取得数组中最大的数,并取得位数,然后从最低位开始分别将数据push到桶里面去
//所有数据push完之后,再从所有的桶里面,将所有数据shift出来
//然后再根据十位..百位..千位...直到最高位重复

//实现
// @ts-nocheck
const RadixSort = (arr) => {
  //最大值
  const max = Math.max(...arr);
  //最高位
  const len = max.toString().length;
  //设置一个桶
  let radix = Array.from({length:10}).map(()=>[]);
//对每个位数进行遍历
for (let l = len-1; l >=0 ; l--) {
  //对数组的每一个元素进行遍历
  for (let i = 0; i < arr.length; i++) {
    //从最低位取元素的值
    let index = arr[i].toString().padStart(len,"0")[l];
    //放入桶里
    
    radix[index].push(arr[i]);
  }
  arr = [];
  //再顺序取出
  for (let j = 0; j < 10; j++) {
    while (radix[j].length) {
      arr.push(radix[j].shift());
    }
  }
}
return arr;
}

const arr = [2,25,14,21,9,30,18,6,0,12,15,27,6,10,33];
console.log(RadixSort(arr));