import React from 'react'

function FormComponent({name, value, onChange}) {
  return (
    <div className="form-group">
    <label htmlFor={name}>{name}:</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={true}
    />
  </div>
  )
}

export default FormComponent