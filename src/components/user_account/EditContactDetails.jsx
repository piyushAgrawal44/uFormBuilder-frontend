import React from 'react'
import Label from '../subcomponents/Label';
import Input from '../subcomponents/Input';
import Button from '../subcomponents/Button';

export default function EditContactDetails() {
    return (
        <>
            <div className="p-5 bg-[#f3f3ff] min-h-screen">

                <div className="mb-7 p-3 rounded-[10px] bg-white border border-1 shadow-[#d5d5d5] shadow-md ">
                    <h1 className='font-semibold'>Edit Contact Details</h1>
                    <div className='my-4'>
                        <hr className='bg-gray-600 h-[2px]' />
                    </div>
                    <div className='mb-5'>
                        
                        <div className='mb-2 '>
                            <Label label="Contact Person Name" />
                            <Input type="text" placeholder="Your Name" />
                        </div>

                        <div className='mb-2 '>
                            <Label label="Email" />
                            <Input type="text" placeholder="Email" />
                        </div>

                        <div className='mb-2 '>
                            <Label label="Phone (Add , to add multiple number)" />
                            <Input type="text" placeholder="Phone" />

                        </div>

                    </div>

                    <Button text="Update" onclick={() => { }} />
                </div>

                
            </div>
        </>
    )
}
