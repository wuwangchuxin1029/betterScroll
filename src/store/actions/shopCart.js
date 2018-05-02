import * as types from '../actionType/index'

export const getGoods = (data) => {
  return {
    type: types.GET_GOODSLIST,
    goodsList:data
  }
}

