import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import mockCharacters from "./data/characters.json";
import { retrieveName, getRandomItems } from "./utils";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [chosenCards, setChosenCards] = useState([]);
  const [highestScore, setHighestScore] = useState(0);

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

  const shuffleCards = () => {
    const container = document.querySelector(".cards-container");
    if (container) container.style.pointerEvents = "none";

    const newOrder = getRandomItems(characters);
    const allCards = document.querySelectorAll(".card");

    allCards.forEach((card) => card.classList.add("is-flipping", "is-flipped"));

    setTimeout(() => {
      setCharacters(newOrder);

      setTimeout(() => {
        allCards.forEach((card) => card.classList.remove("is-flipped"));

        setTimeout(() => {
          allCards.forEach((card) => card.classList.remove("is-flipping"));
          if (container) container.style.pointerEvents = "auto";
        }, 1000);
      }, 50);
    }, 1000);
  };

  const endGame = (isWin) => {
    if (isWin) {
      alert("Congrats!");
    } else {
      alert("Tough luck...");
    }
    setScore(0);
    setChosenCards([]);
  };

  const handleCardSelection = (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    if (chosenCards.includes(card.dataset.id)) {
      endGame(false);
    } else {
      const nextScore = score + 1;
      const newChosenCards = [...chosenCards, card.dataset.id];

      setChosenCards(newChosenCards);
      setScore(nextScore);

      if (nextScore > highestScore) {
        setHighestScore(nextScore);
      }

      if (newChosenCards.length === 12) {
        endGame(true);
      } else {
        shuffleCards();
      }
    }
  };

  return (
    <>
      <Scoreboard currentScore={score} highestScore={highestScore}></Scoreboard>
      <div className="cards-container">
        {characters.map((character) => (
          <Card
            key={character.id}
            data-id={character.id}
            imgSrc={character.image}
            imgTitle={retrieveName(character.image)}
            handleCardSelection={handleCardSelection}
          ></Card>
        ))}
      </div>
    </>
  );
}

export default App;
