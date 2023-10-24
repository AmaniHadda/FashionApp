import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './Abonnements.css'; 

const CustomButtonGroup = ({ options, selectedOption, onOptionChange }) => {
  return (
    <ButtonGroup className="button-group">
      {options.map((option, index) => (
        <button
          key={index}
          className={`button ${option === selectedOption ? 'selected' : ''}`}
          onClick={() => onOptionChange(option)}
        >
          {option}
        </button>
      ))}
    </ButtonGroup>
  );
};

export default CustomButtonGroup;
