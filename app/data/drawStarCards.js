// not totally random based on weights
// import starDeck from "./starDeck";

// const spreadConfig = {
//   single: {
//     name: "Single Card Draw",
//     cards: 1,
//     positions: ["Insight"],
//     description: "A quick insight or daily guidance.",
//   },
//   duality: {
//     name: "Duality Spread",
//     cards: 2,
//     positions: ["Option 1", "Option 2"],
//     description: "Compare two options or aspects.",
//   },
//   "past-present-future": {
//     name: "Past-Present-Future",
//     cards: 3,
//     positions: ["Past", "Present", "Future"],
//     description: "Explore your timeline.",
//   },
//   elemental: {
//     name: "Elemental Spread",
//     cards: 4,
//     positions: ["Earth", "Air", "Fire", "Water"],
//     description: "Balance through elements.",
//   },
//   "cross-of-truth": {
//     name: "Cross of Truth",
//     cards: 5,
//     positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
//     description: "Deep insight into a situation.",
//   },
//   relationship: {
//     name: "Relationship Spread",
//     cards: 6,
//     positions: [
//       "You",
//       "Other",
//       "Relationship",
//       "Strengths",
//       "Challenges",
//       "Future",
//     ],
//     description: "Relationship dynamics.",
//   },
//   horseshoe: {
//     name: "Horseshoe Spread",
//     cards: 7,
//     positions: [
//       "Past",
//       "Present",
//       "Future",
//       "Influences",
//       "Obstacles",
//       "Advice",
//       "Outcome",
//     ],
//     description: "Examine influences and outcomes.",
//   },
//   "celtic-cross": {
//     name: "Celtic Cross",
//     cards: 10,
//     positions: [
//       "Present",
//       "Challenge",
//       "Past",
//       "Future",
//       "Above",
//       "Below",
//       "Advice",
//       "External Influences",
//       "Hopes/Fears",
//       "Outcome",
//     ],
//     description: "A comprehensive view of your life.",
//   },
//   zodiac: {
//     name: "Zodiac Spread",
//     cards: 12,
//     positions: [
//       "Aries (Self)",
//       "Taurus (Values)",
//       "Gemini (Communication)",
//       "Cancer (Home)",
//       "Leo (Creativity)",
//       "Virgo (Health)",
//       "Libra (Relationships)",
//       "Scorpio (Transformation)",
//       "Sagittarius (Exploration)",
//       "Capricorn (Career)",
//       "Aquarius (Community)",
//       "Pisces (Spirituality)",
//     ],
//     description: "Luck",
//   },
//   "year-ahead": {
//     name: "Year Ahead Spread",
//     cards: 13,
//     positions: [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//       "Overview",
//     ],
//     description: "One card per month plus an overview.",
//   },
// };

// function calculateAge(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [year, month, day] = birthday.split("-").map(Number);
//   const birthYear = year;
//   const birthMonth = month;
//   const birthDay = day;
//   const today = new Date();
//   const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
//   let age = today.getFullYear() - birthYear;
//   const monthDiff = today.getMonth() - birthMonth;
//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
//     age--;
//   }
//   return age;
// }

// export function drawStarCards(name, birthDate, starSign, spreadId, cardCount) {
//   const allCards = starDeck.flatMap((theme) =>
//     theme.cards.map((card) => ({ ...card, theme: theme.theme }))
//   );

//   if (!name || !birthDate || !starSign) {
//     console.error("Invalid inputs in drawStarCards:", {
//       name,
//       birthDate,
//       starSign,
//     });
//     return [];
//   }

//   const nameValue =
//     name
//       .toLowerCase()
//       .split("")
//       .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 7 || 1;

//   const age = calculateAge(birthDate);
//   if (!age || age <= 0) {
//     console.error("Invalid age calculated from birth date:", birthDate);
//     return [];
//   }

//   const ageWeights = {
//     young: { Transition: 1, Relationships: 4, Destiny: 2 },
//     mid: { Relationships: 3, Destiny: 2, Body: 2 },
//     mature: { Destiny: 3, "Past Life": 2, Light: 1 },
//   };

//   const ageCategory = age < 30 ? "young" : age < 50 ? "mid" : "mature";
//   const ageWeight = ageWeights[ageCategory];

//   const zodiacWeights = {
//     Aries: { primary: "Mind", secondary: "Destiny" },
//     Taurus: { primary: "Body", secondary: "Relationships" },
//     Gemini: { primary: "Mind", secondary: "Cosmos" },
//     Cancer: { primary: "Emotion", secondary: "Relationships" },
//     Leo: { primary: "Light", secondary: "Destiny" },
//     Virgo: { primary: "Body", secondary: "Mind" },
//     Libra: { primary: "Relationships", secondary: "Light" },
//     Scorpio: { primary: "Shadow", secondary: "Past Life" },
//     Sagittarius: { primary: "Destiny", secondary: "Cosmos" },
//     Capricorn: { primary: "Transition", secondary: "Destiny" },
//     Aquarius: { primary: "Cosmos", secondary: "Mind" },
//     Pisces: { primary: "Past Life", secondary: "Emotion" },
//   };

//   const weightedCards = allCards.map((card) => {
//     let weight = 1;
//     if (card.theme === zodiacWeights[starSign]?.primary) weight += 2;
//     if (card.theme === zodiacWeights[starSign]?.secondary) weight += 1;
//     if (ageWeight[card.theme]) weight += ageWeight[card.theme];
//     if (parseInt(card.id.split("-")[1]) === nameValue) weight += 1;
//     return { card, weight: Math.min(weight, 4) };
//   });

//   const selected = [];
//   const selectedIds = new Set();

//   while (selected.length < cardCount && weightedCards.length > 0) {
//     const totalWeight = weightedCards.reduce(
//       (sum, { weight }) => sum + weight,
//       0
//     );
//     if (totalWeight <= 0) break;

//     let random = Math.random() * totalWeight;
//     let chosenIndex = 0;
//     for (let i = 0; i < weightedCards.length; i++) {
//       random -= weightedCards[i].weight;
//       if (random <= 0) {
//         chosenIndex = i;
//         break;
//       }
//     }

//     const { card } = weightedCards[chosenIndex];
//     if (!selectedIds.has(card.id)) {
//       const selectedCard = {
//         id: card.id,
//         name: card.name,
//         theme: card.theme,
//         meaning: card.description,
//         image: card.image,
//         position:
//           spreadConfig[spreadId]?.positions[selected.length] || "Insight",
//       };
//       selected.push(selectedCard);
//       selectedIds.add(card.id);
//     }

//     weightedCards.splice(chosenIndex, 1);
//   }

//   for (let i = selected.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [selected[i], selected[j]] = [selected[j], selected[i]];
//   }

//   console.log("Drawn Cards:", selected);
//   return selected;
// }

// totally random not based on weights

import starDeck from "./starDeck";

const spreadConfig = {
  single: {
    name: "Single Card Draw",
    cards: 1,
    positions: ["Insight"],
    description: "A quick insight or daily guidance.",
  },
  duality: {
    name: "Duality Spread",
    cards: 2,
    positions: ["Option 1", "Option 2"],
    description: "Compare two options or aspects.",
  },
  "past-present-future": {
    name: "Past-Present-Future",
    cards: 3,
    positions: ["Past", "Present", "Future"],
    description: "Explore your timeline.",
  },
  elemental: {
    name: "Elemental Spread",
    cards: 4,
    positions: ["Earth", "Air", "Fire", "Water"],
    description: "Balance through elements.",
  },
  "cross-of-truth": {
    name: "Cross of Truth",
    cards: 5,
    positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
    description: "Deep insight into a situation.",
  },
  relationship: {
    name: "Relationship Spread",
    cards: 6,
    positions: [
      "You",
      "Other",
      "Relationship",
      "Strengths",
      "Challenges",
      "Future",
    ],
    description: "Relationship dynamics.",
  },
  horseshoe: {
    name: "Horseshoe Spread",
    cards: 7,
    positions: [
      "Past",
      "Present",
      "Future",
      "Influences",
      "Obstacles",
      "Advice",
      "Outcome",
    ],
    description: "Examine influences and outcomes.",
  },
  "celtic-cross": {
    name: "Celtic Cross",
    cards: 10,
    positions: [
      "Present",
      "Challenge",
      "Past",
      "Future",
      "Above",
      "Below",
      "Advice",
      "External Influences",
      "Hopes/Fears",
      "Outcome",
    ],
    description: "A comprehensive view of your life.",
  },
  zodiac: {
    name: "Zodiac Spread",
    cards: 12,
    positions: [
      "Aries (Self)",
      "Taurus (Values)",
      "Gemini (Communication)",
      "Cancer (Home)",
      "Leo (Creativity)",
      "Virgo (Health)",
      "Libra (Relationships)",
      "Scorpio (Transformation)",
      "Sagittarius (Exploration)",
      "Capricorn (Career)",
      "Aquarius (Community)",
      "Pisces (Spirituality)",
    ],
    description: "Explore every zodiac sign’s influence.",
  },
  "year-ahead": {
    name: "Year Ahead Spread",
    cards: 13,
    positions: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "Overview",
    ],
    description: "One card per month plus an overview.",
  },
};

function calculateAge(birthday) {
  if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
  const [year, month, day] = birthday.split("-").map(Number);
  const birthYear = year;
  const birthMonth = month;
  const birthDay = day;
  const today = new Date();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  let age = today.getFullYear() - birthYear;
  const monthDiff = today.getMonth() - birthMonth;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
    age--;
  }
  return age;
}

export function drawStarCards(name, birthDate, starSign, spreadId, cardCount) {
  const allCards = starDeck.flatMap((theme) =>
    theme.cards.map((card) => ({ ...card, theme: theme.theme }))
  );

  if (!name || !birthDate || !starSign) {
    console.error("Invalid inputs in drawStarCards:", {
      name,
      birthDate,
      starSign,
    });
    return [];
  }

  const age = calculateAge(birthDate);
  if (!age || age <= 0) {
    console.error("Invalid age calculated from birth date:", birthDate);
    return [];
  }

  if (cardCount > allCards.length) {
    console.error(
      `Requested ${cardCount} cards, but only ${allCards.length} available`
    );
    return [];
  }

  const availableCards = [...allCards];
  const selected = [];
  const selectedIds = new Set();

  while (selected.length < cardCount && availableCards.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const card = availableCards[randomIndex];

    if (!selectedIds.has(card.id)) {
      const selectedCard = {
        id: card.id,
        name: card.name,
        theme: card.theme,
        meaning: card.description || card.meaning || "No meaning provided",
        image: card.image || "/images/default-card.jpg",
        position:
          spreadConfig[spreadId]?.positions[selected.length] || "Insight",
      };
      selected.push(selectedCard);
      selectedIds.add(card.id);
    }

    availableCards.splice(randomIndex, 1);
  }

  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  console.log("Drawn Cards:", selected);
  return selected;
}
