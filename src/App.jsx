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
import lightclouds from './assets/lightclouds.jpg'
import lightclouds2 from './assets/lightclouds2.jpg'
const App = () => {
  const[city,setCity]=useState({name:null,state:null,country:null})
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(false);
  const[location,setLocation]=useState({latitude:null, longitude:null })
  const[tempData,setTempData]=useState(null);
  const[aqiData,setAqiData]=useState(null);
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



const getlocation = async () => {
  setError(false)
  const city1 = inputref.current.value;
  inputref.current.focus();
  inputref.current.value=""
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


 return (
    <>
    <ToastContainer  position="top-right"    toastClassName="myToast" bodyClassName="myToastBody" progressClassName="myProgress" />
    <div className="container"  style={{backgroundImage: `url(${getbackground()})`,backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: isMobile ? "scroll" : "fixed",overflow: "hidden"}}>
      {
 <Weathercontext.Provider value={{tempData,aqiData,location,city,getlocation,setError,setLoading,setLocation,inputref,isMobile}}> 
        <Totalpage  />
        {
          loading &&   
          <div className="loader">
         <DotLottieReact
            src="https://lottie.host/0937a205-3e74-4ba0-9f1c-cc1414ad0d9a/Hc3gdx4G4G.lottie"
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