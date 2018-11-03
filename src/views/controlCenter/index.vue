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
        <my />
      </div>
    </div>
  </div>
</template>

<script>
import { leftRouter, my } from './components'
export default {
  name: 'Index',
  components: {
    leftRouter,
    my
  },
  data() {
    return {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
