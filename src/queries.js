import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql `
query {
  allAuthors {
    name,
    born
  }
}
`
export const ALL_BOOKS = gql `
query {
  allBooks {
    title,
    author,
    published
  }
}
`

export const ADD_BOOK = gql `
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author
  }
}
`

export const UPDATE_BIRTHDAY = gql `
mutation updateBirthday($authorName: String!, $birthday: Int!) {
  editAuthor(
    name: $authorName,
    setBornTo: $birthday
  ) {
    name,
    born
  }
}

`