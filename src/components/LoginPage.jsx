import React, { useRef, useState } from 'react';
import { Link} from "react-router-dom";
import LoginPageImage from "../images/login_page.webp";
import QuizMingoLogo from "../images/quizmingo-logo.png";
import Label from './subcomponents/Label';
export default function LoginPage() {
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
                            <h1 className='font-bold text-xl sm:text-3xl mb-5'>Login to Your Account!</h1>
                            <div className='grid sm:flex gap-5 justify-center mt-2'>
                                <button className='bg-black rounded-2xl text-white py-3 px-5 text-lg font-medium transition-all hover:shadow-[5px_5px_rgba(0,0,0,1)] focus:shadow-[5px_5px_rgba(0,0,0,1)]'>Login with Google</button>
                                <button className='bg-white rounded-2xl text-black py-3 px-5 text-lg font-medium border-2 border-black transition-all hover:shadow-[5px_5px_rgba(0,0,0,1)] focus:shadow-[5px_5px_rgba(0,0,0,1)] '>Login with Apple</button>
                            </div>
                            <p className='text-center my-4 text-xl text-gray-500'>-OR-</p>

                            <div>
                                <Label label="Email Address" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Your Email" aria-label="Email Address" />
                                </div>

                                <br />
                                <Label label="Password" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input type="password" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" placeholder="Your Password" aria-label="Password" ref={password} />
                                    <button className="flex-shrink-0 border-transparent  text-gray-500 hover:text-gray-800 focus:text-gray-800 text-sm py-1 px-2 rounded" type="button" onClick={() => {
                                        password.current.type = password.current.type === "text" ? "password" : "text";
                                        setShowPassword(!showPassword);
                                    }}>
                                        {!showPassword && <i class="bi bi-eye"></i>}
                                        {showPassword && <i class="bi bi-eye-slash"></i>}
                                    </button>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <div class="flex items-center gap-1 mb-2">
                                        <input type="checkbox" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " name='remember_me' />
                                        <label for="default-checkbox" class="ms-2 text-sm  text-gray-900 dark:text-gray-300">Remember me</label>
                                    </div>
                                    <div class="flex items-center gap-1 mb-2">

                                        <Link to="/forgot-page" className='text-sm font-medium text-black hover:text-black focus:text-black'>Forgot Password?</Link>
                                    </div>
                                </div>

                                <br />
                                <button className='mb-2 py-2 px-4 font-medium bg-yellow-500 hover:bg-yellow-400  text-base rounded-2xl ' >
                                    Login to Your Account
                                </button>

                                <br />
                                <span className='text-gray-600'>Don't have an account? <Link to="/signup" className='text-sm font-medium text-black hover:text-black focus:text-black'>Signup</Link></span>
                            </div>
                        </div>

                    </div>
                    <div className='md:w-[50%] hidden  md:flex items-center'>
                        <img className='w-[100%]  rounded-e-2xl' src={LoginPageImage} alt="Login Page" />

                    </div>
                </div>
            </div>

        </>
    )
}
