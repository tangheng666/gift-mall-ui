<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="orderManger">

        <div class="topSearchBox">
          <h1>订单查询</h1>
          <div class="searchBox">
            <!--  -->

            <i-input v-model="searchForm.search" class="searchInput">
              <Select slot="prepend" v-model="searchForm.searchKey" style="width:120px">
                <Option v-for="item in selectAll" :value="item.key" :key="item.key">{{ item.value }}</Option>
              </Select>
            </i-input>
            <b class="button-n">查询</b>
          </div>
          <ul class="tabNav">
            <li :class="tabSelect?'active':''" @click="change('gift')">采购订单管理</li>
            <li :class="!tabSelect?'active':''" @click="change('detail')">详细订单管理</li>
          </ul>
        </div>

        <div class="tabContentBox">

          <div v-if="tabSelect" class="tables">
            <div v-if="tableData.length >0" class="orderListBase">

              <Table :data="tableData" :columns="tableColumns" />
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="total" :current="searchForm.page" :page-size="searchForm.limit" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" />
                </div>
              </div>
            </div>
            <div v-else class="noCont">
              <img src="http://106.14.154.124:8099/images/noContainer.svg" alt="">
              <p>暂无数据</p>
            </div>
          </div>

          <div v-else class="orderMangerDetail">
            <div class="orderDetail">
              <ul class="navTables">
                <!-- <li class="active">近3日订单</li> -->
                <li class="">处理中</li>
                <li class="">仓库已发货</li>
                <li class="">待退款</li>
                <li class="">已退款</li>
                <li class="" style="display: none;">补发订单</li>
                <li class="active">所有订单</li>
              </ul>
              <div class="links" />
              <div class="noCont">
                <img src="http://106.14.154.124:8099/images/noContainer.svg" alt="">
                <p>暂无数据</p>
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
import { fetchOrder, payOrder, cancelOrder } from '@/api/order'
import statusCode from '@/common/statusCode'
export default {
  name: 'Order',
  components: {
    leftRouter
  },
  data() {
    return {
      selectAll: [
        {
          key: 'empty',
          value: '请选择查询类型'
        },
        {
          key: 'expressNo',
          value: '快递单号'
        },
        {
          key: 'mobile',
          value: '收件人手机号'
        },

        {
          key: 'orderNo',
          value: '第三方订单号'
        }
      ],
      searchForm: {
        page: 1,
        limit: 10,
        search: '',
        searchKey: 'empty',
        state: ''
      },
      tabSelect: true,
      tableData: [],
      total: 0,
      tableColumns: [
        {
          title: '礼品单价(元)',
          key: 'price',
          align: 'center'
          // width: 110
        },
        {
          title: '单个重量(kg)',
          key: 'weight',
          align: 'center'
          // width: 110
        },
        {
          title: '礼品总数量',
          key: 'totalCount',
          align: 'center'
          // width: 100
        },
        {
          title: '订单总金额',
          key: 'totalPrice',
          align: 'center'
          // width: 100
        },
        {
          title: '订单状态',
          key: 'state',
          align: 'center',
          // width: 120,
          render: (h, params) => {
            const row = params.row
            const color =
              row.state === 'CREATED'
                ? '#20a0ea'
                : row.state === 'PAYED'
                  ? '#19BE6B'
                  : '#ed2842'
            const text =
              row.state === 'CREATED'
                ? '待支付'
                : row.state === 'PAYED'
                  ? '已支付'
                  : '已取消'

            return h(
              'span',
              {
                attrs: {
                  style: 'color:' + color
                }
              },
              text
            )
          }
        },
        {
          title: '备注',
          align: 'center',
          key: 'totalNote',
          // width: 150,
          render(h, param) {
            let totalNote = param.row.totalNote
            if (totalNote.length > 10) {
              totalNote = totalNote.substring(0, 10) + '......'
            }
            return h(
              'Tooltip',
              {
                props: {
                  placement: 'top',
                  content: param.row.totalNote,
                  maxWidth: 800
                }
              },
              totalNote
            )
            // <Tooltip content="Top Center text" placement="">
          }
        },
        {
          title: '创建时间',
          align: 'center',
          // width: 150,
          key: 'dateCreated'
        },
        {
          title: '操作',
          key: 'action',
          // width: 240,
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.state === 'CREATED') {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.payOrder(params.row.id)
                      }
                    }
                  },
                  '支付'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.cancelOrder(params.row.id)
                      }
                    }
                  },
                  '撤销'
                )
              ])
            } else {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        // this.preview(params.row)
                      }
                    }
                  },
                  '预览'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        //      this.edit(params.row)
                      }
                    }
                  },
                  '编辑'
                )
              ])
            }
          }
        }
      ]
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      fetchOrder({
        page: this.searchForm.page,
        limit: this.searchForm.limit
      }).then(response => {
        const resData = response.data
        if (statusCode.OK === resData.returnCode) {
          this.tableData = resData.data
          this.total = resData.total
        } else {
          this.$Message.info(resData.returnMessage)
        }
      })
    },
    changePage(v) {
      this.searchForm.page = v
      this.getOrderList()
    },
    changePageSize(v) {
      this.searchForm.limit = v
      this.getOrderList()
    },
    change(type) {
      if (type === 'gift') {
        this.tabSelect = true
      } else {
        this.tabSelect = false
      }
    },
    payOrder(oid) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定支付该笔订单吗？</p>',
        onOk: () => {
          payOrder({ oid: oid }).then(response => {
            const resData = response.data
            if (resData.returnCode === statusCode.OK) {
              this.$store.dispatch('GetUserInfo')
              this.getOrderList()
            } else {
              this.$Message.info(resData.returnMessage)
            }
          })
        }
      })
    },
    cancelOrder(oid) {
      cancelOrder({ oid: oid }).then(response => {
        const resData = response.data
        if (resData.returnCode === statusCode.OK) {
          this.getOrderList()
        } else {
          this.$Message.info(resData.returnMessage)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.orderManger .searchs {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.orderManger .searchs li {
  margin-bottom: 20px;
}

.orderManger .searchs span {
  font-size: 14px;
  line-height: 1;
  color: #444;
  margin-right: 12px;
}

.orderManger .searchs .input-n {
  width: 220px;
  margin-right: 24px;
}

.orderManger .searchs .last {
  margin-right: 0;
}

.orderManger .navTitle {
  margin-bottom: 20px;
}

.orderManger .tables {
  font-size: 14px;
}

.orderManger .tables .tips {
  display: inline-block;
  position: relative;
}

.orderManger .tables .tips:before {
  content: '';
  position: absolute;
  left: -14px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.orderManger .tables .success:before {
  background: #1ecd01;
}

.orderManger .tables .error:before {
  background: #d01126;
}

.orderManger .tables .cancel:before {
  background: #ff7503;
}

.orderManger .tables .textBtn {
  margin: 6px 8px;
}

.orderManger .alertGroup {
  padding: 40px;
}

.orderManger .alertGroup .cont h2 {
  font-size: 18px;
  line-height: 1;
  color: #444;
}

.orderManger .alertGroup .cont .list {
  border-bottom: 1px solid #ebeef5;
  max-height: 350px;
  overflow: auto;
  margin-top: 20px;
}

.orderManger .alertGroup .cont .list li {
  margin-bottom: 20px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  color: #444;
}

.orderManger .alertGroup .cont .list li img {
  width: 60px;
  height: 60px;
}

.orderManger .alertGroup .cont .list li span {
  text-align: left;
}

.orderManger .alertGroup .cont .list li p {
  width: 40px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.orderManger .alertGroup .cont .total {
  display: -ms-flexbox;
  display: flex;
  margin: 20px 10px;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  line-height: 1;
  color: #444;
}

.orderManger .alertGroup .cont .total i {
  color: #d01126;
}

.orderManger .alertGroup .backCont {
  text-align: left;
}

.orderManger .alertGroup .buttons {
  text-align: center;
  margin-top: 40px;
}

.orderManger .alertGroup .buttons b {
  padding: 0 20px;
}

.orderManger .importAttition {
  padding: 40px;
  text-align: center;
}

.orderManger .importAttition h1 {
  font-size: 18px;
  line-height: 1;
  color: #444;
  margin-bottom: 20px;
  text-align: center;
}

.orderManger .importAttition .checkBox {
  text-align: left;
  margin-bottom: 20px;
}

.orderManger .importAttition .commentBox {
  text-align: center;
}

.orderManger .importAttition .packageList {
  text-align: left;
}

.orderManger .importAttition .commentDiy {
  text-align: center;
}

.orderManger .importAttition .boxShadow {
  padding: 20px 40px;
}

.orderManger .importAttition .footer {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

.orderManger .importAttition .urlComment {
  text-align: left;
}

.orderManger .importAttition .urlComment p {
  font-size: 14px;
  line-height: 1;
  color: #444;
  line-height: 20px;
}

.orderManger .importAttition .urlComment p strong {
  font-size: 16px;
  line-height: 1;
  color: #d01126;
}

.orderManger .importAttition .urlComment p a {
  font-size: 14px;
  line-height: 1;
  color: #2c7dff;
  text-decoration: none;
}

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
  margin-top: 62px;
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
  font-size: 20px;
  line-height: 28px;
  color: #d01126;
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
.orderManger {
  padding-left: 20px;
}
.orderManger .topSearchBox {
  background: #fcfcfc;
  padding: 10px 10px 0 20px;
  border-bottom: 1px solid #e9e9e9;
}

.orderManger .topSearchBox > h1 {
  font-size: 22px;
  line-height: 30px;
  color: #333;
  text-align: center;
  margin-bottom: 25px;
}
.orderManger .topSearchBox .searchBox {
  text-align: center;
  margin-bottom: 25px;
}
.orderManger .topSearchBox .searchBox .searchInput {
  width: 400px;
}
.ivu-input-group {
  display: inline-table;
}
.orderManger .topSearchBox .tabNav {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.orderManger .topSearchBox .tabNav li {
  font-size: 14px;
  line-height: 22px;
  color: #999;
  margin: 0 14px 0 0;
  padding: 6px 8px;
  cursor: pointer;
  min-width: 90px;
  text-align: center;
  border: 1px solid #d9d9d9;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  background: #fff;
}
.orderManger .topSearchBox .tabNav .active {
  color: #fff;
  border: 1px solid #d01126;
  background: #d01126;
  position: relative;
}

.orderManger .tabContentBox {
  padding: 20px;
}
</style>
