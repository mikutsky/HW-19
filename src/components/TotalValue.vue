<template>
  <div class="total-value">{{ total }}</div>
</template>

<script>
export default {
  name: 'TotalValue',
  props: {
    total: {
      type: String | Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.total-value {
  font-size: 26px;
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
}
</style>
