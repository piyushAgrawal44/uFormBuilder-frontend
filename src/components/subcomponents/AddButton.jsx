import React from 'react'

export default function AddButton(props) {
    return (
        <>
            <button className=' bg-blue-500 hover:bg-blue-400 text-white text-[12px] font-bold py-1 px-2 border-b-2 mb-1 mr-1 border-blue-600 hover:border-blue-500 rounded' onClick={props.onclick}>
              
                + {props.text}
            </button>
        </>
    )
}


AddButton.defaultProps = {
    onclick: () => {

    }
}