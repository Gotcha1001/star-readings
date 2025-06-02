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
    description: "Explore all areas of life.",
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
  const [birthYear, birthMonth, birthDay] = birthday.split("-").map(Number);
  const today = new Date();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
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

  const nameValue =
    name
      .toLowerCase()
      .split("")
      .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;

  const age = calculateAge(birthDate);
  if (!age || age <= 0) {
    console.error("Invalid age calculated from birth date:", birthDate);
    return [];
  }

  const ageWeights = {
    young: { Transition: 3, Relationships: 2, Mind: 1 },
    mid: { Relationships: 3, Destiny: 2, Body: 1 },
    mature: { Destiny: 3, "Past Life": 2, Light: 1 },
  };

  const ageCategory = age < 30 ? "young" : age < 50 ? "mid" : "mature";
  const ageWeight = ageWeights[ageCategory];

  const zodiacWeights = {
    Aries: { primary: "Mind", secondary: "Destiny" },
    Taurus: { primary: "Body", secondary: "Relationships" },
    Gemini: { primary: "Mind", secondary: "Cosmos" },
    Cancer: { primary: "Emotion", secondary: "Relationships" },
    Leo: { primary: "Light", secondary: "Destiny" },
    Virgo: { primary: "Body", secondary: "Mind" },
    Libra: { primary: "Relationships", secondary: "Light" },
    Scorpio: { primary: "Shadow", secondary: "Past Life" },
    Sagittarius: { primary: "Destiny", secondary: "Cosmos" },
    Capricorn: { primary: "Transition", secondary: "Destiny" },
    Aquarius: { primary: "Cosmos", secondary: "Mind" },
    Pisces: { primary: "Past Life", secondary: "Emotion" },
  };

  const weightedCards = allCards.map((card) => {
    let weight = 1;
    if (card.theme === zodiacWeights[starSign]?.primary) weight += 3;
    if (card.theme === zodiacWeights[starSign]?.secondary) weight += 1;
    if (ageWeight[card.theme]) weight += ageWeight[card.theme];
    if (parseInt(card.id.split("-")[1]) === nameValue) weight += 2;
    return { card, weight };
  });

  const selected = [];
  const selectedIds = new Set();
  const shuffled = weightedCards.sort(
    (a, b) => b.weight - a.weight + (Math.random() - 0.5)
  );

  for (let { card } of shuffled) {
    if (selected.length >= cardCount) break;
    if (!selectedIds.has(card.id)) {
      const selectedCard = {
        id: card.id,
        name: card.name,
        theme: card.theme,
        meaning: card.meaning,
        image: card.image,
        position:
          spreadConfig[spreadId]?.positions[selected.length] || "Insight",
      };
      selected.push(selectedCard);
      selectedIds.add(card.id);
    }
  }

  console.log("Drawn Cards:", selected);
  return selected;
}

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
//     description: "Explore all areas of life.",
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

// export function drawStarCards(name, age, starSign, spreadId, cardCount) {
//   // Flatten deck for easier access
//   const allCards = starDeck.flatMap((theme) =>
//     theme.cards.map((card) => ({ ...card, theme: theme.theme }))
//   );

//   // Validate inputs
//   if (!name || !age || !starSign) {
//     console.error("Invalid inputs in drawStarCards:", { name, age, starSign });
//     return [];
//   }

//   // Numerology from name
//   const nameValue =
//     name
//       .toLowerCase()
//       .split("")
//       .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;

//   // Age-based weighting
//   const ageWeights = {
//     young: { Transition: 3, Relationships: 2, Mind: 1 },
//     mid: { Relationships: 3, Destiny: 2, Body: 1 },
//     mature: { Destiny: 3, "Past Life": 2, Light: 1 },
//   };
//   const ageCategory = age < 30 ? "young" : age < 50 ? "mid" : "mature";
//   const ageWeight = ageWeights[ageCategory];

//   // Zodiac-based weighting
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
//   const zodiacWeight = zodiacWeights[starSign] || {
//     primary: "Destiny",
//     secondary: "Cosmos",
//   };

//   // Weight cards
//   const weightedCards = allCards.map((card) => {
//     let weight = 1;
//     // Zodiac weighting
//     if (card.theme === zodiacWeight.primary) weight += 3;
//     if (card.theme === zodiacWeight.secondary) weight += 1;
//     // Age weighting
//     if (ageWeight[card.theme]) weight += ageWeight[card.theme];
//     // Numerology weighting
//     if (parseInt(card.id.split("-")[1]) === nameValue) weight += 2;
//     return { card, weight };
//   });

//   // Draw cards
//   const selected = [];
//   const selectedIds = new Set();
//   const shuffled = weightedCards.sort(
//     (a, b) => b.weight - a.weight + (Math.random() - 0.5)
//   );

//   for (let { card } of shuffled) {
//     if (selected.length >= cardCount) break;
//     if (!selectedIds.has(card.id)) {
//       const selectedCard = {
//         id: card.id,
//         name: card.name,
//         theme: card.theme,
//         meaning: card.meaning,
//         image: card.image,
//         position:
//           spreadConfig[spreadId]?.positions[selected.length] || "Insight",
//       };
//       selected.push(selectedCard);
//       selectedIds.add(card.id);
//     }
//   }

//   console.log("Drawn Cards:", selected);
//   return selected;
// }

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
//     description: "Explore all areas of life.",
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

// function getZodiacSign(birthday) {
//   const [year, month, day] = birthday.split("-").map(Number);
//   if (!month || !day || isNaN(month) || isNaN(day)) return "Destiny";
//   if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
//   if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
//   if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
//   if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
//   if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
//   if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
//   if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
//   if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
//     return "Scorpio";
//   if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
//     return "Sagittarius";
//   if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
//     return "Capricorn";
//   if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
//     return "Aquarius";
//   return "Pisces";
// }

// export function drawStarCards(name, age, birthday, spreadId, cardCount) {
//   const starSign = getZodiacSign(birthday);

//   const allCards = starDeck.flatMap((theme) =>
//     theme.cards.map((card) => ({ ...card, theme: theme.theme }))
//   );

//   if (!name || !age || !birthday) {
//     console.error("Invalid inputs in drawStarCards:", { name, age, birthday });
//     return [];
//   }

//   const nameValue =
//     name
//       .toLowerCase()
//       .split("")
//       .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;

//   const ageWeights = {
//     young: { Transition: 3, Relationships: 2, Mind: 1 },
//     mid: { Relationships: 3, Destiny: 2, Body: 1 },
//     mature: { Destiny: 3, "Past Lives": 2, Light: 1 },
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
//     Scorpio: { primary: "Shadow", secondary: "Past Lives" },
//     Sagittarius: { primary: "Destiny", secondary: "Cosmos" },
//     Capricorn: { primary: "Transition", secondary: "Destiny" },
//     Aquarius: { primary: "Cosmos", secondary: "Mind" },
//     Pisces: { primary: "Past Lives", secondary: "Emotion" },
//   };
//   const zodiacWeight = zodiacWeights[starSign] || {
//     primary: "Destiny",
//     secondary: "Cosmos",
//   };

//   const weightedCards = allCards.map((card) => {
//     let weight = 1;
//     if (card.theme === zodiacWeight.primary) weight += 3;
//     if (card.theme === zodiacWeight.secondary) weight += 1;
//     if (ageWeight[card.theme]) weight += ageWeight[card.theme];
//     if (parseInt(card.id.split("-")[1]) === nameValue) weight += 2;
//     return { card, weight };
//   });

//   const selected = [];
//   const selectedIds = new Set();
//   const shuffled = weightedCards.sort(
//     (a, b) => b.weight - a.weight + (Math.random() - 0.5)
//   );

//   for (let { card } of shuffled) {
//     if (selected.length >= cardCount) break;
//     if (!selectedIds.has(card.id)) {
//       const selectedCard = {
//         id: card.id,
//         name: card.name,
//         theme: card.theme,
//         meaning: card.meaning,
//         image: card.image,
//         position:
//           spreadConfig[spreadId]?.positions[selected.length] || "Insight",
//       };
//       selected.push(selectedCard);
//       selectedIds.add(card.id);
//     }
//   }

//   console.log("Drawn Cards:", selected);
//   return selected;
// }
