const { gql } = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String
        userId: String
        comments: [Comment]!
        likes: [Like]!
    }
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        userId: ID!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        username: String!
        userId: ID!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input LoginInput {
        email: String!
        password: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    } 
`
