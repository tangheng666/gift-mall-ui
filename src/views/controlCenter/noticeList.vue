<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="noticeList">
        <div class="title">
          <ul class="navTitle">
            <li class="nav active">公告</li>
            <li class="lastRight" />
          </ul>
        </div>
        <div class="tables">
          <Table :data="tableData" :columns="tableColumns" @on-row-click="rowClick" />
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="total" :current="searchForm.page" :page-size="searchForm.limit" :page-size-opts="[5, 10, 20, 40]" show-total show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize" />
            </div>
          </div>
        </div>
      </div>
      <Modal v-model="noticeModalDetail" :width="800" :closable="false" :mask-closable="false">
        <div style="text-align:center;margin:20px;">
          <p class="previewTitle">
            <span>{{ noticeForm.title }}</span>
          </p>
          <p class="previewDate"> {{ noticeForm.dateCreated }}</p>
          <p class="previewRemark"> <span>摘要&nbsp;&nbsp;</span>{{ noticeForm.remark }}</p>

          <p v-html="noticeForm.content" />
        </div>
        <div slot="footer" style="text-align: center;">
          <Button type="primary" @click="closeDetail">已阅</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { leftRouter } from './components'
import { getAllNotice } from '@/api/notice'
import statusCode from '@/common/statusCode'
export default {
  components: { leftRouter },
  data() {
    return {
      tableData: [],
      total: 0,
      searchForm: {
        page: 1,
        limit: 10
      },
      tableColumns: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '摘要',
          key: 'remark',
          width: 700,
          render(h, param) {
            let remarkData = param.row.remark
            if (remarkData.length > 60) {
              remarkData = remarkData.substring(0, 50) + '......'
            }
            return h(
              'Tooltip',
              {
                props: {
                  placement: 'top',
                  content: param.row.remark,
                  maxWidth: 800
                }
              },
              remarkData
            )
            // <Tooltip content="Top Center text" placement="">
          }
        },
        {
          title: '发布时间',
          key: 'dateCreated'
        }
      ],
      noticeModalDetail: false,
      noticeForm: {
        title: '',
        dateCreated: '',
        remark: '',
        content: ''
      }
    }
  },
  created() {
    this.getAllNotice()
  },
  methods: {
    getAllNotice() {
      getAllNotice(this.searchForm).then(res => {
        const resData = res.data
        if (resData.returnCode === statusCode.OK) {
          this.tableData = resData.data
          this.total = resData.total
        } else {
          this.$Message.info(resData.returnMessage)
        }
      })
    },
    changePage(v) {
      this.searchForm.page = v
      this.getAllNotice()
    },
    changePageSize(v) {
      this.searchForm.limit = v
      this.getAllNotice()
    },
    rowClick(obj) {
      this.noticeForm = obj
      this.noticeModalDetail = true
    },
    closeDetail() {
      this.noticeModalDetail = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.noticeList {
  padding-left: 20px;
  .navTitle {
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #ddd;
  }
}

.navTitle .nav {
  padding-top: 20px;
  margin-right: 60px;
  cursor: pointer;
  border-bottom: 0 solid #d01126;
  font-size: 18px;
  line-height: 1;
  color: #444;
  font-weight: 700;
}
.navTitle .active {
  border-bottom: 4px solid #d01126;
  border-radius: 1px;
}
.navTitle li {
  padding-bottom: 15px;
  transition: all 0.3s;
}
.navTitle .lastRight {
  -ms-flex: 1;
  flex: 1;
  text-align: right;
  -ms-flex-item-align: end;
  align-self: flex-end;
}
.noticeList .tables {
  margin-top: 24px;
}

.previewRemark {
  font-size: 16px;
  text-align: left;
  margin-bottom: 20px;
  border: 1px solid #dedede;
  border-radius: 4px;
  background: #f0f0f0;
  padding: 0 6px;
  font-size: 16px;
  line-height: 40px;
}

.previewTitle {
  font-size: 24px;
  text-align: left;
  height: 25px;
  line-height: 25px;
  margin-bottom: 20px;
}

.previewDate {
  font-size: 16px;
  text-align: left;
  margin-bottom: 20px;
}
</style>
