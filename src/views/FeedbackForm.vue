<template>
  <section class="feedback-form-view">
    <form class="ui form" @submit.prevent>
      <BaseInputField
          type="text"
          label="First name"
          icon="user"
          :validators="[minLength(3)]"
          v-model="formFields.firstName.value"
          @onValidate="(errors) => updateFieldState('firstName', errors)"
      />
      <BaseInputField
          type="text"
          label="Last name"
          icon="user"
          :validators="[minLength(3)]"
          v-model="formFields.lastName.value"
          @onValidate="(errors) => updateFieldState('lastName', errors)"
      />
      <BaseInputField
          type="text"
          label="Phone"
          icon="phone"
          :validators="[isDanishPhone()]"
          v-model="formFields.phone.value"
          @update:modelValue="setPhoneNumber"
          @onValidate="(errors) => updateFieldState('phone', errors)"
      />
      <BaseInputField
          type="email"
          label="Email"
          icon="envelope"
          :validators="[required(), isEmail()]"
          :required="true"
          v-model="formFields.email.value"
          @onValidate="(errors) => updateFieldState('email', errors)"
      />
      <div class="field">
        <textarea v-model="formFields.comment.value" placeholder="Content"></textarea>
      </div>
      <FileUploadField
          :validators="[maxFileSize(10)]"
          @onValidate="onUploadValidate"
      />
      <button
          class="ui button red fluid big"
          @click="submit"
          :disabled="isFormDataInvalid"
      >
        Submit
      </button>
    </form>
  </section>
</template>

<script>
import BaseInputField from '../components/BaseInputField'
import { isDanishPhone, isEmail, maxFileSize, minLength, required } from '../validations/validators'
import { formatPhoneNumber } from '../validations/validations'
import FileUploadField from '../components/FileUploadField'
import setComputedFields from '../utils/setComputedFields'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'FeedbackForm',
  components: {
    BaseInputField,
    FileUploadField
  },
  setup() {
    const store = useStore()
    const formFields = setComputedFields(
        'setFieldValue',
        ['firstName', 'lastName', 'email', 'phone', 'comment']
    )
    function updateFieldState(field, errors) {
      store.commit('setFieldState', {fieldKey: field, isInvalid: Boolean(errors.length)} )
    }
    const isFormDataInvalid = computed(() => store.getters.isFormDataInvalid)
    function setPhoneNumber(inputVal) {
      formFields.phone.value = formatPhoneNumber(inputVal)
    }
    function submit() {
      const formData = store.getters.formData
      console.log(formData);
      store.commit('resetFormFields')
    }
    function onUploadValidate(errors, filePath) {
      store.commit('setFieldValue', { fieldKey: 'file', fieldValue: filePath } )
      updateFieldState('file', errors)
    }

    return {
      isFormDataInvalid,
      formFields,
      updateFieldState,
      submit,
      onUploadValidate,
      minLength,
      isEmail,
      isDanishPhone,
      setPhoneNumber,
      maxFileSize,
      required
    }
  }
}
</script>

<style scoped>
.feedback-form-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 450px;
}
</style>
