<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div data-v-be4ab2a0="" class="accountMoney">
        <h2>
          <strong>资金流水</strong>
          <span>账户充值</span>
        </h2>
        <h6><span>当前账户：</span> <strong>18823274880</strong></h6>
        <h6><span>账户余额：</span> <b>￥ {{ wealth }}</b></h6>
        <div>
          <div class="accountDetail">
            <div class="filter">
              <DatePicker type="datetimerange" placement="bottom-start" placeholder="请选择资金变动时间段" style="width: 300px" @on-change="editDate" />
              <b class="button-w" @click="getFundsDetail">查询</b>
            </div>

            <div v-if="recordList.length===0" class="noCont">
              <img src="http://106.14.154.124:8099/images/noContainer.svg" alt="">
              <p>暂无数据</p>
            </div>
            <div v-else class="detailList">
              <ul>
                <li>
                  <strong>
                    关联订单编号
                  </strong>
                  <strong>
                    交易类型
                  </strong>
                  <strong>
                    交易费用
                  </strong>
                  <strong>
                    交易时间
                  </strong>
                </li>
                <li v-for="detail of recordList" :key="detail.id">
                  <span>
                    {{ detail.id }}
                  </span>
                  <span>
                    {{ detail.feeType }}
                  </span>
                  <span>
                    {{ detail.fee }}
                  </span>
                  <span>
                    {{ detail.dateCreated }}
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { leftRouter } from './components'
import { mapGetters } from 'vuex'
import { getFundsDetail } from '@/api/fundsDetail'
import statusCode from '@/common/statusCode'

export default {
  name: 'FundsDetail',
  components: {
    leftRouter
  },
  data() {
    return {
      selectAll: [
        {
          key: 'CHARGE',
          value: '商家充值'
        },
        {
          key: 'PAY',
          value: '商家订单支付'
        },
        {
          key: 'REFUND',
          value: '商家退款'
        }
      ],
      searchForm: {
        page: 1,
        limit: 10,
        startTime: '',
        endTime: ''
      },
      recordList: [],
      dateTime: []
    }
  },
  computed: {
    ...mapGetters(['wealth'])
  },
  created() {
    this.getFundsDetail()
  },
  methods: {
    getFundsDetail() {
      console.log(this.dateTime)
      if (this.dateTime.length > 0) {
        console.log(this.dateTime[0])
      }
      getFundsDetail(this.searchForm).then(response => {
        const resData = response.data
        if (statusCode.OK === resData.returnCode) {
          this.recordList = resData.data
        } else {
          this.$Message.info(resData.returnMessage)
        }
      })
    },
    editDate(date, type) {
      this.searchForm.startTime = date[0]
      this.searchForm.endTime = date[1]
      console.log('第一个值：' + date + ' 类型：' + date[0])
      console.log('第二个值： ' + date)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.accountMoney {
  padding-left: 20px;
}

.accountMoney h2 {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  line-height: 30px;
  margin-bottom: 10px;
}
.accountMoney h2 strong {
  font-size: 22px;
  line-height: 30px;
  color: #333;
  margin-right: 15px;
}
.accountMoney h2 span {
  font-size: 12px;
  line-height: 18px;
  color: #333;
  padding-left: 10px;
  border-left: 1px solid #eee;
  cursor: pointer;
  transition: all 0.2s;
}
.accountMoney h2 span:hover {
  color: #d01126;
}
.accountMoney h6 {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.accountMoney h6 span {
  font-size: 14px;
  line-height: 20px;
  color: #666;
}
.accountMoney h6 strong {
  font-size: 16px;
  line-height: 22px;
  color: #333;
  font-weight: 700;
}
.accountMoney h6 b {
  font-size: 20px;
  line-height: 24px;
  color: #d01126;
  font-weight: 700;
}
.accountDetail {
  padding-bottom: 60px;
  .filter {
    margin-top: 24px;
  }
  .detailList {
    margin-top: 20px;
    padding: 20px;
    ul {
      width: 100%;
      font-size: 16px;

      border: 1px solid darkgrey;
      li {
        display: flex;
        justify-content: space-between;
        border: 1px #dedede;
        font-size: 16px;
        color: #303133;
        line-height: 22px;
        // padding: 14px;
        text-align: center;
        border-bottom: 1px solid darkgrey;

        strong {
          font-weight: 400;
          flex: 1;
          padding: 12px;
          background-color: #f8f8f9;
        }
        span {
          flex: 1;
          padding: 10px;
          // border: 1px solid #979797;
        }
      }
    }
  }
}
</style>
