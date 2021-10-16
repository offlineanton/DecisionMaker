import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Button from "./Button";

const SidebarContainer = styled.div`
    width: 200px;
    background: #fbfbfb;
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
    setAddingAttribute
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
                    onClick={() => setAddingAttribute(true)}
                    style={{ marginBottom: "1em" }}
                    color="black"
                >
                    Add Attribute
                </Button>

                <Button
                    color="black"
                >
                    Add Choice
                </Button>
            </Actions>
        </SidebarContainer>
    )
};

interface SidebarProps {
    setAddingAttribute: Dispatch<SetStateAction<boolean>>;
}

export default Sidebar;