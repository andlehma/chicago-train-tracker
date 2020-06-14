import React, { useState, useEffect } from "react";
import StopSelector from "./StopSelector";
import EtaCard from "./EtaCard";

function App() {
    const [stop, setStop] = useState({
        id: 30050, name: "State/Lake (Inner Loop)"
    });
    const [etas, setEtas] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let endpoint = `/api/${stop.id}`;
        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                if (data.ctatt.eta) {
                    setEtas(data.ctatt.eta);
                } else {
                    setEtas([]);
                }
                setLoading(false);
            });
    }, [stop])

    return (
        <>
            <StopSelector currentStop={stop} callback={setStop} />
            {loading ?
                <p>loading...</p> :
                <div id="etas-container">
                    {etas.map((eta, i) =>
                        <EtaCard
                            key={i}
                            arrivalTime={eta.arrT}
                            route={eta.rt}
                            destinationName={eta.destNm}
                        />
                    )}
                </div>
            }
        </>
    );
}

export default App;