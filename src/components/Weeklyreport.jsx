import React,{useContext} from 'react'
import '../styling/weeklyreport.css'
import {Weathercontext} from '../context/Weathercontext'
const Weeklyreport = () => {
    const{tempData,aqiData,city,isMobile}=useContext(Weathercontext);
const weeklycards=[];
if(tempData){
 for(let i=0;i<7;i++)
 {
  const getweeklyemoji=()=>{

    if(tempData.daily.precipitation_probability_max[i] < 20){
         return "☀️";
    
    }
    else if(tempData.daily.precipitation_probability_max[i] < 50){
       return "🌤️";
    
    }
    
    else if(tempData.daily.precipitation_probability_max[i] < 80){
       return "☁️";
    
    }
    
    else{
      return  "⛈️";
    
    }

  }    
const useweeklyemoji=getweeklyemoji();
 const date=new Date(tempData.daily.time[i])
    const day=date.toLocaleDateString("en-US",{weekday:"short"})
    const  formattedDate2 = date.toLocaleDateString(
      "en-GB",
      {
        month: "numeric",
        day: "numeric",
      }
    );
    const  formattedDate = date.toLocaleDateString(
        "en-GB",
        {
          month: "long",
          day: "numeric",
        }
      );
   weeklycards.push(
<div key={i} className={i==5 ? "card10":"card2"}>
     <div className="daySection">
    <h2 className="weekday">{day}</h2>
    <p className="dateformobileweekly">{formattedDate2}</p>
    </div>
    <div className="emoji3">
     <h2 className="weekemoji">{useweeklyemoji}</h2>
     </div>
     <div className="tempSection">
    <span className="maxtemp"><h2 className="maxtemp1">{tempData.daily.temperature_2m_max[i]}°</h2></span>
    <br className="break" />
    <span className="slash">/</span>
    <span className="mintemp"> <h2 className="mintemp1">{tempData.daily.temperature_2m_min[i]}°</h2></span>
</div>
<div className="rainprobabilitydiv">
     <h2 className="rainprobability">💧{tempData.daily.precipitation_probability_max[i]}%</h2>
     </div>
    </div>

);



 }
}
else{

    for(let i=0;i<7;i++)
        {
          weeklycards.push(
            <div key={i} className="card2">
            <h2 className="weekday">Day</h2>
            <h2 className="weekdate1">Date</h2>
            <h2 className="weekemoji">⛅️</h2>
            <h2 className="maxtemp4">___&deg;</h2>
            <h2 className="mintemp4">___&deg;</h2>
           </div>
       
       
          );
        }
    
}




  return (
    <div className="weeklydiv">
{
    

tempData?(
<div className="weeklyforecast">
<h2 className="weeklyreporttext">🗓️ 7-DAY WEEKLY REPORT</h2>
<div className="weeklycards" key={tempData.latitude}>
   {weeklycards}
</div>

</div>

):(

<div className="weeklyforecast">
<h2 className="weeklyreporttext">🗓️ 7-DAY WEEKLY REPORT</h2>
<div className="weeklycards1">
   {weeklycards}
</div>

</div>
    
)





}





    </div>
  )
}

export default Weeklyreport