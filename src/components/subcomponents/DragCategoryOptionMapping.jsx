import React from 'react'
import { useDispatch } from "react-redux";
import {actions} from '../../reducers/formbuilder/createFormSlice';
import Input from './Input';
import CloseButton from './CloseButton';
import Select from './Select';
import { useDrag, useDrop } from 'react-dnd';

function DragCategoryOptionMapping(props) {
    const dispatch=useDispatch();

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
        dispatch(actions.swapOption({question_type: 'categorized-question',questionId: props.questionIndex, index1: draggedItemIndex, index2: props.currentElementIndex}));
    }


    return (
        <>
            <div  className={`p-1 rounded-md ${isOver ? 'bg-blue-100' : ''} `} ref={drop}>
                <div className={`flex items-center gap-2 ${isDragging ? '' : ''}`} ref={drag}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mt-1 mr-1 bi bi-filter-circle shrink-0" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                    </svg>

                    <div className="flex items-center gap-2">

                        <Input type="text" name="option" placeholder="Option" value={props.ele} onchange={(e) => dispatch(actions.updateOptionValue({questionId: props.questionIndex, optionIndex: props.currentElementIndex, value: e.target.value}))} />

                        <Select options={props.options} text="-Select category-" onchange={(e) => dispatch(actions.updateOptionCategoryMapping({questionId: props.questionIndex, optionIndex: props.currentElementIndex, categoryValue: e.target.value}))} selected={props.selected} />

                        <CloseButton text="X" onclick={() => dispatch(actions.removeOption({questionId: props.questionIndex, optionIndex: props.currentElementIndex, question_type: "categorized-question"}))} />
                    </div>

                </div>

            </div>
        </>
    )
}

export default DragCategoryOptionMapping