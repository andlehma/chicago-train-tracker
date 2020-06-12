import React, { useState } from "react";
import stops from "../stops.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function StopSelector(props) {
    const [showDropdown, setShowDropdown] = useState(false);

    const allStops = stops.map((stop, i) =>
        <div
            className="stop-option"
            key={i}
            onClick={() => {
                setShowDropdown(false);
                props.callback({ id: stop.stop_id, name: stop.stop_name });
            }}
        >
            {stop.stop_name}
            {stop.station_lines.map((line, i) =>
                <span key={i} className={line + " option-line-indicator"}></span>
            )}
        </div>
    )

    const [filteredStops, setFilteredStops] = useState(allStops);

    const [searchText, setSearchText] = useState("");

    const searchStops = () => {
        const filter = searchText.toUpperCase();
        let newStops = [];
        allStops.forEach(option => {
            let stopName = option.props.children[0].toUpperCase();
            if (stopName.substring(0, filter.length) === filter) {
                newStops.push(option);
            }
        });
        setFilteredStops(newStops);
    }

    return (
        <div id="dropdown">
            <button
                id="toggle-dropdown"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {props.currentStop.name}
                <span id="drop-down-arrow">
                    <FontAwesomeIcon icon={faCaretDown} />
                </span>
            </button>
            {showDropdown &&
                <div id="inner-dropdown">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyUp={searchStops} />
                    {filteredStops}
                </div>
            }
        </div>
    );
}

export default StopSelector;