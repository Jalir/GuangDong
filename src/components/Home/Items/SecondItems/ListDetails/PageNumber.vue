<template>
  <div>
    <!--上一页-->
    <button @click="prePage" :disabled="currentPage === 1">上一页</button>
    <!--总页数小于8的-->
    <template v-if="pageTotal <= showPageNo">
      <button v-for="i in pageTotal" @click="changeCurrentPage(i)" :class="{active:i === currentPage}" :key="i">
        {{ i }}
      </button>
    </template>
    <template v-else-if="currentPage < 4">
      <button v-for="i in 6" @click="changeCurrentPage(i)" :class="{active:i === currentPage}" :key="i">{{ i }}</button>
      <button :disabled="true">···</button>
      <button @click="changeCurrentPage(pageTotal)">{{ pageTotal }}</button>
    </template>
    <template v-else-if="currentPage > pageTotal - 4">
      <button @click="changeCurrentPage(1)">1</button>
      <button :disabled="true">···</button>
      <button v-for="i in 6" @click="changeCurrentPage(i + (pageTotal - 6))"
              :class="{active:(i + (pageTotal - 6)) === currentPage}" :key="i">{{ i + (pageTotal - 6) }}
      </button>
    </template>
    <!--总页数大于8的-->
    <template v-else>
      <button @click="changeCurrentPage(1)">1</button>
      <button :disabled="true">···</button>
      <button @click="changeCurrentPage(currentPage - 2)">{{ currentPage - 2 }}</button>
      <button @click="changeCurrentPage(currentPage - 1)">{{ currentPage - 1 }}</button>
      <button class="active">{{ currentPage }}</button>
      <button @click="changeCurrentPage(currentPage + 1)">{{ currentPage + 1 }}</button>
      <button @click="changeCurrentPage(currentPage + 2)">{{ currentPage + 2 }}</button>
      <button :disabled="true">···</button>
      <button @click="changeCurrentPage(pageTotal)">{{ pageTotal }}</button>
    </template>
    <!--下一页-->
    <button @click="nextPage" :disabled="currentPage === pageTotal">下一页</button>
  </div>
</template>

<script>
export default {
  name: 'pageComponent.vue',
  data () {
    return {
      currentPage: 1,
      showPageNo: 8
    }
  },
  mounted () {
    // console.log(this.currentPage)
    this.currentPage = 1
  },
  props: {
    // 分页配置
    pageConfig: {
      type: Object,
      require: true,
      default () {
        return {
          pageSize: 10,
          pageNo: 0,
          total: 0,
          pageTotal: 0
        }
      }
    }
  },
  computed: {
    pageTotal () {
      const config = this.pageConfig
      if (config.pageTotal) {
        return config.pageTotal
      } else {
        if (config.pageSize && config.total) {
          return Math.ceil(config.total / config.pageSize)
        } else {
          return 0
        }
      }
    }
  },
  methods: {
    prePage () {
      this.currentPage -= 1
      this.$emit('changeCurrentPage', this.currentPage)
    },
    nextPage () {
      this.currentPage += 1
      this.$emit('changeCurrentPage', this.currentPage)
    },
    changeCurrentPage (i) {
      this.currentPage = i
      this.$emit('changeCurrentPage', this.currentPage)
    }
  }
}
</script>

<style lang='less' scoped>
button {
  width: 46px;
  height: 30px;
  border: 0;
  border-radius: 6px;
  background-color: var(--background-color);
  color: var(--color);
  margin-right: 12px;
  cursor: pointer;
  border: 1px solid var(--color);
  border: 1px solid #c4c4c4;

  &.active, &:hover {
    color: var(--background-color);
    background-color: var(--a-active-hover);
  }

  &:first-child, &:last-child {
    width: 70px;
  }
}
</style>
