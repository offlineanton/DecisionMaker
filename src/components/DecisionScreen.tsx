import React from "react";
import styled from "styled-components";
import ReactFlow from "react-flow-renderer";

import colors from "../constants/colors";

const DecisionMakerContainer = styled.div`
    background: ${colors.darkBlue};
    height: 100%;
    flex-grow: 1;
`;

const DecisionScreen = ({
    elements
}: DecisionScreenProps) => {
    return (
        <DecisionMakerContainer>
            <ReactFlow
                elements={elements}
            />
        </DecisionMakerContainer>
    )
};

interface DecisionScreenProps {
    elements: any
}

export default DecisionScreen;