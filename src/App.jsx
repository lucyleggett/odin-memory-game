import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import Screen from "./components/Screen";
import mockCharacters from "./data/characters.json";
import {
  retrieveName,
  getRandomItems,
  filterCharacters,
  getImgSrc,
} from "./utils";
import helloKittyCoffeeGif from "./assets/hello-kitty-coffee.gif";
import helloKittyDancingGif from "./assets/hello-kitty-dancing.gif";
import gudetamaGif from "./assets/gudetama.gif";
import kuromiSadGif from "./assets/kuromi-sad.gif";

function App() {
  const [count, setCount] = useState(0);
  const [cardAnim, setCardAnim] = useState({
    isFlipped: true,
    isFlipping: false,
    noTransition: true,
  });
  const [interactive, setInteractive] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [chosenCards, setChosenCards] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [gameResult, setGameResult] = useState(null);

  const API_ENDPOINT = "/api-sanrio/list_characters";

  const flipAnimation = (onMidpoint) => {
    setInteractive(false);
    setCardAnim({ isFlipped: true, isFlipping: true, noTransition: false });

    setTimeout(() => {
      if (onMidpoint) onMidpoint();
      setTimeout(() => {
        setCardAnim((prev) => ({ ...prev, isFlipped: false }));
        setTimeout(() => {
          setCardAnim((prev) => ({ ...prev, isFlipping: false }));
          setInteractive(true);
        }, 1000);
      }, 50);
    }, 1000);
  };

  const revealAnimation = () => {
    setInteractive(false);
    setCardAnim({ isFlipped: true, isFlipping: false, noTransition: true });

    setTimeout(() => {
      requestAnimationFrame(() => {
        flushSync(() => {
          setCardAnim((prev) => ({
            ...prev,
            noTransition: false,
            isFlipping: true,
          }));
        });

        requestAnimationFrame(() => {
          setCardAnim((prev) => ({ ...prev, isFlipped: false }));
          setTimeout(() => {
            setCardAnim((prev) => ({ ...prev, isFlipping: false }));
            setInteractive(true);
          }, 1000);
        });
      });
    }, 200);
  };

  useEffect(() => {
    let ignore = false;

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

        if (ignore) return;

        setCharacters(randomisedChars);
        setTimeout(() => {
          if (ignore) return;
          if (count === 0) revealAnimation();
          else flipAnimation(null);
        }, 0);
      } catch (error) {
        if (!ignore) setError(error.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchCharacters();

    return () => {
      ignore = true;
    };
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
    setCharacters(newOrder);
  };

  const endGame = (isWin) => {
    setInteractive(false);
    setCardAnim((prev) => ({ ...prev, isFlipped: true }));
    setGameResult(isWin ? "win" : "lose");
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
        flipAnimation(shuffleCards);
      }
    }
  };

  const handleNextGame = () => {
    setCount((count) => count + 1);
    setGameResult(null);
  };

  return (
    <>
      <Scoreboard currentScore={score} highestScore={highestScore}></Scoreboard>
      <div
        className="cards-container"
        style={{ pointerEvents: interactive ? "auto" : "none" }}
      >
        {characters.map((character) => (
          <Card
            key={character.id}
            data-id={character.id}
            imgSrc={getImgSrc(character.image)}
            imgTitle={retrieveName(character.image)}
            handleCardSelection={handleCardSelection}
            isFlipped={cardAnim.isFlipped}
            isFlipping={cardAnim.isFlipping}
            noTransition={cardAnim.noTransition}
          ></Card>
        ))}
      </div>
      <Screen
        className="winning"
        hidden={gameResult !== "win"}
        gif={helloKittyDancingGif}
        gifAlt="Pink Hello Kitty dancing surrounded by hearts"
        message="Nice work!"
        handleNextGame={handleNextGame}
      ></Screen>
      <Screen
        className="losing"
        hidden={gameResult !== "lose"}
        gif={kuromiSadGif}
        gifAlt="Kuromi hanging her head sadly"
        message="Tough luck..."
        handleNextGame={handleNextGame}
      ></Screen>
    </>
  );
}

export default App;
