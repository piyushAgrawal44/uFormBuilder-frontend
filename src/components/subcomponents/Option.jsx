import React from 'react'

export default function Option(props) {
    return (
        <>

            <div className="flex gap-2 items-center">
                <input type="checkbox" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500' name="" id="" onChange={props.checkboxClick} checked={props.checkboxValue?true:false} />

                <input type={props.type} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline focus:outline-blue-400' name={props.name} id={props.id} placeholder={props.placeholder} value={props.inputValue} onChange={props.inputChange}/>
            </div>

        </>
    )
}

Option.defaultProps = {
    type: "text",
    placeholder: "",
    id: "",
    isRequired: true,
    checkboxValue: false
}

