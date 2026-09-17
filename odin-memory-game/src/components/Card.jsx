export default function Card({ imgSrc, imgTitle }) {
  return (
    <div className="card-container">
      <div className="card">
          <button className="card-face">
            <img src={imgSrc} alt="" />
            <span className="image-title">{imgTitle}</span>
          </button>
          <div className="card-back">
            <img src="" alt="" />
          </div>
      </div>
      <div className="glare-wrapper"></div>
    </div>
  );
}