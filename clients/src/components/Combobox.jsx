import React, { useState } from 'react';

const ComboBox = ({ options, onSelect }) => {
    const [inputValue, setInputValue] = useState('USD');

    const handleSelectChange = (e) => {
        setInputValue(e.target.value);
        onSelect(e.target.value);
    };

    return (
        <div>
            <select value={inputValue} onChange={handleSelectChange} style={{width:'100%'}}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ComboBox;