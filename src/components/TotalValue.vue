<template>
  <!-- (2.) Подсвечивать красным total value если значение меньше нуля,
  зеленым если больше нуля и если ноль то черным-->
  <div class="total-value" v-bind:class="[{ green: total>0 },{ red: total<0 }]">{{ total }}</div>
</template>

<script>
export default {
  name: 'TotalValue',
  props: {
    total: {
      // Тип String больше не пригодится
      // type: String | Number,
      type: Number,
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
