import React from "react";
import styled from "styled-components";

const Button = styled.button<ButtonProps>`
    outline: none;
    border: none;
    border-radius: 3px;
    padding: 1em 2em;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    
    ${({ color }) => {
        switch (color) {
            case "white":
                return `
                    background: white;
                    color: #161616;
                `;
            case "black":
                return `
                    background: #161616;
                    color: white;
                `;
        }    
    }}
`;

interface ButtonProps {
    color: string;
}

export default Button;