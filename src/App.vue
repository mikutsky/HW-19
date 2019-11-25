<template>
  <div id="app">
    <Form @submitForm="onFormSubmit" />
    <TotalValue :total="totalValue" />
    <BudgetList :list="list" @deleteItem="onDeleteItem" />
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList'
import TotalValue from '@/components/TotalValue'
import Form from '@/components/Form'

// Ключи не должны повторятся поэтому создаем простейший счетчик
// Счетчик начнем с 100 т.к. в учебном примере есть стартовые
// значения в data:()=>({list: ...})
const genId = (function (n) {
  let count = n
  return () => count++
})(100)

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
      // Если список пуст - вернем 0, что бы избавится от String в TotalValue
      const itemsCount = Object.keys(this.list).length
      return itemsCount
        ? Object.entries(this.list).reduce((acc, [, item]) => acc + item.value, 0) : 0
    }
  },
  methods: {
    onDeleteItem (id) {
      this.$delete(this.list, id)
    },
    onFormSubmit (data) {
      const newObj = {
        ...data,

        // id: this.list.length + 1
        // ^ Предложенный на лекции вариант расчета индекса не работает, т.к.:
        // a) Длину объекта, как у массива не определить, значение будет одно
        // и тоже: undefined + 1 = NaN;
        // b) При удалении записей в BudgetList - длина уменьшится, и следущее
        // созданное значение будет перезаписывать существующее, т.к. id сгенерированное
        // на основе меньшего кол-ва записей уже существует, по этому делаю так:
        id: genId()
      }

      this.$set(this.list, newObj.id, newObj)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
// 1. Подсвечивать сумму в budget item красным если это расход и
// зеленым если это доход

// 2. Подсвечивать красным total value если значение меньше нуля,
// зеленым если больше нуля и если ноль то черным
.green {
  color: green;
}
.red {
  color: red;
}
</style>
