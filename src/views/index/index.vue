<template>
  <div class="shopIndex">
    <!-- <footer/> -->
    <section class="logo isCenter"><img src="http://baoyitech.oss-cn-hangzhou.aliyuncs.com/1532419724069802acdb2c03a62dcb545a50743ef0e8d" alt="logo" class="logoImg">
      <p class="logoText"><strong>幸运包</strong> <br>
        <span>xingyunbao.vip</span>
      </p>
    </section>
    <section class="banner">
      <div class="el-carousel" @click="goBuy">
        <div class="el-carousel__container" style="height: 500px;">
          <!---->
          <!---->
          <div class="el-carousel__item bannerImgBox is-active is-animating" style="transform: translateX(0px) scale(1);">
            <!---->
            <div class="bannerImgBox"><img src="http://106.14.154.124:8099/images/GroupLong.png" alt="轮播图"></div>
          </div>
        </div>
        <ul class="el-carousel__indicators">
          <li class="el-carousel__indicator is-active">
            <button class="el-carousel__button">
              <!----></button>
          </li>
        </ul>
      </div>
    </section>
    <section class="showBox">
      <div class="boxWrap isCenter">
        <div class="topTitleImg">
          <img v-for="(imgItem, index) in introduction" :key="index" :src="imgItem" alt="img" @click="goGift">

        </div>
        <div class="showGoodsBox">
          <div class="titles"><strong>品牌精选</strong> <span>品质好，实用度高</span></div>
          <ul class="goodsBox">
            <li v-for="(item, index) in featured" :key="index" @click="goGift">
              <img :src="item.imgSrc" alt="img">
              <p :title="item.title">{{ item.title }}</p>
              <strong>￥ {{ item.price }}</strong>
            </li>
          </ul>
        </div>
        <div class="showGoodsBox">
          <div class="titles redTitle"><strong>新品筹备</strong> <span>特例独行，小资必备</span></div>
          <ul class="goodsBox" @click="goGift">
            <li v-for="(item, index) in newProduct" :key="index" @click="goGift">
              <img :src="item.imgSrc" alt="img">
              <p :title="item.title">{{ item.title }}</p>
              <strong>￥ {{ item.price }}</strong>
            </li>

          </ul>
        </div>
      </div>
    </section>
    <section class="footer">
      <div><img src="http://106.14.154.124:8099/images/goods/安全保障.png" alt="img"> <span>丢件/破损包赔</span></div>
      <div><img src="http://106.14.154.124:8099/images/goods/物流图标.png" alt="img"> <span>圆通快递鼎力支持 </span></div>
      <div><img src="http://106.14.154.124:8099/images/goods/客服-fill.png" alt="img"> <span>专属客服贴心服务</span></div>
    </section>
    <section class="others">
      <i class="govIcon" />
      <!-- <span class="link">浙ICP备18029136号</span> -->
      <span>All Rights Reserved</span>
    </section>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      introduction: [
        'http://106.14.154.124:8099/images/goods/Rectangle 18 Copy 3.png',
        'http://106.14.154.124:8099/images/goods/Mask.png',
        'http://106.14.154.124:8099/images/goods/Rectangle 18 Copy 5.png',
        'http://106.14.154.124:8099/images/goods/Rectangle 18 Copy 6.png'
      ],
      featured: [
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/纸巾副本.png',
          title: '【正品】清风抽纸原木餐巾纸家庭装纸巾200抽',
          price: '2.10'
        },
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/500g洗衣液副本.png',
          title: '正品众秀洗衣液，熏香薰衣草浓缩洗衣液500g装',
          price: '0.65'
        },
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/纸巾111.png',
          title: '原木纸巾，家居抽取式面巾纸吸水不易破,80抽[1包]',
          price: '0.90'
        },
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/夹子111.jpeg',
          title: '木质夹子，多用途固定夹[1个]',
          price: '0.10'
        },
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/衣架.jpeg',
          title: '旅行折叠衣架简易便携 颜色随机[1个]',
          price: '0.80'
        }
      ],
      /**
       *   <li><img src="" alt="img">
              <p title="</p>
              <strong>￥</strong>
            </li>
            <li><img src="" alt="img">
              <p title="超静音大风量手持风扇（充电款）"></p>
              <strong>￥18.8</strong>
            </li>
            <li><img src="" alt="img">
              <p title="高档磨砂漱口杯水杯子">高档磨砂漱口杯水杯子</p>
              <strong>￥1.5</strong>
            </li>
            <li><img src="" alt="img">
              <p title="">日风礼品碗套装礼盒装餐具小碗</p>
              <strong>￥8.9</strong>
            </li>
            <li><img src="" alt="img">
              <p title="正广和盐汽水碳酸饮料"></p>
              <strong>￥1.8</strong>
       */
      newProduct: [
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/Rectangle 138.png',
          title: '泥塑北欧风小摆件',
          price: '5'
        },
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/Rectangle 137.png',
          title: '超静音大风量手持风扇（充电款）',
          price: '18.80'
        },
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/Rectangle 136.png',
          title: '高档磨砂漱口杯水杯子',
          price: '1.50'
        },
        {
          imgSrc: 'http://106.14.154.124:8099/images/goods/Rectangle 135.png',
          title: '日风礼品碗套装礼盒装餐具小碗',
          price: '8.90'
        },
        {
          imgSrc:
            'http://106.14.154.124:8099/images/goods/21535335967_.pic_hd.png',
          title: '正广和盐汽水碳酸饮料',
          price: '1.80'
        }
      ]
    }
  },
  computed: {},
  methods: {
    goBuy() {
      this.$router.push('/control/buy')
    },
    goGift() {
      this.$router.push('/control/gift')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.shopIndex {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.shopIndex .isCenter {
  padding: 0 100px;
  max-width: 1240px;
  margin: 0 auto;
  box-sizing: content-box;
}
.shopIndex .logo {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  height: 100px;
}
.shopIndex .logo .logoImg {
  width: 55px;
  height: 55px;
}
.shopIndex .logo .logoText {
  margin-left: 12px;
}
.shopIndex .logo .logoText strong {
  font-size: 32px;
  color: #444;
  letter-spacing: 4px;
}
.shopIndex .logo .logoText span {
  font-size: 14px;
  color: #888;
  letter-spacing: 1px;
}
.shopIndex .banner {
  position: relative;
  text-align: center;
}
.shopIndex .banner .bannerImgBox {
  width: 100%;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
}
.shopIndex .banner .bannerImgBox img {
  height: 100%;
  cursor: pointer;
}
.shopIndex .banner .el-carousel {
  overflow: hidden;
  position: relative;
  .el-carousel__container {
    position: relative;
  }
  .el-carousel__indicators {
    position: absolute;
    list-style: none;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: 2;
    .el-carousel__button {
      display: block;
      opacity: 0.48;
      width: 30px;
      height: 2px;
      background-color: #fff;
      border: none;
      outline: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
  }
}

.shopIndex .showBox {
  background: #f4f4f4;
  padding-top: 12px;
  padding-bottom: 12px;
}
.shopIndex .showBox img {
  border: 1px solid #fff;
  transition: all 0.2s;
  cursor: pointer;
}
.shopIndex .showBox img:hover {
  border: 1px dashed #999;
}
.shopIndex .showBox .topTitleImg {
  background: #fff;
  padding: 24px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.shopIndex .showBox .topTitleImg img {
  width: 277px;
}
.shopIndex .showBox .showGoodsBox {
  margin-top: 12px;
  background: #fff;
}
.shopIndex .showBox .showGoodsBox .titles {
  height: 55px;
  line-height: 55px;
  padding: 0 24px;
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
}
.shopIndex .showBox .showGoodsBox .titles strong {
  position: relative;
  font-size: 20px;
  color: #f76b1c;
  font-weight: 700;
}
.shopIndex .showBox .showGoodsBox .titles strong:before {
  content: '';
  position: absolute;
  left: -12px;
  top: 0;
  width: 4px;
  height: 16px;
  background: linear-gradient(180deg, #fad961, #f76b1c);
}
.shopIndex .showBox .showGoodsBox .titles span {
  font-size: 14px;
  color: #888;
  margin-left: 8px;
}
.shopIndex .showBox .showGoodsBox .redTitle strong {
  color: #ff0437;
}
.shopIndex .showBox .showGoodsBox .redTitle strong:before {
  background: linear-gradient(180deg, #ff8339, #ff0437);
}
.shopIndex .showBox .showGoodsBox .goodsBox {
  padding: 24px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  cursor: pointer;
}
.shopIndex .showBox .showGoodsBox .goodsBox li {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 200px;
}
.shopIndex .showBox .showGoodsBox .goodsBox li img {
  width: 200px;
  height: 200px;
}
.shopIndex .showBox .showGoodsBox .goodsBox li p {
  font-size: 14px;
  line-height: 20px;
  height: 40px;
  margin: 8px 0;
  color: #888;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
.shopIndex .showBox .showGoodsBox .goodsBox li strong {
  font-size: 20px;
  line-height: 1;
  color: #ff0437;
  font-weight: 700;
}
.shopIndex .footer {
  background: #f9f9f9;
  height: 155px;
  line-height: 155px;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 -1px 2px #dedede;
}
.shopIndex .footer > div img {
  min-width: 48px;
  max-width: 57px;
  vertical-align: middle;
}
.shopIndex .footer > div span {
  font-size: 16px;
  line-height: 1;
  color: #444;
  margin-left: 24px;
}
.shopIndex .others {
  background: #f9f9f9;
  line-height: 40px;
  height: 40px;
  text-align: center;
  padding-bottom: 30px;
}
.shopIndex .others i {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  background: url(http://baoyitech.oss-cn-hangzhou.aliyuncs.com/1539167651922cca7be82e316cc21d5e9c3b7a4cfba95)
    no-repeat;
}
.shopIndex .others span {
  font-size: 14px;
  line-height: 1;
  color: #000;
  transition: all 0.1s;
  display: inline-block;
  padding: 0 12px;
  border-right: 1px solid #000;
}
.shopIndex .others span:hover {
  color: #ff3341;
}
.shopIndex .others span:last-child {
  border-right: 0;
}
.shopIndex .others .link {
  cursor: pointer;
}
</style>
