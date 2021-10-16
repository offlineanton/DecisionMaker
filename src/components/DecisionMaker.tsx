import React, { useState } from "react";
import styled from "styled-components";

import Modal from "./Modal";
import DecisionScreen from "./DecisionScreen";
import Sidebar from "./Sidebar";
import AddAttribute from "./forms/AddAttribute";
import AddChoice from "./forms/AddChoice";

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
    const [attributes, setAttributes] = useState<Attribute[]>([]);

    const [addingChoice, setAddingChoice] = useState(false);
    const [choices, setChoices] = useState<Choice[]>([]);

    const handleAddAttribute = (attribute: Attribute) => {
        setAttributes([
            ...attributes,
            attribute
        ]);

        setElements([
            ...elements,
            {
                id: (elements.length++).toString(),
                type: 'input',
                data: { label:
                        <AttributeContainer>
                            <h3>{attribute.name}</h3>
                            <p>Weight: {attribute.weight}</p>
                        </AttributeContainer>
                },
                position: { x: (attributes.length + 1) * 200, y: 100 },
            },
        ]);

        setAddingAttribute(false);
    };

    const handleAddChoice = (choice: Choice) => {
        console.log(choice);
        // setChoices([
        //     ...choices,
        //     choice
        // ]);
        //
        // setAddingChoice(false);
    };

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
                    attributes={attributes}
                    addAttribute={(attribute) => handleAddAttribute(attribute)}
                    cancelAddAttribute={() => setAddingAttribute(false)}
                />
            </Modal>
            }

            {addingChoice &&
            <Modal onClose={() => setAddingChoice(false)}>
                <AddChoice
                    attributes={attributes}
                    addChoice={(choice) => handleAddChoice(choice)}
                    cancelAddChoice={() => setAddingChoice(false)}
                />
            </Modal>
            }
        </FlexContainer>
    );
};

export interface Attribute {
    name: string;
    weight: number;
}

export interface Choice {
    name: string;
    attributeValues: {
        [key: string]: number
    }
}

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