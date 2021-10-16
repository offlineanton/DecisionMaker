import React from 'react';
import styled from "styled-components";

import DecisionMaker from "./components/DecisionMaker";
import Sidebar from "./components/Sidebar";

const FlexContainer = styled.div`
    display: flex;
    height: 100vh;
`;

function App() {
    return (
        <div className="App">
            <DecisionMaker />
        </div>
    );
}

export default App;
