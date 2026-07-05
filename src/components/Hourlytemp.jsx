import React,{useContext} from 'react'
import {Weathercontext,usecontext} from '../context/Weathercontext';
import '../styling/hourlytemp.css'
const Hourlytemp = () => {
    const{tempData,aqiData,city}=useContext(Weathercontext);

    let hourlyCards = [];
if(!tempData){
for (let i = 0; i < 8; i++) 
{
  hourlyCards.push(
    <div key={i} className="card1">
     <h2 className="time">AM/PM</h2>
     <h2 className="emoji">⛅️</h2>
     <h2 className="temp">__</h2>
     <h2 className="rainchance">%</h2>
    </div>
  );
}
}

else{
  const currentHour= new Date(tempData.current.time).getHours();
 hourlyCards=[];
 for (let i = currentHour; i < currentHour + 8; i++) 
        {
             const houremoji = ()=> {
                if(tempData.hourly.weather_code[i] === 95 &&tempData.hourly.rain[i] > 60){
                  return "⛈️"
                }
                else if(tempData.hourly.rain[i] > 40){
                return "🌦️";
                
                }
                else if(tempData.hourly.cloud_cover[i] > 50){
                return "☁️";
                }
                else if(i >= 6 && i <=18)
                {
                return "☀️";
                }
                else{
                return "🌕";
                }
            } 
const getemoji=houremoji();
 const hour=new Date(tempData.hourly.time[i]).toLocaleTimeString([],{hour:"numeric"});
          hourlyCards.push(
            <div  className="card" key={i}>
             <h2 className="time">{hour}</h2>
             <h2 className="emoji">{getemoji}</h2>
             <h2 className="temp">{tempData.hourly.temperature_2m[i]}<span>&deg;</span></h2>
             <h2 className="rainchance">{tempData.hourly.precipitation_probability[i]}%</h2>
            </div>
          );
        }

}
  return (
    <div className="hourlydiv">

     {

tempData?(

<div className="hourforecast">
 <h2 className="hourforecasttext">🕒HOURLY FORECAST</h2>
 <div className="cards" key={tempData.latitude}>
 {hourlyCards}
 </div>
</div>


):
(
 <div className="hourforecast">
 <h2 className="hourforecasttext">🕒HOURLY FORECAST</h2>
 <div className="cards1">
 {hourlyCards}
 </div>
</div>
)


        
    }



      </div>
    
  )
}

export default Hourlytemp