const User = require('../../src/models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const {
    validateRegisterInput,
    validateLoginInput,
} = require('../../utils/validators')

const generateToken = user => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' },
    )
}

module.exports = {
    Mutation: {
        async login(_, { loginInput: { email, password } }) {
            const { valid, errors } = validateLoginInput(email, password)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            const user = await User.findOne({ email })
            if (!user) {
                errors.general = 'User with this mail does not exist'
                throw new UserInputError('User with this mail does not exist', {
                    errors,
                })
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.general = 'Wrong credentials'
                throw new UserInputError('Wrong credentials', { errors })
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token,
            }
        },
        async register(
            _,
            { registerInput: { username, password, confirmPassword, email } },
        ) {
            //TODO: Validate User data
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword,
            )
            if (!valid) throw new UserInputError(`Errors`, { errors })
            //TODO: Make sure user doesn't already exist
            const currentUser = await User.findOne({ email })
            console.log(currentUser)
            if (currentUser) {
                throw new UserInputError('User already exists', {
                    errors: {
                        username: 'Email Already Exists',
                    },
                })
            }
            //hash password
            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            })
            const res = await newUser.save()
            //create an auth token
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        },
    },
}
