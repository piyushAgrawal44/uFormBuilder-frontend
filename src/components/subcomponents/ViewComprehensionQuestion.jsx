import React, { useEffect, useState } from 'react'

function ViewComprehensionQuestion(props) {

    const [marks, setMarks] = useState(0);
    const selectOption = (mcqIndex, mcqOptionIndex, isSelected) => {
        const newData = { ...props.formData };
        if (newData.questions[props.questionIndex].userAnswer === undefined)
            newData.questions[props.questionIndex].userAnswer = [];

        if (isSelected)
            newData.questions[props.questionIndex].userAnswer[mcqIndex] = mcqOptionIndex;
        else
            newData.questions[props.questionIndex].userAnswer[mcqIndex] = undefined;

        props.setFormData(newData);
    }

    const validateAns = (answer, correctAns) => {
        // setMarks(marks + 1);
        return correctAns[answer];
    };

    useEffect(() => {
        if (props.showAns) {
            // Calculate the total marks and update the state
            let totalMarks = 0;
            props.question.mcq.forEach((mcq, mcqIndex) => {
                const isCorrect = validateAns(props.question.userAnswer[mcqIndex], mcq.correctOptions);
                totalMarks += isCorrect ? 1 : 0;
            });
            setMarks(totalMarks);
        }
    }, [props.showAns, props.question]);

    return (
        <>
            <div className='w-full bg-white p-5 py-3 mb-3 rounded-[10px]'>
                
                <div className='flex justify-between items-center flex-nowrap'>
                <p className='text-blue-500'><b>Question #{props.questionIndex + 1}</b></p>
                    {props.showAns && <p className='text-red-500'>{marks}</p>}
                </div>

                <p className='font-semibold mt-2 mb-1'>Read paragraph and answer the given questions: </p>
                <p className='mb-1'>
                    " {props.question.paragraph} "
                </p>
                {
                    props.question.mcq.map((mcq, mcqIndex) => {
                        return (
                            <div key={mcqIndex} className='mb-3'>

                                <div className='flex justify-between items-center flex-nowrap'>
                                    <p className='font-medium my-1 '>Q{mcqIndex + 1}. {mcq.question}</p>
                                    {props.showAns && <p className='text-red-500 '>{validateAns(props.question.userAnswer[mcqIndex], mcq.correctOptions) ? 1 : 0}</p>}
                                </div>
                                {
                                    mcq.options.map((mcqOption, mcqOptionIndex) => {
                                        return (
                                            <div key={mcqOptionIndex} className='flex items-center gap-2'>
                                                <input type="checkbox" onChange={(e) => { selectOption(mcqIndex, mcqOptionIndex, e.target.checked) }} checked={(props.question.userAnswer !== undefined && props.question.userAnswer[mcqIndex] === mcqOptionIndex) ? true : false} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500' />
                                                <p>{mcqOption}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

ViewComprehensionQuestion.defaultProps = {
    showAns: false
}
export default ViewComprehensionQuestion