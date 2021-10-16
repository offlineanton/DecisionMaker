import React, { useState } from "react";

import Input from "../Input";
import Button from "../Button";
import { Choice} from "../DecisionMaker";
import { ButtonContainer } from "./AddAttribute";

const AddChoice = ({
    cancelAddChoice,
    addChoice
}: AddChoiceProps) => {
    const [choiceName, setChoiceName] = useState<string>("");

    const handleAddChoice = () => {
        addChoice({
            name: choiceName,
        });
    };

    return (
        <>
            <h3 style={{ marginTop: "0" }}>Add Attribute</h3>

            <Input
                required
                label="Name"
                style={{ marginBottom: "1em" }}
                name="choice-name"
                value={choiceName}
                onChange={(value: React.FormEvent<HTMLInputElement>) => setChoiceName(value.currentTarget.value)}
            />

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
                    Add Attribute
                </Button>
            </ButtonContainer>
        </>
    );
}

interface AddChoiceProps {
    cancelAddChoice: () => void;
    addChoice: ({}: Choice) => void;
}

export default AddChoice;