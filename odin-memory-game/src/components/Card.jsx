import helloKittyBow from "../assets/hello-kitty-red-bow-800x800.png"

export default function Card({ imgSrc, imgTitle }) {
  return (
    <div className="card-container">
      <div className="card">
          <button className="card-face">
            <img src={imgSrc} alt="" />
            <span className="image-title">{imgTitle}</span>
          </button>
          <div className="card-back hidden">
            <img src={helloKittyBow} alt="Hello Kitty's red bow" />
          </div>
      </div>
      <div className="glare-wrapper"></div>
    </div>
  );
}