import React from 'react';
import DragOption from './DragOption';
import DropCategory from './DropCategory';
import { useDrop } from 'react-dnd';
function ViewCategoryQuestion(props) {


    const [{ isOver }, drop] = useDrop(() => ({
        accept: "selected_option",
        drop: (item)=>{
            draggingEnd2(item.optionIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const draggingEnd2 = ( optionIndex) => {
       
        // let optionIndex = dragItem.current;
        const newData = { ...props.formData };
        if (newData.questions[props.questionIndex].userAnswer === undefined)
            newData.questions[props.questionIndex].userAnswer = [];

        newData.questions[props.questionIndex].userAnswer[optionIndex] = undefined;
        props.setFormData(newData);

    }

    // droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => draggingEnd2(e, props.questionIndex)}
    return (
        <div key={props.questionIndex} className='w-full bg-white p-5 py-3 mb-3 rounded-[10px]'>
            <p className='text-blue-500'><b>Question #{props.questionIndex + 1}</b> (Drag n Drop options)</p>
            <h6 className='text-lg font-semibold '>Q. {props.question.questionTitle}</h6>


            <h6 className='mt-2 text-md'>Your Options: </h6>
            <div className={`my-2 w-full flex flex-wrap gap-2 min-h-[20px] min-w-[20px] ${isOver ? 'bg-slate-200' : ''}`} ref={drop}>

                {
                    props.question.options.map((option, optionIndex) => {
                        
                        if (props.question.userAnswer === undefined || props.question.userAnswer[optionIndex] === undefined)
                            return <DragOption key={optionIndex} option={option} optionIndex={optionIndex} type="option" />
                        else
                            return "";
                    })
                }
            </div>
            <h6 className='mt-2 text-md'>Categories: </h6>
            <div className="my-2 flex flex-wrap gap-2">
                {
                    props.question.categories.map((category, categoryIndex) => {
                        return <DropCategory key={categoryIndex} formData={props.formData} question={props.question} questionIndex={props.questionIndex} categoryIndex={categoryIndex} category={category} setFormData={props.setFormData} />
                    })
                }
            </div>

        </div>
    )
}

export default ViewCategoryQuestion