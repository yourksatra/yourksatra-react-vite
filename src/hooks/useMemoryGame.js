import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Build a deck from symbols, each pair gets a unique id
 */
function buildDeck(symbols) {
  const pairs = [...symbols, ...symbols].map((sym, idx) => ({
    id: idx,
    symbol: sym,
    isFlipped: false,
    isMatched: false,
  }));
  return shuffle(pairs);
}

/**
 * useMemoryGame — core game logic hook
 * @param {string[]} symbols  Array of symbol strings/emojis to build card pairs
 */
export default function useMemoryGame(symbols) {
  const [cards, setCards] = useState(() => buildDeck(symbols));
  const [flipped, setFlipped] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const lockRef = useRef(false);
  const prevSymbolsRef = useRef(symbols);

  // Rebuild deck when symbols change (theme switch)
  useEffect(() => {
    if (prevSymbolsRef.current !== symbols && symbols.length > 0) {
      setCards(buildDeck(symbols));
      setFlipped([]);
      setTotalClicks(0);
      setTotalMatches(0);
      setIsChecking(false);
      lockRef.current = false;
    }
    prevSymbolsRef.current = symbols;
  }, [symbols]);

  const totalPairs = symbols.length;
  const isWon = totalMatches === totalPairs;

  const accuracyRate =
    totalClicks > 0
      ? Math.round((totalMatches / totalClicks) * 100)
      : 0;

  const flipCard = useCallback(
    (id) => {
      if (lockRef.current) return;
      setFlipped((prev) => {
        const card = cards.find((c) => c.id === id);
        if (!card || card.isFlipped || card.isMatched || prev.includes(id)) return prev;
        if (prev.length >= 2) return prev;

        const next = [...prev, id];

        setCards((prevCards) =>
          prevCards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
        );
        setTotalClicks((c) => c + 1);

        if (next.length === 2) {
          lockRef.current = true;
          setIsChecking(true);
        }

        return next;
      });
    },
    [cards]
  );

  useEffect(() => {
    if (flipped.length !== 2) return;

    const [idA, idB] = flipped;
    const cardA = cards.find((c) => c.id === idA);
    const cardB = cards.find((c) => c.id === idB);

    const delay = 400;
    const timer = setTimeout(() => {
      if (cardA.symbol === cardB.symbol) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === idA || c.id === idB ? { ...c, isMatched: true, isFlipped: true } : c
          )
        );
        setTotalMatches((m) => m + 1);
      } else {
        setCards((prev) =>
          prev.map((c) =>
            c.id === idA || c.id === idB ? { ...c, isFlipped: false } : c
          )
        );
      }
      setFlipped([]);
      setIsChecking(false);
      lockRef.current = false;
    }, delay);

    return () => clearTimeout(timer);
  }, [flipped]);

  const reset = useCallback(() => {
    setCards(buildDeck(symbols));
    setFlipped([]);
    setTotalClicks(0);
    setTotalMatches(0);
    setIsChecking(false);
    lockRef.current = false;
  }, [symbols]);

  return {
    cards,
    flipCard,
    totalClicks,
    totalMatches,
    totalPairs,
    accuracyRate,
    isWon,
    isChecking,
    reset,
  };
}
