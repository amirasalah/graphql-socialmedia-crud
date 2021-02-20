const { UserInputError, AuthenticationError } = require('apollo-server')
const post = require('../../src/models/Post')
const checkAuth = require('../../utils/check_util')

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const user = checkAuth(context)
            if (user) {
                if (body.trim() === '') {
                    throw new UserInputError('The comment cannot be empty', {
                        errors: { body: 'Comment body must not be empty' },
                    })
                }
            } else {
                throw new UserInputError('User does not exist')
            }
            const updatedPost = await post.findById(postId)
            if (updatedPost) {
                updatedPost.comments.unshift({
                    body,
                    username: user.username,
                    userId: user.id,
                    createdAt: new Date().toISOString(),
                })
                await updatedPost.save()
                return updatedPost
            } else {
                throw new UserInputError('Post not found')
            }
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const user = checkAuth(context)
            if (user) {
                const mainPost = await post.findById(postId)
                if (mainPost) {
                    await mainPost.comments.id(commentId).remove()
                    await mainPost.save()
                    return mainPost
                } else {
                    throw new UserInputError('Comment Does not Exist')
                }
            } else {
                throw new UserInputError('User does not exist')
            }
        },
        likePost: async (_, { postId }, context) => {
            const user = checkAuth(context)
            if (user) {
                const mainPost = await post.findById(postId)
                if (mainPost) {
                    if (mainPost.likes.find(l => l.userId == user.id)) {
                        mainPost.likes = mainPost.likes.filter(
                            l => l.userId != user.id,
                        )
                    } else {
                        mainPost.likes.push({
                            createdAt: new Date().toISOString(),
                            username: user.username,
                            userId: user.id,
                        })
                    }
                    await mainPost.save()
                    return mainPost
                } else {
                    throw new UserInputError('Post Does not Exist')
                }
            } else {
                throw new UserInputError('User does not exist')
            }
        },
    },
}
