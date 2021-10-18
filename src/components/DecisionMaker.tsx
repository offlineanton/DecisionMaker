import React, { useState } from "react";
import styled from "styled-components";

import colors from "../constants/colors";

import Modal from "./Modal";
import DecisionScreen from "./DecisionScreen";
import Sidebar from "./Sidebar";
import AddAttribute from "./forms/AddAttribute";
import AddChoice from "./forms/AddChoice";

export const AttributeContainer = styled.div`
    padding: 0 1em;
    color: ${colors.black};
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
    const [attributes, setAttributes] = useState<Attribute[]>([]);

    const [addingChoice, setAddingChoice] = useState(false);
    const [choices, setChoices] = useState<Choice[]>([]);

    return (
        <FlexContainer>
            <Sidebar
                addAttribute={() => setAddingAttribute(true)}
                addChoice={() => setAddingChoice(true)}
            />
            <DecisionScreen elements={elements} />

            {addingAttribute &&
            <Modal onClose={() => setAddingAttribute(false)}>
                <AddAttribute
                    elements={elements}
                    attributes={attributes}
                    setAttributes={setAttributes}
                    setElements={setElements}
                    choices={choices}
                    cancelAddAttribute={() => setAddingAttribute(false)}
                />
            </Modal>
            }

            {addingChoice &&
            <Modal onClose={() => setAddingChoice(false)}>
                <AddChoice
                    elements={elements}
                    setElements={setElements}
                    setAttributes={setAttributes}
                    attributes={attributes}
                    cancelAddChoice={() => setAddingChoice(false)}
                    choices={choices}
                    setChoices={setChoices}
                />
            </Modal>
            }
        </FlexContainer>
    );
};

export interface Attribute {
    id?: string;
    name: string;
    weight: number;
}

export interface Choice {
    id?: string;
    name: string;
    attributeValues: {
        [key: string]: number
    };
    score: number;
}

export interface Element {
    id: string;
    type?: string;
    data?: {
        label: React.ReactNode;
    };
    position?: {
        x: number;
        y: number;
    };
    source?: string;
    target?: string;
}

export default DecisionMaker;