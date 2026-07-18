import React, { useContext, useState } from "react";
import { Weathercontext } from "../context/Weathercontext";
import { motion } from "motion/react";
import "../styling/aqidropdown.css";
const AqiDropDown = () => {

    const { aqiData } = useContext(Weathercontext);

    if (!aqiData) return null;

    const currentHour = new Date().getHours();

    const hours = Array.from({ length: 15 }, (_, i) => currentHour + i);

    const getPM25Color = (value) => {
        if (value <= 12) return "#22C55E";
        if (value <= 35.4) return "#FACC15";
        if (value <= 55.4) return "#FB923C";
        if (value <= 150.4) return "#EF4444";
        if (value <= 250.4) return "#A855F7";
        return "#7F1D1D";
    };

    const getPM10Color = (value) => {
        if (value <= 54) return "#22C55E";
        if (value <= 154) return "#FACC15";
        if (value <= 254) return "#FB923C";
        if (value <= 354) return "#EF4444";
        if (value <= 424) return "#A855F7";
        return "#7F1D1D";
    };
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

                    <h2 className="aqidropdownpm2_5"  style={{ color: getPM25Color(aqiData.hourly.pm2_5[index]) }} > {aqiData.hourly.pm2_5[index]}</h2>

                    <h2 className="aqidropdownpm10"  style={{ color: getPM10Color(aqiData.hourly.pm10[index]) }}>{aqiData.hourly.pm10[index]}</h2>

                </div>

            ))}

        </div>

    );
};

export default AqiDropDown;