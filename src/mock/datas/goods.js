import mockjs from 'mockjs'

let titleList = ["热销",'烧饼类','汤类','酱肉类','进店必选','羊棒骨','饮料']

let list = []
titleList.map((item, index) => {
  list.push(
    mockjs.mock({
      id:index,
      title:item,
      "foodList|3-5":[{
        pic:mockjs.Random.dataImage('60x60','image'),
        text:mockjs.Random.ctitle(3,5),
        count:mockjs.Random.natural(1,99),
        price:mockjs.Random.natural(1,99),
        num:1,
        id:mockjs.Random.id()
      }]

    })
  )
})
export default list

// let Mock = require("mockjs")
// let fs = require("fs")
// let {Random} =Mock
// let arr=["热销","套餐类","烧饼类","进店必买","酱肉类","凉菜类","汤类","饮料"];
// Random.extend({
//     mealType:()=>{
//         let item = Random.pick(arr)
//         let ind = arr.indexOf(item)
//         let repeat = arr.splice(ind,1)
//         console.log(repeat)
//         return item
//     }
// })


// let list = Mock.mock({
//     "success":1,
//     "info":"请求成功",
//     "code":1001,
//     "list|8":[
//         {
//             "title":()=>Random.mealType(),
//             "foodList|2-5":[
//                 {
//                     "name":()=>Random.cword(2,5),
//                     "num":()=>Random.natural(1,9999),
//                     "price":()=>Random.natural(1,99),
//                     "img":Random.image("10×10",Random.color(),"#FFF","png","!")
//                 }
//             ]
//         }
//     ]
// })
// export default list