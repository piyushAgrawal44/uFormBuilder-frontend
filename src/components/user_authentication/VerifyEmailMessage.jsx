import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function VerifyEmailMessage() {
  const urlParams = new URL(window.location.href).searchParams;
  const email = urlParams.get('email');
  const navigate = useNavigate();
  const [message, setMessage] = useState("Sending link...");
  const resendLink =async () => {
    setMessage("Sending link...")
    try {
      let data = {
        email: email,
      }
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/resend/verification/link", {
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
      setMessage("Verification link sent on email id.")
      toast.success('Link sent on email id.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

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
    resendLink();
    // eslint-disable-next-line
  }, [])
  return (
    <div className='flex justify-center items-center min-h-screen'>

      <div class="error-container text-center   text-[#495057] ">
        <h1 className='text-[#000000]'>Verify Your Account</h1>
        <p className='mb-[20px]'>{message}</p>
        <p><button className='text-[#007bff] mb-2 hover:underline' onClick={resendLink}>Resend Link</button></p>
        <p><button className='text-[#007bff] hover:underline' onClick={()=>{navigate('/login', {replace:true})}}>Go to login page</button></p>
      </div>
    </div>
  )
}

export default VerifyEmailMessage