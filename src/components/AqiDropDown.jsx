import React, { useContext,useState } from "react";
import { Weathercontext } from "../context/Weathercontext";
import "../styling/aqidropdown.css";
const AqiDropDown = () => {
  
    const { aqiData } = useContext(Weathercontext);

    if (!aqiData) return null;

    const currentHour = new Date().getHours();

    const hours = Array.from({ length: 15}, (_, i) => currentHour + i);

    return (
        <div className="dropdown">
        <div className="rowheading">
          <h2 className="timeheading">Time</h2>
          <h2 className="pm2_5heading">pm2.5</h2>
          <h2 className="pm10heading">pm10</h2>
        </div>
            {hours.map((index) => (

                <div key={index} className="aqiRow">
                   
                    <h2 className="aqidropdowntime">
                        {new Date(aqiData.hourly.time[index]).toLocaleTimeString([], {
                            hour: "numeric",
                            hour12: true
                        })}
                    </h2>

                    <h2 className="aqidropdownpm2_5"> {aqiData.hourly.pm2_5[index]}</h2>
                  
                    <h2 className="aqidropdownpm10">{aqiData.hourly.pm10[index]}</h2>

                </div>

            ))}

        </div>

    );
};

export default AqiDropDown;