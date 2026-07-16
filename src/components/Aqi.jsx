import React, { useContext, useMemo, useState, useRef, useEffect } from 'react'
import '../styling/aqi.css'
import { Weathercontext } from '../context/Weathercontext'
import AqiDropDown from '../components/AqiDropDown.jsx'

 const BP = {
  co:  [[0,0],[1000,50],[2000,100],[10000,150],[17000,200],[34000,300],[50000,400],[58000,500]],
  so2: [[0,0],[40,50],[80,100],[380,150],[800,200],[1600,300],[2100,400],[2620,500]],
  no2: [[0,0],[40,50],[80,100],[180,150],[280,200],[400,300],[800,400],[1600,500]],
  o3:  [[0,0],[50,50],[100,100],[168,150],[208,200],[748,300],[1000,400],[1200,500]],
}

function subIndex(value, bps) {
  if (value == null) 
    return 0
  for (let i = 1; i < bps.length; i++)
   {
    const [cLo, iLo] = bps[i - 1]
    const [cHi, iHi] = bps[i]
    if (value <= cHi)
      return Math.round(iLo + (iHi - iLo) * (value - cLo) / (cHi - cLo))
  }
  return 500
}

function aqiCategory(aqi) {
  if (aqi <= 50)  return { label: 'Good',             color: '#4dc89a', bg: 'rgba(77,200,154,0.15)' }
  if (aqi <= 100) return { label: 'Moderate',         color: '#f5c242', bg: 'rgba(245,194,66,0.15)' }
  if (aqi <= 150) return { label: 'Unhealthy (Sens)', color: '#e8923a', bg: 'rgba(232,146,58,0.15)' }
  if (aqi <= 200) return { label: 'Unhealthy',        color: '#e8503a', bg: 'rgba(232,80,58,0.15)'  }
  if (aqi <= 300) return { label: 'Very Unhealthy',   color: '#b87ce8', bg: 'rgba(184,124,232,0.15)'}
  return               { label: 'Hazardous',          color: '#e85078', bg: 'rgba(232,80,120,0.15)' }
}

const ARC_LEN = 264

const Aqi = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { aqiData,isMobile } = useContext(Weathercontext)
  const currentHour = new Date().getHours()
  const aqiRef = useRef(null);
  useEffect(() => {

    function handleOutsideClick(event) {

        if (
            aqiRef.current &&
            !aqiRef.current.contains(event.target)
        ) {
            setShowDropDown(false);
        }

    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
    };

}, []);
  const overall = useMemo(() => {
    if (!aqiData?.hourly) return null
    const h = aqiData.hourly
    return Math.max(
      subIndex(h.carbon_monoxide?.[currentHour],  BP.co),
      subIndex(h.sulphur_dioxide?.[currentHour],  BP.so2),
      subIndex(h.nitrogen_dioxide?.[currentHour], BP.no2),
      subIndex(h.ozone?.[currentHour],            BP.o3),
    )
  }, [aqiData, currentHour])

  const cat     = overall != null ? aqiCategory(overall) : null
  const p       = Math.min((overall ?? 0) / 500, 1)
  const dashOff = ARC_LEN - p * ARC_LEN
  const rotate  = -90 + p * 180

  return (

    <div className="aqidiv"     ref={aqiRef} onClick = {()=> setShowDropDown(!showDropDown)} >
       
       {
        showDropDown && (
       <AqiDropDown/>
)
       }
      {aqiData ? (
        <div className="aqi" key={aqiData.hourly.carbon_monoxide[currentHour]}>


             {/* ── AQI gauge lives in your existing .aqibar slot ── */}
             <div className="aqibar">
            <div className="aqi-gauge-wrap">
              <svg viewBox="0 0 200 118" width="180" height="106">
                <defs>
                  <linearGradient id="aqiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#3a6fd8" />
                    <stop offset="30%"  stopColor="#4dc89a" />
                    <stop offset="55%"  stopColor="#f5c242" />
                    <stop offset="75%"  stopColor="#e8923a" />
                    <stop offset="100%" stopColor="#e8503a" />
                  </linearGradient>
                </defs>
                {/* Track */}
                <path d="M 16 105 A 84 84 0 0 1 184 105"
                  fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="9" strokeLinecap="round" />
                {/* Filled arc */}
                <path d="M 16 105 A 84 84 0 0 1 184 105"
                  fill="none" stroke="url(#aqiGrad)" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={ARC_LEN} strokeDashoffset={dashOff}
                  style={{ transition: 'stroke-dashoffset 0.7s ease' }} />
                {/* Needle */}
                <g transform={`rotate(${rotate} 100 105)`} style={{ transition: 'transform 0.7s ease' }}>
                  <rect x="97.5" y="26" width="5" height="72" rx="2.5" fill="#e8eef8" opacity="0.9" />
                  <circle cx="100" cy="105" r="6" fill="#e8eef8" />
                </g>
              </svg>

              <div className="aqi-gauge-value" style={{ color: cat?.color ?? '#8fa3c8' }}>
                {overall ?? '—'}
              </div>

              {cat && (
                <div className="aqi-gauge-badge" style={{ background: cat.bg, color: cat.color }}>
                  {cat.label}
                </div>
              )}

              <div className="aqi-gauge-scale">
                <span>Good</span>
                <span>Hazardous</span>
              </div>
            </div>
          </div>
          <div className="aqiresult">
            <div className="co">
              <h2 className="cotext">CO</h2>
              <h2 className="covalue">{aqiData.hourly.carbon_monoxide[currentHour]} <br className="mobilebreak1" /> mg/m³</h2>
            </div>
            <div className="o3">
              <h2 className="o3text">O3</h2>
              <h2 className="o3value">{aqiData.hourly.ozone[currentHour]}<br className="mobilebreak1" /> μ g/m³</h2>
            </div>
            <div className="no2">
              <h2 className="no2text">NO2</h2>
              <h2 className="no2value">{aqiData.hourly.nitrogen_dioxide[currentHour]}<br className="mobilebreak1" /> μ g/m³</h2>
            </div>
            <div className="so2">
              <h2 className="so2text">SO2</h2>
              <h2 className="so2value">{aqiData.hourly.sulphur_dioxide[currentHour]} <br className="mobilebreak1" />μ g/m³</h2>
            </div>
          </div>

       

        </div>
      ) : (
        <div className="aqi1">
           <div className="aqibar1">
            <h2 className="aqiguagetext">AQI GUAGE📈</h2>
          </div>
          <div className="aqiresult">
            <div className="co">
             
            </div>
            <div className="o3">
            
            </div>
            <div className="no2">
              
            </div>
            <div className="so2">
              
            </div>
          </div>
         
        </div>

      )}
    </div>
  )
}

export default Aqi
