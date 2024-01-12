import React from 'react'

const People = ({persons, deletePerson}) => {
  return (
    <>
      {persons.map((person, id) => (
      <React.Fragment key={id}>
        {person.name} : {person.number} {<button onClick={() => deletePerson(person.id, person.name)}>delete</button>}
        {<br />}
      </React.Fragment>
    ))}
    </>
  )
}

export default People;
