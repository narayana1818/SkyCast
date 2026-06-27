import React,{useContext} from 'react'
import {Weathercontext} from '../context/Weathercontext'
import '../styling/map.css'
const Map = () => {

  const{tempData,city}=useContext(Weathercontext);
  return (
    <div className="mapdiv">

{
  tempData?(
    <div className="map">
 <iframe   key={`${tempData.latitude}-${tempData.longitude}`} className="map1" src ={`https://maps.google.com/maps?q=${tempData.latitude},${tempData.longitude}&z=13&output=embed`} style={{border:"0"}} loading="lazy">
 </iframe>
    </div>
  ):
  (

    <div className="map2">

<h2 className="maptext">📍Location Unavailable</h2>
    </div>
  )
}




    </div>

  )
}

export default Map