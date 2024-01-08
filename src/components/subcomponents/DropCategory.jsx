import React from 'react'
import { useDrop } from 'react-dnd';
import DragOption from './DragOption';

function DropCategory(props) {


    const [{ isOver }, drop] = useDrop(() => ({
        accept: "option",
        drop: (item)=>{
            draggingEnd(item.optionIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const draggingEnd = (optionIndex) => {
        console.log(optionIndex)
        const newData = { ...props.formData };
        if (newData.questions[props.questionIndex].userAnswer === undefined)
            newData.questions[props.questionIndex].userAnswer = [];


        newData.questions[props.questionIndex].userAnswer[optionIndex] = newData.questions[props.questionIndex].categories[props.categoryIndex];

        props.setFormData(newData);
        

    }
    // droppable="true" onDragOver={(e) => { draggingOver(e) }} onDrop={(e) => draggingEnd(e, categoryIndex, props.questionIndex)}
    return (
        <>
            <div  ref={drop} className={`w-auto min-w-[100px] rounded-[10px] border-2 border-blue-300 p-2 text-center h-[200px] overflow-y-auto cursor-move mr-1 mb-1 ${isOver ? 'bg-slate-200' : ''}`}
                
            >
                <h6 className='underline font-semibold'>{props.category}</h6>
                <br />
                {
                    props.question.userAnswer !== undefined ?
                        props.question.userAnswer.map((e, ansIndex) => {
                            if (e === props.category)
                                return <DragOption key={ansIndex} option={props.question.options[ansIndex]} optionIndex={ansIndex} type="selected_option"/>
                                
                            else
                                return "";
                        }) : ""
                }
            </div>
        </>
    )
}

export default DropCategory
