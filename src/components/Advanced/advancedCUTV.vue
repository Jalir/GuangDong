<template>
  <div>
    <show-item-module :obj="obj" ref="itemContent"></show-item-module>
  </div>
</template>

<script>
import ShowItemModule from '@/components/Advanced/advancedItemDetail'

export default {
  name: 'AA',
  components: { ShowItemModule },
  data () {
    return {
      obj: {
        total: 1,
        pageSize: 10000,
        pageNo: 1,
        pageTotal: 36,
        getMethods: 'getItemListAsync',
        url: `api/cutv/f?id=${this.$route.query.id}`,
        method: ''
        // send: false
      }
    }
  },
  mounted () {
    // this.$store.commit('changeLoading', true)
    this.setOptions()
    // this.showLoading = false
  },
  methods: {
    setOptions () {
      // const pagesize = 100
      if (this.$route.query.id) {
        // this.$store.commit('changeLoading', false)
        this.obj.getMethods = 'getItemListAsync'
        this.obj.pageSize = localStorage.getItem('pageSize') || 30
        this.obj.url = `api/cutv/f?id=${this.$route.query.id}`
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
    this.$refs.itemContent.clearImg()
    next()
  }
}
</script>

<style lang='less' scoped>

</style>
