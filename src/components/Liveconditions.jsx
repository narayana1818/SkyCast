import React,{useContext,useEffect,useState} from 'react'
import '../styling/liveconditions.css'
import {Weathercontext} from '../context/Weathercontext'
import { motion } from "motion/react";
const Liveconditions = () => {
  const{tempData,aqiData,city}=useContext(Weathercontext);
  let sunrisetime=0;
  let sunsettime=0;
  let millisunrisetime=0;
  let millisunsettime=0;
  let progress = 0;
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (tempData) {
    millisunrisetime = new Date(tempData.daily.sunrise[0]).getTime();
    millisunsettime = new Date(tempData.daily.sunset[0]).getTime();
    const nowLocal = tempData.current?.time
      ? new Date(tempData.current.time).getTime()
      : currentTime;

    const totalDaylight = millisunsettime - millisunrisetime;
    const elapsed = nowLocal - millisunrisetime;

    progress = totalDaylight > 0
      ? Math.min(Math.max(elapsed / totalDaylight, 0), 1)
      : 0;
  }

  if(tempData){
    sunrisetime = new Date(tempData.daily.sunrise[0]).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    sunsettime = new Date(tempData.daily.sunset[0]).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }

  const r = 150;
  const cx = 150;
  const cy = 100 + Math.sqrt(r * r - 130 * 130);
  const theta1 = Math.atan2(100 - cy, 20 - cx);
  const theta2 = Math.atan2(100 - cy, 280 - cx);
  const theta = theta1 + (theta2 - theta1) * progress;
  const sunX = cx + r * Math.cos(theta);
  const sunY = cy + r * Math.sin(theta);

  return (
    <div className="liveconditionsdiv">
     {
      tempData?
      (
     <div className="currentconditions">
      <h2 className="liveconditionstext">🔴  LIVE CONDITIONS</h2>
      <div className="cards3" key={tempData.current.relative_humidity_2m}>
        <div className="humidity">
          <h2 style={{margin:"0"}} className="humiditytext">Humidity</h2>
          <h2 style={{margin:"0"}} className="humidityvalue">{tempData.current.relative_humidity_2m}%</h2>
        </div>
        <div className="wind">
          <h2 style={{margin:"0"}} className="windtext">Wind </h2>
          <h2 style={{margin:"0"}} className="windvalue">{tempData.current.wind_speed_10m}km/h</h2>
        </div>
        <div className="pressure">
          <h2 style={{margin:"0"}} className="pressuretext">Pressure </h2>
          <h2 style={{margin:"0"}} className="pressurevalue">{tempData.current.pressure_msl}kPa</h2>
        </div>
      </div>
    <div className="sunsetsunrise" key={tempData.daily.sunrise[0]}>
      <div className="sunrise">
        <h2 className="sunemoji"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><title xmlns="">sun</title><path fill="#ffac33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2z"/><circle cx="18" cy="18" r="10" fill="#ffac33"/></svg></h2>
        <h2 className="sunrisevalue">{sunrisetime}</h2>
      </div>

      <div className="sunrisesunsetguage">
  <svg width="300" height="120" viewBox="0 0 300 120">
    <path
      d="M20 100 A150 150 0 0 1 280 100"
      fill="none"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d={`M20 100 A150 150 0 0 1 ${sunX} ${sunY}`}
      fill="none"
      stroke="#FFD54F"
      strokeWidth="6"
      strokeLinecap="round"
    />
     <motion.g  animate={{ x: sunX - 11, y: sunY - 11,rotate:360, }}
  transition={{
    x: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
    y: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
    rotate: {
      duration: 36000,
      repeat: Infinity,
      ease: "linear",
    },
  }}>
 
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" fontSize="22"><title xmlns="">sun</title><path fill="#ffac33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2z"/><circle cx="18" cy="18" r="10" fill="#ffac33"/></svg>
  
</motion.g>
<line x1="30" y1="105" x2="265" y2="105" strokeWidth="3"  stroke="white"  strokeDasharray="4 6" />
</svg>
   
</div>
      <div className="sunset">
        <h2 className="moonemoji"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><title xmlns="">full-moon</title><circle cx="18" cy="18" r="18" fill="#ffd983"/><g fill="#ffcc4d"><circle cx="10.5" cy="8.5" r="3.5"/><circle cx="20" cy="17" r="3"/><circle cx="24.5" cy="28.5" r="3.5"/><circle cx="22" cy="5" r="2"/><circle cx="3" cy="18" r="1"/><circle cx="30" cy="9" r="1"/><circle cx="15" cy="31" r="1"/><circle cx="32" cy="19" r="2"/><circle cx="10" cy="23" r="2"/></g></svg></h2>
        <h2 className="sunsetvalue">{sunsettime}</h2>
      </div>
       </div>
     </div>
      ):(
        <div className="currentcondition1">
         <h2 className="liveconditionstext">🔴  LIVE CONDITIONS</h2>
         <div className="cards4"></div>
        </div>
      )
     }
    </div>
  )
}

export default Liveconditions