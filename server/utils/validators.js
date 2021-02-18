module.exports.validateRegisterInput = (
    email,
    password,
    confirmPassword,
    username,
) => {
    const errors = {}
    if (email.trim() === '') {
        errors.email = 'Email should not be empty'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regEx)) {
            errors.email = 'Email must be in a valid email format'
        }
    }
    if (password === '') {
        errors.password = 'Email Must not be empty'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Password and confirmPassword don't match"
    }
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}
module.exports.validateLoginInput = (email, password) => {
    const errors = {}
    if (email.trim() === '') {
        errors.username = 'email must not be empty'
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}
