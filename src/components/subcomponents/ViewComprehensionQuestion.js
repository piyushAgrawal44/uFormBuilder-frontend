import React from 'react'

function ViewComprehensionQuestion(props) {

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
    return (
        <>
            <div className='w-full bg-white p-5 py-3 mb-3 rounded-[10px]'>
                <p className='text-blue-500'><b>Question #{props.questionIndex + 1}</b></p>

                <p className='font-semibold mt-2 mb-1'>Read paragraph and answer the given questions: </p>
                <p className='mb-1'>
                    " {props.question.paragraph} "
                </p>
                {
                    props.question.mcq.map((mcq, mcqIndex) => {
                        return (
                            <div key={mcqIndex} className='mb-3'>
                                <p className='font-medium my-1 '>Q{mcqIndex + 1}. {mcq.question}</p>
                                {
                                    mcq.options.map((mcqOption, mcqOptionIndex) => {
                                        return (
                                            <div key={mcqOptionIndex} className='flex items-center gap-2'>
                                                <input type="checkbox" onChange={(e) => { selectOption(mcqIndex, mcqOptionIndex, e.target.checked) }} checked={(props.question.userAnswer!==undefined && props.question.userAnswer[mcqIndex]===mcqOptionIndex) ? true : false} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500' />
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

export default ViewComprehensionQuestion