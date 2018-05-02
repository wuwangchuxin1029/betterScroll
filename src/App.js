import React, { Component } from 'react';
import Content from './conponents/content'
import Side from './conponents/side'
import BScroll from 'better-scroll'  //引入better-scroll
import axios from 'axios'
import { connect } from 'react-redux'

import './App.css';

const side = ["热销", '烧饼类', '汤类', '酱肉类', '进店必选', '羊棒骨', '饮料']
class App extends Component {
  constructor() {
    super()
    this.state = {
      contentScroll: null,
      sideScroll: null,
      activeIndex: 0,
      toggleShow: ''
    }
    this.toAccount = this.toAccount.bind(this)
  }

  // 点击菜单改变scroll距父容器的间距
  scChange(idx) {
    const { activeIndex } = this.state
    let heightArr = []
    //获取到所有分类内容区的dom,并将它们的offsetTop放入数组中
    let refAll = this.refs.contentWrap.querySelectorAll('.content')

    for (let i = 0; i < refAll.length; i++) {
      //  offsetTop:元素距离父元素的上边距
      heightArr.push(refAll[i].offsetTop)
    }
    //  给实例后的scroll绑定scrollTo事件，让它滚动到指定的位置。（参数：x轴、y轴、执行时长）
    this.state.contentScroll.scrollTo(0, -heightArr[idx], 1000)
    this.setState({
      activeIndex: idx
    })
  }
  // 点击去结算,控制遮罩层的显示与隐藏
  toAccount() {
    const { cartList } = this.props
    const { toggleShow, total } = this.state
    this.setState({
      toggleShow: toggleShow == '' ? 'active' : ''
    })    
  }

  render() {
    const { activeIndex, toggleShow } = this.state
    const { cartList } = this.props
    let total = 0
    cartList.length > 0 && cartList.map((item,idx) => {
       total += item.count * item.price
    })
    return (
      <div className="App">
        <header className="App-header">
          <h2>购物车</h2>
        </header>
        <div className={"mark " + toggleShow}>
          <ul className="cart-list">
            {
              cartList.length > 0 && cartList.map((item, index) => {
                return <li key={index}>
                  <span>{item.text}</span>
                  <span
                  >{item.count}</span>
                  <span>￥{item.price}</span>
                </li>
              })
            }
          </ul>
        </div>
        <section className="App-content">
          {/* 左侧 */}
          <div className="side" ref="menuSide">
            <div>
              {
                side.map((item, index) => {
                  return (
                    <p key={index}
                      onClick={() => { this.scChange(index) }}
                      className={activeIndex == index ? 'activeIndex' : ''}
                    >
                      {item}
                    </p>
                  )
                })
              }
            </div>
          </div>
          {/* 右侧 */}
          <div className="App-section" ref='contentWrap'>
            <Content />
          </div>
        </section>
        <footer className="App-foot">
          <span className="iconfont ">购物车</span>
          <span>{total}</span>
          <p onClick={this.toAccount}>去结算</p>
        </footer>
      </div>
    );
  }
  componentDidMount() {
    // 注意：此时还获取不到实例的scroll,因为实例的初始值是null
    this.setState({
      contentScroll: new BScroll('.App-section', {
        probeType: 3, //默认为0，此时不会派发scroll事件。可选值：1、2、3 在不同的过程中派发scroll事件
        click: true  //better-scroll默认会阻止原生click事件，设为true则会派发click事件
      }),
      sideScroll: new BScroll('.side', {
        probeType: 3,
        click: true
      })
    })
    setTimeout(() => {
      const { contentScroll, sideScroll } = this.state
      // 获取滚动区每块内容的高度 ,返回的是一个数组
      let contentList = this.refs.contentWrap.querySelectorAll('.content')
      let height = 0  // 第一个高度
      let htArr = []
      //把第一个高度存入数组
      htArr.push(height)
      // 遍历滚动区的每一块内容的高度，依次存入数组中
      contentList.forEach((item, idx) => {
        height += item.clientHeight
        htArr.push(height)
      })

      // 给实例绑定监听事件，（ 参数1：事件名称，参数2：probeType为3时，提供的每一个内容区块的实时高度）
      contentScroll.on('scroll', (el) => {
        // 遍历内容区高度，判断每一个内容区的高度（A）是否小于实时返回的高度(B),并且B要小于A的累加高度
        for (let i = 0; i < htArr.length; i++) {
          if (htArr[i] < -el.y && -el.y < htArr[i + 1]) {
            this.setState({
              activeIndex: i
            })
          }
        }
      })
    }, 100)
  }
}
const mapStateToProps = (state) => {
  return {
    cartList: state.addCart
  }
}
export default connect(mapStateToProps)(App);
// ,null,null,{pure:false}