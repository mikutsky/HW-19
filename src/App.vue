<template>
  <div id="app">
    <Form @submitForm="onFormSubmit"/>
    <TotalValue :total="totalValue"/>
    <BudgetList :list="list" @deleteItem="onDeleteItem"/>
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList'
import TotalValue from '@/components/TotalValue'
import Form from '@/components/Form'

export default {
  name: 'app',
  components: {
    BudgetList,
    TotalValue,
    Form
  },
  data: () => ({
    list: {
      1: {
        type: 'INCOME',
        value: 100,
        comment: 'Зарплата',
        id: 1
      },
      2: {
        type: 'OUTCOME',
        value: -50,
        comment: 'Еда',
        id: 2
      }
    }
  }),
  computed: {
    totalValue () {
      return Object.entries(this.list).reduce((acc, [, item]) => acc + item.value, 0)
    }
  },
  methods: {
    onDeleteItem (id) {
      this.$delete(this.list, id)
    },
    onFormSubmit (data) {
      const newObj = {
        ...data,
        id: this.list.length + 1
      }

      this.$set(this.list, newObj.id, newObj)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
