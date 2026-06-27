import React from 'react'
import '../styling/rightpart.css'
import Liveconditions from './Liveconditions'
import Aqi from './Aqi'
import Map from './Map'
const Rightpart = () => {
  return (
    <div className="right">
        <Liveconditions />
        <Aqi />
        <Map />
    </div>
  )
}

export default Rightpart