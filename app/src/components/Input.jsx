import React from 'react';
import styled from 'styled-components';

const Input = ({ name, value, onChange, label, type = 'text', ...rest }) => {
  return (
    <StyledWrapper>
      <div className="input-group">
        <input
          required
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="input"
          {...rest}
        />
        <label className={value ? 'filled' : 'user-label'}>{label}</label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-group {
    position: relative;
  }

  .input {
    border: solid 1.5px #9e9e9e;
    border-radius: 1rem;
    // background: none;
    padding-right: 6px;
    font-size: 1rem;
    color: #f5f5f5;
    transition: border 150ms cubic-bezier(0.4,0,0.2,1);
    width: 100%;
  }

  .user-label {
    position: absolute;
    left: 15px;
    color: #e8e8e8;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4,0,0.2,1);
    background: transparent;
  }

  .filled,
  .input:focus ~ label,
  .input:not(:placeholder-shown) ~ label {
    transform: translateY(-50%) scale(0.8);
    background-color: #212121;
    padding: 0 .2em;
    color: #2196f3;
  }

  .input:focus, .input:valid {
    outline: none;
    border: 1.5px solid #1a73e8;
  }
`;

export default Input;
