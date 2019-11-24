<template>
  <ElCard class="form-card">
    <ElForm :model="formData" ref="addNewItemForm" :rules="rules" label-position="top">
      <ElFormItem label="Type" prop="type">
        <ElSelect class="type-select" v-model="formData.type" placeholder="Choose type...">
          <ElOption label="Income" value="INCOME"/>
          <ElOption label="Outcome" value="OUTCOME"/>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Comments" prop="comment">
        <ElInput v-model="formData.comment" />
      </ElFormItem>
      <ElFormItem label="Value" prop="value">
        <ElInput v-model.number="formData.value" />
      </ElFormItem>
      <ElButton @click="onSubmit" type="primary">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
function customNumValidator (rule, value, callback) {
  if (value === 0) {
    return callback(new Error('Число должно быть больше нуля'))
  }
  callback()
}

export default {
  name: 'Form',
  data: () => ({
    formData: {
      type: 'INCOME',
      comment: '',
      value: 0
    },
    rules: {
      type: [
        { required: true, message: 'Please select type', trigger: 'change' }
      ],
      comment: [
        { required: true, message: 'Please input comment', trigger: 'change' }
      ],
      value: [
        { required: true, message: 'Value is required', trigger: 'change' },
        { type: 'number', message: 'Value must be a number', trigger: 'change' },
        { validator: customNumValidator, trigger: 'change' }
      ]
    }
  }),
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.$refs.addNewItemForm.validate((valid) => {
        if (valid) {
          this.$emit('submitForm', { ...this.formData })
          this.$refs.addNewItemForm.resetFields()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-card {
  max-width: 500px;
  margin: auto;
  .type-select {
    width: 100%;
  }
}
</style>
