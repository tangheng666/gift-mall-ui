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
        <div class="checkNow">
          <div class="topNav">
            <div class="hBox">
              <div class="stepBoxWrap">
                <ul class="stepBox">
                  <li class="active"><strong>1</strong>
                    <p><em>确认收货人信息</em> <b>查看步骤示例，用来帮助您更好的操作。</b></p>
                  </li>
                  <li class="now activeNext"><strong>2</strong> <span>设置商品</span></li>
                  <li class="now"><strong>3</strong> <span>支付发货</span></li>
                </ul>
              </div>
            </div>
            <div class="eggBox">
              <div class="video">
                <video height="150" controls src="http://106.14.154.124:8099/video/orderStepShow.mp4" class="mp4"/>
              <span>确认收货人信息步骤示例</span></div>
            </div>
          </div>
          <!---->
          <div class="takeOrderBox">
            <div class="uploadTable">
              <ul class="topTabs">
                <!-- <li class="">智能筛选收货人</li>
                  <li class="">批量上传收货人</li> -->
                <li class="active">手工填写</li>
              </ul>
              <div class="contents">
                <!---->
                <!---->
                <div class="handleBase">
                  <div class="handBox">
                    <h4>手工填写信息下单</h4>
                    <ul class="select">
                      <li><span>选择平台</span>
                        <div class="el-select inp el-select--small">
                          <!---->
                          <div class="el-input el-input--small el-input--suffix">
                            <!---->
                            <input type="text" readonly autocomplete="off" placeholder="请选择" class="el-input__inner">
                            <!----><span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up"/>
                                <!----></span>
                              <!----></span>
                          <!---->
                          </div>
                          <div class="el-select-dropdown el-popper" style="display: none; min-width: 160px;">
                            <div class="el-scrollbar" style="">
                              <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -8px; margin-right: -8px;">
                                <ul class="el-scrollbar__view el-select-dropdown__list">
                                  <!---->
                                  <li class="el-select-dropdown__item selected"><span>淘宝</span></li>
                                  <li class="el-select-dropdown__item"><span>天猫</span></li>
                                  <li class="el-select-dropdown__item"><span>京东</span></li>
                                  <li class="el-select-dropdown__item"><span>拼多多</span></li>
                                  <li class="el-select-dropdown__item"><span>其他</span></li>
                                </ul>
                              </div>
                              <div class="el-scrollbar__bar is-horizontal">
                                <div class="el-scrollbar__thumb" style="transform: translateX(0%);"/>
                              </div>
                              <div class="el-scrollbar__bar is-vertical">
                                <div class="el-scrollbar__thumb" style="transform: translateY(0%);"/>
                              </div>
                            </div>
                            <!---->
                          </div>
                        </div>
                      </li>
                    </ul>
                    <ul class="tips">
                      <li> 按照如下格式填写：张三，15696969696，浙江省 杭州市 余杭区 南京路288号105室 </li>
                      <li> 收件人名字、手机号、地址间用逗号隔开 </li>
                      <li> 地址省市区详细地址用一个空格分隔，如无区县信息则默认填写其他区 </li>
                      <li> 请确认输入的信息与选中的平台保持一致 </li>
                    </ul>
                    <div class="packageList">
                      <div class="topInput">
                        <div class="orders inp el-input el-input--small">
                          <!---->
                          <input type="text" autocomplete="off" placeholder="请输入订单号" class="el-input__inner">
                          <!---->
                          <!---->
                          <!---->
                        </div>
                        <div class="address inp el-input el-input--small">
                          <!---->
                          <input type="text" autocomplete="off" placeholder="请输入收件信息" class="el-input__inner">
                          <!---->
                          <!---->
                          <!---->
                        </div>
                        <!---->
                        <b class="button-n">选礼品</b>
                      </div>
                      <!---->
                      <!---->
                      <div class="addOthers"><i class="add el-icon-circle-plus"/></div>
                    </div>
                  </div>
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
export default {
  name: 'Buy',
  components: {
    leftRouter
  },
  data() {
    return {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .checkNow {
    width: 100%;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .checkNow .topNav {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 20px
  }

  .checkNow .topNav>div {
    -ms-flex: 1;
    flex: 1
  }

  .checkNow .topNav .hBox h2 {
    font-size: 22px;
    line-height: 30px;
    color: #333
  }

  .checkNow .topNav .hBox h6 {
    font-size: 14px;
    line-height: 20px;
    color: #666
  }

  .checkNow .topNav .eggBox .video,
  .checkNow .topNav .eggBox {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: end;
    justify-content: flex-end
  }

  .checkNow .topNav .eggBox .video {
    -ms-flex-direction: column;
    flex-direction: column
  }

  .checkNow .topNav .eggBox .video .mp4 {
    height: 150px;
    background: rgba(0, 0, 0, .2)
  }

  .checkNow .topNav .eggBox .video span {
    font-size: 12px;
    line-height: 18px;
    color: #999;
    margin-top: 5px
  }

  .checkNow .topNav .eggBox .stepBox li {
    margin: 28px 0;
    display: -ms-flexbox;
    display: flex
  }

  .checkNow .topNav .eggBox .stepBox li strong {
    position: relative;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    color: #d7d7d7;
    border: 1px solid #d7d7d7;
    margin-right: 10px
  }

  .checkNow .topNav .eggBox .stepBox li strong:before {
    content: "";
    width: 2px;
    height: 18px;
    background: #d7d7d7;
    position: absolute;
    top: -24px;
    left: 0;
    right: 0;
    margin: 0 auto
  }

  .checkNow .topNav .eggBox .stepBox li span {
    font-size: 14px;
    line-height: 20px;
    color: #9b9b9b
  }

  .checkNow .topNav .eggBox .stepBox .active strong {
    color: #fff;
    background: #d01126;
    border: 1px solid #d01126
  }

  .checkNow .topNav .eggBox .stepBox .active strong:before {
    background: #d01126
  }

  .checkNow .topNav .eggBox .stepBox .active span {
    color: #666
  }

  .checkNow .takeOrderBox {
    -ms-flex: 1;
    flex: 1;
    overflow: hidden
  }

  .stepBoxWrap .stepBox li {
    margin: 28px 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center
  }

  .stepBoxWrap .stepBox li strong {
    position: relative;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    color: #d7d7d7;
    border: 1px solid #d7d7d7;
    margin-right: 10px;
    margin-left: 4px
  }

  .stepBoxWrap .stepBox li strong:before {
    content: "";
    width: 2px;
    height: 18px;
    background: #d7d7d7;
    position: absolute;
    top: -24px;
    left: 0;
    right: 0;
    margin: 0 auto
  }

  .stepBoxWrap .stepBox li span {
    font-size: 14px;
    line-height: 20px;
    color: #9b9b9b
  }

  .stepBoxWrap .stepBox li p {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column
  }

  .stepBoxWrap .stepBox li p em {
    font-size: 22px;
    line-height: 30px;
    color: #333
  }

  .stepBoxWrap .stepBox li p b {
    font-size: 12px;
    line-height: 18px;
    color: #666
  }

  .stepBoxWrap .stepBox .active strong {
    width: 28px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    background: #d01126;
    border: 1px solid #d01126;
    margin-left: 0
  }

  .stepBoxWrap .stepBox .active strong:before {
    background: #d01126
  }

  .stepBoxWrap .stepBox .active span {
    color: #666
  }

  .stepBoxWrap .stepBox .now strong {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 4px
  }

  .stepBoxWrap .stepBox .activeNext strong:before {
    height: 26px;
    top: -30px
  }

  .stepBoxWrap .stepBox strong.finish {
    border-color: #d01126;
    color: #d01126;
    background: #fff
  }

  .stepBoxWrap .stepBox strong.finish i {
    font-weight: 700;
    font-size: 12px
  }

  .uploadTable {
    width: 100%;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden
  }

  .uploadTable .topTabs {
    border-bottom: 1px solid #d01126;
    display: -ms-flexbox;
    display: flex
  }

  .uploadTable .topTabs li {
    width: 120px;
    margin-right: 16px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 21px;
    color: #666;
    padding: 5px 10px;
    border-radius: 4px 4px 0 0;
    border: 1px solid #e9e9e9;
    background: #f7f7f7;
    text-align: center;
    cursor: pointer
  }

  .uploadTable .topTabs .active {
    color: #d01126;
    border-color: #d01126;
    border-bottom: #fff;
    background: #fff;
    bottom: 0;
    position: relative
  }

  .uploadTable .topTabs .active:after {
    content: "";
    width: 100%;
    height: 1px;
    background: #fff;
    position: absolute;
    bottom: -1px;
    left: 0
  }

  .uploadTable .contents {
    -ms-flex: 1;
    flex: 1;
    overflow: auto;
    padding: 20px 15px;
    box-sizing: border-box
  }

</style>
