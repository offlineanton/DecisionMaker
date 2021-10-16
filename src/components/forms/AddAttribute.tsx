import React, { useState } from "react";
import styled from "styled-components";

import Input from "../Input";
import Button from "../Button";
import { Attribute } from "../DecisionMaker";

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1em
`;

const AddAttribute = ({
    cancelAddAttribute,
    addAttribute,
    attributes
}: AddAttributeProps) => {
    const [attributeName, setAttributeName] = useState<string>("");
    const [attributeWeight, setAttributeWeight] = useState<number>(1);

    const handleAddAttribute = () => {
        addAttribute({
            name: attributeName,
            weight: attributeWeight
        });
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
                    onClick={handleAddAttribute}
                    color="blue"
                >
                    Add Attribute
                </Button>
            </ButtonContainer>
        </>
    );
};

interface AddAttributeProps {
    cancelAddAttribute: () => void;
    addAttribute: ({}: Attribute) => void;
    attributes: Attribute[];
}

export default AddAttribute;