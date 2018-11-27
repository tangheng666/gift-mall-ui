<style lang="scss">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="checkNow">
        <!-- <div class="topNav">
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
              <video height="150" controls src="http://106.14.154.124:8099/video/orderStepShow.mp4" class="mp4" />
              <span>确认收货人信息步骤示例</span>
            </div>
          </div>
        </div> -->
        <!---->
        <div class="takeOrderBox">
          <div class="uploadTable">
            <ul class="topTabs">
              <!-- <li class="">智能筛选收货人</li>
                  <li class="">批量上传收货人</li> -->
              <li class="active">录入收货人信息进行下单</li>
            </ul>
            <div class="contents">
              <div class="handleBase">
                <!-- <h4>手工填写信息下单</h4> -->
                <!-- <Upload :before-upload="handleUpload" type="drag" action="//jsonplaceholder.typicode.com/posts/">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" />
                        <p>Click or drag files here to upload</p>
                      </div>
                    </Upload> -->
                <div class="handBox">
                  <!-- <ul class="select">
                    <li><span>选择平台</span>
                      <Select v-model="select" style="width:140px; margin-left: 20px;" transfer>
                        <Option v-for="item in selectAll" :value="item.key" :key="item.key">{{ item.value }}</Option>
                      </Select>
                      <b v-if="Object.keys(myGoods).length===0" class="button-n" @click="openGiftModel">选择礼品</b>
                    </li>
                  </ul> -->
                  <ul class="tips">
                    <li> 操作流程：选择礼品---》 文件录入或手动录入---》 检查收货地址是否正确---》 输入备注---》 提交支付</li>
                    <li> 收货人信息模板示例1：李四，13820808579，天津 天津市 西青区 解放南路二十四巷11号</li>
                    <li> 收货人信息模板示例2：王五，13820808579，广东省 佛山市 顺德区 解放南路二十四巷11号</li>
                    <li> 录入说明：选择文件录入时，请确保选择平台和文件所属平台一致，以防解析结果出现异常</li>
                    <li> 发货说明：西藏、新疆不发货</li>
                    <!-- <li> 收件人名字、手机号、地址间用逗号隔开 </li>
                    <li> 地址省市区详细地址用一个空格分隔，如无区县信息则默认填写其他区 </li>
                    <li> 请确认输入的信息与选中的平台保持一致 </li> -->
                  </ul>
                  <div class="giftButtonDiv">
                    <!-- <b v-if="Object.keys(myGoods).length===0" class="giftButton" @click="openGiftModel">选择礼品</b> -->
                    <b class="giftButton" @click="openFileUpload">上传文件录入</b>
                    <b class="giftButton" @click="openAddress">手动录入</b>

                  </div>
                  <div />
                  <div class="packageList">
                    <div class="checkArea">
                      <div class="left"><span>已选择礼品</span></div>
                      <div class="righta">
                        <div class="tableShopCar">
                          <div class="top">
                            <div class="rightBtn" />
                            <div class="left" />
                            <div class="rightBtn">
                              <b v-if="Object.keys(myGoods).length>0" class="button-n" @click="openGiftModel">重新选择礼品</b>
                              <b v-if="Object.keys(myGoods).length===0" class="button-n" @click="openGiftModel">选择礼品</b>
                            </div>

                          </div>
                          <div v-if="Object.keys(myGoods).length>0" class="goods">
                            <div class="item">
                              <img :src="myGoods.photo" alt="goodsImg">
                              <span>{{ myGoods.summary }} </span>
                              <span>{{ myGoods.weight }}kg</span>
                              <span>{{ myGoods.price }}元/件</span>
                              <span>1件</span>
                            </div>
                          </div>
                          <div v-else class="noData">
                            <!-- <img src="/static/notData.png" alt="暂无数据"> -->
                            <p>暂无数据</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="metableDiv">
                      <Alert v-if="realAddressData.length>0" :type="alertType" closable show-icon>{{alertText}}</Alert>
                      <table id="newspaper-a" v-if="realAddressData.length > 0">
                        <thead>
                          <tr>
                            <th scope="col" width="220px">第三方订单编号</th>
                            <th scope="col" width="340px">收货信息</th>
                            <th scope="col">校验结果</th>
                            <th scope="col">操作</th>
                          </tr>
                        </thead>
                        <tbody>

                          <tr v-for="(realItem,index) of realAddressData" :key="index">
                            <td>{{realItem.orderNo}}</td>
                            <td><span :style="realItem.errors.has('data')?'color: red;':''"> {{realItem.data}}</span> </td>
                            <td>
                              <span v-if="realItem.isVerified" style="color:#1be46b;">数据正确</span>
                              <span v-else style="color:red;">{{ realItem.errors.has('data')
                                ? realItem.errors.get('data')
                                : realItem.errors.get('orderNo')}}</span>
                            </td>
                            <td>
                              <ButtonGroup>
                                <Button type="info" @click="updateItem(realItem,index)" v-if="!realItem.isVerified" style="margin-right:5px;">修改</Button>
                                <Button type="error" @click="removeData(realItem,index)">删除</Button>
                              </ButtonGroup>
                            </td>
                          </tr>

                        </tbody>
                      </table>

                      <!-- <Table :columns="columns" :data="realAddressData" size="large" /> -->

                    </div>

                    <!-- <div v-if="Object.keys(myGoods).length>0" class="topInput">
                      <div v-for="(info,index) of infoList" :key="index" class="itemInv">
                        <i-input v-model="info.orderNo" placeholder="请输入订单号" style="width: 200px" class="orders" />
                        <i-input v-model="info.data" placeholder="请输入收件信息" class="address" />
                        <b v-if="info.isVerified" class="button-n btnSuccess" @click="remove(index)">删除</b>
                        <b v-else class="button-n btnSuccess" @click="define(info)">确定</b>
                      </div>

                    </div> -->
                    <!-- <div v-if="isOpenNext" class="addOthers">
                      <b class="button-w add" @click="addInfo">
                        <Icon type="md-add" />添加新的收货信息
                      </b>
                    </div> -->
                  </div>
                </div>
                <div class="payBox">
                  <div class="total">
                    <h2><span>总价</span> <strong>￥{{ showTotalPrice }}</strong></h2>
                    <p>
                      我们统一使用
                      <strong>圆通</strong>
                      快速发货
                    </p>
                    <h3>
                      我要备注：
                    </h3>
                    <div>
                      <i-input v-model="endSubmitData.totalNote" :rows="4" type="textarea" autocomplete="off" placeholder="为了您更方便管理自己的任务，请填写备注" style="min-height: 33px;" />
                    </div>
                    <div class="footer"><b class="button-n" @click="createdAndPayOrder">立即支付</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="giftModel" :width="800" :footer-hide=" true" :mask-closable="false" title="选择采购礼品">
      <div class="pickGoods">
        <ul class="title">
          <li>价格排序
            <strong>
              <Icon type="ios-arrow-up" />
              <Icon type="ios-arrow-down" />
            </strong>
          </li>
          <li>重量排序
            <strong>
              <Icon type="ios-arrow-up" />
              <Icon type="ios-arrow-down" />
            </strong>
          </li>
          <li>销量排序
            <strong>
              <Icon type="ios-arrow-up" />
              <Icon type="ios-arrow-down" />
            </strong>
          </li>
        </ul>
        <ul class="goodsInfo">
          <li v-for="gift of data" :key="gift.id">
            <div class="goodsImg"><img :src="gift.photo" alt="商品主图"></div>
            <div class="goodsDetail">
              <h6>{{ gift.summary }}</h6>
              <p :title="gift.summary+ gift.standard ">{{ gift.summary }} {{ gift.standard }}</p>
            </div>
            <div class="price">
              <span>单价：{{ gift.price }}元</span>
              <br>
              <span>重量：
                <strong>{{ gift.weight }}kg</strong>
              </span>
              <br>
              <span>库存：{{ gift.stock }}件</span>
            </div>
            <div class="operate">
              <!-- <div data-v-78d60cb0=""  class="numberCount"><i data-v-78d60cb0="" class="el-icon-minus left"></i> <input data-v-78d60cb0="" type="number" class="countNumInput"> <i data-v-78d60cb0="" class="el-icon-plus right"></i></div> -->
              <p class="button-w" @click="giftGoods(gift)">采购</p>
            </div>
          </li>
        </ul>
      </div>
    </Modal>
    <Modal v-model="addressModel" :width="500" :footer-hide=" true" :draggable="true" :mask-closable="false" title="手动录入收货信息">
      <Form ref="addressformValidate" :model="addressObj" :rules="addressValidRules" :label-width="85" class="updateFrom">
        <FormItem label="订单编号" prop="orderNo">
          <i-input v-model="addressObj.orderNo" type="text" placeholder="请输入订单编号" style="width: 300px" />
        </FormItem>
        <FormItem label="收货信息" prop="data">
          <i-input v-model="addressObj.data" type="text" placeholder="请输入收货信息" style="width: 350px" />
        </FormItem>

        <FormItem>
          <Button type="primary" @click="saveAddress">提交</Button>
          <Button style="margin-left: 8px" @click="cancelAddress">关闭</Button>
        </FormItem>
      </Form>
      <div slot="footer" />
    </Modal>
    <Modal v-model="addressUpdateModel" :width="500" :footer-hide=" true" :draggable="true" :mask-closable="false" title="修改收货信息">
      <Form ref="updateAddressformValidate" :model="updateAddressObj" :rules="addressValidRules" :label-width="85" class="updateFrom">
        <FormItem label="订单编号" prop="orderNo">
          <i-input v-model="updateAddressObj.orderNo" type="text" placeholder="请输入订单编号" style="width: 300px" />
        </FormItem>
        <FormItem label="收货信息" prop="data">
          <i-input v-model="updateAddressObj.data" type="text" placeholder="请确认收货信息" style="width: 350px" />
        </FormItem>

        <FormItem>
          <Button type="primary" @click="saveUpdateAddress">保存</Button>
          <Button style="margin-left: 8px" @click="cancelUpdateAddress">关闭</Button>
        </FormItem>
      </Form>
      <div slot="footer" />
    </Modal>

    <Modal v-model="fileUploadModel" :width="500" :footer-hide=" true" :mask-closable="false" :closable="modelClosable" title="上传收货信息文件">
      <div class="fileModelhead">
        <div class="selectHead">
          <ul class="select">
            <li><span>选择平台：</span>
              <Select v-model="select" style="width:140px; margin-left: 20px;" transfer>
                <Option v-for="item in selectAll" :value="item.key" :key="item.key">{{ item.value }}</Option>
              </Select>
            </li>
          </ul>
        </div>
        <div class="uploadCore">
          <Upload :before-upload="handleUpload" type="drag" action="//jsonplaceholder.typicode.com/posts/" class="uploadCom">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" />
              <p>单击或拖动文件以上传</p>
            </div>
          </Upload>

        </div>
        <div v-if="file !== null" class="footer">
          <div class="fileName"> <span> 上传文件名: {{ file.name }}</span></div>
          <Button :loading="loadingStatus" size="large" @click="upload">{{ loadingStatus ? '上传中' : '确定上传' }}</Button>
        </div>
      </div>

      <div slot="footer" />
    </Modal>

  </div>
</template>

<script>
import { leftRouter } from './components'
import { goodsList } from '@/api/goods'
import { createOrder } from '@/api/order'
import { toDecimal, whetherToday } from '@/utils/index'
import statusCode from '@/common/statusCode'
import numeral from 'numeral'

export default {
  name: 'Buy',
  components: {
    leftRouter
  },
  data() {
    const isValid = /^[\u4e00-\u9fa5A-Za-z0-9\s\S]+(,|，)\d{11}(，|,)[\u4e00-\u9fa5]+ [\u4e00-\u9fa5]+ [\u4e00-\u9fa5|null]+ [\s\S―]*$/
    const valiAddress = (rule, value, callback) => {
      if (!isValid.test(value)) {
        callback(new Error('收货人信息格式不正确'))
      } else {
        callback()
      }
    }
    return {
      selectAll: [
        {
          key: 'taobao',
          value: '淘宝'
        },
        {
          key: 'pindd',
          value: '拼多多'
        },
        {
          key: 'jd',
          value: '京东'
        }
      ],
      select: 'taobao',
      purchaseList: [],
      singlePurchase: {
        expressNo: '',
        data: '',
        remark: ''
      },
      myGoods: {},
      giftModel: false,
      data: [],
      realAddressData: [],
      columns: [
        {
          title: '第三方订单编号',
          key: 'orderNo',
          width: 200,
          align: 'center'
        },
        {
          title: '收货地址信息',
          key: 'data',
          align: 'center',
          render: (h, params) => {
            const rowData = params.row
            return h(
              'span',
              {
                attrs: {
                  style: rowData.errors.has('data') ? 'color: red;' : ''
                }
              },
              rowData.data
            )
          }
        },
        {
          title: '校验结果',
          key: 'isVerified',
          align: 'center',
          width: 140,
          render: (h, params) => {
            const rowData = params.row
            if (rowData.isVerified) {
              return h(
                'span',
                { attrs: { style: 'color: #1be46b;' } },
                '数据正确'
              )
            } else {
              return h(
                'span',
                { attrs: { style: 'color: red;' } },
                rowData.errors.has('data')
                  ? rowData.errors.get('data')
                  : rowData.errors.get('orderNo')
              )
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          render: (h, params) => {
            const rowData = params.row
            const editItem = h(
              'Button',
              {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.updateItem(params.row)
                  }
                }
              },
              '修改'
            )
            const delItem = h(
              'Button',
              {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeData(params.row)
                  }
                }
              },
              '删除'
            )
            return h(
              'div',
              rowData.isVerified ? [delItem] : [editItem, delItem]
            )
          }
        }
      ],
      listQuery: {
        page: 1,
        limit: 99999
      },
      totalPrice: 0.0,
      showTotalPrice: '0.00',
      infoList: [
        {
          orderNo: '',
          data: '',
          isVerified: false
        }
      ],
      isOpenNext: false,
      endSubmitData: {
        data: [],
        totalNote: ''
      },
      addressObj: {
        orderNo: '',
        data: ''
      },
      updateAddressObj: {
        itemIndex: 0,
        orderNo: '',
        data: ''
      },
      addressUpdateModel: false,
      loading: true,
      addressModel: false,
      addressValidRules: {
        orderNo: [
          { required: true, message: '请输入第三方订单编号', trigger: 'blur' }
        ],
        data: [
          { required: true, message: '请输入收货信息', trigger: 'blur' },
          {
            validator: valiAddress,
            message: '收货信息格式不正确',
            trigger: 'blur'
          }
        ]
      },
      fileUploadModel: false,
      loadingStatus: false,
      file: null,
      alertType: 'success',
      alertText: '',
      modelClosable: true,
      removeLocaing: false
    }
  },
  created() {},
  mounted() {
    this.$Notice.config({
      top: 52,
      duration: 3
    })
  },
  methods: {
    openFileUpload() {
      this.$Notice.destroy()
      if (Object.keys(this.myGoods).length === 0) {
        this.$Notice.info({
          title: '温馨提示',
          desc: '请先选择好礼品再进行操作 '
        })
      } else {
        this.fileUploadModel = true
      }
    },
    openAddress() {
      this.$Notice.destroy()
      if (Object.keys(this.myGoods).length === 0) {
        this.$Notice.info({
          title: '温馨提示',
          desc: '请先选择好礼品再进行操作 '
        })
      } else {
        this.addressModel = true
      }
    },
    cancelAddress() {
      this.addressObj.data = ''
      this.addressObj.orderNo = ''
      this.$refs.addressformValidate.resetFields()
      this.addressModel = false
    },
    saveAddress() {
      this.$refs.addressformValidate.validate(valid => {
        if (valid) {
          this.addressDataFilter(this.addressObj)
          this.addressObj.data = ''
          this.addressObj.orderNo = ''
          this.$Message.success('录入成功')
        }
      })
    },
    cancelUpdateAddress() {
      this.updateAddressObj.data = ''
      this.updateAddressObj.orderNo = ''
      this.updateAddressObj.itemIndex = 0
      this.$refs.updateAddressformValidate.resetFields()
      this.addressUpdateModel = false
    },
    saveUpdateAddress() {
      this.$Notice.destroy()
      this.$refs.updateAddressformValidate.validate(valid => {
        if (valid) {
          this.realAddressData[
            this.updateAddressObj.itemIndex
          ].data = this.updateAddressObj.data
          this.realAddressData[
            this.updateAddressObj.itemIndex
          ].orderNo = this.updateAddressObj.orderNo

          this.realAddressData[
            this.updateAddressObj.itemIndex
          ].isVerified = true
          this.realAddressData[
            this.updateAddressObj.itemIndex
          ].errors = new Map()
          // this.addressDataFilter(this.addressObj)
          this.totalPriceFunction()
          this.sortRealAddressList()
          this.updateAddressObj.data = ''
          this.updateAddressObj.orderNo = ''
          this.updateAddressObj.itemIndex = 0
          this.addressUpdateModel = false
          this.$Notice.success({
            title: '温馨提示',
            desc: '修改成功 '
          })

        }
      })
    },
    openGiftModel() {
      this.giftModel = true
      goodsList(this.listQuery).then(response => {
        this.data = response.data.data
      })
    },
    giftGoods(item) {
      this.myGoods = {}
      this.myGoods = item
      this.giftModel = false
      this.totalPriceFunction()
    },
    // addInfo() {
    //   const item = {
    //     orderNo: '',
    //     data: '',
    //     isVerified: false
    //   }
    //   this.isOpenNext = false
    //   this.infoList.push(item)
    // },
    updateItem(item, index) {
      this.updateAddressObj.itemIndex = index
      this.updateAddressObj.orderNo = item.orderNo
      this.updateAddressObj.data = item.data
      this.addressUpdateModel = true
      // this.realAddressData.push(item)
    },
    removeData(item, index) {
      this.$Modal.confirm({
        className: 'vertical-center-modal',
        title: '温馨提示',
        content: '确定要删除该条收货信息吗？',
        loading: true,
        onOk: () => {
          this.realAddressData.splice(index, 1)
          this.totalPriceFunction()
          this.sortRealAddressList()
          setTimeout(() => {
            this.$Modal.remove()
          }, 500)
        },
        onCancel: () => {}
      })
    },
    // inputBlur(info) {
    //   if (!info.isVerified) {
    //     return
    //   }
    //   info.isVerified = false
    //   this.totalPriceFunction()
    // },
    // define(info) {
    //   this.$Message.destroy()
    //   if (info.orderNo.trim() === '') {
    //     this.$Message.info('请输入订单号')
    //     return
    //   }
    //   if (info.data.trim() === '') {
    //     this.$Message.info('请输入收件信息')
    //     return
    //   }
    //   const isValid = /^[\u4e00-\u9fa5A-Za-z0-9]+(,|，)\d{11}(，|,)[\u4e00-\u9fa5A-Za-z0-9 ]+$/
    //   if (!isValid.test(info.data)) {
    //     this.$Message.info('收件信息输入不完整')
    //     return
    //   }
    //   info.isVerified = true
    //   this.isOpenNext = true
    //   this.totalPriceFunction()
    // },
    totalPriceFunction() {
      const newArray = this.realAddressData.filter(item => {
        return item.isVerified
      })
      this.totalPrice = 0.0
      for (const newItem of newArray) {
        const wuLiuPrice = this.calculation(this.myGoods.weight, newItem.data)
        this.totalPrice += toDecimal(wuLiuPrice + this.myGoods.price)
      }
      this.formatTotalPrice(this.totalPrice)
    },
    // remove(index) {
    //   // this.totalPrice -= toDecimal(wuLiuPrice + this.myGoods.price)
    //   this.infoList.splice(index, 1)
    //   this.totalPriceFunction()
    // },
    createdAndPayOrder() {
      this.$Notice.destroy()
      if (Object.keys(this.myGoods).length === 0) {
        this.$Notice.info({
          title: '温馨提示',
          desc: '请选择要采购的礼品 '
        })
        return
      }
      //  const isValid = /^[\u4e00-\u9fa5A-Za-z0-9]+(,|，)\d{11}(，|,)[\u4e00-\u9fa5]+ [\u4e00-\u9fa5]+ [\u4e00-\u9fa5]+ [\u4e00-\u9fa5a-zA-Z0-9]+$/
      // for (const infoItem of this.realAddressData) {
      //   if (infoItem.orderNo.trim() === '') {
      //     this.$Message.info('请输入订单号')
      //     return
      //   }
      //   if (infoItem.data.trim() === '') {
      //     this.$Message.info('请输入收件信息')
      //     return
      //   }
      //   if (!isValid.test(infoItem.data)) {
      //     this.$Message.info('收件信息输入不完整')
      //     return
      //   }
      // }
      const newArray = this.realAddressData.filter(item => {
        return item.isVerified
      })

      if (
        newArray.length < 1 ||
        this.realAddressData.length > newArray.length
      ) {
        this.$Notice.info({
          title: '温馨提示',
          desc: '请处理掉验证未通过的数据 '
        })
        return
      }
      let submitAddrList = []
      for (let submitItem of this.realAddressData) {
        submitAddrList.push({
          orderNo: submitItem.orderNo,
          data: submitItem.data,
          note: '',
          goods: [{ gid: this.myGoods.id, number: 1 }]
        })
      }
      this.endSubmitData.data = JSON.stringify(submitAddrList)
      //this.endSubmitData.gid = this.myGoods.id

      const content =
        '<p class="orderTips">现在下单，我们将在' +
        (whetherToday() ? '' : '次日') +
        '下午<i style="color: #d01126;font-weight: 700;">4:30</i>帮你发货，快递单号会在支付成功15-30分钟内生成。'

      this.$Modal.confirm({
        className: 'vertical-center-modal',
        title: '发货提示',
        content: content,
        onOk: () => {
          setTimeout(() => {
            this.payOrder()
          }, 500)
        },
        onCancel: () => {
          return
        }
      })
    },
    payOrder() {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定支付该笔订单吗？</p>',
        onOk: () => {
          createOrder(this.endSubmitData).then(response => {
            const resData = response.data
            if (resData.returnCode === statusCode.OK) {
              this.myGoods = {}
              this.realAddressData = []
              this.totalPrice = 0.0
              this.formatTotalPrice(this.totalPrice)
              this.endSubmitData.data = []
              // this.endSubmitData.gid = 0
              this.endSubmitData.totalNote = ''
              this.$store.dispatch('GetUserInfo')
              setTimeout(() => {
                this.$Modal.confirm({
                  okText: '跳转订单页面',
                  cancelText: '继续采购',
                  render: h => {
                    return h('div', [
                      h('Icon', {
                        props: {
                          type: 'ios-checkmark-circle',
                          color: '#19be6b',
                          size: 20
                        },
                        attrs: {
                          style: 'margin-bottom:3px;'
                        }
                      }),
                      h(
                        'span',
                        {
                          attrs: {
                            style: 'margin-left: 10px;'
                          }
                        },
                        '支付成功，等待操作指令'
                      )
                    ])
                  },
                  onOk: () => {
                    this.$router.push('/control/order')
                  },
                  onCancel: () => {}
                })
              }, 500)
            } else {
              this.$Message.info(resData.returnMessage)
            }
          })
        },
        onCancel: () => {}
      })
    },
    calculation(weight, address) {
      const logisticObjStore = this.$store.getters.express
      const logisticStr = JSON.stringify(logisticObjStore)
      const logisticObj = JSON.parse(logisticStr)
      const isFar = this.farVaild(address, logisticObj.note)

      let wuLiuPrice = 0.0
      if (weight <= logisticObj.firstWeight) {
        wuLiuPrice = isFar ? logisticObj.farFirstPrice : logisticObj.firstPrice
      } else if (weight <= logisticObj.middleWeight) {
        wuLiuPrice = isFar
          ? logisticObj.farMidllePrice
          : logisticObj.middlePrice
      } else {
        const weightStr = weight + ''
        const splitWeight = weightStr.split('.')
        let zhengshu = splitWeight[0]
        const xiaoshu = splitWeight[1]
        if (parseInt(zhengshu) > 1) {
          zhengshu -= 1
          wuLiuPrice += isFar
            ? logisticObj.farMidllePrice
            : logisticObj.middlePrice
          wuLiuPrice +=
            zhengshu * (isFar ? logisticObj.farEndPrice : logisticObj.endPrice)
        } else {
          wuLiuPrice += isFar
            ? logisticObj.farMidllePrice
            : logisticObj.middlePrice
        }
        if (parseInt(xiaoshu) > 0) {
          wuLiuPrice += isFar ? logisticObj.farEndPrice : logisticObj.endPrice
        }
      }
      return wuLiuPrice
    },
    formatTotalPrice(totalPrice) {
      this.showTotalPrice = numeral(totalPrice).format('0.00')
    },
    farVaild(address, note) {
      const reg = /[\u4e00-\u9fa5]+ /
      const province = reg.exec(address)[0]
      const farAddressList = note.split(' ')
      let isFar = false
      for (const str of farAddressList) {
        if (province.indexOf(str) !== -1) {
          isFar = true
          break
        }
      }
      return isFar
    },
    handleUpload(file) {
      this.file = file
      return false
    },
    upload() {
      this.loadingStatus = true
      this.modelClosable = false
      // const submitData = {
      //   business: this.select,
      //   file: this.file
      // }
      // console.log(JSON.stringify(this.file))
      // uploadFroala(submitData).then(res => {
      //   console.log(res)
      // })
      const formData = new FormData()
      formData.append('business', this.select)
      formData.append('file', this.file) // 'file' 可变 相当于 input 表单的name 属性
      // 服务器只需按照正常的上传程序代码即可
      this.$http
        .post('http://182.61.16.69:8080/mall/rs/common/uploadFroala', formData)
        .then(res => {
          const resData = res.data
          const isValidMethod = /^[\u4e00-\u9fa5A-Za-z0-9\s\S]+(,|，)\d{11}(，|,)[\u4e00-\u9fa5]+ [\u4e00-\u9fa5]+ [\u4e00-\u9fa5|null]+ [\s\S―]*$/
          if (statusCode.OK === resData.returnCode) {
            const resAddressList = resData.data
            for (const addrItem of resAddressList) {
              const errors = new Map()
              let isValid = true
              if (!addrItem.orderNo || addrItem.orderNo.trim() === '') {
                errors.set('orderNo', '第三方订单编号不能为空')
                isValid = false
              }
              if (!addrItem.orderNo || addrItem.data.trim() === '') {
                errors.set('data', '收货信息不能为空')
                isValid = false
              }
              if (!isValidMethod.test(addrItem.data)) {
                errors.set('data', '收货信息格式不正确')
                isValid = false
              }
              this.realAddressData.push({
                errors: errors,
                isVerified: isValid,
                orderNo: addrItem.orderNo,
                data: addrItem.data
              })
            }
            // this.realAddressData = this.realAddressData.concat(resData.data)

            this.totalPriceFunction()
            this.sortRealAddressList()
            this.loadingStatus = false
            this.modelClosable = true
            this.$Notice.success({
              title: '温馨提示',
              desc: '文件上传成功，解析结果已返回 '
            })
            this.fileUploadModel = false
            this.file = null
          } else {
            this.$Message.info(resData.returnMessage)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addressDataFilter(receiptObj) {
      this.realAddressData.push({
        orderNo: receiptObj.orderNo,
        data: receiptObj.data,
        isVerified: true,
        errors: new Map()
      })
      this.totalPriceFunction()
      this.sortRealAddressList()
      // const notVerifiedArr = this.realAddressData.filter(
      //   addData => !addData.isVerified
      // )
      // const verifiedArr = this.realAddressData.filter(
      //   addData => addData.isVerified
      // )
    },
    sortRealAddressList() {
      const notVerifiedArr = this.realAddressData.filter(
        addData => !addData.isVerified
      )
      const verifiedArr = this.realAddressData.filter(
        addData => addData.isVerified
      )
      this.realAddressData = notVerifiedArr.concat(verifiedArr)
      if (notVerifiedArr.length > 0) {
        this.alertType = 'error'
      } else {
        this.alertType = 'success'
      }
      this.alertText =
        '验证失败 ' +
        notVerifiedArr.length +
        '条，验证通过 ' +
        verifiedArr.length +
        '条，总计 ' +
        this.realAddressData.length +
        '。'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.metableDiv table {
  border-collapse: collapse;
  display: table;
  width: 100%;
  text-align: left;
  margin-bottom: 24px;
}
#newspaper-a {
  font-family: 'Lucida Sans Unicode', 'Lucida Grande', Sans-Serif;
  font-size: 12px;
  text-align: left;
  border-collapse: collapse;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
}
#newspaper-a th {
  padding: 12px 17px 12px 17px;
  font-weight: normal;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #e9e9e9;
}
#newspaper-a td {
  padding: 7px 17px 7px 17px;
  color: #606266;
  font-size: 14px;

  border-bottom: 1px solid #e9e9e9;
}
#newspaper-a tbody tr:hover td {
  // color: #666;
  background: #f5f7fa;
}

.fileModelhead {
  text-align: center;
  padding: 15px;
  .selectHead {
    display: flex;
    margin-bottom: 20px;
  }
  .uploadCore {
    display: flex;
    .uploadCom {
      width: 400px;
    }
  }
  .footer {
    padding: 5px;
    .fileName {
      padding: 15px;
    }
    span {
      font-size: 18px;
      border: 1px;
    }
  }
}
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
  margin-bottom: 20px;
}

.checkNow .topNav > div {
  -ms-flex: 1;
  flex: 1;
}

.checkNow .topNav .hBox h2 {
  font-size: 22px;
  line-height: 30px;
  color: #333;
}

.checkNow .topNav .hBox h6 {
  font-size: 14px;
  line-height: 20px;
  color: #666;
}

.checkNow .topNav .eggBox .video,
.checkNow .topNav .eggBox {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.checkNow .topNav .eggBox .video {
  -ms-flex-direction: column;
  flex-direction: column;
}

.checkNow .topNav .eggBox .video .mp4 {
  height: 150px;
  background: rgba(0, 0, 0, 0.2);
}

.checkNow .topNav .eggBox .video span {
  font-size: 12px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
}

.checkNow .topNav .eggBox .stepBox li {
  margin: 28px 0;
  display: -ms-flexbox;
  display: flex;
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
  margin-right: 10px;
}

.checkNow .topNav .eggBox .stepBox li strong:before {
  content: '';
  width: 2px;
  height: 18px;
  background: #d7d7d7;
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.checkNow .topNav .eggBox .stepBox li span {
  font-size: 14px;
  line-height: 20px;
  color: #9b9b9b;
}

.checkNow .topNav .eggBox .stepBox .active strong {
  color: #fff;
  background: #d01126;
  border: 1px solid #d01126;
}

.checkNow .topNav .eggBox .stepBox .active strong:before {
  background: #d01126;
}

.checkNow .topNav .eggBox .stepBox .active span {
  color: #666;
}

.checkNow .takeOrderBox {
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
}

.stepBoxWrap .stepBox li {
  margin: 28px 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
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
  margin-left: 4px;
}

.stepBoxWrap .stepBox li strong:before {
  content: '';
  width: 2px;
  height: 18px;
  background: #d7d7d7;
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.stepBoxWrap .stepBox li span {
  font-size: 14px;
  line-height: 20px;
  color: #9b9b9b;
}

.stepBoxWrap .stepBox li p {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
}

.stepBoxWrap .stepBox li p em {
  font-size: 22px;
  line-height: 30px;
  color: #333;
}

.stepBoxWrap .stepBox li p b {
  font-size: 12px;
  line-height: 18px;
  color: #666;
}

.stepBoxWrap .stepBox .active strong {
  width: 28px;
  height: 28px;
  line-height: 28px;
  color: #fff;
  background: #d01126;
  border: 1px solid #d01126;
  margin-left: 0;
}

.stepBoxWrap .stepBox .active strong:before {
  background: #d01126;
}

.stepBoxWrap .stepBox .active span {
  color: #666;
}

.stepBoxWrap .stepBox .now strong {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 4px;
}

.stepBoxWrap .stepBox .activeNext strong:before {
  height: 26px;
  top: -30px;
}

.stepBoxWrap .stepBox strong.finish {
  border-color: #d01126;
  color: #d01126;
  background: #fff;
}

.stepBoxWrap .stepBox strong.finish i {
  font-weight: 700;
  font-size: 12px;
}

.uploadTable {
  width: 100%;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
}

.uploadTable .topTabs {
  // border-bottom: 1px solid #d01126;
  display: -ms-flexbox;
  display: flex;
  list-style-type: none;
}

.uploadTable .topTabs li {
  width: 200px;
  margin-right: 16px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 21px;
  color: #666;
  padding: 5px 10px;
  border-radius: 4px 4px 0 0;
  // border: 1px solid #e9e9e9;
  background: #f7f7f7;
  text-align: center;
  // cursor: pointer;
}

.uploadTable .topTabs .active {
  color: #d01126;
  border-color: #d01126;
  // border-bottom: #fff;
  background: #fff;
  bottom: 0;
  position: relative;
}

.uploadTable .topTabs .active:after {
  content: '';
  width: 100%;
  height: 1px;
  background: #fff;
  position: absolute;
  bottom: -1px;
  left: 0;
}

.uploadTable .contents {
  -ms-flex: 1;
  flex: 1;
  overflow: auto;
  padding: 20px 15px;
  box-sizing: border-box;
}
.ivu-select-dropdown-list li {
  margin-bottom: 0px;
}

.handleBase {
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.handleBase .handBox {
  // padding: 0 30px;
  position: relative;
  -ms-flex: 1;
  flex: 1;
  overflow: auto;
}

.handleBase .handBox h4 {
  font-size: 14px;
  line-height: 20px;
  color: #333;
  font-weight: 700;
  position: relative;
  margin-bottom: 20px;
}
.handBox .giftButtonDiv {
  padding-bottom: 10px;
}
.handleBase .handBox .giftButtonDiv .giftButton {
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  line-height: 28px;
  margin: 0 10px;
  padding: 0 20px;
  border: 1px solid #d01126;
  border-radius: 4px;
  color: #fff;
  background: #d01126;
}

.handleBase .handBox h4:before {
  content: '1';
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: -30px;
  width: 14px;
  height: 14px;
  background: #d01126;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  text-align: center;
}

.handleBase .select li {
  margin-bottom: 20px;
}

.handleBase .select li span {
  font-size: 14px;
  line-height: 20px;
  color: #666;
}

.handleBase .select li .inp {
  width: 160px;
  margin: 0 10px 0 15px;
}

.handleBase .tips {
  margin-bottom: 30px;
}

.handleBase .tips li {
  font-size: 14px;
  line-height: 18px;
  color: #999;
  position: relative;
  margin-bottom: 5px;
}

.handleBase .tips li:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -20px;
  margin: auto 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #d01126;
}

.handleBase .packageList {
  clear: both;
  // margin-top: 40px;
}

.handleBase .packageList .placeTip {
  font-size: 14px;
  line-height: 20px;
  color: #666;
  margin-bottom: 6px;
}

.handleBase .packageList .addOthers {
  margin-bottom: 12px;
  margin-top: 12px;
}

.handleBase .packageList .close {
  font-size: 26px;
  line-height: 1;
  color: #ff7503;
  cursor: pointer;
  vertical-align: middle;
}

.handleBase .packageList .add {
  margin: 0;
}
.handleBase .packageList .add i {
  font-size: 14px;
  margin-right: 10px;
}

.handleBase .packageList .topInput {
  margin-top: 16px;
  .itemInv {
    margin-bottom: 12px;
  }
}

.handleBase .packageList .topInput .inp {
  margin-bottom: 10px;
}

.handleBase .packageList .topInput .orders {
  width: 164px;
}

.handleBase .packageList .topInput .address {
  width: 480px;
  margin-left: 20px;
}

.handleBase .packageList .topOtherInput {
  margin-bottom: 16px;
}

.handleBase .packageList .topOtherInput .sInput {
  width: 120px;
  margin-bottom: 10px;
}

.handleBase .packageList .topOtherInput .lInput {
  width: 240px;
  margin-right: 26px;
}

.handleBase .packageList .checkArea {
  border: 1px solid #ddd;
  display: -ms-flexbox;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.handleBase .packageList .checkArea .left {
  width: 150px;
  text-align: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  background: #f6f6f6;
  font-size: 14px;
  line-height: 1;
  color: #444;
}

.handleBase .packageList .checkArea .righta {
  -ms-flex: 1;
  flex: 1;
  padding: 10px 10px;
}

.handleBase .payBox {
  width: 300px;
  padding: 20px 15px;
  box-sizing: border-box;
  background: #fbfbfb;
  margin-left: 5px;
  overflow: auto;
}

.handleBase .payBox .total h2 {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
}

.handleBase .payBox .total h2 span {
  font-size: 17px;
  line-height: 24px;
  color: #333;
}

.handleBase .payBox .total h2 strong {
  font-size: 24px;
  line-height: 30px;
  color: #d01126;
  font-family: dina;
  font-weight: 700;
}

.handleBase .payBox .total p {
  font-size: 12px;
  line-height: 18px;
  color: #999;
  margin-bottom: 30px;
  margin-top: 10px;
}

.handleBase .payBox .total p strong {
  color: #333;
}

.handleBase .payBox .total h3 {
  font-size: 17px;
  line-height: 24px;
  color: #333;
  margin-bottom: 10px;
}

.handleBase .payBox .total .footer {
  margin-top: 30px;
  text-align: center;
}

.handleBase .orderTips {
  font-size: 14px;
  line-height: 20px;
  color: #666;
}

.handleBase .orderTips i {
  color: #d01126;
  font-weight: 700;
}

.tableShopCar .top {
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 20px;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 15px;
}
.tableShopCar .top .left .select {
  width: 150px;
}
.tableShopCar .top .left b {
  margin: 0 10px;
}
.tableShopCar .top .left .packButton {
  display: -ms-flexbox;
  display: flex;
  border-radius: 4px;
}
.tableShopCar .top .left .packButton li {
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-right: none;
  min-width: 100px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  padding: 5px 10px;
}
.tableShopCar .top .left .packButton li span {
  font-size: 12px;
  line-height: 18px;
  color: #666;
}
.tableShopCar .top .left .packButton li i {
  font-size: 10px;
  line-height: 12px;
  color: #d01126;
  border: 1px solid #d01126;
  border-radius: 4px;
  padding: 0 4px;
}
.tableShopCar .top .left .packButton li:first-child {
  border-radius: 4px 0 0 4px;
}
.tableShopCar .top .left .packButton li:last-child {
  border-radius: 0 4px 4px 0;
  border-right: 1px solid #d9d9d9;
}
.tableShopCar .top .left .packButton > li.active {
  border: 1px solid #d01126;
  border-right-color: #d01126;
}
.tableShopCar .top .left .packButton > li.active span {
  color: #d01126;
}
.tableShopCar .top .left .packButton > li.onlyOne {
  border-radius: 4px;
}
.tableShopCar .top .rightBtn {
  text-align: right;
}
.tableShopCar .top .rightBtn b {
  margin: 0;
}
.tableShopCar .goods {
  margin-bottom: 20px;
  padding: 0 15px;
}
.tableShopCar .noData {
  text-align: center;
  img {
    width: 60px;
    height: 40px;
  }
  p {
  }
}
.tableShopCar .goods .item {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 5px;
}
.tableShopCar .goods .item img {
  width: 50px;
  height: 50px;
}
.tableShopCar .goods .item span {
  font-size: 12px;
  line-height: 17px;
  color: #666;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}
.tableShopCar .total {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  background: #fafafa;
  border-radius: 0 0 4px 4px;
}
.tableShopCar .total > div {
  line-height: 50px;
  padding: 0 15px;
}
.tableShopCar .total > div span {
  font-size: 12px;
  line-height: 17px;
  color: #999;
}
.tableShopCar .total > div em {
  font-size: 15px;
  line-height: 17px;
  color: #d01126;
}
.tableShopCar .total > div strong {
  font-size: 20px;
  line-height: 24px;
  color: #d01126;
  font-family: dina;
  font-weight: 700;
}
.tableShopCar .type2 {
  text-align: right;
}
.tableShopCar .type2 b {
  margin: 0;
}
.tableShopCar .addPackage {
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
}
.tableShopCar .addPackage .car {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 0 20px;
  width: 1000px;
  height: 750px;
  background: #fff;
}
.tableShopCar .addPackage .car h2 {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ebeef5;
  line-height: 50px;
  height: 50px;
}
.tableShopCar .addPackage .car h2 span {
  font-size: 18px;
  line-height: 1;
  color: #444;
  font-weight: 700;
}
.tableShopCar .addPackage .car h2 i {
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  color: #444;
}
.tableShopCar .tipsAlert {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 8;
  width: 100%;
  height: 150%;
  background: rgba(0, 0, 0, 0.6);
}
.pickGoods {
  display: flex;
  flex-direction: column;
}
.pickGoods .title {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  line-height: 48px;
  color: #444;
  background: #f4f4f5;
}
.pickGoods .title li strong {
  position: relative;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  width: 20px;
  // height: 34px;
  text-align: center;
  vertical-align: middle;
  margin-left: 15px;
}

.pickGoods .goodsInfo {
  height: 660px;
  overflow: auto;
  flex: 1;
}
.pickGoods .goodsInfo li {
  padding: 20px 30px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  .goodsImg {
    width: 50px;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .goodsDetail {
    width: 200px;
    h6 {
      font-size: 14px;
      line-height: 30px;
      color: #444;
    }
    p {
      font-size: 14px;
      line-height: 20px;
      color: #888;
      text-overflow: ellipsis;
      overflow: hidden;
      display: flex;
      -webkit-line-clamp: 2;
    }
  }
  .price {
    width: 100px;
    span {
      font-size: 14px;
      line-height: 28px;
      color: #888;
      strong {
        color: #d01126;
      }
    }
  }
  .operate {
    width: 150px;
    text-align: right;
    p {
      margin-top: 12px;
    }
  }
}
.btnSuccess {
  float: right;
  margin-right: 0px;
  // width: 80px;
  // padding: 0 26px;
}
.updateFrom {
  margin-top: 20px;
}
</style>
