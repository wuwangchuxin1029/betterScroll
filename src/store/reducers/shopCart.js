import * as types from '../actionType/index'

const initState = {
  goodsList:null
}
const shopCart = (state = initState, action) => {
  switch(action.type){
    case types.GET_GOODSLIST:
    return {...state,goodsList:action.goodsList}
    default :
    return state
  }
}
export default shopCart