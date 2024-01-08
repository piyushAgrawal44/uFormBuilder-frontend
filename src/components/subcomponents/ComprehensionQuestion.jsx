import React, { memo } from 'react'
import Label from './Label'
import MCQ from './MCQ'
import CloseButton from './CloseButton'
import { useDispatch, useSelector } from "react-redux";
import {actions} from '../../reducers/formbuilder/createFormSlice';
import AddButton from './AddButton'


const ComprehensionQuestion=(props)=> {
    const questions=useSelector(state=>state.questions)
    const dispatch=useDispatch();
    const parentIndex = props.index;

   

    return (
        <>
            <div className='bg-white rounded-[10px] shadow-[#d5d5d5] shadow-md p-2'>
                <h5 className='my-2 font-extrabold'>Question #{props.questionNo}</h5>

                {/* <Label label="Question Image" isRequired={false} />
                <Input type="file" name="question_image" label="Question Image" isRequired={false} /> */}

                <Label label="Paragraph" />

                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-blue-500 focus:border-blue-500 " placeholder="Type here..." name='paragraph' onChange={(e) => {    

                     dispatch(actions.setParagraph({questionId: parentIndex, value: e.target.value.trim()}));

                }} defaultValue={questions[parentIndex].paragraph}></textarea>

                <br />
                <h5 className='font-semibold'>Create MCQ <span className='text-red-600 font-bold '>*</span></h5>

                {
                    questions[parentIndex].mcq.map((e,index) => {
                        return (
                            <div key={index} className='mb-2 relative'>
                                <MCQ key={index} index={parentIndex} mcqIndex={index}  questions={questions} setQuestions={props.setQuestions}/>
                                <div className='absolute right-0 top-0'>
                                    <CloseButton onclick={() => dispatch(actions.removeMCQ({questionId: parentIndex, mcqId: index})) } />
                                </div>
                            </div>
                        );
                    })
                }

                <AddButton text="MCQ" onclick={() => dispatch(actions.addMCQ(parentIndex))} />

            </div>
            
        </>

    )
}


export default  memo(ComprehensionQuestion);