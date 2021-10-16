import React, { useState } from "react";

import Input from "../Input";
import Button from "../Button";
import { Attribute, Choice } from "../DecisionMaker";
import { ButtonContainer } from "./AddAttribute";

const AddChoice = ({
    cancelAddChoice,
    addChoice,
    attributes
}: AddChoiceProps) => {
    const [choiceName, setChoiceName] = useState<string>("");

    //initialise choice attribute values at 0
    const [attributeValues, setAttributeValues] = useState<{ [key: string]: number }>(
        attributes.reduce((value, currentValue) => {
            return {
                ...value,
                [currentValue.name]: 0
            }
        }, {})
    );

    const handleAddChoice = () => {
        addChoice({
            name: choiceName,
        });
    };

    return (
        <>
            <h3 style={{ marginTop: "0" }}>Add Choice</h3>

            <Input
                required
                label="Name"
                style={{ marginBottom: "1em" }}
                name="choice-name"
                value={choiceName}
                onChange={(value: React.FormEvent<HTMLInputElement>) => setChoiceName(value.currentTarget.value)}
            />

            <p>Attributes: </p>

            {attributes.map(attribute =>
                <Input
                    required
                    type="number"
                    label={attribute.name}
                    style={{ marginBottom: "1em" }}
                    name={`${attribute.name}-input`}
                    value={attributeValues[attribute.name]}
                    onChange={(value: React.FormEvent<HTMLInputElement>) => setAttributeValues({
                        ...attributeValues,
                        [attribute.name]: parseInt(value.currentTarget.value)
                    })}
                />
            )}

            <ButtonContainer>
                <Button
                    onClick={cancelAddChoice}
                >
                    Cancel
                </Button>

                <Button
                    disabled={!choiceName}
                    onClick={handleAddChoice}
                    color="blue"
                >
                    Add Choice
                </Button>
            </ButtonContainer>
        </>
    );
}

interface AddChoiceProps {
    cancelAddChoice: () => void;
    addChoice: ({}: Choice) => void;
    attributes: Attribute[];
}

export default AddChoice;