import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')

  const ALL_AUTHORS = gql `
    query {
      allAuthors {
        name,
        born
      }
    }
  `
  const ALL_BOOKS = gql `
    query {
      allBooks {
        title,
        author,
        published
      }
    }
  `
  const responseAuthors = useQuery(ALL_AUTHORS)
  const responseBooks = useQuery(ALL_BOOKS)
  
  if (responseAuthors.loading || responseBooks.loading) {
    return <div>loading...</div>
  }
  console.log('response data authors', responseAuthors.data)
  console.log('response data books', responseBooks.data)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        allAuthors={responseAuthors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        allBooks={responseBooks.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App