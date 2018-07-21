const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
     GraphQLString,
      GraphQLSchema,
      GraphQLID,
      GraphQLInt
    } = graphql;


// DUMMY DATA//
var books = [
    {name:'Principles in Life & Work',genre:'Non Fiction',id:'1',authorId:'1'},
    {name:'Pragmatic Programmer',genre:'Non Fiction',id:'2',authorId:'2'},
    {name:'Design Patterns in Narnia',genre:'Fantasy',id:'3',authorId:'3'},
    {name:'Story Mapping',genre:'Non Fiction',id:'4',authorId:'4'}
];

// DUMMY DATA//
var authors = [
    {name:'Ray Dalio', age:68, id:'1'},
    {name:'Andrew Hunt', age:53, id:'2'},
    {name:'Elisabeth Freeman', age:55, id:'3'},
    {name:'Jeff Patton', age:61, id:'4'}

];

// BOOK TYPE// 
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() =>({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent, args){
                return _.find(authors, {id:parent.authorId});
            }
        }
    })
});

// AUTHOR TYPE//
const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() =>({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age:{type:GraphQLInt}
    })
});


// QUERIES//
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){                
                // code to get data from db or other source //
               return  _.find(books,{id: args.id});
            }
        },
        author:{
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors,{id:args.id});
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});