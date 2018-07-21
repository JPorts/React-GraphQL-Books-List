import {gql} from 'apollo-boost';

// Get Authors //
const getAuthorsQuery=gql`
{
    authors{
        name
        id
    }
}`

// Get Books // 
const getBooksQuery=gql`
{
    books{
        name
        id
    }
}`

// Add Book//
const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,auhorId:$authorId){
            name
            id
        }
    }`

export {getAuthorsQuery, getBooksQuery, addBookMutation};