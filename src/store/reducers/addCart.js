import * as types from '../actionType/index'

const initStall = {
  cartList: []
}
const addCart = (state = initStall, action) => {
  let data = action.cartList
  let cartData = [...state]  //复制数组
  let flag = false
  if(action.type == types.GET_ADD){
    // 遍历复制后的数组，判断添加的是否是同一商品，如果是同一商品，只改变商品数量
    // 如果商品不同的话，将商品添加到数据中（这一步骤不用在遍历中操作）
    cartData.forEach((item,idx) => {
      if(item.text == data.text){
        flag = true
        item.count = data.count
      }
    })
    if(!flag){
      return [...state,action.cartList]
    }else{
     return  cartData
    }
  }
  return state
}

export default addCart