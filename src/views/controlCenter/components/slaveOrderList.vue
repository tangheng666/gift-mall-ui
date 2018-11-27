<template>
  <div class="orderMangerDetail">
    <div class="orderDetail">
      <RadioGroup v-model="searchForm.state" type="button" size="large" @on-change="stateChange">
        <Radio label="">所有订单</Radio>
        <Radio label="CREATED">待付款</Radio>
        <Radio label="PAYED">待发货</Radio>
        <Radio label="EXPRESSED">已发货</Radio>
        <Radio label="REFUND">待退款</Radio>
        <Radio label="REFUNDED">已退款</Radio>
        <Radio label="FINISHED">已完成</Radio>
      </RadioGroup>
      <div class="links" />
      <div class="cont">
        <div v-for="orderItem of showOrderList" :key="orderItem.id" class="tables">
          <div class="title"><span>第三方订单号：{{ orderItem.orderNo }}</span> <span>{{ orderItem.dateCreated }}</span>
            <span class="status">{{ getState(orderItem.state) }}</span>
          </div>
          <ul class="goodsInfo">
            <li class="detail">
              <div class="item">
                <img :src="orderItem.photo" alt="商品标题" class="goodsImg">
                <div class="info">
                  <h6 />
                  <p><span>单价：{{ orderItem.price }}元</span> <span>重量：{{ orderItem.weight }}kg</span> <span>数量：{{ orderItem.number }}</span></p>
                </div>
              </div>
            </li>
            <li class="address">
              <span><em>收件人：</em> <strong>{{ orderItem.person }}</strong></span>
              <span><em>手机号：</em> <strong>{{ orderItem.mobile }}</strong></span>
              <span><em>地 址：</em> <strong>{{ orderItem.address }}</strong></span>
              <span><em>备注：</em> <strong>{{ orderItem.note }}</strong></span>
            </li>
            <li class="price">
              <span>总价(元)</span>
              <strong>￥{{ orderItem.totalPrice }}</strong>
              <em>
                总价=商品价(元){{ orderItem.price }}+运费价(元){{ orderItem.fee }}
              </em>
            </li>
            <li class="operate">
              <div><span>圆通速递</span> <br> <span>{{ orderItem.expressNo }}</span> <br> <b class="button-w">申请查件</b></div>
            </li>
          </ul>
        </div>

      </div>
      <div v-if="showOrderList.length===0" class="noCont">
        <img src="/static/notData.png" alt="暂无数据">
        <p>暂无数据</p>
      </div>
    </div>
    <div class="pager">
      <Page v-if="showOrderList.length >0 " :current="searchForm.page" :page-size-opts="[5, 10, 20, 40]" :page-size="searchForm.limit" :total="total" show-total show-sizer @on-page-size-change="changePageSize" @on-change="changePage" />
    </div>
  </div>
</template>

<script>
import { fetchOrderSon } from '@/api/slaveOrder'
import statusCode from '@/common/statusCode'
export default {
  components: {},
  props: {
    search: { type: String, default: '' },
    searchKey: { type: String, default: '' },
    oid: { type: String, default: '' }
  },
  data() {
    return {
      showOrderList: [],
      total: 0,
      searchForm: {
        page: 1,
        limit: 5,
        oid: '',
        search: '',
        searchKey: '',
        state: ''
      }
    }
  },
  created() {
    this.searchSlaveOrder()
  },
  methods: {
    searchSlaveOrder() {
      this.$Message.destroy()
      this.searchForm.search = this.search
      this.searchForm.oid = this.oid
      this.searchForm.searchKey = this.searchKey
      fetchOrderSon(this.searchForm).then(response => {
        const resData = response.data
        if (statusCode.OK === resData.returnCode) {
          this.showOrderList = resData.data
          this.total = resData.total
        } else {
          this.$Message.info(resData.returnMessage)
        }
      })
    },
    changePage(v) {
      this.searchForm.page = v
      this.searchSlaveOrder()
    },
    changePageSize(v) {
      this.searchForm.limit = v
      this.searchSlaveOrder()
    },
    stateChange() {
      this.searchSlaveOrder()
    },
    getState(state) {
      if (state === 'CREATED') {
        return '待付款'
      } else if (state === 'PAYED') {
        return '待发货'
      } else if (state === 'EXPRESSED') {
        return '已发货'
      } else if (state === 'REFUND') {
        return '待退款'
      } else if (state === 'REFUNDED') {
        return '已退款'
      } else if (state === 'FINISHED') {
        return '已完成'
      } else {
        return '已取消'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.orderDetail {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
}
.orderDetail .navTables {
  border: 1px solid #ddd;
  position: absolute;
  border-radius: 4px;
  top: 0;
  left: 0;
  display: -ms-flexbox;
  display: flex;
  height: 28px;
}
.orderDetail .navTables li {
  text-align: center;
  padding: 0 20px;
  font-size: 12px;
  line-height: 28px;
  color: #444;
  border: 1px solid transparent;
  border-right-color: #ddd;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s;
}
.orderDetail .navTables .active,
.orderDetail .navTables li:hover {
  background: RGBA(255, 4, 55, 0.1);
  border: 1px solid #d01126;
  color: #d01126;
}
.orderDetail .links {
  position: absolute;
  right: 20px;
  top: 0;
  height: 42px;
  line-height: 42px;
  cursor: pointer;
  font-size: 16px;
  color: #2c7dff;
}
.orderDetail .cont {
  -ms-flex: 1;
  flex: 1;
  margin-top: 20px;
}
.orderDetail .cont .tables {
  border: 1px solid #e2e2e2;
  margin-bottom: 12px;
}
.orderDetail .cont .tables .title {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 14px;
  line-height: 48px;
  color: #444;
  background: #f4f4f5;
}
.orderDetail .cont .tables .title .status {
  color: #fe7605;
}
.orderDetail .cont .tables .goodsInfo {
  display: -ms-flexbox;
  display: flex;
}
.orderDetail .cont .tables .goodsInfo li {
  border-right: 1px solid #e2e2e2;
  box-sizing: border-box;
}
.orderDetail .cont .tables .goodsInfo li:last-child {
  border: none;
}
.orderDetail .cont .tables .goodsInfo .detail {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  min-width: 380px;
}
.orderDetail .cont .tables .goodsInfo .detail > div {
  display: -ms-flexbox;
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #e2e2e2;
}
.orderDetail .cont .tables .goodsInfo .detail > div:last-child {
  border: none;
}
.orderDetail .cont .tables .goodsInfo .detail > div .goodsImg {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  -ms-flex-item-align: center;
  align-self: center;
}
.orderDetail .cont .tables .goodsInfo .detail > div .info {
  -ms-flex: 1;
  flex: 1;
}
.orderDetail .cont .tables .goodsInfo .detail > div .info h6 {
  font-size: 14px;
  line-height: 26px;
  color: #444;
  margin-bottom: 14px;
}
.orderDetail .cont .tables .goodsInfo .detail > div .info p {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  line-height: 26px;
  color: #444;
}
.orderDetail .cont .tables .goodsInfo .address {
  padding: 20px;
  width: 300px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
}
.orderDetail .cont .tables .goodsInfo .address span,
.orderDetail .cont .tables .goodsInfo .address strong {
  font-size: 14px;
  line-height: 26px;
  color: #444;
}
.orderDetail .cont .tables .goodsInfo .address strong {
  margin-left: 10px;
}
.orderDetail .cont .tables .goodsInfo .price {
  padding: 20px;
  text-align: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
}
.orderDetail .cont .tables .goodsInfo .price strong {
  font-size: 24px;
  line-height: 30px;
  color: #d01126;
  font-weight: 700;
  font-family: dina;
  margin-bottom: 50px;
}
.orderDetail .cont .tables .goodsInfo .operate {
  padding: 20px;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
}
.orderDetail .cont .tables .goodsInfo .operate div {
  line-height: 30px;
}
.orderDetail .cont .tables .goodsInfo .operate p {
  margin-top: 20px;
}
</style>
