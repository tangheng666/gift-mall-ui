<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="orderLogisticList">
        <div class="topSearchBox">
          <div class="topHead">
            <h2>补发查询</h2>
            <!-- <b class="button-n">申请查件</b> -->
          </div>

        </div>
        <div class="filter">
          <Select v-model="searchForm.status" placeholder="请选择补发状态" clearable style="width: 150px">
            <Option v-for="stateItem in stateAll" :value="stateItem.key" :key="stateItem.key">{{ stateItem.value }}</Option>
          </Select>&nbsp;&nbsp;
          <DatePicker v-model="startTimeNoF" type="datetime" format="yyyy-MM-dd mm:hh:ss" clearable placeholder="选择开始时间" style="width: 200px" @on-change="startTimeChange" />
          <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
          <DatePicker v-model="endTimeNoF" type="datetime" format="yyyy-MM-dd mm:hh:ss" clearable placeholder="选择结束时间" style="width: 200px" @on-change="endTimeChange" />

          <b class="button-w" @click="getReissueOrderList">查询</b>
        </div>

        <div v-if="showOrderList.length> 0" class="orderListBase">
          <Table :data="showOrderList" :columns="tableColumns" :border="false" size="large" stripe />
        </div>
        <div v-if="showOrderList.length === 0" class="noCont">
          <img src="/static/notData.png" alt="暂无数据">
          <p>暂无数据</p>
        </div>
        <div class="pager">
          <Page v-if="showOrderList.length> 0" :current="searchForm.page" :page-size-opts="[5, 10, 20, 40]" :page-size="searchForm.limit" :total="total" show-total show-sizer @on-page-size-change="changePageSize" @on-change="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { leftRouter } from './components'
import { findReplacement } from '@/api/reissueOrder'
import statusCode from '@/common/statusCode'
export default {
  name: 'Check',
  components: {
    leftRouter
  },
  data() {
    return {
      stateAll: [
        { key: 'REVIEW', value: '待处理' },
        { key: 'REJECT', value: '已批准' },
        { key: 'PASS', value: '已拒绝' }
      ],
      showOrderList: [],
      tableColumns: [
        {
          title: '补发编号',
          key: 'id',
          align: 'center',
          width: 120
        },
        {
          title: '详细订单编号',
          key: 'sid',
          align: 'center',
          width: 120
        },
        {
          title: '原快递编号',
          key: 'oldExpressNo',
          align: 'center',
          width: 100
        },
        {
          title: '新快递编号',
          key: 'newExpressNo',
          align: 'center',
          width: 100
        },
        {
          title: '补发状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            const row = params.row

            const text =
              row.status === 'REVIEW'
                ? '待处理'
                : row.status === 'REJECT'
                  ? '已批准'
                  : '已拒绝'

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
          title: '创建时间',
          align: 'center',
          key: 'dateCreated'
        }
      ],
      searchForm: {
        page: 1,
        limit: 5,
        status: '',
        startTime: '',
        endTime: ''
      },
      total: 0,
      startTimeNoF: null,
      endTimeNoF: null
    }
  },
  created() {
    this.getReissueOrderList()
  },
  methods: {
    getReissueOrderList() {
      this.$Message.destroy()
      findReplacement(this.searchForm).then(response => {
        const resData = response.data
        if (statusCode.OK === resData.returnCode) {
          this.showOrderList = resData.data
          this.total = resData.total
        } else {
          this.$Message.info(resData.returnMessage)
          this.noData = true
        }
      })
    },
    changePage(v) {
      this.searchForm.page = v
      this.getReissueOrderList()
    },
    changePageSize(v) {
      this.searchForm.limit = v
      this.getReissueOrderList()
    },
    startTimeChange(v) {
      this.searchForm.startTime = v
    },
    endTimeChange(v) {
      this.searchForm.endTime = v
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navTitle {
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #ddd;
}

.orderLogisticList {
  padding-left: 20px;
}
.orderLogisticList .topSearchBox {
  background: #fcfcfc;
  padding: 10px 10px 0 20px;
  border-bottom: 1px solid #e9e9e9;
}
.orderLogisticList .topSearchBox .topHead {
  text-align: center;
}
.filter {
  text-align: center;
  margin-top: 24px;
}
.orderLogisticList .topSearchBox .topHead h2 {
  font-size: 22px;
  line-height: 30px;
  color: #333;
  margin-top: 20px;
  margin-bottom: 20px;
}

.orderLogisticList .tabs {
  display: -ms-flexbox;
  display: flex;
  margin-top: 20px;
  border-bottom: 1px solid #eee;
}

.orderLogisticList .tabs li {
  width: 100px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 5px 5px 0 0;
  margin-right: 10px;
}

.orderLogisticList .tabs li span,
.orderLogisticList .tabs li strong {
  font-size: 14px;
  line-height: 30px;
  font-weight: 700;
}

.orderLogisticList .tabs li strong {
  color: #d01126;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  text-align: center;
  background: #fff;
}

.orderLogisticList .tabs li:hover {
  background: RGBA(208, 0, 38, 1);
  color: #fff;
}

.orderLogisticList .tabs .active {
  background: RGBA(208, 17, 38, 1);
}

.orderLogisticList .tabs .active span {
  color: #fff;
}

.orderLogisticList .search {
  margin-top: 20px;
}

.orderLogisticList .search .inp {
  width: 240px;
  margin-right: 20px;
}

.orderLogisticList .cont {
  -ms-flex: 1;
  flex: 1;
  margin-top: 20px;
}

.orderLogisticList .cont .tables {
  border: 1px solid #e2e2e2;
  margin-bottom: 12px;
}

.orderLogisticList .cont .tables .title {
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

.orderLogisticList .cont .tables .title .status {
  color: #fe7605;
}

.orderLogisticList .cont .tables .goodsInfo {
  display: -ms-flexbox;
  display: flex;
}

.orderLogisticList .cont .tables .goodsInfo li {
  border-right: 1px solid #e2e2e2;
  box-sizing: border-box;
}

.orderLogisticList .cont .tables .goodsInfo li:last-child {
  border: none;
}

.orderLogisticList .cont .tables .goodsInfo .detail {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  min-width: 380px;
}

.orderLogisticList .cont .tables .goodsInfo .detail > div {
  display: -ms-flexbox;
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #e2e2e2;
}

.orderLogisticList .cont .tables .goodsInfo .detail > div:last-child {
  border: none;
}

.orderLogisticList .cont .tables .goodsInfo .detail > div .goodsImg {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  -ms-flex-item-align: center;
  align-self: center;
}

.orderLogisticList .cont .tables .goodsInfo .detail > div .info {
  -ms-flex: 1;
  flex: 1;
}

.orderLogisticList .cont .tables .goodsInfo .detail > div .info h6 {
  font-size: 14px;
  line-height: 26px;
  color: #444;
  margin-bottom: 14px;
}

.orderLogisticList .cont .tables .goodsInfo .detail > div .info p {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  line-height: 26px;
  color: #444;
}

.orderLogisticList .cont .tables .goodsInfo .address {
  padding: 20px;
  width: 300px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
}

.orderLogisticList .cont .tables .goodsInfo .address span,
.orderLogisticList .cont .tables .goodsInfo .address strong {
  font-size: 14px;
  line-height: 26px;
  color: #444;
}

.orderLogisticList .cont .tables .goodsInfo .address strong {
  margin-left: 10px;
}

.orderLogisticList .cont .tables .goodsInfo .address img {
  min-width: 100px;
  height: 100px;
  max-width: 250px;
  margin-right: 10px;
  vertical-align: top;
}

.orderLogisticList .cont .tables .goodsInfo .price {
  padding: 20px;
  width: 280px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.orderLogisticList .cont .tables .goodsInfo .price p,
.orderLogisticList .cont .tables .goodsInfo .price span,
.orderLogisticList .cont .tables .goodsInfo .price strong {
  font-size: 14px;
  line-height: 26px;
  color: #444;
}

.orderLogisticList .cont .tables .goodsInfo .price p {
  color: #d01126;
}

.orderLogisticList .cont .tables .goodsInfo .price .imgBox img {
  width: 100px;
  height: 100px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
}

.orderLogisticList .cont .tables .goodsInfo .operate {
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

.orderLogisticList .cont .tables .goodsInfo .operate div {
  line-height: 30px;
}

.orderLogisticList .cont .tables .goodsInfo .operate p {
  margin-top: 20px;
}

.orderLogisticList .cont .tables .goodsInfo .operate b {
  line-height: 30px;
}
</style>
