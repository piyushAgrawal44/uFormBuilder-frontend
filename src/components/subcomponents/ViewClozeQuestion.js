import React from 'react'

function ViewClozeQuestion(props) {
    // const [first, setFirst] = useState(0)
    const draggingStart = (event, optionIndex) => {
        event.dataTransfer.setData("optionIndex", optionIndex);
    }

    const draggingOver = (event) => {
        event.preventDefault();
    }

    const draggingEnd = (event, wordIndex) => {
        event.preventDefault();
        let optionIndex = event.dataTransfer.getData("optionIndex");


        const newData = { ...props.formData };
        if (newData.questions[props.questionIndex].userAnswer === undefined)
            newData.questions[props.questionIndex].userAnswer = [];

        newData.questions[props.questionIndex].userAnswer[wordIndex] = parseInt(optionIndex);
        props.setFormData(newData);

    }

    const draggingEnd2 = (event, questionIndex) => {
        event.preventDefault();
        let optionIndex = event.dataTransfer.getData("optionIndex");

        const newData = { ...props.formData };
        if (newData.questions[questionIndex].userAnswer === undefined)
            newData.questions[questionIndex].userAnswer = [];

        newData.questions[questionIndex].userAnswer[optionIndex] = undefined;
        props.setFormData(newData);

    }
    return (

        <>

            <div className='w-full bg-white p-5 py-3 mb-3 rounded-[10px]'>
                <p className='text-blue-500'><b>Question #{props.questionIndex + 1}</b> (Drag n Drop options)</p>
                <h6 className='text-lg font-semibold text-gray-700'>{props.question.questionTitle}</h6>



                <h6 className='mt-2 text-md font-medium'>Q. Fill in the blanks: </h6>

                <div className='font-normal text-xl mb-2 flex items-center' id='preview'>
                    {props.question.sentence.split(' ').map((word, sentenceIndex) => {
                        let tempIndex = props.question.options.indexOf(word);
                        if (tempIndex !== -1 && props.question.correctOptions[tempIndex] === true) {
                            return (
                                <div key={sentenceIndex} className='inline-block min-w-[50px] min-h-[20px] mr-2  bg-yellow-200 rounded p-2' droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => draggingEnd(e, sentenceIndex)}>
                                    {
                                        props.question.userAnswer !== undefined ?
                                            props.question.userAnswer.map((optionIndex, ansIndex) => {
                                                if (optionIndex !== undefined && optionIndex!==null)
                                                    return (
                                                        <div key={ansIndex} className='rounded border border-blue-400 px-2 py-1 cursor-move text-sm' draggable onDragStart={(e) => draggingStart(e, sentenceIndex)}>
                                                            {props.question.options[optionIndex]}
                                                        </div>
                                                    )
                                                else
                                                    return "";
                                            })
                                            :
                                            ""
                                    }
                                </div>
                            )
                        }
                        else {
                            return (
                                <span key={sentenceIndex} >
                                    {word}&nbsp;
                                </span>
                            )
                        }

                    })}
                </div>

                <h6 className='mt-2 text-md'>Options: </h6>
                <div className='my-2 w-full flex flex-wrap gap-2 min-h-[20px] min-w-[20px]' droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => draggingEnd2(e, props.questionIndex)}>

                    {
                        props.question.options.map((option, optionIndex) => {
                            if (props.question.userAnswer === undefined || !props.question.userAnswer.includes(optionIndex))
                                return (
                                    <div key={optionIndex} className='rounded border border-blue-300 px-3 py-2 cursor-move' draggable="true" onDragStart={(e) => draggingStart(e, optionIndex)} droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => draggingEnd2(e, props.questionIndex)}>
                                        {option}
                                    </div>
                                )
                            else
                                return "";
                        })
                    }
                </div>


            </div>
        </>
    )
}

export default ViewClozeQuestion