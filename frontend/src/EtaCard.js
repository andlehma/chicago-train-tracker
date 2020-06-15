import React, { useState, useEffect } from "react";
import colors from "./colors.json";

function EtaCard(props) {
    const [minsUntilArrival, setMinsUntilArrival] = useState();
    useEffect(() => {
        const msUntilArrival = Date.parse(props.arrivalTime) - Date.now();
        const msToMins = 1 / 60000;
        setMinsUntilArrival(Math.ceil(msUntilArrival * msToMins));
    });

    let bgColor = colors[props.route];

    return (
        <div
            className="eta-card"
            style={{ "backgroundColor": bgColor }}
        >
            <span><h1>{props.destinationName}</h1></span>
            <span className="mins-until-arrival">{minsUntilArrival} min</span>
        </div >
    )

}

export default EtaCard;