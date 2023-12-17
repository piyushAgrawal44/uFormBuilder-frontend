import React from 'react'
import { useDrag, useDrop } from 'react-dnd';
import Input from './Input';
import CloseButton from './CloseButton';

function DragCategories(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: props.type,
        item: { categoryIndex: props.index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "dragcategories",
        drop: (item) => {
            draggingEnd(item.categoryIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const draggingEnd = (draggedItemIndex) => {
        // props.index is current item index i just swapping the elements
        const newQuestion = [...props.questions];
        const temp = newQuestion[props.questionIndex].categories[draggedItemIndex];
        newQuestion[props.questionIndex].categories[draggedItemIndex] = newQuestion[props.questionIndex].categories[props.index];
        newQuestion[props.questionIndex].categories[props.index] = temp;
        props.setQuestions(newQuestion);
    }
    return (
        <>
            <div className={` ${isOver ? 'bg-pink-100' : ''}`} ref={drop}>
                <div className={`flex justify-between items-center ${isDragging ? 'bg-slate-100' : ''}`} ref={drag}>
                    <div className='flex  gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mt-1 bi bi-filter-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <Input type="text" name="category" placeholder="Category" value={props.ele} onchange={(e) => props.handleInputChange(props.index, e.target.value)} />

                    </div>
                    <CloseButton text="X" onclick={() => props.removeCategory(props.index)} />
                </div>
            </div>
        </>
    )
}

export default DragCategories