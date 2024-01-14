import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      
      <div class="error-container text-center  bg-[#f8f9fa] text-[#495057] ">
        <h1 className='text-[#dc3545]'>Error</h1>
        <p className='mb-[20px]'>URL Not Found !</p>
        <p><Link to="/" className='text-[#007bff] hover:underline'>Go back to home</Link></p>
      </div>
    </div>
  )
}

export default NotFound