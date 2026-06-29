import React,{useContext,useEffect,useState} from 'react'
import {Weathercontext,usecontext} from '../context/Weathercontext';
import '../styling/temperature.css'

const Temperature = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
   
    const { tempData,city,aqiData,getlocation,setError,setLoading,setLocation,inputref} =useContext(Weathercontext);
    let day = "";
    let formattedDate = "";
    let time = "";
    let uvRate = "";
    let currentTime="";

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 425);
      };
    
      window.addEventListener("resize", handleResize);
    
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

console.log(isMobile)
    if(tempData){
     currentTime = new Date(tempData.current.time).toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            }
          );
    let date=new Date(tempData.current.time);
     formattedDate = date.toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
        }
      );
       time = date.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }
      );
     day= date.toLocaleDateString("en-US",{weekday:"long"});


    const getuvrate=()=>{
        if(tempData.daily.uv_index_max[0]<=2)
        {
            return "good";
        }
        else if(tempData.daily.uv_index_max[0]<=5 && tempData.daily.uv_index_max[0]>2)
        {
            return "moderate";
        }
        else{
            return "high";
        }
    }
  
   uvRate=getuvrate();
}


        console.log(isMobile);
   
  return (
  <>
     <div  className="temperaturediv">
  
  {
 tempData?(
    <div className="temperature1">
      
     <div className="temperaturecity">
     <h4 className="cityname"  key={city.name}> <span className="locationsymbol">📍</span>{city.name}, <br className="mobilebreak" />{city.state}</h4>
     <h4 className="dateday"  key={tempData.current.temperature_2m}>{day},{formattedDate} {currentTime}</h4>
     </div>
     <div className="temperature"  >
     <h2 className="degrees" key={tempData.current.temperature_2m}>{tempData.current.temperature_2m}&deg;<span className="celciussymbol">C</span> </h2>
     <h2 className="highlow"   key={tempData.current.apparent_temperature}> Feels like:{tempData.current.apparent_temperature}<span style={{paddingLeft:"15px"}}>High:{tempData.daily.temperature_2m_max[0]}</span> <span style={{paddingLeft:"20px"}}>Low:{tempData.daily.temperature_2m_min[0]}</span></h2>
     </div>

     <div className="tempdivattributes">
      <h2 className="uvattribute"  key={tempData.daily.uv_index_max[0]}>UV : {tempData.daily.uv_index_max[0]}  .<span style={{paddingLeft:"10px"}}>{uvRate}</span></h2>
      <h2 className="rainattribute" key={tempData.current.precipitation_probability}>Rain : {tempData.current.precipitation_probability} <span>% Chance</span></h2>
     </div>
     </div>
):(
    <div className="temperature1"  >
      
     <div className="temperaturecity">
     <h4 className="cityname1">📍Location Unavailable</h4>
     <h4 className="dateday1">Search a city or enable location</h4>
     </div>
     <div className="temperature">
     <h2 className="degrees1">___<span>&deg;C</span> </h2>
     <h2 className="highlow1"> Feels like:___<span style={{paddingLeft:"15px"}}>High: ___</span> <span style={{paddingLeft:"20px"}}>Low:___</span></h2>
     </div>

     <div className="tempdivattributes">
      <h2 className="uvattribute1">UV : ___</h2>
      <h2 className="rainattribute1">Rain:___ <span>%</span></h2>
     </div>
     </div>
     
)

  }
    </div>
    </>
  )

}

export default Temperature