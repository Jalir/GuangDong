<template>
  <div>
    <div class="error">右上角登录 <span>（测试，无需输入，确定即可）</span></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'error',
  created () {
    if (this.hasLogin) this.$router.push({ path: 'home/cutv' })
  },
  computed: {
    ...mapState(['hasLogin'])
  }
}
</script>

<style lang='less' scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 40px;
  margin: 20px;
}
</style>
