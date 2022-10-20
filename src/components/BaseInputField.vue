<template>
  <div class="field">
    <div :class="['ui', 'left', { 'icon' : icon }, 'input', 'big']">
      <i :class="[icon, 'icon']" v-if="icon"></i>
      <input
        :type="type"
        :placeholder="label"
        autocomplete="off"
        v-model="inputValue"
      />
    </div>
    <ErrorMessage :errors="errors" />
  </div>
</template>

 <script>

 import { setValidationWatcher } from '../validations/validations'
import { computed } from 'vue'
import ErrorMessage from './ErrorMessage'

export default {
  name: 'BaseInputField',
  components: { ErrorMessage },
  emits: ['onValidate'],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    validators: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const inputValue = computed({
      get:  () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })
    const { errors } = setValidationWatcher(
        inputValue,
        props.validators,
        errors => emit('onValidate', errors),
        props.required
    );
    return {
      inputValue,
      errors
    }
  }
}
</script>
