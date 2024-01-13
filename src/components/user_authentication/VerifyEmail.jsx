import React from 'react';
import SIgnupPageImage from "../../images/signup_page.webp";
import QuizMingoLogo from "../../images/quizmingo-logo.png";
import Label from '../subcomponents/Label';


export default function VerifyEmailPage() {

    return (
        <>
            <div className='p-5 bg-white'>
                <div className="flex rounded-2xl">
                    <div className="w-[100%] md:w-[50%] flex items-center justify-center">

                        <div>
                            <div className="text-center mb-2">
                                <img src={QuizMingoLogo} className='img-fluid max-w-[200px] ' alt="logo" />
                            </div>
                            <h1 className='font-bold text-xl sm:text-3xl mb-7'>Verify your email!</h1>
                           
                            <div>

                                <Label label="Enter OTP" isRequired={true} textColor='text-gray-500' fontWeight="font-semibold" />
                                <div className="flex items-center border-b-2 border-gray-600 mt-1 pb-2">
                                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 pt-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter OTP" aria-label="OTP" />
                                </div>
                               

                                <br />
                                <button className='mb-2 py-2 px-4 font-medium text-white bg-blue-600 hover:bg-blue-500  text-base rounded-2xl ' >
                                    Verify Email
                                </button>

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
