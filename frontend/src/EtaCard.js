import React, { useState, useEffect } from "react";

function EtaCard(props) {
    const [minsUntilArrival, setMinsUntilArrival] = useState();
    useEffect(() => {
        console.log(typeof (Date.parse(props.arrivalTime)));
        const msUntilArrival = Date.parse(props.arrivalTime) - Date.now();
        const msToMins = 1 / 60000;
        setMinsUntilArrival(Math.ceil(msUntilArrival * msToMins));
    });

    let bgColor = "";
    switch (props.route) {
        case "Pink":
            bgColor = "#e480a8";
            break;
        case "G":
            bgColor = "#079e47";
            break;
        case "Org":
            bgColor = "#ef4720";
            break;
        case "Red":
            bgColor = "#c91a2e";
            break;
        case "Brn":
            bgColor = "#623316";
            break;
        case "Blue":
            bgColor = "#10a2dc";
            break;
        case "P":
            bgColor = "#532a92";
            break;
        case "Y":
            bgColor = "#f5e603";
            break;
    }
    return (
        <div
            className="eta-card"
            style={{ "backgroundColor": bgColor }}
        >
            <span><h1>{props.destinationName}</h1></span>
            <span className="mins-until-arrival">{minsUntilArrival}&nbsp;min</span>
        </div >
    )

}

export default EtaCard;