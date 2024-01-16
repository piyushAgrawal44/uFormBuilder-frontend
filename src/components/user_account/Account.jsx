import React from 'react';
import Button from '../subcomponents/Button'
import { Link } from 'react-router-dom'

export default function AccountPage() {
    return (
        <>
            <div className="p-5 bg-[#f2f3ff] min-h-screen">
                <h1 className='text-xl font-semibold mb-5'>Account Details</h1>

                <div className="flex flex-wrap gap-[10px]">
                    <div className="w-[100%] md:w-[calc(50%-10px)] lg:w-[calc(33.33% - 10px)] xl:w-[calc(25%-10px)] shrink-0 mb-7 p-3 rounded-[10px] bg-white border border-1 shadow-[#d5d5d5] shadow-md ">
                        <h1 className='font-semibold'>Current Plan</h1>
                        <div className='my-4'>
                            <hr className='bg-gray-600 h-[2px]' />
                        </div>
                        <div className='mb-5'>
                            <div className='mb-2 flex gap-2'>
                                <span>Name: </span>
                                <span className='text-gray-600'>Trail</span>
                            </div>

                            <div className='mb-2 flex gap-2'>
                                <span>Duration: </span>
                                <span className='text-gray-600'>1 Week</span>
                            </div>

                            <div className='mb-2 flex gap-2'>
                                <span>Start: </span>
                                <span className='text-gray-600'>1 Jun 2023</span>
                            </div>

                            <div className='mb-2 flex gap-2'>
                                <span>End: </span>
                                <span className='text-gray-600'>7 Jun 2023</span>
                            </div>

                        </div>

                        <div className="flex gap-2">
                            <Button text="View Ledger" onclick={() => { }} />
                            <Button text="Purchase Plan" onclick={() => { }} />
                        </div>



                    </div>

                    <div className=" w-[100%] md:w-[calc(50%-10px)] lg:w-[calc(33.33% - 10px)] xl:w-[calc(25%-10px)] shrink-0 mb-7 p-3 rounded-[10px] bg-white border border-1 shadow-[#d5d5d5] shadow-md ">
                        <h1 className='font-semibold'>Your Details</h1>
                        <div className='my-4'>
                            <hr className='bg-gray-600 h-[2px]' />
                        </div>
                        <div className='mb-5'>
                            <div className='mb-2 flex gap-2'>
                                <span>Business Name: </span>
                                <span className='text-gray-600'>R.K. Coaching</span>
                            </div>
                            <div className='mb-2 flex gap-2'>
                                <span>Your Name: </span>
                                <span className='text-gray-600'>Rajesh Kumar</span>
                            </div>

                            <div className='mb-2 flex gap-2'>
                                <span>Email: </span>
                                <span className='text-gray-600'>rk@gmail.com</span>
                            </div>

                            <div className='mb-2 flex gap-2'>
                                <span>Phone: </span>
                                <span className='text-gray-600'>+91 89098999</span>
                            </div>

                        </div>

                        <Link to="/edit-account"><Button text="Edit" /></Link>
                    </div>

                    <div className="w-[100%] md:w-[calc(50%-10px)] lg:w-[calc(33.33% - 10px)] xl:w-[calc(25%-10px)] shrink-0 mb-7 p-3 rounded-[10px] bg-white border border-1 shadow-[#d5d5d5] shadow-md ">
                        <h1 className='font-semibold'>Contact Details</h1>
                        <div className='my-4'>
                            <hr className='bg-gray-600 h-[2px]' />
                        </div>
                        <div className='mb-5'>
                            <div className='mb-2 flex gap-2'>
                                <span>Contact Person: </span>
                                <span className='text-gray-600'>Rajesh</span>
                            </div>

                            <div className='mb-2 flex gap-2'>
                                <span>Contact Email: </span>
                                <span className='text-gray-600'>rk@gmail.com</span>
                            </div>

                            <div className='mb-2 flex gap-2'>
                                <span>Contact Phone: </span>
                                <span className='text-gray-600'>+91 89098999</span>
                            </div>

                        </div>

                        <Link to='/edit-contact-details'><Button text="Edit" /></Link>
                    </div>

                    <div className="w-[100%] md:w-[calc(50%-10px)] lg:w-[calc(33.33% - 10px)] xl:w-[calc(25%-10px)] shrink-0 mb-7 p-3 rounded-[10px] bg-white border border-1 shadow-[#d5d5d5] shadow-md ">
                        <h1 className='font-semibold'>Account Action</h1>
                        <div className='my-4'>
                            <hr className='bg-gray-600 h-[2px]' />
                        </div>


                        <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 block mb-2" ><u>Forgot Password</u></Link>
                        <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700 block mb-2" ><u>Privacy & Policy</u></Link>
                        <Link to="/terms-of-use" className="text-blue-600 hover:text-blue-700 block mb-2" ><u>Terms of use</u></Link>
                        <Link to="/delete-account" className="text-blue-600 hover:text-blue-700 block" ><u>Delete Account</u></Link>
                    </div>
                </div>

            </div>
        </>
    )
}
