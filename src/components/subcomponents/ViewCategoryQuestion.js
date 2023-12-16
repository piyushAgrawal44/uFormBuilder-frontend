import React from 'react'

function ViewCategoryQuestion(props) {

    
    const draggingStart = (event, optionIndex) => {
        event.dataTransfer.setData("optionIndex", optionIndex);
    }

    const draggingOver = (event) => {
        event.preventDefault();
    }

    const draggingEnd = (event, categoryIndex, questionIndex) => {
        event.preventDefault();
        let optionIndex = event.dataTransfer.getData("optionIndex");


        const newData = { ...props.formData };
        if (newData.questions[questionIndex].userAnswer === undefined)
            newData.questions[questionIndex].userAnswer = [];


        newData.questions[questionIndex].userAnswer[optionIndex] = newData.questions[questionIndex].categories[categoryIndex];
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
        <div key={props.questionIndex} className='w-full bg-white p-5 py-3 mb-3 rounded-[10px]'>
            <p className='text-blue-500'><b>Question #{props.questionIndex + 1}</b> (Drag n Drop options)</p>
            <h6 className='text-lg font-semibold '>Q. {props.question.questionTitle}</h6>


            <h6 className='mt-2 text-md'>Your Options: </h6>
            <div className='my-2 w-full flex flex-wrap gap-2 min-h-[20px] min-w-[20px]' droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => draggingEnd2(e, props.questionIndex)}>

                {
                    props.question.options.map((option, optionIndex) => {
                        if (props.question.userAnswer === undefined || props.question.userAnswer[optionIndex] === undefined)
                            return (
                                <div key={optionIndex} className='rounded border border-blue-300 px-3 py-2 cursor-move' draggable="true" onDragStart={(e) => draggingStart(e, optionIndex)} droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => draggingEnd2(e, props.questionIndex)}>
                                    {option}
                                </div>
                            )
                    })
                }
            </div>
            <h6 className='mt-2 text-md'>Categories: </h6>
            <div className="my-2 flex flex-wrap gap-2">
                {
                    props.question.categories.map((category, categoryIndex) => {
                        return (
                            <div key={categoryIndex} className={"w-auto min-w-[100px]" + ' rounded-[10px] border-2 border-blue-300 p-2 text-center h-[200px] overflow-y-auto cursor-move'}
                                droppable="true" onDragOver={(e) => { draggingOver(e) }} onDrop={(e) => draggingEnd(e, categoryIndex, props.questionIndex)}
                            >
                                <h6 className='underline font-semibold'>{category}</h6>
                                <br />
                                {
                                    props.question.userAnswer !== undefined ?
                                        props.question.userAnswer.map((e, ansIndex) => {
                                            if (e === category)
                                                return (
                                                    <div key={ansIndex} className='rounded border border-blue-300 px-3 py-2 cursor-move mb-1' draggable onDragStart={(e) => draggingStart(e, ansIndex)}>
                                                        {props.question.options[ansIndex]}
                                                    </div>
                                                )
                                        }) : ""
                                }
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ViewCategoryQuestion