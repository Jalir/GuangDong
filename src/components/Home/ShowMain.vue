<template>
  <div class="home">
    <second-nav></second-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import SecondNav from '@/components/Home/Items/SecondNav'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    SecondNav
  },
  mounted () {
    this.$store.commit('changeLoadingTips', '请选择栏目')
  },
  data () {
    return {
      // error: Boolean
    }
  },
  created () {
    if (!this.hasLogin) this.$router.push({ path: '/error' })
  },
  computed: {
    ...mapState(['hasLogin'])
  }
}
</script>

<style lang="less" scoped>

</style>
