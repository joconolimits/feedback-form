import { computed } from 'vue'
import { useStore } from 'vuex'

export default function (mutation, fields) {
    const store = useStore()
    const computedFields = {}
    fields.forEach((field) => {
        computedFields[field] = computed({
            get:  () => store.state[field].model,
            set: value => store.commit(mutation, { fieldKey: field, fieldValue: value } )
        })
    })
    return computedFields
}
