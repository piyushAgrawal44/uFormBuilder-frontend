import React, { memo } from 'react'
import Button from './Button'
import Label from './Label'
import MCQ from './MCQ'
import CloseButton from './CloseButton'

const ComprehensionQuestion=(props)=> {
    
    const parentIndex = props.index;

    // handle add option
    const addMCQ = () => {
        // setMCQ([...mcq, { question: '', options: [''], correctOption: [false] }]);

        const newMCQ = [...props.questions];
        newMCQ[parentIndex].mcq.push({ question: '', options: [''], correctOptions: [false] });
        props.setQuestions(newMCQ);
    };

    // handle remove option 
    const removeMCQ = (index) => {

        // setMCQ(mcq.filter((ele, i) => {
        //     return i !== index;
        // }));

        const newMCQ = [...props.questions];
        newMCQ[parentIndex].mcq.splice(index, 1);
        props.setQuestions(newMCQ);
    };

    return (
        <>
            <div className='bg-white rounded-[10px] shadow-[#d5d5d5] shadow-md p-2'>
                <h5 className='my-2 font-extrabold'>Question #{props.questionNo}</h5>

                {/* <Label label="Question Image" isRequired={false} />
                <Input type="file" name="question_image" label="Question Image" isRequired={false} /> */}

                <Label label="Paragraph" />

                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-blue-500 focus:border-blue-500 " placeholder="Type here..." name='paragraph' onChange={(e) => {    
                     const newMCQ = [...props.questions];
                     newMCQ[parentIndex].paragraph=e.target.value.trim();
                     props.setQuestions(newMCQ);

                    // setParagraph(e.target.value) 
                }} defaultValue={props.questions[parentIndex].paragraph} ></textarea>

                <br />
                <h5 className='font-semibold'>Create MCQ <span className='text-red-600 font-bold '>*</span></h5>

                {
                    props.questions[parentIndex].mcq.map((e,index) => {
                        return (
                            <div key={index} className='mb-2'>
                                <MCQ key={index} index={parentIndex} mcqIndex={index}  questions={props.questions} setQuestions={props.setQuestions}/>
                                <CloseButton onclick={() => removeMCQ(index) } />
                            </div>
                        );
                    })
                }

                <Button text="Add MCQ" onclick={() => addMCQ()} />

            </div>
            
        </>

    )
}


export default  memo(ComprehensionQuestion);