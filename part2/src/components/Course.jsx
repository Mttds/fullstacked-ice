const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  const total = props.course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      {props.course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
      <b>Total of {total} exercises</b>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  )
}

export default Course;
