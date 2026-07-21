
import React from "react";
import "./Rain.css";

export default function Rain(){

const drops = Array.from({length: 80});

return(

<div className="rain-bg">

{drops.map((_,i) => {
  const left = Math.random()*100;
  const delay = Math.random()*2;
  const duration = 0.7 + Math.random();

  return (
    <React.Fragment key={i}>
      <div
        className="drop"
        style={{
          left:`${left}%`,
          animationDelay:`${delay}s`,
          animationDuration:`${duration}s`
        }}
      />
      <div
        className="splash"
        style={{
          left:`${left}%`,
          animationDelay:`${delay + duration}s`,
          animationDuration:`${duration}s`
        }}
      />
    </React.Fragment>
  );
})}

</div>

)

}