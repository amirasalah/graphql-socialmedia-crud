const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

module.exports = context => {
    const authHeader = context.req.headers.authorization
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY)
                return user
            } catch (error) {
                throw new AuthenticationError('Invalid Token')
            }
        }
        throw new AuthenticationError('Auth Header must be in the right format')
    }
    throw new AuthenticationError('Auth Header must be provided')
}