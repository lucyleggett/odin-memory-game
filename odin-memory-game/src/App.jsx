import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import mockCharacters from "./data/characters.json";
import { retrieveName, getRandomItems, scoreData } from "./utils";

function App() {
  const [score, setScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_ENDPOINT = "/api-sanrio/list_characters";

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        if (import.meta.env.DEV) {
          const filteredMockData = mockCharacters.characters.filter((item) =>
            item.image.includes("_"),
          );
          const randomisedChars = getRandomItems(filteredMockData);
          setCharacters(randomisedChars);
          return;
        }

        const response = await fetch(API_ENDPOINT);

        if (!response.ok)
          throw new Error(`HTTP error. Status: ${response.status}`);
        const data = await response.json();
        const filteredData = data.filter((item) => item.image.includes("_"));
        const randomisedChars = getRandomItems(filteredData);
        setCharacters(randomisedChars);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  if (loading) return <div className="message loading">Loading...</div>;
  if (error) return <div className="message error">Error: {error}</div>;

  return (
    <>
      <Scoreboard scoreData={scoreData}></Scoreboard>
      <div className="cards-container">
        {characters.map((character) => (
          <Card
            key={character.id}
            imgSrc={character.image}
            imgTitle={retrieveName(character.image)}
          ></Card>
        ))}
      </div>
    </>
  );
}

export default App;
