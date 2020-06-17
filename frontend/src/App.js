import React, { useState, useEffect, useRef } from "react";
import StopSelector from "./StopSelector";
import EtaCard from "./EtaCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// thanks Dan
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function App() {
    const [stop, setStop] = useState({
        id: 30050, name: "State/Lake (Inner Loop)", lines: ["G", "Pink", "Org"]
    });
    const [etas, setEtas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [time, setTime] = useState();

    // query CTA API
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

    // get Chicago time from the world time API
    const setTimeFromApi = () => {
        fetch("http://worldtimeapi.org/api/timezone/America/Chicago")
            .then(res => res.json())
            .then(data => {
                let chicagoTime = (new Date(data.datetime.substring(0, 26)));
                setTime(chicagoTime);
            });
    }

    // set time once to start
    useEffect(setTimeFromApi, []);
    // then set time every 5 seconds
    useInterval(setTimeFromApi, 5000);

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
                            time={time}
                        />
                    )}
                </div>
            }
        </>
    );
}

export default App;