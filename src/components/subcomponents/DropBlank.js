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


            newData.questions[props.questionIndex].userAnswer[props.sentenceIndex] = parseInt(optionIndex);
            props.setFormData(newData);


    }
    // droppable="true" onDragOver={(e) => { draggingOver(e) }} onDrop={(e) => draggingEnd(e, categoryIndex, props.questionIndex)}
    return (
        <>
           
            <div key={props.sentenceIndex} className={`inline-block min-w-[50px] min-h-[20px] mr-2 border  border-yellow-300 rounded p-2 ${isOver?'bg-gray-200':""}`} ref={drop}>
                {
                    props.question.userAnswer !== undefined ?
                        props.question.userAnswer.map((optionIndex, ansIndex) => {
                            if (optionIndex !== undefined && optionIndex !== null)
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
