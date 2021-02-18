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
        getPost: async (_, { postId }) => {
            try {
                const onePost = await post.findById(postId)
                if (onePost) {
                    return onePost
                } else {
                    throw new Error('Post not found')
                }
            } catch (error) {
                throw new Error(error)
            }
        },
    },
}
