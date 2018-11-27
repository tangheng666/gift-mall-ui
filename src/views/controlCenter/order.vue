<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="orderManger">
        <div class="topSearchBox">
          <h1>订单查询</h1>
          <div class="searchBox">
            <i-input v-model="searchForm.search" class="searchInput">
              <Select slot="prepend" v-model="searchForm.searchKey" style="width:120px" placeholder="请选择查询类型">
                <Option v-for="item in selectAll" :value="item.key" :key="item.key">{{ item.value }}</Option>
              </Select>
            </i-input>
            <b class="button-n" @click="querySlaveOrder">查询</b>
          </div>
          <ul class="tabNav">
            <li :class="tabType === 'master'?'active':''" @click="change('master')">采购订单管理</li>
            <li :class="tabType === 'detail'?'active':''" @click="change('detail')">详细订单管理</li>
          </ul>
        </div>

        <div class="tabContentBox">
          <component ref="smallRef" :is="currentViewF" :search="searchForm.search" :search-key="searchForm.searchKey" :oid="searchForm.oid" @oidToDeatil="toDetail"/>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { leftRouter, masterOrderList, slaveOrderList } from './components'
export default {
  name: 'Order',
  components: {
    leftRouter,
    masterOrderList,
    slaveOrderList
  },
  data() {
    return {
      currentView: 'masterOrderList',
      selectAll: [
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
        oid: this.$route.params.oid,
        search: '',
        searchKey: ''
      },
      tabType: 'master'
    }
  },
  computed: {
    currentViewF() {
      if (this.searchForm.oid) {
        this.toDetail(this.searchForm.oid + '')
      }
      return this.currentView
    }
  },
  methods: {
    querySlaveOrder() {
      if (this.tabType === 'detail') {
        this.$refs.smallRef.search = this.searchForm.search
        this.$refs.smallRef.searchKey = this.searchForm.searchKey
        this.$refs.smallRef.searchSlaveOrder()
      } else {
        this.tabType = 'detail'
        this.currentView = 'slaveOrderList'
      }
    },
    toDetail(oid) {
      this.searchForm.oid = oid
      if (this.tabType === 'detail') {
        this.$refs.smallRef.oid = this.searchForm.oid
      } else {
        this.tabType = 'detail'
      }
      this.currentView = 'slaveOrderList'
    },
    change(type) {
      this.searchForm.oid = ''
      this.searchForm.searchKey = ''
      this.searchForm.search = ''
      if (type === 'master') {
        this.currentView = 'masterOrderList'
      } else {
        this.currentView = 'slaveOrderList'
      }
      this.tabType = type
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
