<template>
  <div class="activitybar">
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
}
</style>
