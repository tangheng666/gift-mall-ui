<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="accountMoney">
        <h2>
          <strong>资金流水</strong>
          <!-- <span>账户充值</span> -->
        </h2>
        <h6><span>当前账户：</span> <strong>18823274880</strong></h6>
        <h6><span>账户余额：</span> <b>￥ {{ wealth }}</b></h6>
        <div>
          <div class="accountDetail">
            <div class="filter">
              <DatePicker v-model="startTimeNoF" type="datetime" format="yyyy-MM-dd mm:hh:ss" clearable placeholder="选择开始时间" style="width: 200px" @on-change="startTimeChange" />
              <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
              <DatePicker v-model="endTimeNoF" type="datetime" format="yyyy-MM-dd mm:hh:ss" clearable placeholder="选择结束时间" style="width: 200px" @on-change="endTimeChange" />

              <b class="button-w" @click="getFundsDetail">查询</b>
            </div>

            <div v-if="recordList.length===0" class="noCont">
              <img src="/static/notData.png" alt="">
              <p>暂无数据</p>
            </div>
            <div v-else class="detailList">
              <Table :data="recordList" :columns="tableColumns" :border="false" size="large" stripe />
              <div class="pager">
                <Page v-if="total >0 " :current="searchForm.page" :page-size-opts="[5, 10, 20, 40]" :page-size="searchForm.limit" :total="total" show-total show-sizer @on-page-size-change="changePageSize" @on-change="changePage" />
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
      tableColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '详细订单编号',
          key: 'id',
          align: 'center'
          // width: 150
        },
        {
          title: '交易类型',
          key: 'feeType',
          align: 'center',
          // width: 250,
          render: (h, params) => {
            const row = params.row
            const text =
              row.feeType === 'CHARGE'
                ? '用户充值'
                : row.feeType === 'PAY'
                  ? '订单支付'
                  : '退款'

            return h(
              'span',
              {
                attrs: {
                  style: 'font-size: 16px;font-weight: 400'
                }
              },
              text
            )
          }
        },
        {
          title: '交易金额',
          key: 'fee',
          align: 'center'
          // width: 200
        },
        {
          title: '交易时间',
          key: 'dateCreated',
          align: 'center'
          // width: 200
        }
      ],
      searchForm: {
        page: 1,
        limit: 5,
        startTime: '',
        endTime: ''
      },
      startTimeNoF: null,
      endTimeNoF: null,
      recordList: [],
      dateTime: [],
      total: 0
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
      getFundsDetail(this.searchForm).then(response => {
        const resData = response.data
        if (statusCode.OK === resData.returnCode) {
          this.recordList = resData.data
          this.total = resData.total
        } else {
          this.$Message.info(resData.returnMessage)
        }
      })
    },
    editDate(date, type) {
      this.searchForm.startTime = date[0]
      this.searchForm.endTime = date[1]
    },
    startTimeChange(v) {
      this.searchForm.startTime = v
    },
    endTimeChange(v) {
      this.searchForm.endTime = v
    },
    changePage(v) {
      this.searchForm.page = v
      this.getFundsDetail()
    },
    changePageSize(v) {
      this.searchForm.limit = v
      this.getFundsDetail()
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
    margin-top: 30px;
  }
}
</style>
