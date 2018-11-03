<template>
  <div class="backStage">
    <div class="notice">
      <div class="noticeBase warning">
        <div class="scrollWrap">
          <p>
            <b>
              <span><i class="el-icon-warning" /></span>
              <span>紧急通知</span>
              <em>esapi服务器于24日晚10点半至25日早6点停机维护，请提前做好准备 </em>
            </b>
          </p>
          <p>
            <b>
              <span>
                <i class="el-icon-warning" />
              </span>
              <span>紧急通知</span>
              <em>esapi服务器于24日晚10点半至25日早6点停机维护，请提前做好准备 </em>
            </b>
          </p>
        </div>
      </div>
    </div>
    <div class="showContent">
      <left-router />
      <div class="right">
        <div class="orderLogisticList">
          <div class="title">
            <ul class="navTitle">
              <li class="nav active">物流查询记录</li>
              <li class="nav">已补发订单</li>
              <li class="lastRight"><b class="button-n">申请查件</b></li>
            </ul>
          </div>
          <ul class="tabs">
            <li class=""><span>待处理</span> <strong>0</strong></li>
            <li class=""><span>处理中</span> <strong>0</strong></li>
            <li class=""><span>已处理</span> <strong>0</strong></li>
            <li class="active"><span>全部记录</span></li>
          </ul>
          <div class="search">
            <div class="inp el-input">
              <!---->
              <input type="text" autocomplete="off" placeholder="请输入快递单号" class="el-input__inner">
              <!---->
              <!---->
              <!---->
            </div>
            <b class="button-w">查询</b>
          </div>
          <div class="noCont"><img src="http://106.14.154.124:8099/images/noContainer.svg" alt="">
            <p>暂无数据</p>
          </div>
          <div class="step1">
            <!---->
          </div>
          <!---->
          <div class="pager">
            <Page
              :current="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="5"
              :total="0"
              layout="total, sizes, prev, pager, next, jumper"
              @page-size-change="handleSizeChange"
              @change="handleCurrentChange"/>
          </div>
          <div class="el-dialog__wrapper" style="display: none;">
            <div class="el-dialog alertGroup" style="margin-top: 10vh; width: 440px;">
              <div class="el-dialog__header"><span class="el-dialog__title">查件申请</span>
                <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"/></button>
              </div>
              <!---->
              <!---->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { leftRouter } from './components'

export default {
  name: 'Check',
  components: {
    leftRouter
  },
  data() {
    return {
      currentPage: 4
    }
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      console.log('显示多少：' + val)
    },
    handleCurrentChange(val) {
      console.log('当前多少：' + val)
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

.orderLogisticList{
    padding-left: 20px;
}
  .orderLogisticList .tabs {
    display: -ms-flexbox;
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid #eee
  }

  .orderLogisticList .tabs li {
    width: 100px;
    text-align: center;
    cursor: pointer;
    transition: all .2s;
    border-radius: 5px 5px 0 0;
    margin-right: 10px
  }

  .orderLogisticList .tabs li span,
  .orderLogisticList .tabs li strong {
    font-size: 14px;
    line-height: 30px;
    font-weight: 700
  }

.orderLogisticList .tabs li strong {
    color: #d01126;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    text-align: center;
    background: #fff
  }

  .orderLogisticList .tabs li:hover {
    background: RGBA(208, 0, 38, 1);
    color: #fff
  }

  .orderLogisticList .tabs .active {
    background: RGBA(208, 17, 38, 1)
  }

  .orderLogisticList .tabs .active span {
    color: #fff
  }

  .orderLogisticList .search {
    margin-top: 20px
  }

  .orderLogisticList .search .inp {
    width: 240px;
    margin-right: 20px
  }

  .orderLogisticList .cont {
    -ms-flex: 1;
    flex: 1;
    margin-top: 20px
  }

  .orderLogisticList .cont .tables {
    border: 1px solid #e2e2e2;
    margin-bottom: 12px
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
    background: #f4f4f5
  }

  .orderLogisticList .cont .tables .title .status {
    color: #fe7605
  }

  .orderLogisticList .cont .tables .goodsInfo {
    display: -ms-flexbox;
    display: flex
  }

  .orderLogisticList .cont .tables .goodsInfo li {
    border-right: 1px solid #e2e2e2;
    box-sizing: border-box
  }

  .orderLogisticList .cont .tables .goodsInfo li:last-child {
    border: none
  }

  .orderLogisticList .cont .tables .goodsInfo .detail {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    min-width: 380px
  }

  .orderLogisticList .cont .tables .goodsInfo .detail>div {
    display: -ms-flexbox;
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #e2e2e2
  }

  .orderLogisticList .cont .tables .goodsInfo .detail>div:last-child {
    border: none
  }

  .orderLogisticList .cont .tables .goodsInfo .detail>div .goodsImg {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    -ms-flex-item-align: center;
    align-self: center
  }

  .orderLogisticList .cont .tables .goodsInfo .detail>div .info {
    -ms-flex: 1;
    flex: 1
  }

  .orderLogisticList .cont .tables .goodsInfo .detail>div .info h6 {
    font-size: 14px;
    line-height: 26px;
    color: #444;
    margin-bottom: 14px
  }

  .orderLogisticList .cont .tables .goodsInfo .detail>div .info p {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 14px;
    line-height: 26px;
    color: #444
  }

  .orderLogisticList .cont .tables .goodsInfo .address {
    padding: 20px;
    width: 300px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center
  }

  .orderLogisticList .cont .tables .goodsInfo .address span,
  .orderLogisticList .cont .tables .goodsInfo .address strong {
    font-size: 14px;
    line-height: 26px;
    color: #444
  }

  .orderLogisticList .cont .tables .goodsInfo .address strong {
    margin-left: 10px
  }

  .orderLogisticList .cont .tables .goodsInfo .address img {
    min-width: 100px;
    height: 100px;
    max-width: 250px;
    margin-right: 10px;
    vertical-align: top
  }

  .orderLogisticList .cont .tables .goodsInfo .price {
    padding: 20px;
    width: 280px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: start;
    justify-content: flex-start
  }

  .orderLogisticList .cont .tables .goodsInfo .price p,
  .orderLogisticList .cont .tables .goodsInfo .price span,
  .orderLogisticList .cont .tables .goodsInfo .price strong {
    font-size: 14px;
    line-height: 26px;
    color: #444
  }

  .orderLogisticList .cont .tables .goodsInfo .price p {
    color: #d01126
  }

  .orderLogisticList .cont .tables .goodsInfo .price .imgBox img {
    width: 100px;
    height: 100px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 10px
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
    justify-content: center
  }

  .orderLogisticList .cont .tables .goodsInfo .operate div {
    line-height: 30px
  }

  .orderLogisticList .cont .tables .goodsInfo .operate p {
    margin-top: 20px
  }

  .orderLogisticList .cont .tables .goodsInfo .operate b {
    line-height: 30px
  }

</style>
