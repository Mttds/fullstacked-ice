import './App.css'
import { useState, useEffect } from 'react'
import Course from './components/Course'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificatioMessage, setNotificationMessage] = useState()

  // load people array from the server using an effect hook
  useEffect(() => {
    phonebookService.getAll().then((data) => {
      setPersons(data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some(obj => obj.name.toLowerCase() === newName.toLowerCase())) {
      const ok = window.confirm(`${newName} is already present in the Phonebook! Replace the old number with a new one?`)
      
      if (ok) {
        const personToUpdate = (persons.filter(person => person.name === newName))[0]
        console.log(personToUpdate)
        const updatedObj = {
          name: personToUpdate.name,
          number: newNumber,
          id: personToUpdate.id
        }

        phonebookService.update(personToUpdate.id, updatedObj)
          .then((data) => {
            setPersons(persons.map((p) => (p.id !== personToUpdate.id ? p : data)));
            setNewName("")
            setNewNumber("")
            setNotificationMessage(`Person '${personToUpdate.name}' was has been modified in the phonebook!`)

            // remove notif message after 5 seconds
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch((error) => {
            alert(`Could not update ${newName}!`)
          })
      }
      return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    phonebookService.create(newObject)
      .then((data) => {
        setPersons(persons.concat(data))
        setNewName("")
        setNewNumber("")
        setNotificationMessage(`Person '${data.name}' has been added to the phonebook!`)

        // remove notif message after 5 seconds
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch((error) => {
        alert("Could not add to the phonebook!")
        console.log(error)
      })
  }

  const deletePerson = (id, name) => {
    const ok = window.confirm(`Delete ${name}?`)

    if (ok) {
      phonebookService.deleteObj(id)
      .then(() => {
        // remove the deleted object from the state array
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        alert("Could not delete person from phonebook!")
        console.log(error)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = nameFilter === ""
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(nameFilter.toLowerCase()));

  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
      <div>
        <Notification message={notificatioMessage} className="success" />
        <h2>Phonebook</h2>
        <Filter text="Filter shown with" nameFilter={nameFilter} onChangeNameFilter={handleNameFilterChange} />
        <h2>Add a new</h2>
        <PersonForm
          onSubmitPerson={addPerson}
          onChangeName={handleNameChange}
          onChangeNumber={handleNumberChange}
          name={newName}
          number={newNumber}
        />
        <h2>Numbers</h2>
        <People persons={personsToShow} deletePerson={deletePerson} />
      </div>
    </>
  )
}

export default App;
