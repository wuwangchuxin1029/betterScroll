import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAdd } from '../../store/actions/addCart'
import './Item.css'

class Item extends Component{
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  countChange(type) {
    let { count } = this.state
    const { addGoods } = this.props
    this.setState({
      count: type == '+' ? ++count : --count
    }),
    // 调用addGoods方法，将添加的商品id,数量等传递给action
   addGoods({
      text:this.props.item.text,
      count: count,
      price:this.props.item.price
   })

  }

  render () {
    const { item } = this.props
    const { count } = this.state
    return (
      <dl>
        <dt><img src={item.pic} alt="" /></dt>
        <dd>
          <p>{item.text}</p>
          <div className="counts">
            <p>￥：{item.price}</p>
            <p>
              {count > 0 ? <span onClick={() => { this.countChange('-') }}>-</span> : ''}
              {count > 0 ? <b>{count}</b> : ''}
              <span onClick={() => { this.countChange('+') }}>+</span>
            </p>
          </div>
        </dd> 
      </dl>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addGoods: (data) => {
      dispatch(getAdd(data))
    }
  }
}
export default connect(null,mapDispatchToProps)(Item)