import React, { useState } from "react";
import stops from "../stops.json";
import colors from "./colors.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function ColorIndicator(props) {
    return (
        <div className="color-indicator">
            {props.colors.map((color, i) =>
                <span key={i} style={{ "backgroundColor": colors[color] }} />
            )}
        </div>
    )
}

function StopSelector(props) {
    const allStops = stops.map((stop, i) =>
        <div
            className="stop-option"
            key={i}
            onClick={() => {
                setShowDropdown(false);
                props.callback({
                    id: stop.stop_id,
                    name: stop.stop_name,
                    lines: stop.station_lines
                });
            }}
        >
            {stop.stop_name}
            <ColorIndicator colors={stop.station_lines} />
        </div>
    )

    const [showDropdown, setShowDropdown] = useState(false);
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
        <header>
            <h2>Next 'L' services at</h2>
            <div id="dropdown">
                <button
                    id="toggle-dropdown"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <h2>
                        {props.currentStop.name}
                        <ColorIndicator colors={props.currentStop.lines} />
                    </h2>
                    <FontAwesomeIcon icon={faCaretDown} />
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
        </header>
    );
}

export default StopSelector;