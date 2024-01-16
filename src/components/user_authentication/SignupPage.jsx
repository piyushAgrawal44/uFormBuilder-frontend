import React from 'react'
import { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SIgnupPageImage from "../../images/signup_page.webp";
import QuizMingoLogo from "../../images/quizmingo-logo.png";
import Label from '../subcomponents/Label';
import { toast } from 'react-toastify';
import CustomLoader from '../CustomLoader';


export default function SignupPage() {

   
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const navigate = useNavigate();


    const register = async () => {

        const name = nameInput.current.value;

        var nameRegex = /^.{3,}$/;

        if (!nameRegex.test(name)) {
            toast.error('Name must be 3 letters', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, // milliseconds
            });
            return 0;
        }

        const email = emailInput.current.value;

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, // milliseconds
            });
            return 0;
        }



        const password = passwordInput.current.value;

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+[\]{},.<>?/\\|]).{8,}$/;

        if (!passwordRegex.test(password)) {
            toast.error('Please enter a valid password of 8 digits.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, // milliseconds
            });
            return 0;
        }

        let data={};

        data['email']=email;
        data['name']=name;
        data['password']=password;

        setLoading(true);
        try {
            // props.setProgress(10);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/register", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            const resultData = await response.json();

            setLoading(false);
            if (!resultData.success) {
                toast.error(resultData.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                return;
            }
            
            // success
            toast.success('Account created successfully ! Check your email and verify account.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 4000,
            });
            navigate('/login', { replace: true })
            return;


        } catch (error) {
            setLoading(false);

            toast.error('Internal server error !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });

            return 0;
        }

    }


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
                                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Your Name" aria-label="Name" ref={nameInput} />
                                </div>
                                <br />
                                <Label label="Email Address" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Your Email" aria-label="Email Address" ref={emailInput} />
                                </div>



                                <br />
                                <Label label="Password" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input type="password" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" placeholder="Your Password" aria-label="Password" ref={passwordInput} />
                                    <button className="flex-shrink-0 border-transparent  text-gray-500 hover:text-gray-800 focus:text-gray-800 text-sm py-1 px-2 rounded" type="button" onClick={() => {
                                        passwordInput.current.type = passwordInput.current.type === "text" ? "password" : "text";
                                        setShowPassword(!showPassword);
                                    }}>
                                        {!showPassword && <i className="bi bi-eye"></i>}
                                        {showPassword && <i className="bi bi-eye-slash"></i>}
                                    </button>
                                </div>


                                <br />
                                {
                                    !loading && <button className='mb-2 py-2 px-4 font-medium text-white bg-blue-600 hover:bg-blue-500  text-base rounded-2xl ' onClick={register}>
                                        Create Account
                                    </button>
                                }
                                {
                                    loading && <CustomLoader />
                                }

                                <br />
                                <span className='text-gray-600'>Already have an account? <Link to="/login" className='text-sm font-medium text-blue-600 hover:text-blue-700 focus:text-black '>Login</Link></span>
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
