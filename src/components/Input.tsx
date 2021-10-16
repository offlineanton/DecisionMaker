import React from "react";
import styled from "styled-components";

import colors from "../constants/colors";

const InputComponent = styled.input`
    width: 100%;
    padding: 1em;
    border: 1px solid ${colors.midGrey};
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
    
    &:focus {
        border: 1px solid ${colors.black}; 
    }
`;

const Label = styled.label`
    font-size: 0.8em;
    color: ${colors.lightGrey};
`;

const Required = styled.span`
    color: ${colors.red};
`;

const Input = ({
    label,
    name,
    required,
    ...rest
}: InputProps) => {
    return (
        <>
            {label &&
                <>
                    <Label htmlFor={name}>{label}</Label>
                    {required && <Required>*</Required>}
                </>
            }
            <InputComponent
                id={name}
                {...rest}
            />
        </>
    )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default Input;