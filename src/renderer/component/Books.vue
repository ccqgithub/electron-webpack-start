<template>
  <div class="books">
    <div class="books-area">
      <div class="books-nav">
        <div>列表1</div>
        <div class="act">
          <span class="i iconfont icon-add"></span>
        </div>
      </div>
      <div class="books-con">
        <div>
          书一
        </div>
        <div>
          书二
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Books',
}
</script>

<style lang="less" scoped>
.books {
  width: 100%;
  height: 100%;
  color: rgb(202, 202, 202);
  // color: red;
}

.books-area {}

.books-nav {
  height: 22px;
  line-height: 22px;
  background: rgb(51, 56, 66);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .act {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .i {
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #fff;

    &:hover {
      color: red;
    }
  }
}

.books-con {
  padding: 20px;
}
</style>
