<template>
  <div class="notice">
    <div v-if="isOpen" class="noticeBase warning">
      <div class="scrollWrap">
        <p class="list">
          <b>
            <span>
              <Icon type="md-information-circle" color="ffad33" size="16" />
            </span>
            <span>平台通知</span>
            <em> {{ noticeObj.remark }} </em>
          </b>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { topNotice } from '@/api/notice'
import statusCode from '@/common/statusCode'
export default {
  name: 'AdriftNotice',
  components: {},
  data() {
    return {
      noticeObj: {},
      isOpen: false
    }
  },
  created() {
    this.getTopNotice()
  },
  methods: {
    getTopNotice() {
      topNotice().then(response => {
        const resData = response.data
        if (
          statusCode.OK === resData.returnCode &&
          typeof resData.data !== 'undefined'
        ) {
          this.isOpen = true
          this.noticeObj = resData.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.backStage .notice {
  max-width: 1450px;
  width: 1450px;
  text-align: left;
  margin: 0 auto 10px;
}
.noticeBase {
  border-radius: 4px;
  line-height: 1;
  padding: 0 20px;
  height: 32px;
  line-height: 32px;
  display: -ms-flexbox;
  display: flex;
}

.noticeBase em,
.noticeBase p,
.noticeBase span,
.noticeBase strong {
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
  color: #666;
  letter-spacing: 1px;
}

.noticeBase i {
  margin-right: 8px;
  color: #fa0;
  margin-bottom: 4px;
}

.noticeBase .scrollWrap {
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
  height: 100%;
  line-height: 32px;
  white-space: nowrap;
}

.noticeBase .scrollWrap p {
  display: inline;
  min-width: 100%;
  cursor: pointer;
}

.list {
  position: relative;
  top: 0px;
  left: 0px;
  list-style: none;
  animation: mymove 10s infinite linear;
}
.list li {
  border: 1px solid white;
  background: blue;
  float: left;
  vertical-align: middle;
  text-align: center;
  color: white;
  font-weight: 600;
}
@keyframes mymove {
  from {
    left: -100px;
  }
  to {
    left: 1300px;
  }
}
</style>
