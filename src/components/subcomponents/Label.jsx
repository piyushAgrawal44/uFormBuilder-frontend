import React from 'react'

export default function Label(props) {
  return (
    <label className={`block ${props.textColor} text-sm ${props.fontWeight} mb-2`}>{props.label} <span className='text-red-600 font-bold'>{props.isRequired ? "*" : ""}</span></label>
                
  )
}

Label.defaultProps = {
    type: "text",
    placeholder: "",
    id: "",
    isRequired: true,
    textColor: 'text-gray-700',
    fontWeight: 'text-bold',
}