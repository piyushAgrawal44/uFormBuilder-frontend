import React from 'react'

export default function Select(props) {
    return (
        <>
            <div className="inline-block relative mr-1">
                <select className="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-blue-400 focus:shadow-outline" onChange={props.onchange} value={props.selected}>
                    <option value="">{props.text}</option>
                    {
                        props.options.map((ele, index) => {
                            return (
                                <option key={index} value={ele}>{ele}</option>
                            )
                        }
                        )
                    }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </>
    )
}

Select.defaultProps={
    text: "--Select--",
    onchange:()=>{},
    selected: ""
}