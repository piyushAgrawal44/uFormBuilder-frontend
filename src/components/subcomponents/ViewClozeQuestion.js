import React from 'react'
import DropBlank from './DropBlank';
import DragOption from './DragOption';
import { useDrop } from 'react-dnd';

function ViewClozeQuestion(props) {
    // const [first, setFirst] = useState(0)
  

    const draggingOver = (event) => {
        event.preventDefault();
    }

    
    // const draggingEnd2 = (event, questionIndex) => {
    //     event.preventDefault();
    //     let optionIndex = event.dataTransfer.getData("optionIndex");

    //     const newData = { ...props.formData };
    //     if (newData.questions[questionIndex].userAnswer === undefined)
    //         newData.questions[questionIndex].userAnswer = [];

    //     newData.questions[questionIndex].userAnswer[optionIndex] = undefined;
    //     props.setFormData(newData);

    // }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "selected_option",
        drop: (item) => {
            draggingEnd2(item.optionIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const draggingEnd2 = (optionIndex) => {
       
        const newData = { ...props.formData };
        if (newData.questions[props.questionIndex].userAnswer === undefined)
            newData.questions[props.questionIndex].userAnswer = [];

        newData.questions[props.questionIndex].userAnswer[optionIndex] = undefined;
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
                                
                                <DropBlank key={sentenceIndex} formData={props.formData} question={props.question} questionIndex={props.questionIndex} sentenceIndex={sentenceIndex}  setFormData={props.setFormData} />
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
                <div ref={drop} className={`my-2 w-full flex flex-wrap gap-2 min-h-[20px] min-w-[20px] ${isOver?'bg-gray-200':""}`} droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => draggingEnd2(e, props.questionIndex)}>

                    {
                        props.question.options.map((option, optionIndex) => {
                            if (props.question.userAnswer === undefined || !props.question.userAnswer.includes(optionIndex))
                                return (
                                    
                                    <DragOption key={optionIndex} option={option} optionIndex={optionIndex} type="blank" />
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