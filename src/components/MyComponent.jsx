import React, { useState } from 'react';

const MyComponent = () => {
    const [elements, setElements] = useState([]);

    const handleButtonClick = () => {
        // Create a new element or component
        const newElement = <div key={elements.length + 1}>New Element {elements.length + 1}</div>;

        // Update the state to include the new element
        setElements([...elements, newElement]);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Add Element</button>
            {/* Render existing elements */}
            {elements.map((element, index) => (
                <div key={index}>{element}</div>
            ))}
        </div>
    );
};

export default MyComponent;
