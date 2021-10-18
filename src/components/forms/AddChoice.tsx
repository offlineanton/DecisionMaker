import React, { useState } from "react";

import Input from "../Input";
import Button from "../Button";
import {
    Attribute,
    Choice,
    Element,
    AttributeContainer
} from "../DecisionMaker";
import { ButtonContainer } from "./AddAttribute";

const AddChoice = ({
    cancelAddChoice,
    attributes,
    setElements,
    elements,
    choices,
    setChoices,
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

    const handleAddChoice = () => {
        const choice = {
            name: choiceName,
            attributeValues
        };
        const elementId = (elements.length + 1).toString();

        // loop through attributes and multiply them to the choice values, then get the sum of them all
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

        cancelAddChoice();
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
                    key={attribute.name}
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
                    onClick={() => handleAddChoice()}
                    color="blue"
                >
                    Add Choice
                </Button>
            </ButtonContainer>
        </>
    );
}

interface AddChoiceProps {
    setElements: React.Dispatch<React.SetStateAction<Element[]>>;
    setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
    cancelAddChoice: () => void;
    attributes: Attribute[];
    elements: Element[];
    choices: Choice[];
    setChoices: React.Dispatch<React.SetStateAction<Choice[]>>;
}

export default AddChoice;