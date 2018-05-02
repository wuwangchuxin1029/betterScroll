import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getGoods } from '../../store/actions/shopCart'
import List from '../../common/list'

import './content.css'

class Content extends Component {
  constructor() {
    super()
    this.state = {
      goodsList: []
    }
  }
  render() {
    const { goodsList } = this.props
    return (
      <div className="wrapper">
        <div>
        {
          goodsList && goodsList.map((item, index) => {
            return <div key={index} className="content">
              <h6>{item.title}</h6>
              <List {...item}/>
            </div>
          })
        }
        </div>
      </div>
    )
  }
  componentDidMount() {
   const { dispatch } = this.props
    axios.get('/api/goodsList')
      .then((res) => {
        const goodsList = res.data
       dispatch(getGoods(res.data))
      })
  }
}
const mapStateToProps = (state) => {
  return {
    goodsList: state.shopCart.goodsList
  }
}
export default connect(mapStateToProps)(Content)