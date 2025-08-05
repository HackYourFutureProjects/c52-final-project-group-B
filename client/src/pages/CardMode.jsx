import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeckById } from "@/api/decksAPI";
import { getCardsByDeckId } from "@/api/cardsAPI";
import Title from "@/components/Title";
import { DecksCard } from "@/components/Card";
import { Button } from "@heroui/react";
import { WrongIcon, CorrectIcon } from "@/components/Icons";

const CardMode = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [progress, setProgress] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleAnswer = (isCorrect) => {
    const currentCard = cards[currentCardIndex];

    const newProgress = [
      ...progress,
      {
        cardId: currentCard._id,
        isCorrect,
      },
    ];

    setProgress(newProgress);

    const dataToSave = {
      userId: "user123",
      results: newProgress,
      currentCardIndex: currentCardIndex + 1,
    };

    localStorage.setItem(`cardProgress-${id}`, JSON.stringify(dataToSave));

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      alert("🎉 You've completed the deck!");
    }
  };

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const getDeck = await getDeckById(id);
        setDeck(getDeck);

        const getCards = await getCardsByDeckId(id);
        setCards(getCards);

        const savedProgress = localStorage.getItem(`cardProgress-${id}`);
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          setProgress(parsed.results || []);
          setCurrentCardIndex(parsed.currentCardIndex || 0);
        } else {
          setCurrentCardIndex(0);
        }
      } catch {
        navigate("/not-found");
      }
    };
    fetchDeckAndCards();
  }, [id]);

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Library`, path: `/library` },
            { label: `${deck?.title}`, path: `/deck/${id}` },
            { label: `Card Mode`, path: `/deck/card-mode/${id}` },
          ]}
        >
          {deck?.title}
        </Title>
      </div>
      {cards && (
        <>
          <div className="mt-20 flex flex-wrap items-center justify-evenly gap-4">
            <DecksCard
              key={cards[currentCardIndex]._id}
              front={cards[currentCardIndex].question}
              back={cards[currentCardIndex].answer}
              flipDirection="vertical"
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              color="danger"
              aria-label="Wrong answer"
              radius="full"
              size="lg"
              className="text-white"
              onPress={() => handleAnswer(true)}
            >
              <WrongIcon />
            </Button>
            <div className="block text-center text-lg font-bold">
              {currentCardIndex + 1} / {cards.length}
            </div>
            <Button
              color="success"
              aria-label="Correct answer"
              radius="full"
              size="lg"
              className="px-5 text-white"
              onPress={() => handleAnswer(false)}
            >
              <CorrectIcon />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default CardMode;
