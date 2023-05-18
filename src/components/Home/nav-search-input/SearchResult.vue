<template>
    <div>
        <ShowItemModule :obj="obj" ref="itemContent"></ShowItemModule>
    </div>
</template>

<script>
import ShowItemModule from '@/components/Home/Items/SecondItems/ListDetails/ItemDetail'

export default {
  name: 'searchResult',
  components: { ShowItemModule },
  data () {
    return {
      obj: {
        total: 1,
        pageSize: 10000,
        pageNo: 1,
        pageTotal: 2,
        getMethods: 'getSearchAsync',
        url: '',
        method: ''
        // send: false
      }
    }
  },
  mounted () {
    $('.search').keydown(e => {
      if (e.keyCode === 13) {
        // console.log('12')
        this.$refs.itemContent.getContent($('.search').val())
      }
    })
    if ($('.search').val()) this.sendSearchInfo()
  },
  methods: {
    sendSearchInfo (text) {
      this.obj.getMethods = 'getSearchAsync'
      this.obj.pageSize = 30
      this.$refs.itemContent.getContent($('.search').val())
      $('.search').val('')
    }
  }
}
</script>

<style lang='less' scoped>

</style>
