import React, { useEffect, useState } from 'react'
import Button from './subcomponents/Button'

import { Link } from "react-router-dom";

// let backendURL = "http://localhost:8000"
let backendURL = "https://u-form-builder-backend.vercel.app";

function UserResponse() {

    const [userResponses, setUserResponses] = useState([]);
    const urlParams = new URL(window.location.href).searchParams;
    const id = urlParams.get('id');

    const [formName, setFormName] = useState("")

    const fetchData = async () => {
        const response = await fetch(backendURL + "/view/form/response", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token') ?? "test"
            },
            body: JSON.stringify({ id: id }),
        });
        const resultData = await response.json();

        if (!resultData.success) {
            console.log(resultData.message, "failed")
        }
        let responses = resultData.data;
        setFormName(resultData.form_title);
        setUserResponses(responses);
        console.log(responses);
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div className='p-2 bg-slate-100'>
                <h6 className='text-center my-4 underline text-lg font-semibold'>{formName}</h6>
                <h5 className='mb-2 text-lg font-semibold'>Response List: </h5>
                <div>
                    {
                        userResponses.map((ele, index) => {
                            return (
                                <div key={index}>
                                    <div className='mb-1 px-3 py-2 bg-gray-200  rounded-[2px] flex justify-between'>
                                        <div className='flex items-center flex-wrap'>
                                            <span className=''>{ele.name}</span>&nbsp;<span> |  </span>  &nbsp;<span className='text-sm'>{ele.email}</span>&nbsp; | &nbsp;<span className='text-sm'>Created On: {ele.created_at}</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Link target='_blank' to={"/view/response?form_id=" + id+"&response_id="+ele._id}>
                                                <Button text="View" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </>
    )
}

export default UserResponse