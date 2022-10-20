import { ref, watch } from 'vue'

export function setValidationWatcher(inputValue, validators, callback, immediate=false) {
    const errors = ref([])
    watch(
        inputValue,
    value => {
            errors.value = validators.map(validator => validator(value)).filter(error => error !== null)
            callback(errors.value)
        },
{ immediate }
    )
    return { errors }
}

export function formatPhoneNumber(phone) {
    return phone.replace(/[^0-9+]/, '')
        .replace(/([0-9+]{3})(\d)/, '$1 $2')
        .replace(/([\0-9+]{3}\s\d{2})(\d{1,2})/, '$1 $2')
        .replace(/([\0-9+]{3}\s\d{2}\s\d{2})(\d{1,2})/, '$1 $2')
        .replace(/([\0-9+]{3}\s\d{2}\s\d{2}\s\d{2})\d+?$/, '$1')
}

