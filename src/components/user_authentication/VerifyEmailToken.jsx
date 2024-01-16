import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function VerifyEmailPage() {

    const [message, setMessage] = useState("verifying your email...");
    const urlParams = new URL(window.location.href).searchParams;
    const token = urlParams.get('token');
    const navigate = useNavigate();
    const verifyEmail = async () => {
        try {
            let data = {
                token: token,
            }
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/verify/email", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            const resultData = await response.json();


            if (!resultData.success) {
                toast.error(resultData.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                setMessage("Failed to verify your email ! Please try again later.")
                return;
            }

            // success
            toast.success('Account verified successfully ! Try to login now.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 4000,
            });
            navigate('/login', { replace: true })
            return;


        } catch (error) {
            setMessage("Internal server error ! Please try again later.")

            toast.error('Internal server error !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });

            return 0;
        }
    }

    useEffect(() => {
        verifyEmail();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div className='p-5 bg-white'>
                <div className="flex rounded-2xl">
                    <div className="w-[100%] flex items-center justify-center min-h-screen">
                        <div className='text-center'>
                            <p className='mb-2'>{message}</p>
                            
                            <p><Link to="/" className='text-[#007bff] hover:underline'>Go back to home</Link></p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
