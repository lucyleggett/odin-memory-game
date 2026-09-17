export default function Scoreboard({ scoreData }) {
  return (
    <div className="scoreboard">
      <p>Current score: {scoreData.current}</p>
      <p>Highest score: {scoreData.highest}</p>
    </div>
  );
}
