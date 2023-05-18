<template>
  <div class="main">
    <div class="inputArea">
      <i class="iconfont icon-search1"></i>
      <input type="text" placeholder="" class="search" @keydown.enter="searchEnterFun">
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavSearch',
  data () {
    return {}
  },
  methods: {
    searchEnterFun () {
      if (!localStorage.getItem('token')) return this.$router.push('/error')
      this.$router.push({ path: '/result' })
    }
  }
}
</script>

<style lang="less" scoped>
@input-area-height: 34px;
@main-padding-left: 40px;
@main-padding-right: 120px;

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  min-width: 120px;
  padding-left: @main-padding-left;
  padding-right: @main-padding-right;

  .inputArea {
    flex: 1;
    display: flex;
    align-items: center;
    height: @input-area-height;
    box-shadow: 0 0 0.05rem 0.05rem rgba(0, 0, 0, 0.1) inset;
    border-radius: 4px;
    background-color: var(--background-color);
    padding: 0 16px 0 0;

    input[type="text"] {
      font-weight: 400;
      color: var(--color);
      font-size: 14px;
      width: 98%;
      height: @input-area-height;
      //height: 20px;
    }

    i {
      padding: 0 7px;
    }
  }
}

//@media screen and (min-width: 991px) {
//  .main {
//    padding-right: 10vw;
//  }
//}

@media screen and (max-width: 991px) {
  .main {
    padding-left: 2vw;
    //padding-right: 20vw;
    .inputArea {
      height: 32px;
      max-width: 500px;
    }
  }
}

@media screen and (max-width: 768px) {
  .main {
    //padding-left: 2vw;
    //padding-right: 20vw;
  }
}

@media screen and (max-width: 576px) {
  .main {
    padding-right: 12vw;
    //width: 60%;
  }
}

</style>
