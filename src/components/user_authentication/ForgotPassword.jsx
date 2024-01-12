import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import ForgotPasswordImage from "../../images/forgot_password.webp";
import QuizMingoLogo from "../../images/quizmingo-logo.png";
import Label from '../subcomponents/Label';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(59);
    const [showPassword, setShowPassword] = useState(false)
    const [details, setDetails] = useState({ email: "", codeRequested: false, codeSent: false, codeVerified: false, newPassword: '', confirmPassword: '', emailErrorMessage: "", codeErrorMessage: '', passwordErrorMessage: "" });

    const emailInput = useRef(null);
    const codeInput = useRef(null);
    const passwordInput = useRef(null);
    const confirmPasswordInput = useRef(null);

    const getCode = () => {
        if (details.codeRequested) {
            toast.warning(`Please please wait for ${timer} seconds`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // milliseconds
            });
            return 0;
        }
        const email = emailInput.current.value;

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            const tempObj = { ...details };
            tempObj.emailErrorMessage = "Please enter a valid email address.";
            setDetails(tempObj);
            return 0;
        }
        console.log(email);
        // send code to email id logic

        const tempObj = { ...details };
        tempObj.email = email;
        tempObj.codeRequested = true;
        tempObj.codeSent = true;
        tempObj.emailErrorMessage = "";
        setDetails(tempObj);

        setTimer(59);
        toast.success('Code sent on email', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // milliseconds
        });

    }

    const verifyCode = () => {
        if (!details.codeSent) {
            toast.warning('Please request code to verify', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // milliseconds
            });
            return 0;
        }
        const code = codeInput.current.value;
        const sixDigitRegex = /^\d{6}$/;

        if (!sixDigitRegex.test(code)) {
            const tempObj = { ...details };
            tempObj.codeErrorMessage = "Please enter a 6 digits.";
            setDetails(tempObj);
            return 0;
        }

        if (code === '123456') {
            const tempObj = { ...details };
            tempObj.codeVerified = true;
            tempObj.codeErrorMessage = "";
            setDetails(tempObj);

            toast.success('Code verified', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // milliseconds
            });
            return;
        }

        // verify code logic



        const tempObj = { ...details };
        tempObj.codeVerified = true;
        tempObj.codeErrorMessage = "";
        setDetails(tempObj);

        toast.success('Code verified', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // milliseconds
        });

    }

    const savePassword = () => {
        const password1 = passwordInput.current.value;
        const password2 = confirmPasswordInput.current.value;

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+[\]{},.<>?/\\|]).{8,}$/;

        if (!passwordRegex.test(password1)) {
            const tempObj = { ...details };
            tempObj.passwordErrorMessage = "Please enter a valid password!";
            setDetails(tempObj);
            return 0;
        }

        if (password1 !== password2) {
            const tempObj = { ...details };
            tempObj.passwordErrorMessage = "Password and Confirm password must be same.";
            setDetails(tempObj);
            return 0;
        }

        // update new password in backend

        toast.success('Your password has been updated successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // milliseconds
        });

        navigate('/login');
    }

    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            // Timer has reached 0, perform actions
            setDetails((prevDetails) => ({
                ...prevDetails,
                codeRequested: false,
            }));
        }

        return () => {

            clearInterval(interval);
        };
    }, [timer]);


    return (
        <>
            <div className="bg-white flex items-center  rounded-2xl min-h-screen p-5" >
                <div className="w-[100%] md:w-[50%] flex items-center justify-center">

                    <div>
                        <div className="text-center mb-2">
                            <img src={QuizMingoLogo} className='img-fluid max-w-[200px] ' alt="logo" />
                        </div>
                        <h1 className='font-bold text-xl sm:text-3xl'>Don't worry reset now!</h1>

                        <br />
                        {
                            !details.codeVerified && <div>


                                <Label label="Email Address" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input className={`appearance-none bg-transparent border-none w-full text-gray-700 mr-3  px-2 leading-tight focus:outline-none `} type="email" placeholder="Your Email" aria-label="Email Address" ref={emailInput} readOnly={details.codeRequested} />

                                    <button className="flex-shrink-0 text-white hover:text-white focus:text-white bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-sm py-1 px-2 rounded-2xl" type="button" onClick={getCode}>
                                        {details.codeRequested && <span>00 : {timer}s</span>}
                                        {!details.codeRequested && "Get Code"}
                                    </button>
                                </div>
                                <p className='text-red-500'>{details.emailErrorMessage}</p>

                                <br />
                                <Label label="Code" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input type="text" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 px-2 leading-tight focus:outline-none" placeholder="Enter code" aria-label="Code" ref={codeInput} />
                                    <button className="text-sm py-1 px-2 text-white hover:text-white focus:text-white bg-green-600 hover:bg-green-500 focus:bg-green-500 flex-shrink-0 rounded-2xl" type="button" onClick={verifyCode}>
                                        Verify
                                    </button>
                                </div>
                                <p className='text-red-500'></p>

                                <br />
                                <span className='text-gray-600'>Want to try again? <Link to="/login" className='text-sm font-medium text-black hover:text-black focus:text-black'>Login</Link></span>
                            </div>
                        }

                        {
                            details.codeVerified && <div>

                                <Label label="New Password" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input className={`appearance-none bg-transparent border-none w-full text-gray-700 mr-3  px-2 leading-tight focus:outline-none `} type={showPassword ? 'text' : 'password'} placeholder="New Password" aria-label="New Password" ref={passwordInput} />
                                    <button className="flex-shrink-0 border-transparent  text-gray-500 hover:text-gray-800 focus:text-gray-800 text-sm py-1 px-2 rounded" type="button" onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}>
                                        {!showPassword && <i className="bi bi-eye"></i>}
                                        {showPassword && <i className="bi bi-eye-slash"></i>}
                                    </button>
                                </div>
                                <p className='text-red-500'>{details.passwordErrorMessage}</p>

                                <br />
                                <Label label="Confirm Password" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input className={`appearance-none bg-transparent border-none w-full text-gray-700 mr-3  px-2 leading-tight focus:outline-none `} type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" aria-label="Confirm Password" ref={confirmPasswordInput} />

                                </div>

                                <br />
                                <button className='mb-2 py-2 px-4 font-medium text-white bg-blue-600 hover:bg-blue-500  text-base rounded-2xl ' onClick={savePassword}>
                                    Save Password
                                </button>

                            </div>
                        }
                    </div>

                </div>
                <div className='md:w-[50%] hidden  md:flex items-center'>
                    <img className='w-[100%]  rounded-e-2xl' src={ForgotPasswordImage} alt="Login Page" />

                </div>
            </div>
        </>
    )
}
