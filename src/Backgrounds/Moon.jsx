import "./Moon.css";

export default function Moon(){

    const stars = Array.from({length:40});

    return(

        <div className="moon-bg">

            <div className="moon"></div>

            {
                stars.map((_,index)=>(

                    <div
                        key={index}
                        className="star"
                        style={{
                            left:`${Math.random()*100}%`,
                            top:`${Math.random()*100}%`,
                            animationDelay:`${Math.random()*3}s`
                        }}
                    />

                ))
            }

        </div>

    )

}