<style lang="scss">
.ivu-input[disabled] {
  background-color: #fff;
}
</style>

<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="giftStore">
        <div class="shopCarBox">
          <div class="shopCarGift">
            <div class="shopCarLeft">
              <!-- <div class="shopCarNeedGoods"><img src="http://106.14.154.124:8099/images/needGoods2.png" alt="img"></div> -->
              <div class="goodsList">
                <ul class="title">
                  <li><span>价格</span> <strong><i class="top" /> <i class="bottom" /></strong></li>
                  <li><span>重量</span> <strong><i class="top" /> <i class="bottom" /></strong></li>
                  <li><span>销量</span> <strong><i class="top" /> <i class="bottom" /></strong></li>
                </ul>
                <ul class="goodsInfo">
                  <li v-for="(item) in list" :key="item.id" class="cursorStyle">
                    <div class="imgBox">
                      <img :src="item.photo" alt="商品主图">
                    </div>
                    <p :title="item.summary">{{ item.summary }} {{ item.standard }}</p>
                    <div class="bottom">
                      <div class="count"><i class="iconfont">￥</i><strong class="iconfont">{{ item.price }}</strong></div>
                      <div class="joinCarBtn"><b class="button-n" @click="addCar(item)">加入礼品包</b></div>
                    </div>
                    <div class="leftNum"><span>重量：{{ item.weight }}kg</span> <span>库存：{{ item.stock }}</span></div>
                  </li>
                  <!-- v-if="list.length % 4 >0" -->
                  <li v-for="(item, index) in 4-(list.length % 4)<0?0:4-(list.length % 4)" :key="`empty`+index" class="empty" />
                </ul>
                <div class="pager">
                  <Page :current="listQuery.page" :page-size-opts="[20, 40, 60, 80]" :page-size="listQuery.limit" :total="total" show-total show-sizer @on-page-size-change="handleSizeChange" @on-change="handleCurrentChange" />
                  <div class="toTop" @click="jumpTop">
                    <Icon type="ios-arrow-up" /> <span>TOP</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="shopCarRight">
              <div class="titles"><span>产品</span> <span>单价</span>
                <span>重量</span> <span>数量</span> <span>总价</span>
              </div>
              <ul v-if="myCarList.length >0" class="chooseList">
                <li v-for="gift of myCarList" :key="`car`+gift.id">
                  <div>
                    <img :src="gift.photo" alt="img">
                  </div>
                  <div><span>￥ {{ gift.price }}</span></div>
                  <div><span>{{ gift.weight }}kg</span></div>
                  <div class="count">
                    <Icon type="ios-remove" @click="updateSignleItemCount(gift, false)" />
                    <i-input v-model="gift.count" type="text" size="small" disabled />
                    <Icon type="ios-add" @click="updateSignleItemCount(gift, true)" />
                  </div>
                  <div><span>￥{{ gift.singleTotal }}</span></div>
                  <Icon type="ios-close-circle-outline" class="dele" @click="delSignleItem(gift)" />
                </li>
              </ul>
              <div v-else class="noCont">
                <img src="/static/emptyCar.png" alt="noCont" class="noCont">
              </div>
              <!---->
              <div class="countMoneyBox mt120">
                <p><span>商品总额：</span> <strong>￥{{ giftTotal }}</strong></p>
                <p><span>运费( <i>{{ totalWeight }}kg</i>)：</span> <strong>￥{{ totalWuLiu }}</strong></p>
                <p class="total"><span>总计：</span> <strong>￥{{ totalMoney }}</strong></p>
              </div>
              <div class="operateBtn">
                <p> <span @click="goSamplyApply">样品申请</span> <strong @click="goBuy">立即采购</strong></p>
                <!-- <div class="setCommon">设为常用礼品包</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { leftRouter } from './components'
import { goodsList } from '@/api/goods'
import numeral from 'numeral'
import statusCode from '@/common/statusCode'

export default {
  name: 'Gift',
  components: {
    leftRouter
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1' // 按钮的背景颜色 The background color of the button
      },
      myCarMap: new Map(),
      myCarList: [],
      giftTotal: '0.0',
      totalWeight: '0.0',
      totalMoney: '0.00',
      totalWuLiu: '0.0'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      goodsList(this.listQuery).then(response => {
        const resData = response.data
        if (statusCode.OK === resData.returnCode) {
          this.list = response.data.data
          this.total = response.data.total
        } else {
          this.$Message.info(resData.returnMessage)
        }
      })
    },
    goBuy() {
      this.$router.push('/control/buy')
    },
    goSamplyApply() {
      this.$Message.destroy()
      if (this.myCarList.length === 0) {
        this.$Message.info('请先选择礼品')
        return
      }
      this.$router.push({
        name: 'control/sampleApply',
        params: { goodsId: this.myCarList[0].id, totalPrice: this.totalMoney }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    addCar(item) {
      if (this.myCarMap.size > 0) {
        this.$Message.destroy()
        this.$Message.info('抱歉，目前仅支持一个礼品加入采购车')
        return
      }
      this.myCarList = []
      const itemId = item.id
      const count = 1
      if (this.myCarMap.has(itemId)) {
        const cureentItem = this.myCarMap.get(itemId)
        cureentItem.count++
        cureentItem.singleTotal = numeral(
          parseFloat(cureentItem.singleTotal) + cureentItem.price
        ).format('0.00')
        this.myCarMap.set(itemId, cureentItem)
      } else {
        item.count = count
        item.singleTotal = numeral(item.price).format('0.00')
        this.myCarMap.set(itemId, item)
      }
      for (const myItem of this.myCarMap.values()) {
        this.myCarList.push(myItem)
      }
      const totalWeightF = parseFloat(this.totalWeight) + item.weight
      this.totalWeight = numeral(totalWeightF).format('0.00')
      const giftTotalF = parseFloat(this.giftTotal) + item.price
      this.giftTotal = numeral(giftTotalF).format('0.00')
      const wuLiuPriceF = this.calculation(totalWeightF)
      this.totalWuLiu = numeral(wuLiuPriceF).format('0.00')
      this.totalMoney = numeral(wuLiuPriceF + giftTotalF).format('0.00')
    },
    removeCar(item, isDel) {
      this.myCarList = []
      const itemId = item.id
      const cureentItem = this.myCarMap.get(itemId)
      if (isDel) {
        for (let i = 0; i < cureentItem.count; i++) {
          const totalWeightF = parseFloat(this.totalWeight) - item.weight
          this.totalWeight = numeral(totalWeightF).format('0.00')
          const giftTotalF = parseFloat(this.giftTotal) - item.price
          this.giftTotal = numeral(giftTotalF).format('0.00')
          const wuLiuPriceF = this.calculation(totalWeightF)
          this.totalWuLiu = numeral(wuLiuPriceF).format('0.00')
          this.totalMoney = numeral(wuLiuPriceF + giftTotalF).format('0.00')
        }
        this.myCarMap.delete(itemId)
      } else {
        if (cureentItem.count > 1) {
          cureentItem.count--
          cureentItem.singleTotal = numeral(
            parseFloat(cureentItem.singleTotal) - cureentItem.price
          ).format('0.00')
          this.myCarMap.set(itemId, cureentItem)
        } else {
          this.myCarMap.delete(itemId)
        }
        const totalWeightF = parseFloat(this.totalWeight) - item.weight
        this.totalWeight = numeral(totalWeightF).format('0.00')
        const giftTotalF = parseFloat(this.giftTotal) - item.price
        this.giftTotal = numeral(giftTotalF).format('0.00')
        const wuLiuPriceF = this.calculation(totalWeightF)
        this.totalWuLiu = numeral(wuLiuPriceF).format('0.00')
        this.totalMoney = numeral(wuLiuPriceF + giftTotalF).format('0.00')
      }

      for (const myItem of this.myCarMap.values()) {
        this.myCarList.push(myItem)
      }
    },
    jumpTop() {
      const shopCarLeft = document.getElementsByClassName('shopCarLeft')
      const element = shopCarLeft[0]
      const shudu = 100
      // 返回顶部动画特效
      setTimeout(function animation() {
        if (element.scrollTop > 0) {
          setTimeout(() => {
            // 步进速度
            element.scrollTop = element.scrollTop - 200

            // 返回顶部
            if (document.documentElement.scrollTop > 0) {
              document.documentElement.scrollTop = element.scrollTop - 200
            } else if (window.pageYOffset > 0) {
              window.pageYOffset = element.scrollTop - 200
            } else if (document.body.scrollTop > 0) {
              document.body.scrollTop = element.scrollTop - 200
            } else if (document.querySelector('.shopCarLeft').scrollTop) {
              document.querySelector('.shopCarLeft').scrollTop =
                element.scrollTop - 200
            }
            animation()
          }, shudu)
        }
      }, shudu)
    },
    calculation(weight) {
      const logisticObjStore = this.$store.getters.express
      const logisticStr = JSON.stringify(logisticObjStore)
      const logisticObj = JSON.parse(logisticStr)
      let wuLiuPrice = 0.0
      if (weight <= 0) {
        return wuLiuPrice
      } else if (weight <= logisticObj.firstWeight) {
        wuLiuPrice = logisticObj.firstPrice
      } else if (weight <= logisticObj.middleWeight) {
        wuLiuPrice = logisticObj.middlePrice
      } else {
        const weightStr = weight + ''
        const splitWeight = weightStr.split('.')
        let zhengshu = splitWeight[0]
        const xiaoshu = splitWeight[1]
        if (parseInt(zhengshu) > 1) {
          zhengshu -= 1
          wuLiuPrice += logisticObj.middlePrice
          wuLiuPrice += zhengshu * logisticObj.endPrice
        } else {
          wuLiuPrice += logisticObj.middlePrice
        }
        if (parseInt(xiaoshu) > 0) {
          wuLiuPrice += logisticObj.endPrice
        }
      }
      return wuLiuPrice
    },
    updateSignleItemCount(obj, flag) {
      this.$Message.destroy()
      this.$Message.info('抱歉，目前仅支持一件礼品加入采购车')
      // return
      // if (flag) {
      //   this.addCar(obj)
      // } else {
      //   this.removeCar(obj, false)
      // }
    },
    delSignleItem(obj) {
      this.removeCar(obj, true)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.shopCarGift {
  width: 100%;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  transition: all 0.3s;
}

.shopCarGift .shopCarLeft {
  -ms-flex: 1;
  flex: 1;
  overflow: auto;
  padding-right: 5px;
}

.shopCarGift .shopCarLeft .shopCarNeedGoods {
  margin-bottom: 10px;
}

.shopCarGift .shopCarLeft .shopCarNeedGoods img {
  width: 100%;
}

.shopCarGift .shopCarLeft .goodsList .title {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  font-size: 14px;
  line-height: 38px;
  color: #444;
  background: #eee;
  margin-bottom: 30px;
}

.shopCarGift .shopCarLeft .goodsList .title strong {
  position: relative;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  width: 20px;
  height: 34px;
  text-align: center;
  vertical-align: middle;
}

.shopCarGift .shopCarLeft .goodsList .title strong i {
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-bottom-color: #909399;
  transition: all 0.2s;
}

.shopCarGift .shopCarLeft .goodsList .title strong .top {
  top: 5px;
}

.shopCarGift .shopCarLeft .goodsList .title strong .bottom {
  bottom: 5px;
  transform: rotate(180deg);
}

.shopCarGift .shopCarLeft .goodsList .title strong .active {
  border-bottom-color: #d01126;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo .empty {
  border: none;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li {
  width: 200px;
  border: 1px solid #f1f1f1;
  margin-bottom: 40px;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .imgBox {
  height: 200px;
  line-height: 200px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 10px;
  background: #f4f4f4;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .imgBox img {
  width: 100%;
  height: 100%;
  max-height: 100%;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li p {
  font-size: 12px;
  line-height: 18px;
  color: #666;
  text-overflow: ellipsis;
  height: 36px;
  overflow: hidden;
  display: flex;
  -webkit-line-clamp: 2;
  padding: 0 8px;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom {
  height: 36px;
  line-height: 36px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 8px 8px;
  margin-top: 8px;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .count i {
  font-size: 12px;
  line-height: 18px;
  color: #d01126;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .count strong {
  font-family: dina;
  font-size: 22px;
  line-height: 26px;
  color: #d01126;
  font-weight: 700;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .joinCarBtn b {
  margin: 0;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .joinCar {
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  background: #d01126;
  cursor: pointer;
  text-align: center;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .joinCar i {
  display: inline-block;
  width: 20px;
  height: 18px;
  vertical-align: middle;
  background: url(http://106.14.154.124:8099/images/购物.png) no-repeat;
  background-size: 100% 100%;
}

.shopCarGift .shopCarLeft .goodsList .goodsInfo li .leftNum {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 12px;
  line-height: 16px;
  color: #999;
  padding: 0 8px 8px;
}

.shopCarGift .shopCarLeft .goodsList .pager {
  text-align: center;
  position: relative;
}

.shopCarGift .shopCarLeft .goodsList .pager .toTop {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto 0;
  width: 50px;
  height: 50px;
  background: #d01126;
  color: #fff;
  cursor: pointer;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

.shopCarGift .shopCarLeft .goodsList .pager .toTop i {
  font-size: 30px;
  line-height: 30px;
  font-weight: 700;
}

.shopCarGift .shopCarLeft .goodsList .pager .toTop span {
  font-size: 14px;
  line-height: 20px;
}

.shopCarGift .shopCarRight {
  width: 310px;
  -ms-flex-item-align: start;
  align-self: flex-start;
  margin-left: 10px;
  border: 1px solid #d2d2d2;
  background: #fafafa;
  padding-bottom: 10px;
}

.shopCarGift .shopCarRight .titles {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.shopCarGift .shopCarRight .titles span {
  font-size: 12px;
  line-height: 30px;
  color: #666;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}

.shopCarGift .shopCarRight .chooseList {
  max-height: 450px;
  overflow: auto;
}

.shopCarGift .shopCarRight .chooseList li {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  height: 80px;
  margin-bottom: 5px;
  background: #fff;
  position: relative;
}

.shopCarGift .shopCarRight .chooseList li > div {
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}

.shopCarGift .shopCarRight .chooseList li img {
  width: 30px;
  height: 30px;
}

.shopCarGift .shopCarRight .chooseList li .noCont {
  width: 200px;
  height: 200px;
}

.shopCarGift .shopCarRight .chooseList li span {
  font-size: 12px;
  line-height: 18px;
  color: #666;
}

.shopCarGift .shopCarRight .chooseList li .count {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
}

.shopCarGift .shopCarRight .chooseList li .count i {
  font-size: 14px;
  line-height: 18px;
  color: #aaa;
  cursor: pointer;
}

.shopCarGift .shopCarRight .chooseList li .count input {
  width: 30px;
  outline: none;
  text-align: center;
  border: none;
}

.shopCarGift .shopCarRight .chooseList li .dele {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 14px;
  line-height: 18px;
  color: #ccc;
  cursor: pointer;
}

.shopCarGift .shopCarRight .noCont {
  text-align: center;
  margin: 20px 0;
  padding: 0;
}

.shopCarGift .shopCarRight .mt120 {
  margin-top: 5px;
}

.shopCarGift .shopCarRight .countMoneyBox {
  padding: 16px;
  border-top: 1px solid #e9e9e9;
}

.shopCarGift .shopCarRight .countMoneyBox p {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-bottom: 7px;
}

.shopCarGift .shopCarRight .countMoneyBox p span {
  text-align: right;
}

.shopCarGift .shopCarRight .countMoneyBox p span i {
  color: #d01126;
}

.shopCarGift .shopCarRight .countMoneyBox p strong {
  text-align: right;
  color: #d01126;
  font-weight: 700;
}

.shopCarGift .shopCarRight .countMoneyBox .total {
  font-size: 20px;
}

.shopCarGift .shopCarRight .operateBtn {
  padding: 0 20px;
}

.shopCarGift .shopCarRight .operateBtn p {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.shopCarGift .shopCarRight .operateBtn p > span,
.shopCarGift .shopCarRight .operateBtn p > strong {
  -ms-flex: 1;
  flex: 1;
  font-size: 18px;
  line-height: 48px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.shopCarGift .shopCarRight .operateBtn p > span {
  background: #d38d1f;
}

.shopCarGift .shopCarRight .operateBtn p > strong {
  background: #d01126;
}

.shopCarGift .shopCarRight .operateBtn .setCommon {
  font-size: 15px;
  line-height: 20px;
  color: #d01126;
  margin-top: 5px;
  text-align: right;
  cursor: pointer;
}
.cursorStyle {
  cursor: pointer;
}
</style>
