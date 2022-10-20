<template>
    <div class="ui basic label pointing red" v-if="errors.length">
      <div :key="error" v-for="error in errors"> {{ error }} </div>
    </div>
</template>

 <script>

export default {
  name: 'ErrorMessage',
  props: {
    errors: {
      type: Array,
      default: () => []
    }
  }
}
</script>
