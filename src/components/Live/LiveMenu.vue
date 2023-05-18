<template>
  <div>
    <section class="wrapper">
      <div class="menuMain">
        <div class="menu-title"><span>{{ title }}</span></div>
        <ul class="menu-list">
          <li @click="getChannel(item)" class="list-item" v-for="(item, index) in options" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LiveMenu',
  props: {
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String
    }
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    getChannel (item) {
      this.$emit('handleChannel', item)
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menuMain {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  width: 1100px;
  border-top: 1px solid rgba(0, 0, 0, 0);
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.6s ease-in;

  &:hover {
    border-top: 1px solid var(--color);
    border-bottom: 1px solid var(--color);
  }
}

.menu-title {
  height: 20px;
  padding: 0 20px;
  font-size: 14px;
  border-right: 1px solid var(--color);
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.menu-list {
  flex: 1;
  margin-left: 30px;
  max-height: 90px;
  overflow: hidden;
  transition: all 0.4s linear;
  &:hover {
    max-height: 300px;
  }

  .list-item {
    text-align: center;
    display: inline-block;
    margin: 0 10px;
    height: 30px;
    line-height: 30px;
    min-width: 64px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    transition: all 0.1s ease-in;

    //&:nth-child(n+12) {
    //  color: red;
    //}
    //
    //&:hover:nth-child(n+12) {
    //  color: white;
    //}

    &:hover {
      border-bottom: 1px solid var(--color);
    }
  }
}
</style>
