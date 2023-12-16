import React from 'react'

export default function Label(props) {
  return (
    <label className='block text-gray-700 text-sm font-bold mb-2'>{props.label} <span className='text-red-600 font-bold'>{props.isRequired ? "*" : ""}</span></label>
                
  )
}

Label.defaultProps = {
    type: "text",
    placeholder: "",
    id: "",
    isRequired: true
}