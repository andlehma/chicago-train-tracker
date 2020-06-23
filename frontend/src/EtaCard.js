import React from "react";
import colors from "./colors.json";

function EtaCard(props) {
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
                <span className="mins-until-arrival">
                    {props.mins > 1 ?
                        props.mins + " min" :
                        "Due"
                    }
                </span>
            </span>
        </div>
    );
}

export default EtaCard;