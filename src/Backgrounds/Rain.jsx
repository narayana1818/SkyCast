import "./Rain.css";

export default function Rain(){

const drops=Array.from({length:80});

return(

<div className="rain-bg">

{drops.map((_,i)=>(
<div
key={i}
className="drop"
style={{
left:`${Math.random()*100}%`,
animationDelay:`${Math.random()*2}s`,
animationDuration:`${0.7+Math.random()}s`
}}
/>
))}

</div>

)

}