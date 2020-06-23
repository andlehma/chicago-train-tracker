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
        id: 30050,
        name: "State/Lake (Inner Loop)",
        lines: ["G", "Pink", "Org"]
    });
    const [etas, setEtas] = useState([]);
    const [loadingEtas, setLoadingEtas] = useState(false);
    const [loadingTime, setLoadingTime] = useState(false);
    const [time, setTime] = useState();

    // get Chicago time from the world time API
    const setTimeFromApi = () => {
        if (!time) setLoadingTime(true);
        fetch("http://worldtimeapi.org/api/timezone/America/Chicago")
            .then(res => res.json())
            .then(data => {
                let chicagoTime = (new Date(data.datetime.substring(0, 26)));
                setTime(chicagoTime);
                setLoadingTime(false);
            });
    }

    // set time once to start
    useEffect(setTimeFromApi, []);
    // then set time every 5 seconds
    useInterval(setTimeFromApi, 5000);

    // get etas from CTA API
    const setEtasFromApi = () => {
        if (etas.length === 0) setLoadingEtas(true);
        let endpoint = `/api/${stop.id}`;
        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                if (data.ctatt.eta) {
                    setEtas(data.ctatt.eta);
                } else {
                    setEtas([]);
                }
                setLoadingEtas(false);
            });
    }

    // get etas whenever stop is set
    useEffect(setEtasFromApi, [stop]);
    // and re-qeury every 5 minutes
    useInterval(setEtasFromApi, (1000 * 60 * 5));

    // calculate each train's minsUntilArrival
    // also remove etas whose arrival time is > 10 seconds ago
    let newEtas = [];
    etas.forEach(eta => {
        const msUntilArrival = Date.parse(eta.arrT) - time;
        const msToMins = 1 / 60000;
        const minsUntilArrival = Math.ceil(msUntilArrival * msToMins);
        if (msUntilArrival > -10000) {
            newEtas.push({ ...eta, minsUntilArrival: minsUntilArrival });
        }
    });

    return (
        <>
            <StopSelector currentStop={stop} callback={setStop} />
            {loadingEtas || loadingTime ?
                <div id="loading-icon">
                    <FontAwesomeIcon icon={faSpinner} spin />
                </div> :
                <div id="etas-container">
                    {newEtas.map((eta, i) => {
                        return (
                            <EtaCard key={i}
                                num={i + 1}
                                mins={eta.minsUntilArrival}
                                route={eta.rt}
                                run={eta.rn}
                                destinationName={eta.destNm} />
                        )
                    })}
                </div>
            }
        </>
    );
}

export default App;