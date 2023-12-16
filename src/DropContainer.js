// DropContainer.js
import React from 'react';
import { useDrop } from 'react-dnd';

const DropContainer = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: 'INPUT',
    drop: (item) => onDrop(item.id),
  });

  return <div ref={drop}>{children}</div>;
};

export default DropContainer;
