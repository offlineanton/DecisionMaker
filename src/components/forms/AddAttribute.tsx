import React, { useState } from "react";
import styled from "styled-components";

import Input from "../Input";
import Button from "../Button";
import {
    Attribute,
    AttributeContainer,
    Choice,
    Element
} from "../DecisionMaker";

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1em
`;

const AddAttribute = ({
    cancelAddAttribute,
    attributes,
    elements,
    setAttributes,
    setElements,
    choices
}: AddAttributeProps) => {
    const [attributeName, setAttributeName] = useState<string>("");
    const [attributeWeight, setAttributeWeight] = useState<number>(1);

    const handleAddAttribute = () => {
        const elementId = (elements.length + 1).toString();

        setAttributes([
            ...attributes,
            {
                name: attributeName,
                weight: attributeWeight,
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
                            <h3>{attributeName}</h3>
                            <p>Weight: {attributeWeight}</p>
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

        cancelAddAttribute();
    };

    // Ensure attribute has value and name is unique
    const addAttributeDisabled = !attributeName
        || !attributeWeight
        || attributes.some(({ name }) => name === attributeName);

    return (
        <>
            <h3 style={{ marginTop: "0" }}>Add Attribute</h3>

            <Input
                required
                label="Name"
                style={{ marginBottom: "1em" }}
                name="attribute-name"
                value={attributeName}
                onChange={(value: React.FormEvent<HTMLInputElement>) => setAttributeName(value.currentTarget.value)}
            />

            <Input
                required
                style={{ marginBottom: "1em" }}
                label="Weight"
                type="number"
                name="attribute-weight"
                value={attributeWeight}
                onChange={(value: React.FormEvent<HTMLInputElement>) => setAttributeWeight(parseInt(value.currentTarget.value))}
            />

            <ButtonContainer>
                <Button
                    onClick={cancelAddAttribute}
                >
                    Cancel
                </Button>

                <Button
                    disabled={addAttributeDisabled}
                    onClick={() => handleAddAttribute()}
                    color="blue"
                >
                    Add Attribute
                </Button>
            </ButtonContainer>
        </>
    );
};

interface AddAttributeProps {
    setElements: React.Dispatch<React.SetStateAction<Element[]>>;
    cancelAddAttribute: () => void;
    // addAttribute: ({}: Attribute) => void;
    elements: Element[];
    choices: Choice[];
    attributes: Attribute[];
    setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
}

export default AddAttribute;