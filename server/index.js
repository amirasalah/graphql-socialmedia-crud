const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typedefs/typeDefs.js')
require('dotenv').config()

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

mongoose
    .connect(process.env.mongoDbURL, {
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
