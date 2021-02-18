const post = require('../../src/models/Post')

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await post.find()
                return posts
            } catch (error) {
                throw new Error(error)
            }
        },
    },
}
