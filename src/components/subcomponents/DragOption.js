import React from 'react'
import { useDrag } from 'react-dnd';

function DragOption(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: props.type,
        item: {optionIndex: props.optionIndex},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    // draggable="true" onDragStart={(e) => draggingStart(e, optionIndex)} droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => draggingEnd2(e, props.questionIndex)}
    return (
        <>
            <div className={`rounded border border-blue-300 px-2 py-1 mb-1 mr-1 cursor-move ${isDragging ? 'opacity-25' : 'opacity-100'}`}
                ref={drag}
            >
                {props.option}
            </div>
        </>
    )
}

export default DragOption