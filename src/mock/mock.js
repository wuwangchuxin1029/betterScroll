import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import List  from './datas/goods'

const mock = new MockAdapter(axios)
const mockData = () => {
  mock.onGet('/api/goodsList').reply((config) => {
    return new Promise((resolve,reject) => {
        resolve([200,List])
    })
  })
}
export default mockData
