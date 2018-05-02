import * as types from '../actionType/index'

export const getAdd = (data) => {
  return {
    type: types.GET_ADD,
    cartList:data
  }
}
