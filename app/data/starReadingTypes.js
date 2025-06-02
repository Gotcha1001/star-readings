// data/starReadingTypes.js
const starReadingTypes = {
  single: {
    name: "Single Insight",
    description: "A single card drawn from the entire Star Deck.",
    draw: (deck) => {
      const theme = deck[Math.floor(Math.random() * deck.length)];
      const card = theme.cards[Math.floor(Math.random() * theme.cards.length)];
      return [{ ...card, theme: theme.theme, position: "Insight" }];
    },
  },
  "past-present-future": {
    name: "Past, Present, Future",
    description:
      "Three cards from different themes to represent your timeline.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return ["Past", "Present", "Future"].map((position, i) => {
        const theme = shuffledThemes[i];
        const card =
          theme.cards[Math.floor(Math.random() * theme.cards.length)];
        return { ...card, theme: theme.theme, position };
      });
    },
  },
  duality: {
    name: "Duality Spread",
    description: "Compare two options or aspects, such as pros and cons.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return ["Option 1", "Option 2"].map((position, i) => {
        const theme = shuffledThemes[i];
        const card =
          theme.cards[Math.floor(Math.random() * theme.cards.length)];
        return { ...card, theme: theme.theme, position };
      });
    },
  },
  elemental: {
    name: "Elemental Spread",
    description: "Each card represents an element or direction for balance.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return ["Earth", "Air", "Fire", "Water"].map((position, i) => {
        const theme = shuffledThemes[i];
        const card =
          theme.cards[Math.floor(Math.random() * theme.cards.length)];
        return { ...card, theme: theme.theme, position };
      });
    },
  },
  "cross-of-truth": {
    name: "Cross of Truth",
    description:
      "Gain deeper insight into a situation with nuanced perspectives.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return ["Situation", "Challenge", "Advice", "Outcome", "Core"].map(
        (position, i) => {
          const theme = shuffledThemes[i];
          const card =
            theme.cards[Math.floor(Math.random() * theme.cards.length)];
          return { ...card, theme: theme.theme, position };
        }
      );
    },
  },
  relationship: {
    name: "Relationship Spread",
    description:
      "Dive into the dynamics of relationships or personal connections.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return [
        "You",
        "Other",
        "Relationship",
        "Strengths",
        "Challenges",
        "Future",
      ].map((position, i) => {
        const theme = shuffledThemes[i];
        const card =
          theme.cards[Math.floor(Math.random() * theme.cards.length)];
        return { ...card, theme: theme.theme, position };
      });
    },
  },
  horseshoe: {
    name: "Horseshoe Spread",
    description: "Examine influences, obstacles, and potential outcomes.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return [
        "Past",
        "Present",
        "Future",
        "Influences",
        "Obstacles",
        "Advice",
        "Outcome",
      ].map((position, i) => {
        const theme = shuffledThemes[i];
        const card =
          theme.cards[Math.floor(Math.random() * theme.cards.length)];
        return { ...card, theme: theme.theme, position };
      });
    },
  },
  "celtic-cross": {
    name: "Celtic Cross",
    description: "A comprehensive view of your life or specific situation.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return [
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
      ].map((position, i) => {
        const theme = shuffledThemes[i];
        const card =
          theme.cards[Math.floor(Math.random() * theme.cards.length)];
        return { ...card, theme: theme.theme, position };
      });
    },
  },
  zodiac: {
    name: "Zodiac Spread",
    description: "Explore all areas of life, with one card per zodiac house.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return [
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
      ].map((position, i) => {
        const theme = shuffledThemes[i];
        const card =
          theme.cards[Math.floor(Math.random() * theme.cards.length)];
        return { ...card, theme: theme.theme, position };
      });
    },
  },
  "year-ahead": {
    name: "Year Ahead Spread",
    description: "One card per month plus an overview for the year ahead.",
    draw: (deck) => {
      const shuffledThemes = deck.sort(() => 0.5 - Math.random());
      return [
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
      ].map((position, i) => {
        const theme = shuffledThemes[i];
        const card =
          theme.cards[Math.floor(Math.random() * theme.cards.length)];
        return { ...card, theme: theme.theme, position };
      });
    },
  },
};

export default starReadingTypes;
