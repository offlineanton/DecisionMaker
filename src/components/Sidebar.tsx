import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Button from "./Button";
import colors from "../constants/colors";

const SidebarContainer = styled.div`
    width: 200px;
    background: ${colors.white};
    color: white;
    height: 100%;
`;

const Title = styled.h1`
    text-transform: uppercase;
    font-weight: 500;
    color: black;
    font-size: 1.7em;
    padding: 0.5em;
`;

const Actions = styled.div`
    padding: 1em;
`;

const Sidebar = ({
    addAttribute,
    addChoice
}: SidebarProps) => {
    return (
        <SidebarContainer>
            <Title>
                <b>
                    Decision
                    <br />
                    Maker
                </b>
                2000
            </Title>

            <Actions>
                <Button
                    color="blue"
                    onClick={addAttribute}
                    style={{ marginBottom: "1em" }}
                >
                    Add Attribute
                </Button>

                <Button
                    color="blue"
                    onClick={addChoice}
                >
                    Add Choice
                </Button>
            </Actions>
        </SidebarContainer>
    )
};

interface SidebarProps {
    addAttribute: () => void;
    addChoice: () => void;
}

export default Sidebar;