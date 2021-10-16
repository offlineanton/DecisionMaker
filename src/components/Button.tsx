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
    transition: background 0.05s;
    
    &:hover {
        background: ${colors.black};
    }
    
    &:disabled {
        opacity: 0.7;
    }
    
    ${({ color }) => {
        switch (color) {
            case "white":
                return `
                    background: ${colors.white};
                    color: ${colors.black};
                    
                    &:hover {
                        background: ${colors.lightGrey};
                    }
                `;
            case "blue": 
                return `
                    background: ${colors.blue};
                    
                    &:hover {
                        background: ${colors.darkBlue};
                    }
                `;
        }    
    }}
`;

interface ButtonProps {
    color?: string;
}

export default Button;