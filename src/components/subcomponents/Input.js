import React from 'react'

export default function Input(props) {
    return (
        <>
            <div className='mb-2 mr-1'>
                <input ref={props.eleRef} type={props.type} className='mb-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline focus:outline-blue-400' name={props.name} id={props.id} placeholder={props.placeholder} value={props.value} onChange={props.onchange}  />
            </div>
        </>
    )
}

Input.defaultProps = {
    type: "text",
    placeholder: "",
    id: "",
    isRequired: true,
    value: "",
    readonly: "false",
    eleRef: null,
    onchange:()=>{

    }
}

