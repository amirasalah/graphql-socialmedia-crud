const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const mongoDbURL =
    'mongodb+srv://yasmaAdmin:ssA19Jh51LWqJAR7@cluster0.5qoel.mongodb.net/<dbname>?retryWrites=true&w=majority'

//
const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`
const resolvers = {
    Query: {
        sayHi: () => 'Hello World!',
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
