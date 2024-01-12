# React intro

- Component state (useState)
- Debugging
- Event handlers

In .eslintrc.cjs we can add the following key:value under rules if the text editor shows warnings

```
'react/prop-types': 0
```

N.B: First letter of React component names must be capitalized.

N:B: Note that the content of a React component (usually) needs to contain one root element. If we, for example, try to define the component App without the outermost div-element:

```
// Error
const App = () => {
  return (
    <h1>Greetings</h1>
    <Hello name='Maya' age={26 + 10} />
    <Footer />
  )
}

// OK, but not best practice to add a root div element
const App = () => {
  return (
    <div>
        <h1>Greetings</h1>
        <Hello name='Maya' age={26 + 10} />
        <Footer />
    </div>
  )
}

// OK
const App = () => {
  return (
    <>
        <h1>Greetings</h1>
        <Hello name='Maya' age={26 + 10} />
        <Footer />
    </>
  )
}
```

N.B: Do not render objects in React components. The core of the problem is Objects are not valid as a React child, i.e. the application tries to render objects and it fails again. In React, the individual things rendered in braces must be primitive values, such as numbers or strings. A small additional note to the previous one. React also allows arrays to be rendered if the array contains values ​​that are eligible for rendering (such as numbers or strings).

```
// Error
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0]}</p>
      <p>{friends[1]}</p>
    </div>
  )
}

export default App

// OK
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
}

export default App
```
