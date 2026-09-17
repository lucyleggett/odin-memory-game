import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import mockCharacters from "./data/characters.json";
import { retrieveName } from "./utils";

let scoreData = {
  current: 0,
  previous: [0],
};

const cardWrappers = document.querySelectorAll(".card-wrapper");

cardWrappers.forEach((wrapper) =>
  wrapper.addEventListener("mousemove", (e) => {
    const card = wrapper.querySelector(".card");
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
  }),
);

cardWrappers.forEach((wrapper) =>
  wrapper.addEventListener("mouseleave", () => {
    const card = wrapper.querySelector(".card");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--o", "0");
  }),
);

function App() {
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
          setCharacters(filteredMockData);
          return;
        }

        const response = await fetch(API_ENDPOINT);

        if (!response.ok)
          throw new Error(`HTTP error. Status: ${response.status}`);
        const data = await response.json();
        const filteredData = data.filter((item) => item.image.includes("_"));
        setCharacters(filteredData);
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
