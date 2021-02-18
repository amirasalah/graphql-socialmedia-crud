const post = require('../../src/models/Post')
const checkAuth = require('../../utils/check_util')

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
    Mutation: {
        createPost: async (_, { body }, context) => {
            const user = checkAuth(context)
            if (user) {
                const newPost = new post({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                })
                const resPost = await newPost.save()
                return resPost
            }
        },
    },
}
