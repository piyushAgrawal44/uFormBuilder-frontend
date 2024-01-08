import React from 'react'
import { useDrop } from 'react-dnd';
import DragOption from './DragOption';

function DropBlank(props) {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "blank",
        drop: (item) => {
            draggingEnd(item.optionIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const draggingEnd = (optionIndex) => {
        
        const newData = { ...props.formData };
        if (newData.questions[props.questionIndex].userAnswer === undefined)
            newData.questions[props.questionIndex].userAnswer = [];

        console.log(props.sentenceIndex)
        newData.questions[props.questionIndex].userAnswer[props.sentenceIndex] = parseInt(optionIndex);
        props.setFormData(newData);
    }
    // droppable="true" onDragOver={(e) => { draggingOver(e) }} onDrop={(e) => draggingEnd(e, categoryIndex, props.questionIndex)}
    return (
        <>
           
            <div key={props.sentenceIndex} className={`flex min-w-[60px] min-h-[30px] justify-center  items-center mr-2 border  border-yellow-300 rounded px-2 text-sm ${isOver?'bg-gray-200':""}`} ref={drop}>
                {
                    props.question.userAnswer !== undefined ?
                        props.question.userAnswer.map((optionIndex, ansIndex) => {
                            if (optionIndex !== null && ansIndex===props.sentenceIndex)
                            return <DragOption key={ansIndex} option={props.question.options[optionIndex]} optionIndex={props.sentenceIndex} type="selected_option" />
                               
                            else
                                return "";
                        })
                        :
                        ""
                }
            </div>
        </>
    )
}

export default DropBlank
