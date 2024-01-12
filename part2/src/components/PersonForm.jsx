const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmitPerson}>
      <div>
        name: <input value={props.name} onChange={props.onChangeName} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
