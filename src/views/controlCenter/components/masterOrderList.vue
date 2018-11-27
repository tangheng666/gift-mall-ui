<template>
  <div class="tables">
    <div v-if="showOrderList.length>0" class="orderListBase">
      <Table :data="showOrderList" :columns="tableColumns" :border="false" size="large" stripe />
    </div>
    <div v-if="showOrderList.length === 0" class="noCont">
      <img src="/static/notData.png" alt="暂无数据">
      <p>暂无数据</p>
    </div>
    <div class="pager">
      <Page v-if="showOrderList.length>0" :current="searchForm.page" :page-size-opts="[5, 10, 20, 40]" :page-size="searchForm.limit" :total="total" show-total show-sizer @on-page-size-change="changePageSize" @on-change="changePage" />
    </div>
  </div>

</template>

<script>
import { fetchOrder, payOrder, cancelOrder } from '@/api/order'
import statusCode from '@/common/statusCode'
export default {
  data() {
    return {
      showOrderList: [],
      tableColumns: [
        // {
        //   title: '礼品单价(元)',
        //   key: 'price',
        //   align: 'center'
        //   // width: 110
        // },
        // {
        //   title: '单个重量(kg)',
        //   key: 'weight',
        //   align: 'center'
        //   // width: 110
        // },
        {
          title: '采购订单编号',
          key: 'id',
          align: 'center',
          width: 120
        },
        {
          title: '包裹数',
          key: 'totalCount',
          align: 'center',
          width: 100
        },
        {
          title: '金额（元）',
          key: 'totalPrice',
          align: 'center',
          width: 120,
          render: (h, params) => {
            const row = params.row

            return h(
              'span',
              row.totalPrice + '元'
            )
          }
        },
        {
          title: '订单状态',
          key: 'state',
          align: 'center',
          render: (h, params) => {
            const row = params.row

            const text =
              row.state === 'CREATED'
                ? '待支付'
                : row.state === 'PAYED'
                  ? '待发货'
                  : '已取消'

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
            const detail = h(
              'span',
              {
                style: {
                  marginRight: '15px',
                  cursor: 'pointer',
                  color: '#d01126'
                },
                on: {
                  click: () => {
                    this.detail(params.row.id)
                  }
                }
              },
              '详情'
            )
            const pay = h(
              'span',
              {
                style: {
                  marginRight: '15px',
                  cursor: 'pointer',
                  color: '#d01126'
                },
                on: {
                  click: () => {
                    this.payOrder(params.row.id)
                  }
                }
              },
              '支付'
            )
            const cancel = h(
              'span',
              {
                style: {
                  cursor: 'pointer',
                  marginRight: '15px',
                  color: '#d01126'
                },
                on: {
                  click: () => {
                    this.cancelOrder(params.row.id)
                  }
                }
              },
              '撤销'
            )
            const exportFile = h(
              'span',
              {
                style: {
                  cursor: 'pointer',
                  marginRight: '15px',
                  color: '#d01126'
                },
                on: {
                  click: () => {
                    this.exportData(params.row.id)
                  }
                }
              },
              '导出订单'
            )
            return h(
              'div',
              row.state === 'CREATED'
                ? [detail, pay, cancel]
                : row.state === 'PAYED'
                  ? [detail, exportFile]
                  : [detail]
            )
            // 批量发货
          }
        }
      ],
      searchForm: {
        page: 1,
        limit: 5
      },
      total: 0,
      noData: false
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.$Message.destroy()
      fetchOrder({
        page: this.searchForm.page,
        limit: this.searchForm.limit
      }).then(response => {
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
      this.getOrderList()
    },
    changePageSize(v) {
      this.searchForm.limit = v
      this.getOrderList()
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
    },
    detail(oid) {
      if (this.$route.path === '/control/order') {
        this.$emit('oidToDeatil', oid + '')
      } else {
        this.$router.push({
          name: 'control/order',
          params: { oid: oid }
        })
      }
    },
    exportData(oid) {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
