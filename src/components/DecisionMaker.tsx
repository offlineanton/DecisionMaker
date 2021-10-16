import React, { useState } from "react";
import styled from "styled-components";
import ReactFlow, { addEdge, Handle, ReactFlowProps } from 'react-flow-renderer';
import Modal from "./Modal";
import DecisionScreen from "./DecisionScreen";
import Sidebar from "./Sidebar";

const AttributeContainer = styled.div`
    padding: 0 1em;
    color: black;
    width: 150px;
    text-align: left;
    
    h3 {
        text-align: left;
        font-weight: bold;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const initialElements: Element[] = [];

const DecisionMaker = () => {
    const [elements, setElements] = useState<Element[]>(initialElements);
    const [addingAttribute, setAddingAttribute] = useState(false);

    return (
        <FlexContainer>
            <Sidebar
                setAddingAttribute={setAddingAttribute}
            />
            <DecisionScreen elements={elements} />

            {addingAttribute &&
            <Modal onClose={() => setAddingAttribute(false)}>
                test
            </Modal>
            }
        </FlexContainer>
    );
};


interface Element {
    id: string;
    type?: string;
    data: {
        label: React.ReactNode;
    };
    position: {
        x: number;
        y: number;
    };
}

export default DecisionMaker;