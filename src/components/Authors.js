import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHDAY } from '../queries'

const Authors = (props) => {
  const [authorName, setAuthorName] = useState('')
  const [birthday, setAuthorBirthday] = useState('')

  const [ updateBirthday ] = useMutation(UPDATE_BIRTHDAY, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  if (!props.show) {
    return null
  }

  const authors = props.allAuthors

  const submit = async (event) => {
    event.preventDefault({ authorName, birthday })
    console.log({ authorName, birthday });
    console.log( authorName, birthday);
    
    updateBirthday({ variables: { authorName, birthday } })
    setAuthorName('')
    setAuthorBirthday('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>set birthday</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
          birthday
          <input
            type='number'
            value={birthday}
            onChange={({ target }) => setAuthorBirthday(parseInt(target.value))}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>

    </div>
  )
}

export default Authors