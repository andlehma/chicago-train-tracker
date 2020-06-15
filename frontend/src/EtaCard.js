import React, { useState, useEffect } from "react";
import colors from "./colors.json";
let interval;

function EtaCard(props) {
    const [minsUntilArrival, setMinsUntilArrival] = useState();
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        // set time
        interval = setInterval(() => setTime(Date.now()), 1000);

        // calculate and set minutes until arrival
        const msUntilArrival = Date.parse(props.arrivalTime) - time;
        const msToMins = 1 / 60000;
        setMinsUntilArrival(Math.floor(msUntilArrival * msToMins));

        // clean up interval
        return () => {
            clearInterval(interval);
        }
    }, [time]);


    let bgColor = colors[props.route];
    let trainName = "";
    switch (props.route) {
        case "Pink":
            trainName += "Pink Line #"
            break;
        case "G":
            trainName += "Green Line #"
            break;
        case "Org":
            trainName += "Orange Line #"
            break;
        case "Red":
            trainName += "Red Line #"
            break;
        case "Brn":
            trainName += "Brown Line #"
            break;
        case "Blue":
            trainName += "Blue Line #"
            break;
        case "P":
            trainName += "Purple Line #"
            break;
        case "Y":
            trainName += "Yellow Line #"
            break;
    }
    trainName += props.run;
    trainName += " to";

    return (
        <div className="eta-card">
            <span className="eta-card-number">
                {props.num}
            </span>
            <span className="eta-card-main" style={{ "backgroundColor": bgColor }}>
                <span>
                    <h2>{trainName}</h2>
                    <h1>{props.destinationName}</h1>
                </span>
                <span className="mins-until-arrival">{minsUntilArrival} min</span>
            </span>
        </div >
    )

}

export default EtaCard;