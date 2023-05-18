<template>
  <div>
    <show-item-module :obj="obj" ref="itemContent"></show-item-module>
  </div>
</template>

<script>
import ShowItemModule from '@/components/Home/Items/SecondItems/ListDetails/ItemDetail'

export default {
  name: 'CUTV',
  components: { ShowItemModule },
  data () {
    return {
      obj: {
        total: 1,
        pageSize: 10000,
        pageNo: 1,
        pageTotal: 36,
        getMethods: 'getItemListAsync',
        url: `api/cutv/d?id=${this.$route.query.id}`,
        method: ''
      }
    }
  },
  mounted () {
    this.setOptions()
  },
  methods: {
    setOptions () {
      // const pagesize = 100
      if (this.$route.query.id) {
        this.obj.getMethods = 'getItemListAsync'
        this.obj.pageSize = localStorage.getItem('pageSize') || 120
        this.obj.url = `api/cutv/d?id=${this.$route.query.id}`
        this.$refs.itemContent.getContent()
      } else {
        this.$store.commit('clearAllMsgList')
        this.$refs.itemContent.defaultStatus()
      }
    }
  },
  watch: {
    $route () {
      if (this.$route.path) this.setOptions()
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('changeLoading', true)
    this.$store.commit('changeLoadingTips', '请选择栏目')
    this.$refs.itemContent.clearImg()
    next()
  },
  beforeDestroy () {
    this.$store.commit('changeLoadingTips', '请选择栏目')
  }
}
</script>

<style lang='less' scoped>

</style>
