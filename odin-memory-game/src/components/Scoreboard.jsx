export default function Scoreboard({ currentScore, highestScore }) {
  return (
    <div className="scoreboard">
      <p>Current score: {currentScore}</p>
      <p>Highest score: {highestScore}</p>
    </div>
  );
}
