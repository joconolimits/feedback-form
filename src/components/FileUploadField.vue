<template>
  <div id="drop-area">
    <input type="file" id="fileElem" @change="handleSubmit" />
    <label class="ui button" for="fileElem">Select file</label>
    <span> or drop file</span>
  </div>
  <ErrorMessage :errors="errors" />
</template>

 <script>

 import { setValidationWatcher } from '../validations/validations'
import { onMounted, reactive, ref } from 'vue'
import ErrorMessage from './ErrorMessage'

async function mockUploadAPI() { return 'some_file_location' }

export default {
  name: 'FileUploadField',
  components: { ErrorMessage },
  emits: ['onValidate'],
  props: {
    validators: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const file = ref({})
    const dropArea = ref()
    function preventDefaults (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    function highlight() {
      dropArea.value.classList.add('highlight')
    }
    function unhighlight() {
      dropArea.value.classList.remove('highlight')
    }
    function handleDrop(e) {
      const files = e.dataTransfer.files
      file.value = reactive(files[0])
    }
    function handleSubmit(event) {
      file.value = reactive(event.target.files[0])
    }
    const onUploadValidated = async (errors) => {
      let filePath = ''
      if (!errors.length) {
        const formData = new FormData()
        formData.append('file', file.value)
        filePath = await mockUploadAPI(formData)
      }
      emit('onValidate', errors, filePath)
    }
    onMounted(() => {
      dropArea.value = document.getElementById('drop-area');
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.value.addEventListener(eventName, preventDefaults, false)
        document.body.addEventListener(eventName, preventDefaults, false)
      });
      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.value.addEventListener(eventName, highlight, false)
      });
      ['dragleave', 'drop'].forEach(eventName => {
        dropArea.value.addEventListener(eventName, unhighlight, false)
      });
      dropArea.value.addEventListener('drop', handleDrop, false)
    })
    const { errors } = setValidationWatcher(
        file,
        props.validators,
        onUploadValidated
    );
    return {
      errors,
      handleSubmit
    }
  }
}
</script>
<style>
#drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  margin-bottom: 1em;
}
#drop-area.highlight {
  border-color: blue;
}
#fileElem {
  display: none;
}
</style>
