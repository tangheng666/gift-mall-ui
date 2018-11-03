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
        <div class="orderManger">
          <ul class="searchs">
            <li><span>快递单号</span>
              <div class="input-n el-input">
                <!---->
                <input type="text" autocomplete="off" placeholder="请输入单号" class="el-input__inner">
              </div>
            </li>
            <li><span>收件人手机</span>
              <div class="input-n el-input">
                <!---->
                <input type="text" autocomplete="off" placeholder="请输入手机号" class="el-input__inner">
                <!---->
                <!---->
                <!---->
              </div>
            </li>
            <li><span>第三方订单号</span>
              <div class="input-n last el-input">
                <!---->
                <input type="text" autocomplete="off" placeholder="请输入淘宝/京东等订单号" class="el-input__inner">
                <!---->
                <!---->
                <!---->
              </div>
            </li>
          </ul>
          <div class="navTitle">
            <ul class="navTitle">
              <li class="nav">发货任务管理</li>
              <li class="nav active">详细订单管理</li>
              <li class="lastRight"><span class="button-w searchBtn"> 查询详情 </span></li>
            </ul>
          </div>
          <div>
            <!---->
            <!---->
            <div class="orderMangerDetail">
              <div class="orderDetail">
                <ul class="navTables">
                  <li class="active">近3日订单</li>
                  <li class="">处理中</li>
                  <li class="">仓库已发货</li>
                  <li class="">待退款</li>
                  <li class="">已退款</li>
                  <li class="" style="display: none;">补发订单</li>
                  <li class="">所有订单</li>
                </ul>
                <div class="links"/>
                <div data-v-eeb486fe="" class="noCont"><img
                  src="http://106.14.154.124:8099/images/noContainer.svg"
                  alt="">
                  <p data-v-eeb486fe="">暂无数据</p>
                </div>
                <!---->
              </div>
            </div>
            <!---->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { leftRouter } from './components'
export default {
  name: 'Order',
  components: {
    leftRouter
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
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
    content: "";
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
	position: relative
}
.orderDetail .navTables {
	border: 1px solid #ddd;
	position: absolute;
	top: 0;
	left: 0;
	display: -ms-flexbox;
	display: flex;
    height: 42px;
    padding-left: 0px;
}
.orderDetail .navTables li {
	text-align: center;
	padding: 0 20px;
	font-size: 16px;
	line-height: 40px;
	color: #444;
	border: 1px solid transparent;
	cursor: pointer;
	transition: all .3s
}
.orderDetail .navTables .active, .orderDetail .navTables li:hover {
	background: RGBA(255,4,55,.1);
	border: 1px solid #d01126;
	color: #d01126
}
.orderDetail .links {
	position: absolute;
	right: 20px;
	top: 0;
	height: 42px;
	line-height: 42px;
	cursor: pointer;
	font-size: 16px;
	color: #2c7dff
}
.orderDetail .cont {
	-ms-flex: 1;
	flex: 1;
	margin-top: 62px
}
.orderDetail .cont .tables {
	border: 1px solid #e2e2e2;
	margin-bottom: 12px
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
	background: #f4f4f5
}
.orderDetail .cont .tables .title .status {
	color: #fe7605
}
.orderDetail .cont .tables .goodsInfo {
	display: -ms-flexbox;
	display: flex
}
.orderDetail .cont .tables .goodsInfo li {
	border-right: 1px solid #e2e2e2;
	box-sizing: border-box
}
.orderDetail .cont .tables .goodsInfo li:last-child {
	border: none
}
.orderDetail .cont .tables .goodsInfo .detail {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: column;
	flex-direction: column;
	-ms-flex-pack: center;
	justify-content: center;
	min-width: 380px
}
.orderDetail .cont .tables .goodsInfo .detail>div {
	display: -ms-flexbox;
	display: flex;
	padding: 20px;
	border-bottom: 1px solid #e2e2e2
}
.orderDetail .cont .tables .goodsInfo .detail>div:last-child {
	border: none
}
.orderDetail .cont .tables .goodsInfo .detail>div .goodsImg {
	width: 80px;
	height: 80px;
	margin-right: 15px;
	-ms-flex-item-align: center;
	align-self: center
}
.orderDetail .cont .tables .goodsInfo .detail>div .info {
	-ms-flex: 1;
	flex: 1
}
.orderDetail .cont .tables .goodsInfo .detail>div .info h6 {
	font-size: 14px;
	line-height: 26px;
	color: #444;
	margin-bottom: 14px
}
.orderDetail .cont .tables .goodsInfo .detail>div .info p {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-pack: justify;
	justify-content: space-between;
	font-size: 14px;
	line-height: 26px;
	color: #444
}
.orderDetail .cont .tables .goodsInfo .address {
	padding: 20px;
	width: 300px;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: column;
	flex-direction: column;
	-ms-flex-pack: center;
	justify-content: center
}
.orderDetail .cont .tables .goodsInfo .address span, .orderDetail .cont .tables .goodsInfo .address strong {
	font-size: 14px;
	line-height: 26px;
	color: #444
}
.orderDetail .cont .tables .goodsInfo .address strong {
	margin-left: 10px
}
.orderDetail .cont .tables .goodsInfo .price {
	padding: 20px;
	text-align: center;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: column;
	flex-direction: column;
	-ms-flex-pack: center;
	justify-content: center
}
.orderDetail .cont .tables .goodsInfo .price strong {
	font-size: 20px;
	line-height: 28px;
	color: #d01126
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
	justify-content: center
}
.orderDetail .cont .tables .goodsInfo .operate div {
	line-height: 30px
}
.orderDetail .cont .tables .goodsInfo .operate p {
	margin-top: 20px
}
.orderManger{
    padding-left: 20px;
}
</style>
