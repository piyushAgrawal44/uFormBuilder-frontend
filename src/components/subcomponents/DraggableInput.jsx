// DraggableInput.js
import React from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';

const DraggableInput = ({ id, text }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'INPUT', id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <DragPreviewImage connect={preview} src="https://placehold.co/600x400/EEE/31343C" />
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      >
        <input type="text" defaultValue={text} />
      </div>
    </>
  );
};

export default DraggableInput;
