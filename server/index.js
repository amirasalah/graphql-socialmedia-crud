const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const post = require('./src/models/Post')

const mongoDbURL =
    'mongodb+srv://yasmaAdmin:ssA19Jh51LWqJAR7@cluster0.5qoel.mongodb.net/yasma?retryWrites=true&w=majority'

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String
        username: String
    }
    type Query {
        getPosts: [Post]
    }
`
const resolvers = {
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
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

mongoose
    .connect(mongoDbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server Running at ${res.url}`)
    })
    .catch(err => {
        console.log(err)
    })
