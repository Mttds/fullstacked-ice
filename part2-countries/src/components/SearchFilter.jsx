const SearchFilter = ({text, value, onChangeFunction}) => {
  return (
    <div>
      {text}: <input value={value} onChange={onChangeFunction} /> 
    </div>
  )
}

export default SearchFilter
