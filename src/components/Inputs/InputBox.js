import React from 'react'

const InputBox = ({handleInput, value, type, dataType, name, placeholder}) =>
  <div className='input-box'>
    {name && <span>{name}</span>}
    <div>
      <input
        onChange={handleInput}
        value={value}
        data-type={dataType}
        type={type}
        placeholder={placeholder}
      />
    </div>
  </div>

export default InputBox
