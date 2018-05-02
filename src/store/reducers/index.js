import { combineReducers } from 'redux'
import shopCart from './shopCart'
import addCart from './addCart'

const rootReact = combineReducers({
  shopCart,
  addCart
})

export default rootReact