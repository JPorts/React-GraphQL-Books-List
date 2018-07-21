const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express(); 

mongoose.connect('mongodb://Jordan:Test123@ds147181.mlab.com:47181/gql-bookslist');

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, () =>{
    console.log('Now listening for requests on port 4000');
});