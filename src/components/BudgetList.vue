<template>
  <div class="budget-list-wrap">
    <ElCard header="Budget List">
      <template v-if="notEmpty">
        <div class="list-item" v-for="(item, prop) in list" :key="prop">
          <!-- (4.) Если нет в списке редактируемых, то отображаем запись -->
          <template v-if="!editableItem[item.id]">
            <span class="budget-comment">{{ item.comment }}</span>
            <!-- (1.) Подсвечивать сумму в budget item красным если это расход
            и зеленым если это доход-->
            <span
              class="budget-value"
              v-bind:class="[{ green: item.type==='INCOME' }, { red: item.type==='OUTCOME' }]"
            >{{ item.value }}</span>
            <ElButton type="default" size="mini" @click="editItem(item.id)">Edit</ElButton>
            <ElButton type="danger" size="mini" @click="deleteItem(item.id)">Delete</ElButton>
          </template>
          <!-- 4. Добавить возможность редактирования отдельного budget item. В
          каждом budget item должна быть кнопка edit по ее нажатию на месте
          текста с комментарием и суммой должны появляться инпуты с текущими
          значениями и их можно отредактировать подтвердить редактирование
          можно по кнопке которая появляется при редактировании. Также должна
          быть кнопка отмены редактирования.-->
          <template v-else>
            <ElInput class="budget-comment" v-model="editableItem[item.id].comment" />
            <ElInput class="budget-value" v-model.number="editableItem[item.id].value" />
            <ElButton type="primary" size="mini" @click="applyEdit(editableItem[item.id])">Apply</ElButton>
            <ElButton type="info" size="mini" @click="cancelEdit(item.id)">Cancel</ElButton>
          </template>
        </div>
      </template>
      <ElAlert v-else type="info" title="Empty list" :closable="false" />
    </ElCard>
  </div>
</template>

<script>
export default {
  name: 'BudgetList',
  data: () => ({
    // (4.) Список редактируемых записей
    editableItem: {}
  }),
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
    },
    // (4.) Добавляем запись в список редактируемых
    editItem (id) {
      this.$set(this.editableItem, id, { ...this.list[id] })
    },
    // (4.) Удаляем запись из списка редактируемых
    cancelEdit (id) {
      this.$delete(this.editableItem, id)
    },
    // (4.) Заменяем существующую запись на отредактированную
    // если необходимо меняем тип записи, значение value равное 0
    // не применяем
    applyEdit (newItem) {
      if (newItem.value < 0) newItem.type = 'OUTCOME'
      else newItem.type = 'INCOME'
      if (newItem.value === 0) newItem.value = this.list[newItem.id].value
      this.$set(this.list, newItem.id, { ...newItem })
      // (4.) Удаляем запись из списка редактируемых
      this.cancelEdit(newItem.id)
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
    .budget-comment {
      font-weight: bold;
      margin-left: 0;
      margin-right: 10px;
    }
    .budget-value {
      max-width: 100px;
      font-weight: bold;
      margin-left: auto;
      margin-right: 20px;
    }
  }
}
</style>
