import React from 'react'
import {useState,useEffect,useContext,useRef} from 'react'
import {Weathercontext} from './context/Weathercontext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './App.css'
import  Totalpage from './page/Totalpage'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import clouds from './assets/fullclouds3.jpg';
import moon from './assets/moon.jpg';
import sunny from './assets/sunny.jpg';
import rain from './assets/rain.jpg';
import sunrise from './assets/sunrise.jpg';
import sunset from './assets/sunset.jpg';
import storm from './assets/storm.jpg';
import lightclouds2 from './assets/lightclouds2.jpg'
import Sunny from "./Backgrounds/Sunny";
import Rain from "./Backgrounds/Rain";
import Clouds from "./Backgrounds/Clouds";
import Moon from "./Backgrounds/Moon";
import Sunrise from "./Backgrounds/Sunrise";
import Sunset from "./Backgrounds/Sunset";
import Storm from "./Backgrounds/Storm";
import LightClouds from "./Backgrounds/Lightclouds";

const App = () => {
  const [currentBg, setCurrentBg] = useState(() => Sunny);
  const [nextBg, setNextBg] = useState(null);
  const[city,setCity]=useState({name:null,state:null,country:null})
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(false);
  const[location,setLocation]=useState({latitude:null, longitude:null })
  const[tempData,setTempData]=useState(null);
  const[aqiData,setAqiData]=useState(null);
  const [background, setBackground] = useState(sunrise);
const [nextBackground, setNextBackground] = useState(null);
const [fading, setFading] = useState(false);
const [sliding, setSliding] = useState(false);
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
const inputref=useRef("");
   useEffect( ()=>{
    setError(false);
      navigator.geolocation.getCurrentPosition(async(position)=>
      {
        setLocation({
          latitude:position.coords.latitude,
         longitude:position.coords.longitude
        }) 
      },
    


      (error)=>{
        setLoading(false)
        setError(true)
        console.log(error.message)
     
      }
   )
   },[]);

   useEffect(()=>{
    if(location.latitude && location.longitude)
    {
   
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,cloud_cover,rain,precipitation_probability,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,cloud_cover,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=auto`)
      .then(res=> {console.log(res.status) ;return res.json()} ).then(data =>{ console.log(data);setTempData(data)}) .catch(() => {toast.error("Weather fetch failed"); }).finally(()=>{setLoading(false)})
      
      fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.latitude}&longitude=${location.longitude}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto`)
      .then(res=> {console.log(res.status) ;return res.json()} ).then(data =>{ console.log(data);setAqiData(data)}) .catch(() => {toast.error("Weather fetch failed"); }).finally(()=>{setLoading(false)})

      const directcity= fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`).then(res => { return res.json()}).then(data=>{     const cityName =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.municipality ||
        data.address.county;
        setCity({
        name: cityName,
         state: data.address.state,
         country: data.address.country,
       })})
    }
  },[location]);


    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 425);
        };
      
        window.addEventListener("resize", handleResize);
      
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);


      useEffect(() => {
        if (!tempData) return;
    
        const newBg = getbackground();
        if (newBg === background) return;
    
        const img = new Image();
        img.src = newBg;
        img.onload = () => {
            setNextBackground(img.src);
            setTimeout(() => {
                setBackground(img.src);
                setNextBackground(null);
            }, 1400);
        };
    }, [tempData]);



    useEffect(() => {

       if (!tempData) return;
      const NewComponent = getBackgroundComponent();
       if (NewComponent === currentBg) return;
     setNextBg(() => NewComponent);
  setTimeout(() => {
  setCurrentBg(() => NewComponent);
   setNextBg(null);
   }, 1400);
  
  }, [tempData]);



const getlocation = async () => {
  setError(false)
  const city1 = inputref.current.value;
  inputref.current.focus();
  inputref.current.value=""
  inputref.current.blur(); 
if(city1.trim()=== "")
{
  toast.error("Please enter city",{
    autoClose: 2000
  });
  setLoading(false)
}

else{
setLoading(true);
  try 
  {

    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city1}`);

    const data =
      await res.json();
       console.log(data);
      if(!data.results || data.results.length === 0)
        {
          toast.error("City Not Found",{
            autoClose: 2000
          });
          setLoading(false);
          return;
        }
    setLocation({
      latitude:data.results[0].latitude,
      longitude:data.results[0].longitude,
    })  
  }
  catch(error) {
    console.log(error);
  }
}
};
   


function getbackground()
 {
  if (!tempData) {
    return sunny; 
  }
  const currenttime=new Date(tempData?.current?.time).getHours();
  if(currenttime>=6 && currenttime<=7 && tempData.current.rain === 0 )
    {
        return  sunrise;
    
    
    }
    else if(currenttime>=7 && currenttime<18 && tempData.current.rain === 0 && tempData.current.cloud_cover < 30 )
    {
        return  sunny;
    
    
    }
    else if(currenttime>=18 && currenttime<19 && tempData.current.rain === 0 )
    {
        return sunset;
    
    
    }
    else if(currenttime>=19 || currenttime<6 && tempData.current.rain === 0)
    {
        return  moon;
    
    }
    else if(tempData.current.cloud_cover >= 30 && tempData.current.cloud_cover <= 80 &&tempData.current.rain>1)
    {
        return  rain;
    }
    else if(tempData.current.cloud_cover >= 30 && tempData.current.cloud_cover <= 60 &&tempData.current.rain===0)
      {
          return  lightclouds2;
      }
      else if(tempData.current.cloud_cover >= 61 && tempData.current.cloud_cover <=100 &&tempData.current.rain===0)
        {
            return  clouds;
        }
    else if(tempData.current.rain > 0 )
    {
        return  rain;
    }
    else{
        return  storm;
    }}

    function getBackgroundComponent() {

      if (!tempData) return Sunrise;
  
      const currenttime = new Date(tempData.current.time).getHours();
  
      if(currenttime>=6 && currenttime<=7 && tempData.current.rain===0){
  
          return Sunrise;
  
      }
  
      if(currenttime>=7 && currenttime<18 && tempData.current.rain===0 &&  tempData.current.cloud_cover<30){
  
          return Sunny;
  
      }
  
      if(currenttime>=18 && currenttime<19 && tempData.current.rain===0){
  
          return Sunset;
  
      }
  
      if((currenttime>=19 || currenttime<6) && tempData.current.rain===0){
  
          return Moon;
  
      }
  
      if(tempData.current.cloud_cover>=30 && tempData.current.cloud_cover<=60 && tempData.current.rain===0){
  
          return LightClouds;
  
      }
  
      if(tempData.current.cloud_cover>=61 && tempData.current.rain===0){
  
          return Clouds;
  
      }
      if(tempData.current.rain>0){
  
          return Rain;
  
      }
  else{
      return Storm;
  }}
  const CurrentBg = currentBg;
  const NextBg = nextBg;
 return (
    <>
    <ToastContainer  position="top-right"    toastClassName="myToast" bodyClassName="myToastBody" progressClassName="myProgress" />
    <div className="container" >
    {isMobile ? 
    <>
    <div className="bg show">
      <CurrentBg />
      </div>
 {
        NextBg &&
    <div className="bg slide-in">
    <NextBg />
</div>
 }

</>
    
   :
    (
    <>
      <img className="backgroundImage show" src={background} alt="" />
      {nextBackground && (
        <img className="backgroundImage slide-in" src={nextBackground} alt="" />
      )}
    </>
  )}

 
      {  
       
 <Weathercontext.Provider value={{tempData,aqiData,location,city,getlocation,setError,setLoading,setLocation,isMobile,inputref}}> 
  <div className="navbar">
        <h4> ⛅️ SkyCast</h4>
        <input type="text"  placeholder="Search for city"  ref={inputref}  onKeyDown={(e) => {if (e.key === "Enter") { getlocation();}}}  />
        <button type="submit"  onClick={getlocation} >🔍</button>
      </div>
        <Totalpage />
        {
          loading &&   
          <div className="loader">
         <DotLottieReact
           src="https://lottie.host/6e0f4d9b-7f2c-49b5-a894-5c62ab24bf93/Pk3FrZ2v8F.lottie"
           loop
           autoplay
         />
         </div>
         
        }
         
        {
        error &&   
        <div className="loader">
      <DotLottieReact
          src="https://lottie.host/ec4556bf-a26e-493e-bf22-337677d1b1c3/3zJPDzilZj.lottie"
         loop
        autoplay
           />
</div>


        }
        </Weathercontext.Provider>
}
    </div>
    </>
  )
}

export default App