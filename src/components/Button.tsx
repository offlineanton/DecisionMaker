import React from "react";
import styled from "styled-components";

import colors from "../constants/colors";

const Button = styled.button<ButtonProps>`
    outline: none;
    border: none;
    border-radius: 3px;
    padding: 1em 2em;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    background: ${colors.black};
    color: white;
    
    ${({ color }) => {
        switch (color) {
            case "white":
                return `
                    background: ${colors.white};
                    color: ${colors.black};
                `;
            case "blue": 
                return `
                    background: ${colors.blue};
                `;
        }    
    }}
    
    &:disabled {
        opacity: 0.7;
    }
`;

interface ButtonProps {
    color?: string;
}

export default Button;