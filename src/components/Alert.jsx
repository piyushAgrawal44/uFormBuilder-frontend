import React from 'react'

function Alert(props) {
    return (
        <>
            <div className={`${props.type==="error"?"bg-red-100":"bg-blue-100"} z-50 w-[calc(100%-10px)] fixed top-2 mx-[5px] border  px-4 py-3 rounded `} role="alert">
                
                <span className="block sm:inline">{props.message}</span>
                
            </div>
        </>
    )
}

export default Alert