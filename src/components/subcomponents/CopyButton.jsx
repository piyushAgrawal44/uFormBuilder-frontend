import React from 'react'

export default function CopyButton(props) {
    return (
        <>
            <button className=' bg-white hover:bg-gray-100 focus:bg-gray-100 shadow-md text-black text-[12px] font-bold py-2 px-4 mr-1 rounded' onClick={props.onclick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-copy inline-block" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                </svg>&nbsp;
                Copy
            </button>
        </>
    )
}


CopyButton.defaultProps = {
    onclick: () => {

    }
}