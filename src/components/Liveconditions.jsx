import React,{useContext} from 'react'
import '../styling/liveconditions.css'
import {Weathercontext} from '../context/Weathercontext'
const Liveconditions = () => {
  const{tempData,aqiData,city}=useContext(Weathercontext);
  let sunrisetime="";
  let sunsettime=""
if(tempData){
  sunrisetime=new Date(tempData.daily.sunrise[0]).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }
  );

 sunsettime=new Date(tempData.daily.sunset[0]).toLocaleTimeString(
  "en-US",
  {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }
);

}

 

  return (
    <div className="liveconditionsdiv">
     {
      tempData?(




     <div className="currentconditions">
      <h2 className="liveconditionstext">🔴  LIVE CONDITIONS</h2>
      <div className="cards3" key={tempData.current.relative_humidity_2m}>
        <div className="humidity">
      <h2  style={{margin:"0"}}  className="humiditytext">Humidity</h2>
      <h2 style={{margin:"0"}}   className="humidityvalue">{tempData.current.relative_humidity_2m}%</h2>
      </div>
      <div className="wind">
      <h2 style={{margin:"0"}} className="windtext" >Wind </h2>
      <h2 style={{margin:"0"}}  className="windvalue">{tempData.current.wind_speed_10m}km/h</h2>
      </div>
      <div className="pressure">
      <h2 style={{margin:"0"}} className="pressuretext">Pressure </h2>
      <h2 style={{margin:"0"}}  className="pressurevalue">{tempData.current.pressure_msl}kPa</h2>
      </div>
      </div>
    <div className="sunsetsunrise" key={tempData.daily.sunrise[0]}> 
      <div className="sunrise">
      <h2 className="sunrisetext">Sunrise</h2> 
      <h2 className="sunemoji">☀️</h2>
      <h2 className="sunrisevalue">  {sunrisetime} </h2>
      </div>
      <div className="sunset">
      <h2 className="sunsettext">Sunrise</h2> 
      <h2 className="moonemoji">🌕</h2>
      <h2 className="sunsetvalue">  {sunsettime} </h2>
      </div>
       </div>
     </div>
      ):(

        <div className="currentcondition1">
         <h2 className="liveconditionstext">🔴  LIVE CONDITIONS</h2>
      <div className="cards4" >
      <h2 className="humidity">Humidity <br />___%</h2>
      <h2 className="wind">Wind <br />___km/h</h2>
      <h2 className="pressure">Pressure <br />___kPa</h2>
      </div>
    <div className="sunsetsunrise1" > 
      
      <h2 className="sunrise">Sunrise <br />☀️ <br />___ A.M </h2>
      <h2 className="sunset">Sunset <br />🌕 <br />___ P.M</h2>
       </div>


        </div>

      )
     }




    </div>
  )
}

export default Liveconditions