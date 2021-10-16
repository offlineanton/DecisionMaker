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

    const calculateBestChoice = (newChoices?: Choice[]) => {
        const choicesValue = newChoices ? newChoices : choices;

        return choicesValue.reduce((previousValue, currentValue) => {
            return currentValue.score > previousValue.score ? currentValue : previousValue
        });
    };

    const calculateScore = (choice: Omit<Choice, "score">) => {
        return attributes.reduce((previousValue, currentValue) => {
            return previousValue + (choice.attributeValues[currentValue.name] * currentValue.weight);
        }, 0)
    }

    const handleAddAttribute = (attribute: Attribute) => {
        const elementId = (elements.length + 1).toString();

        setAttributes([
            ...attributes,
            {
                ...attribute,
                id: elementId
            }
        ]);

        setElements([
            ...elements,
            {
                id: elementId,
                type: 'input',
                data: { label:
                        <AttributeContainer>
                            <h3>{attribute.name}</h3>
                            <p>Weight: {attribute.weight}</p>
                        </AttributeContainer>
                },
                position: { x: (attributes.length + 1) * 200, y: 100 },
            },
            // loop through choices and connect them to the new attribute
            ...choices.map(choice => ({
                id: `e${elementId}-${choice.id}`,
                source: elementId,
                target: choice.id,
                animated: true,
            }))
        ]);

        setAddingAttribute(false);
    };

    const handleAddChoice = (choice: Omit<Choice, "score">) => {
        const elementId = (elements.length + 1).toString();

        // loop through attributes and multiple them to the choice values, then get the sum of them all
        const score = calculateScore(choice);

        const newChoices = [
            ...choices,
            {
                ...choice,
                id: elementId,
                score
            }
        ];

        setChoices(newChoices);
        const bestChoice = calculateBestChoice(newChoices);

        setElements([
            // filter the elements so it removes the best choice
            ...elements.filter(element => element.type !== "output"),
            {
                id: elementId,
                data: { label:
                        <AttributeContainer>
                            <h3>{choice.name}</h3>
                            {Object.entries(choice.attributeValues).map(attributeValue =>
                                <p>{attributeValue[0]}: {attributeValue[1]}</p>
                            )}
                            <p><b>Score: {score}</b></p>
                        </AttributeContainer>
                },
                position: { x: (choices.length + 1) * 200, y: 250 },
            },

            // loop through attributes and connect them to the new choice
            ...attributes.map(attribute => ({
                id: `e${attribute.id}-${elementId}`,
                source: attribute.id,
                target: elementId,
                animated: true,
            })),

            // show the best score
            {
                id: (elements.length + 2).toString(),
                type: 'output',
                data: { label:
                        <AttributeContainer>
                            <h3>{bestChoice.name}</h3>
                            <p><b>Score: {bestChoice.score}</b></p>
                        </AttributeContainer>
                },
                position: { x: 200, y: 600 },
            },

            // loop through all the choices and connect to the best choice
            ...newChoices.map(choice => ({
                id: `e${choice.id}-${(elements.length + 2).toString()}`,
                source: choice.id,
                target: (elements.length + 2).toString(),
                animated: true,

            }))
        ]);

        setAddingChoice(false);
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

interface Element {
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