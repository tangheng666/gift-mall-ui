import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 39

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'http://baoyitech.oss-cn-hangzhou.aliyuncs.com/1539223496792a77ee51a34b51ca4d653aae33db0a355'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    price: '@float(1, 15, 2, 2)',
    title: '@title(5, 10)',
    goods_desc: '薰香薰衣草浓缩洗衣液250g装 第@increment个',
    content: baseContent,
    weight: '@float(0, 1, 2, 2)',
    inventory: '@integer(1000, 5000)',
    image_uri
  }))
}

export default {
  getList: config => {
    const { page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }

}
