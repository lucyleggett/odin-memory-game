export default function Screen({
  className,
  gif,
  gifAlt,
  message,
  hidden,
  handleNextGame,
}) {
  return (
    <>
      {handleNextGame && (
        <div className={`${className} screen ${hidden ? "hidden" : ""}`}>
          <div className="blur-overlay">
            <div className="conveyor">
              <img src={gif} alt={gifAlt} />
              <div className="message">{message}</div>
              <button onClick={handleNextGame}>Play again</button>
            </div>
          </div>
        </div>
      )}

      {!handleNextGame && (
        <div className={`${className} screen`}>
          <div className="conveyor">
            <img src={gif} alt={gifAlt} />
            <div className="message">{message}</div>
          </div>
        </div>
      )}
    </>
  );
}
