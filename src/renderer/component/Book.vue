<template>
  <div class="books">
    <div class="books-area">
      <div class="books-nav">
        <div>正文</div>
      </div>
      <div class="books-con">
        <div>
          第一章
        </div>
        <div>
          第二章
        </div>
      </div>
    </div>
    <div class="books-area">
      <div class="books-nav">
        <div>正文</div>
      </div>
      <div class="books-con">
        <div>
          第一章
        </div>
        <div>
          第二章
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
}

.books-area {}

.books-nav {
  height: 22px;
  line-height: 22px;
  background: rgb(51, 56, 66);
  padding: 0 20px;
}

.books-con {
  padding: 20px;
}
</style>

