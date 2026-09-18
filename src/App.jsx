import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import Screen from "./components/Screen";
import mockCharacters from "./data/characters.json";
import {
  retrieveName,
  getRandomItems,
  filterCharacters,
  proxyImageUrl,
} from "./utils";
import helloKittyCoffeeGif from "./assets/hello-kitty-coffee.gif";
import helloKittyDancingGif from "./assets/hello-kitty-dancing.gif";
import gudetamaGif from "./assets/gudetama.gif";
import kuromiSadGif from "./assets/kuromi-sad.gif";

function App() {
  const [count, setCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [chosenCards, setChosenCards] = useState([]);
  const [highestScore, setHighestScore] = useState(0);

  const API_ENDPOINT = "/api-sanrio/list_characters";

  const flipAnimation = (onMidpoint) => {
    const container = document.querySelector(".cards-container");
    if (container) container.style.pointerEvents = "none";

    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => card.classList.add("is-flipping", "is-flipped"));

    setTimeout(() => {
      if (onMidpoint) onMidpoint();
      setTimeout(() => {
        allCards.forEach((card) => card.classList.remove("is-flipped"));
        setTimeout(() => {
          allCards.forEach((card) => card.classList.remove("is-flipping"));
          if (container) container.style.pointerEvents = "auto";
        }, 1000);
      }, 50);
    }, 1000);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        let randomisedChars;

        if (import.meta.env.DEV) {
          const filteredMockData = filterCharacters(mockCharacters.characters);
          randomisedChars = getRandomItems(filteredMockData);
        } else {
          const response = await fetch(API_ENDPOINT);
          if (!response.ok)
            throw new Error(`HTTP error. Status: ${response.status}`);
          const data = await response.json();
          const filteredData = filterCharacters(data.data.characters);
          randomisedChars = getRandomItems(filteredData);
        }

        setCharacters(randomisedChars);
        setTimeout(() => flipAnimation(null), 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [count]);

  if (loading)
    return (
      <Screen
        className="loading"
        gif={helloKittyCoffeeGif}
        gifAlt="Hello Kitty drinking coffee"
        message="Loading..."
        handleNextGame={null}
      ></Screen>
    );

  if (error)
    return (
      <Screen
        className="error"
        gif={gudetamaGif}
        gifAlt="Gudetama hanging from chopsticks"
        message={`Error: ${error}`}
        handleNextGame={null}
      ></Screen>
    );

  const shuffleCards = () => {
    const newOrder = getRandomItems(characters);
    flipAnimation(() => setCharacters(newOrder));
  };

  const endGame = (isWin) => {
    if (isWin) {
      document.querySelector(".winning.screen").classList.remove("hidden");
    } else {
      document.querySelector(".losing.screen").classList.remove("hidden");
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

  const handleNextGame = () => {
    setCount(count + 1);
    document.querySelector(".winning.screen").classList.add("hidden");
    document.querySelector(".losing.screen").classList.add("hidden");
    shuffleCards();
  };

  return (
    <>
      <Scoreboard currentScore={score} highestScore={highestScore}></Scoreboard>
      <div className="cards-container">
        {characters.map((character) => (
          <Card
            key={character.id}
            data-id={character.id}
            imgSrc={proxyImageUrl(character.image)}
            imgTitle={retrieveName(character.image)}
            handleCardSelection={handleCardSelection}
          ></Card>
        ))}
      </div>
      <Screen
        className="winning"
        gif={helloKittyDancingGif}
        gifAlt="Pink Hello Kitty dancing surrounded by hearts"
        message="Nice work!"
        handleNextGame={handleNextGame}
      ></Screen>
      <Screen
        className="losing"
        gif={kuromiSadGif}
        gifAlt="Kuromi hanging her head sadly"
        message="Tough luck..."
        handleNextGame={handleNextGame}
      ></Screen>
    </>
  );
}

export default App;
