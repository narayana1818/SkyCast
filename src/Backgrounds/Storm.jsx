import "./Storm.css";

export default function Storm() {

  const drops = Array.from({ length: 100 });

  return (
    <div className="storm-bg">

      <div className="lightning"></div>

      {drops.map((_, index) => (
        <div
          key={index}
          className="storm-drop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.6 + Math.random()}s`
          }}
        />
      ))}

    </div>
  );
}