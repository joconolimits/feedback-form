const minLength = min => {
    return input => input.length < min
        ? `Value must be at least ${min} characters`
        : null
}

const isEmail = () => {
    const re = /\S+@\S+\.\S+/
    return input => re.test(input)
        ? null
        : 'Must be a valid email address'
}

const isDanishPhone = () => {
    const re = /^((\(?\+45\)?)?)(\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/
    return input => re.test(input)
        ? null
        : 'Valid number must be +45 xx xx xx xx'
}

const maxFileSize = max => {
    return file => file.size > max * 1024 * 1024
        ? `File must be less than ${max}MB`
        : null
};

export { minLength, isEmail, isDanishPhone, maxFileSize }
