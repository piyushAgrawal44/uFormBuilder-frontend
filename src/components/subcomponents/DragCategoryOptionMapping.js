import React from 'react'

import Input from './Input';
import CloseButton from './CloseButton';
import Select from './Select';
import { useDrag, useDrop } from 'react-dnd';

function DragCategoryOptionMapping(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: props.type,
        item: { mappingIndex: props.currentElementIndex },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const [{ isOver }, drop] = useDrop(() => ({
        accept: props.type,
        drop: (item) => {
            draggingEnd(item.mappingIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const draggingEnd = (draggedItemIndex) => {
        
        // props.currentElementIndex is current item index i just swapping the elements
        const newQuestion = [...props.questions];
        let temp = newQuestion[props.questionIndex].options[draggedItemIndex];
        newQuestion[props.questionIndex].options[draggedItemIndex] = newQuestion[props.questionIndex].options[props.currentElementIndex];
        newQuestion[props.questionIndex].options[props.currentElementIndex] = temp;

        temp = newQuestion[props.questionIndex].optionCategoryMapping[draggedItemIndex];
        newQuestion[props.questionIndex].optionCategoryMapping[draggedItemIndex] = newQuestion[props.questionIndex].optionCategoryMapping[props.currentElementIndex];
        newQuestion[props.questionIndex].optionCategoryMapping[props.currentElementIndex] = temp;


        props.setQuestions(newQuestion);
    }


    return (
        <>
            <div  className={` ${isOver ? 'bg-pink-100' : ''} p-2`} ref={drop}>
                <div className={`flex gap-2 ${isDragging ? 'bg-slate-100' : ''}`} ref={drag}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mt-1 mr-1 bi bi-filter-circle shrink-0" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                    </svg>

                    <div className="flex items-center gap-2">

                        <Input type="text" name="option" placeholder="Option" value={props.ele} onchange={(e) => props.handleOptionChange(props.currentElementIndex, e.target.value)} />

                        <Select options={props.options} text="--Select category--" onchange={(e) => props.handleSelectChange(props.currentElementIndex, e.target.value)} selected={props.selected} />

                        <CloseButton text="X" onclick={() => props.removeOption(props.currentElementIndex)} />
                    </div>

                </div>

            </div>
        </>
    )
}

export default DragCategoryOptionMapping