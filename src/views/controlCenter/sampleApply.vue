<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="samApplay">
        <div class="title">
          <ul class="navTitle">
            <li class="nav active">样品申请</li>
            <li class="lastRight" />
          </ul>
        </div>
        <div class="samBox">
          <div class="info">
            <h2>请填写您的收货信息</h2>
            <i-input v-model="samplyForm.person" class="inp" placeholder="请输入收货人" />
            <i-input v-model="samplyForm.mobile" class="inp" placeholder="请输入收货人手机号" />
          </div>
          <div class="address">
            <h2>收货地址</h2>
            <div class="city">
              <i-input v-model="samplyForm.province" class="inp-s" placeholder="请输入省份" />
              <i-input v-model="samplyForm.city" class="inp-s" placeholder="请输入城市" />
              <i-input v-model="samplyForm.area" class="inp-s" placeholder="请输入地区或县城" />
            </div>
            <div class="street">
              <i-input v-model="samplyForm.detailAddress" class="inp" placeholder="请输入详细地址" />
            </div>
          </div>
          <div class="total">
            总价：<span>{{ totalPrice }}元</span>
          </div>
          <div class="footer">
            <b class="button-n" @click="submitOrder">确认支付</b>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { leftRouter } from './components'
import { createOrder } from '@/api/order'
import statusCode from '@/common/statusCode'
export default {
  name: 'SampleApply',
  components: {
    leftRouter
  },

  data() {
    return {
      samplyForm: {
        person: '',
        mobile: '',
        province: '',
        city: '',
        area: '',
        detailAddress: ''
      },
      goodsId: this.$route.params.goodsId,
      totalPrice: this.$route.params.totalPrice
    }
  },
  created() {},
  methods: {
    submitOrder() {
      this.$Message.destroy()
      if (!this.samplyForm.person) {
        this.$Message.info('请输入收货人')
        return
      }
      if (!this.samplyForm.mobile) {
        this.$Message.info('请输入收货人手机号')
        return
      }
      if (!this.samplyForm.province) {
        this.$Message.info('请输入收货人所在省')
        return
      }
      if (!this.samplyForm.city) {
        this.$Message.info('请输入收货人所在市')
        return
      }
      if (!this.samplyForm.area) {
        this.$Message.info('请输入收货人所在区或县')
        return
      }
      if (!this.samplyForm.detailAddress) {
        this.$Message.info('请输入收货详细地址')
        return
      }
      if (!this.goodsId) {
        this.$Message.info('请选择好礼品再来操作')
        return
      }
      const data =
        this.samplyForm.person +
        ',' +
        this.samplyForm.mobile +
        ',' +
        this.samplyForm.province +
        ' ' +
        this.samplyForm.city +
        ' ' +
        this.samplyForm.area +
        ' ' +
        this.samplyForm.detailAddress
      const goodsObj = []
      goodsObj.push({
        gid: this.goodsId,
        number: 1
      })
      const submitData = {
        orderNo: '8888888888',
        data: data,
        note: '商家申请样品',
        goods: goodsObj
      }
      const list = []
      list.push(submitData)
      const submitForm = {
        data: JSON.stringify(list),
        totalNote: '商家申请样品'
      }
      createOrder(submitForm).then(response => {
        const resData = response.data
        if (statusCode.OK === resData.returnCode) {
          this.$Message.success('样品申请成功，请进入订单管理页面查看')
        } else if (statusCode.BALANCE_LESS === resData.returnCode) {

        } else {
          this.$Message.info(resData.returnMessage)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.samApplay {
  padding-left: 20px;
  .title {
    padding-bottom: 20px;
    .navTitle {
      display: flex;
      border-bottom: 1px solid #ddd;
      .nav {
        padding-top: 20px;
        margin-right: 60px;
        cursor: pointer;
        border-bottom: 0 solid #d01126;
        font-size: 18px;
        line-height: 1;
        color: #444;
        font-weight: 700;
      }
      .active {
        border-bottom: 4px solid #d01126;
        border-radius: 1px;
      }
      .lastRight {
        -ms-flex: 1;
        flex: 1;
        text-align: right;
        -ms-flex-item-align: end;
        align-self: flex-end;
      }
      li {
        padding-bottom: 15px;
        transition: all 0.3s;
      }
    }
  }
}
.samApplay .samBox {
  border: 1px solid #ddd;
  padding: 40px 30px;
  text-align: center;
  .info {
    h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
  .inp {
    width: 610px;
    margin-bottom: 10px;
  }

  .address {
    margin-top: 20px;
    h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .inp-s {
      width: 200px;
      margin-bottom: 10px;
    }
  }
  .total {
    padding: 20px;
    font-size: 28px;
    span {
      color: #f81307;
    }
  }
}
</style>
