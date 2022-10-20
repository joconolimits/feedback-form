import { createStore } from 'vuex'

const initFormFields = () =>  ({
    firstName: {
        model: '',
        invalid: false,
    },
    lastName: {
        model: '',
        invalid: false,
    },
    email: {
        model: '',
        invalid: true,
    },
    phone: {
        model: '',
        invalid: false,
    },
    comment: {
        model: '',
        invalid: false,
    },
    file: {
        model: '',
        invalid: false,
    }
})

export const store = createStore({
    state () {
        return initFormFields()
    },
    getters: {
        isFormDataInvalid(state) {
            return Object.keys(state).some(field => state[field].invalid)
        },
        formData(state) {
            return Object.keys(state).reduce((acc, cur) => {
                acc[cur] = state[cur].model
                return acc
            }, {})
        }
    },
    mutations: {
        setFieldValue(state, {fieldKey, fieldValue}) {
          state[fieldKey].model = fieldValue
        },
        setFieldState(state, {fieldKey, isInvalid}) {
          state[fieldKey].invalid = isInvalid
        },
        resetFormFields(state) {
           Object.assign(state, initFormFields())
        }
    }
})
