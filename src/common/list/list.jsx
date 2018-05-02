import React, { Component } from 'react'
import Item from '../../common/Item'
import './list.css'

class List extends Component {
  constructor() {
    super()
  }
  render() {
    const { foodList } = this.props
    return (
      foodList.map((list,ind) => {
        return <Item item={list} key={ind}/>
      })
    )
  }
}
export default List