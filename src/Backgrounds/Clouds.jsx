// Clouds.jsx
import "./Clouds.css";

export default function Clouds() {
  return (
    <div className="cloud-bg">
      {/* Signature: diffused light breaking through gaps, sits behind cloud layers */}
      <div className="sky-glow"></div>

      {/* Haze — soft distant atmosphere, barely-there, near-static */}
      <div className="cloud-layer haze">
        <div className="haze-blob hz1"></div>
        <div className="haze-blob hz2"></div>
        <div className="haze-blob hz3"></div>
      </div>

      {/* Mass — the main visible cloud bodies */}
      <div className="cloud-layer mass">
        <div className="cloud m1"></div>
        <div className="cloud m2"></div>
        <div className="cloud m3"></div>
        <div className="cloud m4"></div>
        <div className="cloud m5"></div>
      </div>

      {/* Wisps — thin, fast breakaway streaks for liveliness */}
      <div className="cloud-layer wisp">
        <div className="wisp w1"></div>
        <div className="wisp w2"></div>
        <div className="wisp w3"></div>
        <div className="wisp w4"></div>
      </div>

      <div className="cloud-scrim"></div>
      <div className="fog"></div>
    </div>
  );
}