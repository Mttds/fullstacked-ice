const Filter = (props) => {
  return (
    <div>
      {props.text}: <input value={props.nameFilter} onChange={props.onChangeNameFilter} /> 
    </div>
  )
}

export default Filter;
