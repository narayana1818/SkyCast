import React from 'react'
import '../styling/rightpart.css'
import Liveconditions from './Liveconditions'
import Aqi from './Aqi'
import WeatherMap from './Map'
const Rightpart = () => {
  return (
    <div className="right">
        <Liveconditions />
        <Aqi />
        <WeatherMap />
    </div>
  )
}

export default Rightpart