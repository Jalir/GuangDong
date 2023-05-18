<template>
    <div>
        <div class="error">
            <div>抱歉！页面无法访问……</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang='less' scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  font-size: 30px;
}
</style>
