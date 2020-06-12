import React, { useState, useEffect } from "react";
import StopSelector from "./StopSelector";

function App() {
    const [stop, setStop] = useState({
        id: 30050, name: "State/Lake (Inner Loop)"
    });

    return (
        <>
            <StopSelector currentStop={stop} callback={setStop} />
        </>
    );
}

export default App;