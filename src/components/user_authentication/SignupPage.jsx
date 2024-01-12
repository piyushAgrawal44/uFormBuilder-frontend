import React from 'react'
import { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import SIgnupPageImage from "../../images/signup_page.webp";
import QuizMingoLogo from "../../images/quizmingo-logo.png";
import Label from '../subcomponents/Label';


export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const password = useRef(null)
    return (
        <>
            <div className='p-5 bg-white'>
                <div className="flex rounded-2xl">
                    <div className="w-[100%] md:w-[50%] flex items-center justify-center">

                        <div>
                            <div className="text-center mb-2">
                                <img src={QuizMingoLogo} className='img-fluid max-w-[200px] ' alt="logo" />
                            </div>
                            <h1 className='font-bold text-xl sm:text-3xl'>Signup and Start Now!</h1>
                            <div className='grid sm:flex gap-5 justify-center mt-7'>
                                <button className='bg-gray-800 text-white rounded-2xl border-2 border-black py-3 px-5 text-lg font-medium transition-all hover:shadow-[5px_5px_rgba(0,0,0,1)] focus:shadow-[5px_5px_rgba(0,0,0,1)]'>Signup with Google</button>
                                <button className='bg-white rounded-2xl text-black py-3 px-5 text-lg font-medium border-2 border-black transition-all hover:shadow-[5px_5px_rgba(0,0,0,1)] focus:shadow-[5px_5px_rgba(0,0,0,1)] '>Signup with Apple</button>
                            </div>
                            <p className='text-center my-4 text-xl text-gray-500'>-OR-</p>
                            <div>

                                <Label label="Name" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Your Name" aria-label="Name" />
                                </div>
                                <br />
                                <Label label="Email Address" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Your Email" aria-label="Email Address" />
                                </div>



                                <br />
                                <Label label="Password" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input type="password" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" placeholder="Your Password" aria-label="Password" ref={password} />
                                    <button className="flex-shrink-0 border-transparent  text-gray-500 hover:text-gray-800 focus:text-gray-800 text-sm py-1 px-2 rounded" type="button" onClick={() => {
                                        password.current.type = password.current.type === "text" ? "password" : "text";
                                        setShowPassword(!showPassword);
                                    }}>
                                        {!showPassword && <i className="bi bi-eye"></i>}
                                        {showPassword && <i className="bi bi-eye-slash"></i>}
                                    </button>
                                </div>


                                <br />
                                <button className='mb-2 py-2 px-4 font-medium text-white bg-blue-600 hover:bg-blue-500  text-base rounded-2xl ' >
                                    Create Account
                                </button>

                                <br />
                                <span className='text-gray-600'>Already have an account? <Link to="/login" className='text-sm font-medium text-black hover:text-black focus:text-black'>Login</Link></span>
                            </div>
                        </div>

                    </div>
                    <div className='md:w-[50%] hidden  md:flex items-center'>
                        <img className='w-[100%]  rounded-e-2xl' src={SIgnupPageImage} alt="Login Page" />

                    </div>
                </div>
            </div>
        </>
    )
}
