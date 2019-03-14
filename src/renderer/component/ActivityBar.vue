<template>
  <div class="activitybar">
    <div
      class="item"
      :class="{ 'is-actived': active === 'book' }"
      @click="selectItem('book')"
    >
      书籍
    </div>
    <div
      class="item"
      :class="{ 'is-actived': active === 'account' }"
      @click="selectItem('account')"
    >
      账号
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityBar',
  props: {
    //
  },
  data() {
    return {
      active: 'book'
    };
  },
  mounted() {
    this.$emit('change', this.active);
  },
  methods: {
    selectItem(val) {
      this.active = val;
      this.$emit('change', this.active);
    }
  }
};
</script>

<style lang="less" scoped>
.activitybar {
  background: rgb(51, 56, 66);
  height: 100%;

  .item {
    height: 40px;
    line-height: 40px;
    color: #999;
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid #000;

    &.is-actived {
      color: #fff;
    }
  }
}
</style>
