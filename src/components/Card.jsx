import { useRef } from "react";
import pochaccoBg from "../assets/pochacco-bg.jpeg";

export default function Card({
  imgSrc,
  imgTitle,
  handleCardSelection,
  isFlipped,
  isFlipping,
  noTransition,
  ...rest
}) {
  const cardRef = useRef(null);
  const wrapperRef = useRef(null);

  const classes = [
    "card",
    isFlipping && "is-flipping",
    isFlipped && "is-flipped",
    noTransition && "no-transition",
  ]
    .filter(Boolean)
    .join(" ");

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = x - rect.width / 2;
    const yc = y - rect.height / 2;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    card.style.setProperty("--x", `${px}%`);
    card.style.setProperty("--y", `${py}%`);
    card.style.setProperty("--rx", `${-yc / 10}deg`);
    card.style.setProperty("--ry", `${xc / 10}deg`);
    card.style.setProperty("--o", "1");
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--o", "0");
  };

  return (
    <div className="card-wrapper" ref={wrapperRef}>
      <div
        className={classes}
        {...rest}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button className="card-face" onClick={handleCardSelection}>
          <img src={imgSrc} alt="" />
          <span className="image-title">{imgTitle}</span>
        </button>
        <div className="card-back">
          <img src={pochaccoBg} alt="Pochacco playing hula hoop outside" />
        </div>
        <div className="glare-wrapper"></div>
        <div className="holo-wrapper"></div>
      </div>
    </div>
  );
}
