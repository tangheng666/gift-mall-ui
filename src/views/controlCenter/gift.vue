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
        <div class="giftStore">
          <div class="shopCarBox">
            <div class="shopCarGift">
              <div class="shopCarLeft">
                <div class="shopCarNeedGoods"><img src="http://106.14.154.124:8099/images/needGoods2.png" alt="img"></div>
                <div class="goodsList">
                  <ul class="title">
                    <li><span>价格</span> <strong><i class="top"/> <i class="bottom"/></strong></li>
                    <li><span>重量</span> <strong><i class="top"/> <i class="bottom"/></strong></li>
                    <li><span>销量</span> <strong><i class="top"/> <i class="bottom"/></strong></li>
                  </ul>
                  <ul class="goodsInfo">
                    <li v-for="item in list" :key="item.id">
                      <div class="imgBox"><img :src="item.image_uri" alt="商品主图"></div>
                      <p :title="item.content">{{ item.goods_desc }}</p>
                      <div class="bottom">
                        <div class="count"><i class="iconfont">￥</i><strong class="iconfont">{{ item.price }}</strong></div>
                        <div class="joinCarBtn"><b class="button-n">加入礼品包</b></div>
                      </div>
                      <div class="leftNum"><span>重量：{{ item.weight }}kg</span> <span>库存：{{ item.inventory }}</span></div>
                    </li>
                  </ul>
                  <div class="pager">
                    <Page
                      :current="listQuery.page"
                      :page-size-opts="[20, 40, 60, 80]"
                      :page-size="listQuery.limit"
                      :total="total"
                      show-elevator
                      show-total
                      show-sizer
                      @on-page-size-change="handleSizeChange"
                      @on-change="handleCurrentChange"/>
                    <div class="toTop"><i class="el-icon-arrow-up"/> <span>TOP</span></div>
                  </div>
                </div>
              </div>
              <div class="shopCarRight">
                <div class="titles"><span>产品</span> <span>单价</span>
                <span>重量</span> <span>数量</span> <span>总价</span></div>
                <ul class="chooseList">
                  <li>
                    <!-- <div><img src="http://baoyitech.oss-cn-hangzhou.aliyuncs.com/1540275739218edc0ccf2dc42f68b80a53e40923e1bd8"
                        alt="img"></div>
                    <div><span>￥0.9</span></div>
                    <div><span>0.02kg</span></div>
                    <div class="count"><i class="el-icon-remove"></i>
                      <input type="number">
                      <i class="el-icon-circle-plus"></i></div>
                    <div><span>￥0.90</span></div>
                    <i class="dele el-icon-circle-close-outline"></i> -->
                  </li>
                </ul>
                <!---->
                <div class="countMoneyBox mt120">
                  <p><span>商品总额：</span> <strong>￥0.0</strong></p>
                  <p><span>运费( <i>0.0kg</i>)：</span> <strong>￥0.0</strong></p>
                  <p class="total"><span>总计：</span> <strong>￥0.0</strong></p>
                </div>
                <div class="operateBtn">
                  <p><span>样品申请</span> <strong>立即采购</strong></p>
                  <!-- <div class="setCommon">设为常用礼品包</div> -->
                </div>
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
import { goodsList } from '@/api/goods'
export default {
  name: 'Gift',
  components: {
    leftRouter
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      goodsList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shopCarGift {
    width: 100%;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    transition: all .3s
  }

  .shopCarGift .shopCarLeft {
    -ms-flex: 1;
    flex: 1;
    overflow: auto;
    padding-right: 5px
  }

  .shopCarGift .shopCarLeft .shopCarNeedGoods {
    margin-bottom: 10px
  }

  .shopCarGift .shopCarLeft .shopCarNeedGoods img {
    width: 100%
  }

  .shopCarGift .shopCarLeft .goodsList .title {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    font-size: 14px;
    line-height: 38px;
    color: #444;
    background: #eee;
    margin-bottom: 30px
  }

  .shopCarGift .shopCarLeft .goodsList .title strong {
    position: relative;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    width: 20px;
    height: 34px;
    text-align: center;
    vertical-align: middle
  }

  .shopCarGift .shopCarLeft .goodsList .title strong i {
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom-color: #909399;
    transition: all .2s
  }

  .shopCarGift .shopCarLeft .goodsList .title strong .top {
    top: 5px
  }

  .shopCarGift .shopCarLeft .goodsList .title strong .bottom {
    bottom: 5px;
    transform: rotate(180deg)
  }

  .shopCarGift .shopCarLeft .goodsList .title strong .active {
    border-bottom-color: #d01126
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: justify;
    justify-content: space-between
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo .empty {
    border: none
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li {
    width: 200px;
    border: 1px solid #f1f1f1;
    margin-bottom: 40px
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .imgBox {
    height: 200px;
    line-height: 200px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 10px;
    background: #f4f4f4
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .imgBox img {
    width: 100%;
    height: 100%;
    max-height: 100%
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li p {
    font-size: 12px;
    line-height: 18px;
    color: #666;
    text-overflow: ellipsis;
    height: 36px;
    overflow: hidden;
    display: box;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    padding: 0 8px
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom {
    height: 36px;
    line-height: 36px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 8px 8px;
    margin-top: 8px
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .count i {
    font-size: 12px;
    line-height: 18px;
    color: #d01126
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .count strong {
    font-family: dina;
    font-size: 22px;
    line-height: 26px;
    color: #d01126;
    font-weight: 700
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .joinCarBtn b {
    margin: 0
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .joinCar {
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 50%;
    background: #d01126;
    cursor: pointer;
    text-align: center
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .bottom .joinCar i {
    display: inline-block;
    width: 20px;
    height: 18px;
    vertical-align: middle;
    background: url(http://106.14.154.124:8099/images/购物.png) no-repeat;
    background-size: 100% 100%
  }

  .shopCarGift .shopCarLeft .goodsList .goodsInfo li .leftNum {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 12px;
    line-height: 16px;
    color: #999;
    padding: 0 8px 8px
  }

  .shopCarGift .shopCarLeft .goodsList .pager {
    text-align: center;
    position: relative
  }

  .shopCarGift .shopCarLeft .goodsList .pager .toTop {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
    width: 50px;
    height: 50px;
    background: #d01126;
    color: #fff;
    cursor: pointer;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center
  }

  .shopCarGift .shopCarLeft .goodsList .pager .toTop i {
    font-size: 30px;
    line-height: 30px;
    font-weight: 700
  }

  .shopCarGift .shopCarLeft .goodsList .pager .toTop span {
    font-size: 14px;
    line-height: 20px
  }

  .shopCarGift .shopCarRight {
    width: 310px;
    -ms-flex-item-align: start;
    align-self: flex-start;
    margin-left: 10px;
    border: 1px solid #d2d2d2;
    background: #fafafa;
    padding-bottom: 10px
  }

  .shopCarGift .shopCarRight .titles {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around
  }

  .shopCarGift .shopCarRight .titles span {
    font-size: 12px;
    line-height: 30px;
    color: #666;
    -ms-flex: 1;
    flex: 1;
    text-align: center
  }

  .shopCarGift .shopCarRight .chooseList {
    max-height: 450px;
    overflow: auto
  }

  .shopCarGift .shopCarRight .chooseList li {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    height: 80px;
    margin-bottom: 5px;
    background: #fff;
    position: relative
  }

  .shopCarGift .shopCarRight .chooseList li>div {
    -ms-flex: 1;
    flex: 1;
    text-align: center
  }

  .shopCarGift .shopCarRight .chooseList li img {
    width: 30px;
    height: 30px
  }

  .shopCarGift .shopCarRight .chooseList li .noCont {
    width: 200px;
    height: 200px
  }

  .shopCarGift .shopCarRight .chooseList li span {
    font-size: 12px;
    line-height: 18px;
    color: #666
  }

  .shopCarGift .shopCarRight .chooseList li .count {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center
  }

  .shopCarGift .shopCarRight .chooseList li .count i {
    font-size: 14px;
    line-height: 18px;
    color: #aaa;
    cursor: pointer
  }

  .shopCarGift .shopCarRight .chooseList li .count input {
    width: 30px;
    outline: none;
    text-align: center;
    border: none
  }

  .shopCarGift .shopCarRight .chooseList li .dele {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
    line-height: 18px;
    color: #ccc;
    cursor: pointer
  }

  .shopCarGift .shopCarRight .noCont {
    text-align: center;
    margin: 20px 0
  }

  .shopCarGift .shopCarRight .mt120 {
    margin-top: 5px
  }

  .shopCarGift .shopCarRight .countMoneyBox {
    padding: 16px;
    border-top: 1px solid #e9e9e9
  }

  .shopCarGift .shopCarRight .countMoneyBox p {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 14px;
    line-height: 18px;
    color: #999;
    margin-bottom: 7px
  }

  .shopCarGift .shopCarRight .countMoneyBox p span {
    text-align: right
  }

  .shopCarGift .shopCarRight .countMoneyBox p span i {
    color: #d01126
  }

  .shopCarGift .shopCarRight .countMoneyBox p strong {
    text-align: right;
    color: #d01126;
    font-weight: 700
  }

  .shopCarGift .shopCarRight .countMoneyBox .total {
    font-size: 20px
  }

  .shopCarGift .shopCarRight .operateBtn {
    padding: 0 20px
  }

  .shopCarGift .shopCarRight .operateBtn p {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center
  }

  .shopCarGift .shopCarRight .operateBtn p>span,
  .shopCarGift .shopCarRight .operateBtn p>strong {
    -ms-flex: 1;
    flex: 1;
    font-size: 18px;
    line-height: 48px;
    color: #fff;
    text-align: center;
    cursor: pointer
  }

  .shopCarGift .shopCarRight .operateBtn p>span {
    background: #d38d1f
  }

  .shopCarGift .shopCarRight .operateBtn p>strong {
    background: #d01126
  }

  .shopCarGift .shopCarRight .operateBtn .setCommon {
    font-size: 15px;
    line-height: 20px;
    color: #d01126;
    margin-top: 5px;
    text-align: right;
    cursor: pointer
  }

</style>
