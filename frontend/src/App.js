import React, { useState, useEffect } from "react";
import StopSelector from "./StopSelector";
import EtaCard from "./EtaCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function App() {
    const [stop, setStop] = useState({
        id: 30050, name: "State/Lake (Inner Loop)", lines: ["G", "Pink", "Org"]
    });
    const [etas, setEtas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);

    // query api
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
    }, [stop, reload]);

    // set up interval to re-query every 5 minutes
    useEffect(() => {
        let interval = setInterval(() => setReload(!reload), (1000 * 60 * 5));
        return () => clearInterval(interval);
    })

    return (
        <>
            <StopSelector currentStop={stop} callback={setStop} />
            {loading ?
                <div id="loading-icon">
                    <FontAwesomeIcon icon={faSpinner} spin />
                </div> :
                <div id="etas-container">
                    {etas.map((eta, i) =>
                        <EtaCard
                            key={i}
                            num={i + 1}
                            arrivalTime={eta.arrT}
                            route={eta.rt}
                            run={eta.rn}
                            destinationName={eta.destNm}
                        />
                    )}
                </div>
            }
        </>
    );
}

export default App;