<template>
  <div class="budget-list-wrap">
    <ElCard header="Budget List">
      <!-- [[prop, item], [prop, item]...] -->
      <template v-if="notEmpty">
        <div class="list-item" v-for="(item, prop) in list" :key="prop">
          <span class="budget-comment">{{ item.comment }}</span>
          <span class="budget-value">{{ item.value }}</span>
          <ElButton type="danger" size="mini" @click="deleteItem(item.id)">Delete</ElButton>
        </div>
      </template>
      <ElAlert v-else type="info" title="Empty list" :closable="false"/>
    </ElCard>
    <!-- <div v-for="(item, index) in list"></div> -->
    <!-- <div v-for="(item, prop) in list"></div> -->
  </div>
</template>

<script>
export default {
  name: 'BudgetList',
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    notEmpty () {
      return Object.keys(this.list).length
    }
  },
  methods: {
    deleteItem (id) {
      this.$emit('deleteItem', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
  .list-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    .budget-value {
      font-weight: bold;
      margin-left: auto;
      margin-right: 20px;
    }
  }
}
</style>
