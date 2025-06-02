// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import OpenAI from "openai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const spreadConfig = {
//   single: { name: "Single Card Draw", positions: ["Insight"] },
//   duality: { name: "Duality Spread", positions: ["Option 1", "Option 2"] },
//   "past-present-future": {
//     name: "Past-Present-Future",
//     positions: ["Past", "Present", "Future"],
//   },
//   elemental: {
//     name: "Elemental Spread",
//     positions: ["Earth", "Air", "Fire", "Water"],
//   },
//   "cross-of-truth": {
//     name: "Cross of Truth",
//     positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
//   },
//   relationship: {
//     name: "Relationship Spread",
//     positions: [
//       "You",
//       "Other",
//       "Relationship",
//       "Strengths",
//       "Challenges",
//       "Future",
//     ],
//   },
//   horseshoe: {
//     name: "Horseshoe Spread",
//     positions: [
//       "Past",
//       "Present",
//       "Future",
//       "Influences",
//       "Obstacles",
//       "Advice",
//       "Outcome",
//     ],
//   },
//   "celtic-cross": {
//     name: "Celtic Cross",
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
//   },
//   zodiac: {
//     name: "Zodiac Spread",
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
//   },
//   "year-ahead": {
//     name: "Year Ahead Spread",
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
//   },
// };

// const validThemes = [
//   "Destiny",
//   "Emotion",
//   "Mind",
//   "Body",
//   "Shadow",
//   "Light",
//   "Past Life",
//   "Cosmos",
//   "Relationships",
//   "Transition",
// ];

// function getZodiacSign(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [year, month, day] = birthday.split("-").map(Number);
//   if (!month || !day || isNaN(month) || isNaN(day)) return null;

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

// export async function POST(request) {
//   try {
//     const {
//       cards,
//       name,
//       age,
//       starSign,
//       birthday,
//       model = "gemini",
//       spread = "single",
//     } = await request.json();

//     console.log("API Request Received:", {
//       cards,
//       name,
//       age,
//       starSign,
//       birthday,
//       model,
//       spread,
//     });

//     // Derive starSign from birthday if provided and starSign is missing
//     const effectiveStarSign =
//       starSign || (birthday ? getZodiacSign(birthday) : null);

//     // Validate inputs
//     if (!cards || !Array.isArray(cards) || cards.length === 0) {
//       console.error("Invalid cards input:", cards);
//       return NextResponse.json(
//         { error: "Cards array is required and must not be empty" },
//         { status: 400 }
//       );
//     }

//     if (!name || typeof name !== "string" || name.trim().length === 0) {
//       console.error("Invalid name input:", name);
//       return NextResponse.json(
//         { error: "Name is required and must be a non-empty string" },
//         { status: 400 }
//       );
//     }

//     if (!age || isNaN(parseInt(age)) || parseInt(age) <= 0) {
//       console.error("Invalid age input:", age);
//       return NextResponse.json(
//         { error: "Age is required and must be a positive number" },
//         { status: 400 }
//       );
//     }

//     if (!effectiveStarSign) {
//       console.error("Invalid starSign or birthday input:", {
//         starSign,
//         birthday,
//       });
//       return NextResponse.json(
//         {
//           error:
//             "Star sign is required or birthday must be in YYYY-MM-DD format",
//         },
//         { status: 400 }
//       );
//     }

//     // Validate card properties
//     for (const card of cards) {
//       if (!card.name || !card.theme || !card.meaning || !card.position) {
//         console.error("Invalid card data:", card);
//         return NextResponse.json(
//           { error: "Each card must have name, theme, meaning, and position" },
//           { status: 400 }
//         );
//       }
//       if (!validThemes.includes(card.theme)) {
//         console.error("Invalid card theme:", card.theme);
//         return NextResponse.json(
//           { error: `Card theme must be one of: ${validThemes.join(", ")}` },
//           { status: 400 }
//         );
//       }
//     }

//     const spreadInfo = spreadConfig[spread] || spreadConfig["single"];
//     const positions = spreadInfo.positions.slice(0, cards.length);

//     // Calculate name numerology
//     const nameValue =
//       name
//         .toLowerCase()
//         .split("")
//         .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;

//     // Determine life stage
//     const lifeStage =
//       age < 30 ? "young adult" : age < 50 ? "mid-life" : "mature";

//     // Enhanced prompt for overall reading
//     const prompt = `
// You are a mystical Star Card reader, interpreting a deck of 100 cards across 10 themes: Destiny, Emotion, Mind, Body, Shadow, Light, Past Life, Cosmos, Relationships, Transition. Your task is to create a poetic, family-friendly Star Card reading for a ${
//       spreadInfo.name
//     } spread with ${cards.length} card${
//       cards.length > 1 ? "s" : ""
//     }, concluding with an overall advice section.

// User details:
// - Name: ${name}
// - Age: ${age} (${lifeStage})
// - Star Sign: ${effectiveStarSign}

// The cards drawn are:
// ${cards
//   .map(
//     (card, index) =>
//       `${index + 1}. ${card.name} (Theme: ${card.theme}, Position: ${
//         positions[index] || "Unknown"
//       }, Meaning: ${card.meaning})`
//   )
//   .join("\n")}

// Instructions:
// 1. Address the user as "${name}" in the narrative.
// 2. Mention each card's name, theme, and position, tying its meaning to the user's life.
// 3. Reflect the user's life stage (${lifeStage}) in the interpretation.
// 4. Incorporate the star sign (${effectiveStarSign}) with its traits (e.g., Aries: bold action, Pisces: intuitive dreams) and connect to the Cosmos or related themes.
// 5. Use numerology from the name (value: ${nameValue}) to emphasize a card or theme.
// 6. Create a cohesive ${
//       cards.length <= 3 ? "4-6" : cards.length <= 7 ? "6-8" : "8-12"
//     } sentence narrative that is personal, positive, and insightful.
// 7. Conclude with a 2-3 sentence "Overall Advice" section, synthesizing card meanings, life stage, and zodiac traits into uplifting guidance.
// 8. Keep the tone poetic, mystical, and positive, avoiding negative predictions.

// Example:
// For Emma (numerology: 5), age 25 (young adult), Pisces, with Past-Present-Future spread: "Cycle of Fire" (Destiny, Past), "Suppressed Joy" (Emotion, Present), "Phoenix Rise" (Transition, Future):
// "Dear Emma, your Piscean soul shines with intuition. In the Past, Cycle of Fire sparked growth, shaping your destiny. Currently, Suppressed Joy suggests hidden happiness ready to bloom in your youth. The number 5 aligns with change, amplifying your path. In the Future, Phoenix Rise foretells rebirth, guided by Piscean dreams. Overall Advice: Embrace your intuitive gifts, Emma, and let joy guide your transformation."

// Generate the reading now.
// `;

//     console.log("Prompt Sent to AI:", prompt);

//     let responseText = "";
//     let attempts = 0;
//     const maxAttempts = 3;

//     if (model === "gemini") {
//       const geminiModel = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         generationConfig: { maxOutputTokens: 1500 },
//       });
//       while (attempts < maxAttempts) {
//         try {
//           const result = await geminiModel.generateContent(prompt);
//           responseText = result.response.text();
//           console.log(`Gemini Attempt ${attempts + 1} Response:`, responseText);
//           // Relaxed validation: warn but don't fail if card names are missing
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (!responseText.includes("Overall Advice")) {
//             console.warn("Overall Advice section missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`Gemini Attempt ${attempts + 1} Error:`, err);
//           attempts++;
//         }
//       }
//     } else if (model === "openrouter") {
//       while (attempts < maxAttempts) {
//         try {
//           const completion = await openai.chat.completions.create({
//             model: "openai/gpt-4o-mini",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 1500,
//           });
//           responseText = completion.choices[0].message.content;
//           console.log(
//             `OpenRouter Attempt ${attempts + 1} Response:`,
//             responseText
//           );
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (!responseText.includes("Overall Advice")) {
//             console.warn("Overall Advice section missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`OpenRouter Attempt ${attempts + 1} Error:`, err);
//           attempts++;
//         }
//       }
//     } else {
//       console.error("Invalid model:", model);
//       return NextResponse.json(
//         { error: "Invalid model selected" },
//         { status: 400 }
//       );
//     }

//     if (!responseText || attempts >= maxAttempts) {
//       console.error("Failed to generate reading after attempts:", { attempts });
//       // Fallback: Generate a simple reading based on card meanings
//       responseText = `Dear ${name}, your ${
//         spreadInfo.name
//       } reading unfolds as follows:\n${cards
//         .map(
//           (card, index) =>
//             `${positions[index] || "Insight"}: ${card.name} (${
//               card.theme
//             }) suggests ${card.meaning.toLowerCase()}.`
//         )
//         .join(
//           "\n"
//         )}\nOverall Advice: Trust your ${effectiveStarSign} intuition and embrace your ${lifeStage} journey with confidence.`;
//       console.log("Fallback Reading Generated:", responseText);
//     }

//     return NextResponse.json({ reading: responseText });
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       { error: `Server error: ${err.message}` },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import OpenAI from "openai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const spreadConfig = {
//   single: { name: "Single Card Draw", positions: ["Insight"] },
//   duality: { name: "Duality Spread", positions: ["Option 1", "Option 2"] },
//   "past-present-future": {
//     name: "Past-Present-Future",
//     positions: ["Past", "Present", "Future"],
//   },
//   elemental: {
//     name: "Elemental Spread",
//     positions: ["Earth", "Air", "Fire", "Water"],
//   },
//   "cross-of-truth": {
//     name: "Cross of Truth",
//     positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
//   },
//   relationship: {
//     name: "Relationship Spread",
//     positions: [
//       "You",
//       "Other",
//       "Relationship",
//       "Strengths",
//       "Challenges",
//       "Future",
//     ],
//   },
//   horseshoe: {
//     name: "Horseshoe Spread",
//     positions: [
//       "Past",
//       "Present",
//       "Future",
//       "Influences",
//       "Obstacles",
//       "Advice",
//       "Outcome",
//     ],
//   },
//   "celtic-cross": {
//     name: "Celtic Cross",
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
//   },
//   zodiac: {
//     name: "Zodiac Spread",
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
//   },
//   "year-ahead": {
//     name: "Year Ahead Spread",
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
//   },
// };

// const validThemes = [
//   "Destiny",
//   "Emotion",
//   "Mind",
//   "Body",
//   "Shadow",
//   "Light",
//   "Past Life",
//   "Cosmos",
//   "Relationships",
//   "Transition",
// ];

// function getZodiacSign(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [year, month, day] = birthday.split("-").map(Number);
//   if (!month || !day || isNaN(month) || isNaN(day)) return null;

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

// export async function POST(request) {
//   try {
//     const {
//       cards,
//       name,
//       age,
//       starSign,
//       birthday,
//       model = "gemini",
//       spread = "single",
//     } = await request.json();

//     console.log("API Request Received:", {
//       cards,
//       name,
//       age,
//       starSign,
//       birthday,
//       model,
//       spread,
//     });

//     // Derive starSign from birthday if provided and starSign is missing
//     const effectiveStarSign =
//       starSign || (birthday ? getZodiacSign(birthday) : null);

//     // Validate inputs
//     if (!cards || !Array.isArray(cards) || cards.length === 0) {
//       console.error("Invalid cards input:", cards);
//       return NextResponse.json(
//         { error: "Cards array is required and must not be empty" },
//         { status: 400 }
//       );
//     }

//     if (!name || typeof name !== "string" || name.trim().length === 0) {
//       console.error("Invalid name input:", name);
//       return NextResponse.json(
//         { error: "Name is required and must be a non-empty string" },
//         { status: 400 }
//       );
//     }

//     if (!age || isNaN(parseInt(age)) || parseInt(age) <= 0) {
//       console.error("Invalid age input:", age);
//       return NextResponse.json(
//         { error: "Age is required and must be a positive number" },
//         { status: 400 }
//       );
//     }

//     if (!effectiveStarSign) {
//       console.error("Invalid starSign or birthday input:", {
//         starSign,
//         birthday,
//       });
//       return NextResponse.json(
//         {
//           error:
//             "Star sign is required or birthday must be in YYYY-MM-DD format",
//         },
//         { status: 400 }
//       );
//     }

//     // Validate card properties
//     for (const card of cards) {
//       if (!card.name || !card.theme || !card.meaning || !card.position) {
//         console.error("Invalid card data:", card);
//         return NextResponse.json(
//           { error: "Each card must have name, theme, meaning, and position" },
//           { status: 400 }
//         );
//       }
//       if (!validThemes.includes(card.theme)) {
//         console.error("Invalid card theme:", card.theme);
//         return NextResponse.json(
//           { error: `Card theme must be one of: ${validThemes.join(", ")}` },
//           { status: 400 }
//         );
//       }
//     }

//     const spreadInfo = spreadConfig[spread] || spreadConfig["single"];
//     const positions = spreadInfo.positions.slice(0, cards.length);

//     // Calculate name numerology
//     const nameValue =
//       name
//         .toLowerCase()
//         .split("")
//         .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;

//     // Determine life stage
//     const lifeStage =
//       age < 30 ? "young adult" : age < 50 ? "mid-life" : "mature";

//     // Enhanced prompt for overall reading
//     const prompt = `
// You are a mystical Star Card reader, interpreting a deck of 100 cards across 10 themes: Destiny, Emotion, Mind, Body, Shadow, Light, Past Life, Cosmos, Relationships, Transition. Your task is to create a poetic, family-friendly Star Card reading for a ${
//       spreadInfo.name
//     } spread with ${cards.length} card${
//       cards.length > 1 ? "s" : ""
//     }, concluding with an overall advice section.

// User details:
// - Name: ${name}
// - Age: ${age} (${lifeStage})
// - Star Sign: ${effectiveStarSign}

// The cards drawn are:
// ${cards
//   .map(
//     (card, index) =>
//       `${index + 1}. ${card.name} (Theme: ${card.theme}, Position: ${
//         positions[index] || "Unknown"
//       }, Meaning: ${card.meaning})`
//   )
//   .join("\n")}

// Instructions:
// 1. Address the user as "${name}" in the narrative.
// 2. Mention each card's name, theme, and position, tying its meaning to the user's life.
// 3. Reflect the user's life stage (${lifeStage}) in the interpretation.
// 4. Incorporate the star sign (${effectiveStarSign}) with its traits (e.g., Aries: bold action, Pisces: intuitive dreams) and connect to the Cosmos or related themes.
// 5. Use numerology from the name (value: ${nameValue}) to emphasize a card or theme.
// 6. Create a cohesive ${
//       cards.length <= 3 ? "4-6" : cards.length <= 7 ? "6-8" : "8-12"
//     } sentence narrative that is personal, positive, and insightful.
// 7. Conclude with a 2-3 sentence "Overall Advice" section, synthesizing card meanings, life stage, and zodiac traits into uplifting guidance.
// 8. Keep the tone poetic, mystical, and positive, avoiding negative predictions.

// Example:
// For Emma (numerology: 5), age 25 (young adult), Pisces, with Past-Present-Future spread: "Cycle of Fire" (Destiny, Past), "Suppressed Joy" (Emotion, Present), "Phoenix Rise" (Transition, Future):
// "Dear Emma, your Piscean soul shines with intuition. In the Past, Cycle of Fire sparked growth, shaping your destiny. Currently, Suppressed Joy suggests hidden happiness ready to bloom in your youth. The number 5 aligns with change, amplifying your path. In the Future, Phoenix Rise foretells rebirth, guided by Piscean dreams. Overall Advice: Embrace your intuitive gifts, Emma, and let joy guide your transformation."

// Generate the reading now.
// `;

//     console.log("Prompt Sent to AI:", prompt);

//     let responseText = "";
//     let attempts = 0;
//     const maxAttempts = 3;

//     if (model === "gemini") {
//       const geminiModel = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         generationConfig: { maxOutputTokens: 1500 },
//       });
//       while (attempts < maxAttempts) {
//         try {
//           const result = await geminiModel.generateContent(prompt);
//           responseText = result.response.text();
//           console.log(`Gemini Attempt ${attempts + 1} Response:`, responseText);
//           // Relaxed validation: warn but don't fail if card names are missing
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (!responseText.includes("Overall Advice")) {
//             console.warn("Overall Advice section missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`Gemini Attempt ${attempts + 1} Error:`, err);
//           attempts++;
//         }
//       }
//     } else if (model === "openrouter") {
//       while (attempts < maxAttempts) {
//         try {
//           const completion = await openai.chat.completions.create({
//             model: "openai/gpt-4o-mini",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 1500,
//           });
//           responseText = completion.choices[0].message.content;
//           console.log(
//             `OpenRouter Attempt ${attempts + 1} Response:`,
//             responseText
//           );
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (!responseText.includes("Overall Advice")) {
//             console.warn("Overall Advice section missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`OpenRouter Attempt ${attempts + 1} Error:`, err);
//           attempts++;
//         }
//       }
//     } else {
//       console.error("Invalid model:", model);
//       return NextResponse.json(
//         { error: "Invalid model selected" },
//         { status: 400 }
//       );
//     }

//     if (!responseText || attempts >= maxAttempts) {
//       console.error("Failed to generate reading after attempts:", { attempts });
//       // Fallback: Generate a simple reading based on card meanings
//       responseText = `Dear ${name}, your ${
//         spreadInfo.name
//       } reading unfolds as follows:\n${cards
//         .map(
//           (card, index) =>
//             `${positions[index] || "Insight"}: ${card.name} (${
//               card.theme
//             }) suggests ${card.meaning.toLowerCase()}.`
//         )
//         .join(
//           "\n"
//         )}\nOverall Advice: Trust your ${effectiveStarSign} intuition and embrace your ${lifeStage} journey with confidence.`;
//       console.log("Fallback Reading Generated:", responseText);
//     }

//     return NextResponse.json({ reading: responseText });
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       { error: `Server error: ${err.message}` },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import OpenAI from "openai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const spreadConfig = {
//   single: { name: "Single Card Draw", positions: ["Insight"] },
//   duality: { name: "Duality Spread", positions: ["Option 1", "Option 2"] },
//   "past-present-future": {
//     name: "Past-Present-Future",
//     positions: ["Past", "Present", "Future"],
//   },
//   elemental: {
//     name: "Elemental Spread",
//     positions: ["Earth", "Air", "Fire", "Water"],
//   },
//   "cross-of-truth": {
//     name: "Cross of Truth",
//     positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
//   },
//   relationship: {
//     name: "Relationship Spread",
//     positions: [
//       "You",
//       "Other",
//       "Relationship",
//       "Strengths",
//       "Challenges",
//       "Future",
//     ],
//   },
//   horseshoe: {
//     name: "Horseshoe Spread",
//     positions: [
//       "Past",
//       "Present",
//       "Future",
//       "Influences",
//       "Obstacles",
//       "Advice",
//       "Outcome",
//     ],
//   },
//   "celtic-cross": {
//     name: "Celtic Cross",
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
//   },
//   zodiac: {
//     name: "Zodiac Spread",
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
//   },
//   "year-ahead": {
//     name: "Year Ahead Spread",
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
//   },
// };

// const validThemes = [
//   "Destiny",
//   "Emotion",
//   "Mind",
//   "Body",
//   "Shadow",
//   "Light",
//   "Past Life",
//   "Cosmos",
//   "Relationships",
//   "Transition",
// ];

// function getZodiacSign(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [year, month, day] = birthday.split("-").map(Number);
//   if (!month || !day || isNaN(month) || isNaN(day)) return null;

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

// export async function POST(request) {
//   try {
//     const {
//       cards,
//       name,
//       age,
//       starSign,
//       birthday,
//       model = "gemini",
//       spread = "single",
//     } = await request.json();

//     console.log("API Request Received:", {
//       cards,
//       name,
//       age,
//       starSign,
//       birthday,
//       model,
//       spread,
//     });

//     // Derive starSign from birthday if provided and starSign is missing
//     const effectiveStarSign =
//       starSign || (birthday ? getZodiacSign(birthday) : null);

//     // Validate inputs
//     if (!cards || !Array.isArray(cards) || cards.length === 0) {
//       console.error("Invalid cards input:", cards);
//       return NextResponse.json(
//         { error: "Cards array is required and must not be empty" },
//         { status: 400 }
//       );
//     }

//     if (!name || typeof name !== "string" || name.trim().length === 0) {
//       console.error("Invalid name input:", name);
//       return NextResponse.json(
//         { error: "Name is required and must be a non-empty string" },
//         { status: 400 }
//       );
//     }

//     if (!age || isNaN(parseInt(age)) || parseInt(age) <= 0) {
//       console.error("Invalid age input:", age);
//       return NextResponse.json(
//         { error: "Age is required and must be a positive number" },
//         { status: 400 }
//       );
//     }

//     if (!effectiveStarSign) {
//       console.error("Invalid starSign or birthday input:", {
//         starSign,
//         birthday,
//       });
//       return NextResponse.json(
//         {
//           error:
//             "Star sign is required or birthday must be in YYYY-MM-DD format",
//         },
//         { status: 400 }
//       );
//     }

//     // Validate card properties
//     for (const card of cards) {
//       if (!card.name || !card.theme || !card.meaning || !card.position) {
//         console.error("Invalid card data:", card);
//         return NextResponse.json(
//           { error: "Each card must have name, theme, meaning, and position" },
//           { status: 400 }
//         );
//       }
//       if (!validThemes.includes(card.theme)) {
//         console.error("Invalid card theme:", card.theme);
//         return NextResponse.json(
//           { error: `Card theme must be one of: ${validThemes.join(", ")}` },
//           { status: 400 }
//         );
//       }
//     }

//     const spreadInfo = spreadConfig[spread] || spreadConfig["single"];
//     const positions = spreadInfo.positions.slice(0, cards.length);

//     if (positions.length < cards.length) {
//       console.error("Not enough positions for cards:", {
//         spread,
//         positions,
//         cards,
//       });
//       return NextResponse.json(
//         {
//           error: `Spread ${spread} does not have enough positions for ${cards.length} cards`,
//         },
//         { status: 400 }
//       );
//     }

//     // Calculate name numerology
//     const nameValue =
//       name
//         .toLowerCase()
//         .split("")
//         .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;

//     // Determine life stage
//     const lifeStage =
//       age < 30 ? "young adult" : age < 50 ? "mid-life" : "mature";

//     // Prompt for per-card readings
//     const prompt = `
// You are a mystical Star Card reader, interpreting a deck of 100 cards across 10 themes: Destiny, Emotion, Mind, Body, Shadow, Light, Past Life, Cosmos, Relationships, Transition. Your task is to create a poetic, family-friendly Star Card reading for a ${
//       spreadInfo.name
//     } spread with ${cards.length} card${
//       cards.length > 1 ? "s" : ""
//     }, providing a separate interpretation for each card and concluding with an overall advice section.

// User details:
// - Name: ${name}
// - Age: ${age} (${lifeStage})
// - Star Sign: ${effectiveStarSign}

// The cards drawn are:
// ${cards
//   .map(
//     (card, index) =>
//       `${index + 1}. ${card.name} (Theme: ${card.theme}, Position: ${
//         positions[index] || "Unknown"
//       }, Meaning: ${card.meaning})`
//   )
//   .join("\n")}

// Instructions:
// 1. For each card, provide a 2-3 sentence interpretation labeled as "Card X: [Card Name] ([Position]):", addressing the user as "${name}" and tying the card's meaning to their life, life stage (${lifeStage}), and star sign (${effectiveStarSign}) traits (e.g., Aries: bold action, Pisces: intuitive dreams).
// 2. Incorporate numerology (name value: ${nameValue}) to emphasize one card or theme, mentioning it in that card's interpretation.
// 3. Each card's interpretation should be personal, positive, and connect to the card's theme and position.
// 4. Conclude with a 2-3 sentence "Overall Advice" section labeled "Overall Advice:", synthesizing all card meanings, life stage, and zodiac traits into uplifting guidance.
// 5. Use plain text headers exactly as specified (e.g., "Card 1: [Name] ([Position]):", "Overall Advice:") without Markdown symbols like #, ##, **, or *.
// 6. Do not include the theme name in the section headers; include it in the body of each card's interpretation if relevant.
// 7. Keep the tone poetic, mystical, and positive, avoiding negative predictions.

// Example for a 3-card Past-Present-Future spread:
// Card 1: Cycle of Fire (Past): Dear Emma, in your past, Cycle of Fire ignited your Piscean intuition with its Destiny theme, sparking growth through bold changes. This transformative energy shaped your young adult journey.
// Card 2: Suppressed Joy (Present): Currently, Suppressed Joy suggests hidden happiness ready to bloom, dear Emma, with its Emotion theme amplified. Your Piscean dreams, guided by the number 5, urge you to embrace this joy.
// Card 3: Phoenix Rise (Future): Looking ahead, Phoenix Rise foretells a radiant rebirth, aligning with its Transition theme. Your intuitive gifts will guide this future chapter.
// Overall Advice: Trust your Piscean intuition, Emma, to weave past growth and present joy into a transformative future. Let your heart lead with confidence in this vibrant phase.

// Generate the reading now, ensuring each card has its own section and the overall advice is clearly separated, using the exact header formats specified.
// `;

//     console.log("Prompt Sent to AI:", prompt);

//     let responseText = "";
//     let attempts = 0;
//     const maxAttempts = 3;

//     if (model === "gemini") {
//       const geminiModel = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         generationConfig: { maxOutputTokens: 1500 },
//       });
//       while (attempts < maxAttempts) {
//         try {
//           const result = await geminiModel.generateContent(prompt);
//           responseText = result.response.text();
//           console.log(`Gemini Attempt ${attempts + 1} Response:`, responseText);
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (!responseText.includes("Overall Advice:")) {
//             console.warn("Overall Advice section missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`Gemini Attempt ${attempts + 1} Error: ${err}`);
//           attempts++;
//         }
//       }
//     } else if (model === "openrouter") {
//       while (attempts < maxAttempts) {
//         try {
//           const completion = await openai.chat.completions.create({
//             model: "openai/gpt-4o-mini",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 1500,
//           });
//           responseText = completion.choices[0].message.content;
//           console.log(
//             `OpenRouter Attempt ${attempts + 1} Response:`,
//             responseText
//           );
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (!responseText.includes("Overall Advice:")) {
//             console.warn("Overall Advice section missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`OpenRouter Attempt ${attempts + 1} Error: ${err}`);
//           attempts++;
//         }
//       }
//     } else {
//       console.error("Invalid model:", model);
//       return NextResponse.json(
//         { error: "Invalid model selected" },
//         { status: 400 }
//       );
//     }

//     if (!responseText || attempts >= maxAttempts) {
//       console.error("Failed to generate reading after attempts:", { attempts });
//       // Fallback: Generate a simple reading per card
//       responseText =
//         cards
//           .map(
//             (card, index) =>
//               `Card ${index + 1}: ${card.name} (${
//                 card.position
//               }): Dear ${name}, ${card.name} (${
//                 card.theme
//               }) suggests ${card.meaning.toLowerCase()} in your ${lifeStage} journey. This card reflects your ${effectiveStarSign} energy.\n`
//           )
//           .join("") +
//         `Overall Advice: Trust your ${effectiveStarSign} intuition, ${name}, and embrace your ${lifeStage} journey with confidence.`;
//       console.log("Fallback Reading Generated:", responseText);
//     }

//     return NextResponse.json({ reading: responseText });
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       { error: `Server error: ${err.message}` },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import OpenAI from "openai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const spreadConfig = {
//   single: { name: "Single Card Draw", positions: ["Insight"] },
//   duality: { name: "Duality Spread", positions: ["Option 1", "Option 2"] },
//   "past-present-future": {
//     name: "Past-Present-Future",
//     positions: ["Past", "Present", "Future"],
//   },
//   elemental: {
//     name: "Elemental Spread",
//     positions: ["Earth", "Air", "Fire", "Water"],
//   },
//   "cross-of-truth": {
//     name: "Cross of Truth",
//     positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
//   },
//   relationship: {
//     name: "Relationship Spread",
//     positions: [
//       "You",
//       "Other",
//       "Relationship",
//       "Strengths",
//       "Challenges",
//       "Future",
//     ],
//   },
//   horseshoe: {
//     name: "Horseshoe Spread",
//     positions: [
//       "Past",
//       "Present",
//       "Future",
//       "Influences",
//       "Obstacles",
//       "Advice",
//       "Outcome",
//     ],
//   },
//   "celtic-cross": {
//     name: "Celtic Cross",
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
//   },
//   zodiac: {
//     name: "Zodiac Spread",
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
//   },
//   "year-ahead": {
//     name: "Year Ahead Spread",
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
//   },
// };

// const validThemes = [
//   "Destiny",
//   "Emotion",
//   "Mind",
//   "Body",
//   "Shadow",
//   "Light",
//   "Past Life",
//   "Cosmos",
//   "Relationships",
//   "Transition",
// ];

// function getZodiacSign(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [year, month, day] = birthday.split("-").map(Number);
//   if (!month || !day || isNaN(month) || isNaN(day)) return null;
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

// function calculateAge(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [birthYear, birthMonth, birthDay] = birthday.split("-").map(Number);
//   const today = new Date();
//   const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();
//   if (
//     monthDiff < 0 ||
//     (monthDiff === 0 && today.getDate() < birthDate.getDate())
//   ) {
//     age--;
//   }
//   return age;
// }

// export async function POST(request) {
//   try {
//     const {
//       cards,
//       name,
//       birthday,
//       model = "gemini",
//       spread = "single",
//     } = await request.json();

//     console.log("API Request Received:", {
//       cards,
//       name,
//       birthday,
//       model,
//       spread,
//     });

//     const effectiveStarSign = birthday ? getZodiacSign(birthday) : null;
//     const age = calculateAge(birthday);

//     if (!cards || !Array.isArray(cards) || cards.length === 0) {
//       console.error("Invalid cards input:", cards);
//       return NextResponse.json(
//         { error: "Cards array is required and must not be empty" },
//         { status: 400 }
//       );
//     }

//     if (!name || typeof name !== "string" || name.trim().length === 0) {
//       console.error("Invalid name input:", name);
//       return NextResponse.json(
//         { error: "Name is required and must be a non-empty string" },
//         { status: 400 }
//       );
//     }

//     if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
//       console.error("Invalid birthday input:", birthday);
//       return NextResponse.json(
//         { error: "Birthday is required in YYYY-MM-DD format" },
//         { status: 400 }
//       );
//     }

//     if (!effectiveStarSign) {
//       console.error("Invalid starSign derived from birthday:", birthday);
//       return NextResponse.json(
//         { error: "Unable to determine star sign from birthday" },
//         { status: 400 }
//       );
//     }

//     if (!age || age <= 0) {
//       console.error("Invalid age calculated from birthday:", birthday);
//       return NextResponse.json(
//         { error: "Invalid age derived from birthday" },
//         { status: 400 }
//       );
//     }

//     for (const card of cards) {
//       if (!card.name || !card.theme || !card.meaning || !card.position) {
//         console.error("Invalid card data:", card);
//         return NextResponse.json(
//           { error: "Each card must have name, theme, meaning, and position" },
//           { status: 400 }
//         );
//       }
//       if (!validThemes.includes(card.theme)) {
//         console.error("Invalid card theme:", card.theme);
//         return NextResponse.json(
//           { error: `Card theme must be one of: ${validThemes.join(", ")}` },
//           { status: 400 }
//         );
//       }
//     }

//     const spreadInfo = spreadConfig[spread] || spreadConfig["single"];
//     const positions = spreadInfo.positions.slice(0, cards.length);

//     if (positions.length < cards.length) {
//       console.error("Not enough positions for cards:", {
//         spread,
//         positions,
//         cards,
//       });
//       return NextResponse.json(
//         {
//           error: `Spread ${spread} does not have enough positions for ${cards.length} cards`,
//         },
//         { status: 400 }
//       );
//     }

//     const nameValue =
//       name
//         .toLowerCase()
//         .split("")
//         .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;

//     const lifeStage =
//       age < 30 ? "young adult" : age < 50 ? "mid-life" : "mature";

//     const prompt = `
// You are a mystical Star Card reader, interpreting a deck of 100 cards across 10 themes: Destiny, Emotion, Mind, Body, Shadow, Light, Past Life, Cosmos, Relationships, Transition. Your task is to create a poetic, family-friendly Star Card reading for a ${
//       spreadInfo.name
//     } spread with ${cards.length} card${
//       cards.length > 1 ? "s" : ""
//     }, starting with a personal influences section, followed by separate interpretations for each card, and concluding with an overall advice section that integrates numerology, birth date, star sign, and card meanings.

// User details:
// - Name: ${name}
// - Birth Date: ${birthday}
// - Age: ${age} (${lifeStage})
// - Star Sign: ${effectiveStarSign}
// - Numerology Number: ${nameValue}

// The cards drawn are:
// ${cards
//   .map(
//     (card, index) =>
//       `${index + 1}. ${card.name} (Theme: ${card.theme}, Position: ${
//         positions[index] || "Unknown"
//       }, Meaning: ${card.meaning})`
//   )
//   .join("\n")}

// Instructions:
// 1. Start with a "Personal Influences:" section (2-3 sentences) that introduces the user's numerology number (derived from name: ${nameValue}), star sign (${effectiveStarSign}), and life stage (${lifeStage}), explaining how these shape the reading's tone and focus.
// 2. For each card, provide a 2-3 sentence interpretation labeled as "Card X: [Card Name] ([Position]):", addressing the user as "${name}" and tying the card's meaning to their life, life stage, star sign traits (e.g., Aries: bold action, Pisces: intuitive dreams), and numerology number where relevant (especially emphasize numerology in one card's interpretation).
// 3. Each card's interpretation should be personal, positive, and connect to the card's theme and position.
// 4. Conclude with a 2-3 sentence "Overall Advice:" section labeled "Overall Advice:", synthesizing all card meanings, numerology number, star sign traits, and life stage into uplifting guidance that feels cohesive and forward-looking.
// 5. Use plain text headers exactly as specified (e.g., "Personal Influences:", "Card 1: [Name] ([Position]):", "Overall Advice:") without Markdown symbols like #, ##, **, or *.
// 6. Do not include the theme name in the section headers; include it in the body of each card's interpretation if relevant.
// 7. Keep the tone poetic, mystical, and positive, avoiding negative predictions.
// 8. Ensure the overall advice ties together the numerology, star sign, birth date influences, and card meanings for a unified message.

// Example for a 3-card Past-Present-Future spread:
// Personal Influences: Dear Emma, your numerology number 5, derived from your name, emphasizes transformation, while your Piscean star sign enhances intuitive dreams in your young adult phase. These energies shape a reading focused on growth and emotional clarity.
// Card 1: Cycle of Fire (Past): Dear Emma, in your past, Cycle of Fire ignited your Piscean intuition with its Destiny theme, sparking growth through bold changes. This transformative energy, aligned with your numerology number 5, shaped your journey.
// Card 2: Suppressed Joy (Present): Currently, Suppressed Joy suggests hidden happiness ready to bloom, dear Emma, with its Emotion theme amplified. Your Piscean dreams urge you to embrace this joy.
// Card 3: Phoenix Rise (Future): Looking ahead, Phoenix Rise foretells a radiant rebirth, aligning with its Transition theme. Your intuitive gifts will guide this future chapter.
// Overall Advice: Trust your Piscean intuition and numerology number 5, Emma, to weave past growth and present joy into a transformative future. Let your heart lead with confidence in this vibrant phase.

// Generate the reading now, ensuring the personal influences section, each card's section, and the overall advice are clearly separated, using the exact header formats specified.
// `;

//     console.log("Prompt Sent to AI:", prompt);

//     let responseText = "";
//     let attempts = 0;
//     const maxAttempts = 3;

//     if (model === "gemini") {
//       const geminiModel = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         generationConfig: { maxOutputTokens: 1500 },
//       });
//       while (attempts < maxAttempts) {
//         try {
//           const result = await geminiModel.generateContent(prompt);
//           responseText = result.response.text();
//           console.log(`Gemini Attempt ${attempts + 1} Response:`, responseText);
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (
//             !responseText.includes("Overall Advice:") ||
//             !responseText.includes("Personal Influences:")
//           ) {
//             console.warn("Required sections missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`Gemini Attempt ${attempts + 1} Error: ${err}`);
//           attempts++;
//         }
//       }
//     } else if (model === "openrouter") {
//       while (attempts < maxAttempts) {
//         try {
//           const completion = await openai.chat.completions.create({
//             model: "openai/gpt-4o-mini",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 1500,
//           });
//           responseText = completion.choices[0].message.content;
//           console.log(
//             `OpenRouter Attempt ${attempts + 1} Response:`,
//             responseText
//           );
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (
//             !responseText.includes("Overall Advice:") ||
//             !responseText.includes("Personal Influences:")
//           ) {
//             console.warn("Required sections missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`OpenRouter Attempt ${attempts + 1} Error: ${err}`);
//           attempts++;
//         }
//       }
//     } else {
//       console.error("Invalid model:", model);
//       return NextResponse.json(
//         { error: "Invalid model selected" },
//         { status: 400 }
//       );
//     }

//     if (!responseText || attempts >= maxAttempts) {
//       console.error("Failed to generate reading after attempts:", { attempts });
//       responseText =
//         `Personal Influences: Dear ${name}, your numerology number ${nameValue} and ${effectiveStarSign} star sign shape your ${lifeStage} journey with transformative energy.\n` +
//         cards
//           .map(
//             (card, index) =>
//               `Card ${index + 1}: ${card.name} (${
//                 card.position
//               }): Dear ${name}, ${card.name} (${
//                 card.theme
//               }) suggests ${card.meaning.toLowerCase()} in your ${lifeStage} journey. This card reflects your ${effectiveStarSign} energy.\n`
//           )
//           .join("") +
//         `Overall Advice: Trust your ${effectiveStarSign} intuition and numerology number ${nameValue}, ${name}, to embrace your ${lifeStage} journey with confidence.`;
//       console.log("Fallback Reading Generated:", responseText);
//     }

//     return NextResponse.json({ reading: responseText });
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       { error: `Server error: ${err.message}` },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import OpenAI from "openai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const spreadConfig = {
//   single: { name: "Single Card Draw", positions: ["Insight"] },
//   duality: { name: "Duality Spread", positions: ["Option 1", "Option 2"] },
//   "past-present-future": {
//     name: "Past-Present-Future",
//     positions: ["Past", "Present", "Future"],
//   },
//   elemental: {
//     name: "Elemental Spread",
//     positions: ["Earth", "Air", "Fire", "Water"],
//   },
//   "cross-of-truth": {
//     name: "Cross of Truth",
//     positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
//   },
//   relationship: {
//     name: "Relationship Spread",
//     positions: [
//       "You",
//       "Other",
//       "Relationship",
//       "Strengths",
//       "Challenges",
//       "Future",
//     ],
//   },
//   horseshoe: {
//     name: "Horseshoe Spread",
//     positions: [
//       "Past",
//       "Present",
//       "Future",
//       "Influences",
//       "Obstacles",
//       "Advice",
//       "Outcome",
//     ],
//   },
//   "celtic-cross": {
//     name: "Celtic Cross",
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
//   },
//   zodiac: {
//     name: "Zodiac Spread",
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
//   },
//   "year-ahead": {
//     name: "Year Ahead Spread",
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
//   },
// };

// const validThemes = [
//   "Destiny",
//   "Emotion",
//   "Mind",
//   "Body",
//   "Shadow",
//   "Light",
//   "Past Life",
//   "Cosmos",
//   "Relationships",
//   "Transition",
// ];

// function getZodiacSign(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [year, month, day] = birthday.split("-").map(Number);
//   if (!month || !day || isNaN(month) || isNaN(day)) return null;
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

// function calculateAge(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [birthYear, birthMonth, birthDay] = birthday.split("-").map(Number);
//   const today = new Date();
//   const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();
//   if (
//     monthDiff < 0 ||
//     (monthDiff === 0 && today.getDate() < birthDate.getDate())
//   ) {
//     age--;
//   }
//   return age;
// }

// function getBirthDayInfo(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const date = new Date(birthday);
//   const dayIndex = date.getDay();
//   const days = [
//     {
//       name: "Day of the Luminance",
//       description: "Radiates warmth and divine inspiration",
//     },
//     {
//       name: "Day of the Vortex",
//       description: "Swirls with transformative energy and insight",
//     },
//     {
//       name: "Day of the Flame",
//       description: "Ignites courage and bold action",
//     },
//     {
//       name: "Day of the Whisper",
//       description: "Carries intuitive messages from the cosmos",
//     },
//     {
//       name: "Day of the Horizon",
//       description: "Expands vision and boundless potential",
//     },
//     {
//       name: "Day of the Blossom",
//       description: "Blooms with love and creative harmony",
//     },
//     {
//       name: "Day of the Anchor",
//       description: "Grounds with strength and timeless wisdom",
//     },
//   ];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const [year, month, day] = birthday.split("-").map(Number);
//   const formattedDate = `${months[month - 1]} ${day}, ${year}`;
//   return { ...days[dayIndex], formattedDate };
// }

// export async function POST(request) {
//   try {
//     const {
//       cards,
//       name,
//       birthday,
//       model = "gemini",
//       spread = "single",
//     } = await request.json();
//     console.log("API Request Received:", {
//       cards,
//       name,
//       birthday,
//       model,
//       spread,
//     });

//     const effectiveStarSign = birthday ? getZodiacSign(birthday) : null;
//     const age = calculateAge(birthday);
//     const birthDayInfo = birthday ? getBirthDayInfo(birthday) : null;

//     if (!cards || !Array.isArray(cards) || cards.length === 0) {
//       console.error("Invalid cards input:", cards);
//       return NextResponse.json(
//         { error: "Cards array is required and must not be empty" },
//         { status: 400 }
//       );
//     }

//     if (!name || typeof name !== "string" || name.trim().length === 0) {
//       console.error("Invalid name input:", name);
//       return NextResponse.json(
//         { error: "Name is required and must be a non-empty string" },
//         { status: 400 }
//       );
//     }

//     if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
//       console.error("Invalid birthday input:", birthday);
//       return NextResponse.json(
//         { error: "Birthday is required in YYYY-MM-DD format" },
//         { status: 400 }
//       );
//     }

//     if (!effectiveStarSign) {
//       console.error("Invalid starSign derived from birthday:", birthday);
//       return NextResponse.json(
//         { error: "Unable to determine star sign from birthday" },
//         { status: 400 }
//       );
//     }

//     if (!age || age <= 0) {
//       console.error("Invalid age calculated from birthday:", birthday);
//       return NextResponse.json(
//         { error: "Invalid age derived from birthday" },
//         { status: 400 }
//       );
//     }

//     for (const card of cards) {
//       if (!card.name || !card.theme || !card.meaning || !card.position) {
//         console.error("Invalid card data:", card);
//         return NextResponse.json(
//           { error: "Each card must have name, theme, meaning, and position" },
//           { status: 400 }
//         );
//       }
//       if (!validThemes.includes(card.theme)) {
//         console.error("Invalid card theme:", card.theme);
//         return NextResponse.json(
//           { error: `Card theme must be one of: ${validThemes.join(", ")}` },
//           { status: 400 }
//         );
//       }
//     }

//     const spreadInfo = spreadConfig[spread] || spreadConfig["single"];
//     const positions = spreadInfo.positions.slice(0, cards.length);

//     if (positions.length < cards.length) {
//       console.error("Not enough positions for cards:", {
//         spread,
//         positions,
//         cards,
//       });
//       return NextResponse.json(
//         {
//           error: `Spread ${spread} does not have enough positions for ${cards.length} cards`,
//         },
//         { status: 400 }
//       );
//     }

//     const nameValue =
//       name
//         .toLowerCase()
//         .split("")
//         .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;
//     const lifeStage =
//       age < 30 ? "young adult" : age < 50 ? "mid-life" : "mature";
//     const dayInfluence = birthDayInfo
//       ? birthDayInfo.name
//       : "unknown cosmic day";
//     const dayDescription = birthDayInfo
//       ? birthDayInfo.description
//       : "a unique cosmic influence";

//     const prompt = `
// You are a mystical Star Card reader, interpreting a deck of 100 cards across 10 themes: Destiny, Emotion, Mind, Body, Shadow, Light, Past Life, Cosmos, Relationships, Transition. Your task is to create a poetic, family-friendly Star Card reading for a ${
//       spreadInfo.name
//     } spread with ${cards.length} card${
//       cards.length > 1 ? "s" : ""
//     }, starting with a personal influences section, followed by separate interpretations for each card, and concluding with an extended overall advice section that deeply integrates numerology, birth date, star sign, day of birth, and card meanings.

// User details:
// - Name: ${name}
// - Birth Date: ${birthday} (born on the ${dayInfluence}, which ${dayDescription})
// - Age: ${age} (${lifeStage})
// - Star Sign: ${effectiveStarSign}
// - Numerology Number: ${nameValue}

// The cards drawn are:
// ${cards
//   .map(
//     (card, index) =>
//       `${index + 1}. ${card.name} (Theme: ${card.theme}, Position: ${
//         positions[index] || "Unknown"
//       }, Meaning: ${card.meaning})`
//   )
//   .join("\n")}

// Instructions:
// 1. Start with a "Personal Influences:" section (2-3 sentences) that introduces the user's numerology number (${nameValue}), star sign (${effectiveStarSign}), life stage (${lifeStage}), and day of birth (${dayInfluence}), explaining how these shape the reading's tone and focus.
// 2. For each card, provide a 2-3 sentence interpretation labeled as "Card X: [Card Name] ([Position]):", addressing the user as "${name}" and tying the card's meaning to their life stage, star sign traits (e.g., Aries: bold action, Pisces: intuitive dreams), numerology number, and day of birth influence where relevant.
// 3. Each card's interpretation should be personal, positive, and connect to the card's theme, position, and user's cosmic profile.
// 4. Conclude with an extended "Overall Advice:" section (5-7 sentences) labeled "Overall Advice:", synthesizing all card meanings, numerology number, star sign traits, life stage, and day of birth (${dayInfluence}: ${dayDescription}). Explain how the cards were selected based on the user's name (numerology number ${nameValue}), age (${lifeStage}), star sign (${effectiveStarSign}), and day of birth, and how these elements intertwine to shape the reading. Provide actionable, uplifting guidance that ties the cards' themes to the user's cosmic influences for a cohesive, forward-looking message.
// 5. Use plain text headers exactly as specified (e.g., "Personal Influences:", "Card 1: [Name] ([Position]):", "Overall Advice:") without Markdown symbols like #, ##, **, or *.
// 6. Do not include the theme name in the section headers; include it in the body of each card's interpretation if relevant.
// 7. Keep the tone poetic, mystical, and positive, avoiding negative predictions.
// 8. Ensure the overall advice clearly describes the connection between the user's name, age, star sign, day of birth, and card meanings, explaining the card selection process and offering detailed guidance.

// Example for a 3-card Past-Present-Future spread:
// Personal Influences: Dear Emma, your numerology number 5, derived from your name, emphasizes transformation, while your Piscean star sign and Day of the Whisper infuse intuitive messages into your young adult journey. These energies shape a reading focused on growth and emotional clarity.
// Card 1: Cycle of Fire (Past): Dear Emma, in your past, Cycle of Fire ignited your Piscean intuition with its Destiny theme, sparking growth through bold changes. This card, influenced by your Day of the Whisper, reflects your transformative energy.
// Card 2: Suppressed Joy (Present): Currently, Suppressed Joy suggests hidden happiness ready to bloom, dear Emma, with its Emotion theme amplified by your numerology number 5. Your Piscean dreams urge you to embrace this joy.
// Card 3: Phoenix Rise (Future): Looking ahead, Phoenix Rise foretells a radiant rebirth, aligning with its Transition theme and your Day of the Whisper’s intuitive messages. Your intuitive gifts will guide this future chapter.
// Overall Advice: Dear Emma, your Star Cards were drawn by weaving your numerology number 5, Piscean star sign, young adult phase, and Day of the Whisper, creating a tapestry of transformation and intuition. The Cycle of Fire, Suppressed Joy, and Phoenix Rise reflect your journey from past growth to present emotional awakening, leading to a future rebirth. Your name’s vibration (number 5) emphasizes change, aligning with your Piscean intuition to select cards that guide you toward joy. Trust your intuitive whispers to embrace happiness now, letting your Day of the Whisper guide your actions. This vibrant phase calls you to act boldly, aligning with your cosmic energies for a radiant future.

// Generate the reading now, ensuring the personal influences section, each card’s section, and the extended overall advice are clearly separated, using the exact header formats specified.
// `;

//     console.log("Prompt Sent to AI:", prompt);

//     let responseText = "";
//     let attempts = 0;
//     const maxAttempts = 3;

//     if (model === "gemini") {
//       const geminiModel = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         generationConfig: { maxOutputTokens: 2000 },
//       });
//       while (attempts < maxAttempts) {
//         try {
//           const result = await geminiModel.generateContent(prompt);
//           responseText = result.response.text();
//           console.log(`Gemini Attempt ${attempts + 1} Response:`, responseText);
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (
//             !responseText.includes("Overall Advice:") ||
//             !responseText.includes("Personal Influences:")
//           ) {
//             console.warn("Required sections missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`Gemini Attempt ${attempts + 1} Error: ${err}`);
//           attempts++;
//         }
//       }
//     } else if (model === "openrouter") {
//       while (attempts < maxAttempts) {
//         try {
//           const completion = await openai.chat.completions.create({
//             model: "openai/gpt-4o-mini",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 2000,
//           });
//           responseText = completion.choices[0].message.content;
//           console.log(
//             `OpenRouter Attempt ${attempts + 1} Response:`,
//             responseText
//           );
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (
//             !responseText.includes("Overall Advice:") ||
//             !responseText.includes("Personal Influences:")
//           ) {
//             console.warn("Required sections missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`OpenRouter Attempt ${attempts + 1} Error: ${err}`);
//           attempts++;
//         }
//       }
//     } else {
//       console.error("Invalid model:", model);
//       return NextResponse.json(
//         { error: "Invalid model selected" },
//         { status: 400 }
//       );
//     }

//     if (!responseText || attempts >= maxAttempts) {
//       console.error("Failed to generate reading after attempts:", { attempts });
//       responseText =
//         `Personal Influences: Dear ${name}, your numerology number ${nameValue}, ${effectiveStarSign} star sign, and ${dayInfluence} shape your ${lifeStage} journey with transformative energy.\n` +
//         cards
//           .map(
//             (card, index) =>
//               `Card ${index + 1}: ${card.name} (${
//                 card.position
//               }): Dear ${name}, ${card.name} (${
//                 card.theme
//               }) suggests ${card.meaning.toLowerCase()} in your ${lifeStage} journey, influenced by your ${dayInfluence}. This card reflects your ${effectiveStarSign} energy.\n`
//           )
//           .join("") +
//         `Overall Advice: Dear ${name}, your Star Cards were drawn by weaving your numerology number ${nameValue}, ${effectiveStarSign} star sign, ${lifeStage} phase, and ${dayInfluence} (${dayDescription}). Each card reflects how your name’s vibration, age, and cosmic day align with your ${effectiveStarSign} traits to guide your path. Trust your ${effectiveStarSign} intuition and numerology number ${nameValue} to embrace your journey with confidence, letting ${dayInfluence} inspire your actions. This phase calls you to act boldly, aligning with your cosmic energies for a radiant future.`;
//       console.log("Fallback Reading Generated:", responseText);
//     }

//     return NextResponse.json({ reading: responseText });
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       { error: `Server error: ${err.message}` },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import OpenAI from "openai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const spreadConfig = {
//   single: { name: "Single Card Draw", positions: ["Insight"] },
//   duality: { name: "Duality Spread", positions: ["Option 1", "Option 2"] },
//   "past-present-future": {
//     name: "Past-Present-Future",
//     positions: ["Past", "Present", "Future"],
//   },
//   elemental: {
//     name: "Elemental Spread",
//     positions: ["Earth", "Air", "Fire", "Water"],
//   },
//   "cross-of-truth": {
//     name: "Cross of Truth",
//     positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
//   },
//   relationship: {
//     name: "Relationship Spread",
//     positions: [
//       "You",
//       "Other",
//       "Relationship",
//       "Strengths",
//       "Challenges",
//       "Future",
//     ],
//   },
//   horseshoe: {
//     name: "Horseshoe Spread",
//     positions: [
//       "Past",
//       "Present",
//       "Future",
//       "Influences",
//       "Obstacles",
//       "Advice",
//       "Outcome",
//     ],
//   },
//   "celtic-cross": {
//     name: "Celtic Cross",
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
//   },
//   zodiac: {
//     name: "Zodiac Spread",
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
//   },
//   "year-ahead": {
//     name: "Year Ahead Spread",
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
//   },
// };

// const validThemes = [
//   "Destiny",
//   "Emotion",
//   "Mind",
//   "Body",
//   "Shadow",
//   "Light",
//   "Past Life",
//   "Cosmos",
//   "Relationships",
//   "Transition",
// ];

// function getZodiacSign(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [year, month, day] = birthday.split("-").map(Number);
//   if (!month || !day || isNaN(month) || isNaN(day)) return null;
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

// function calculateAge(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const [birthYear, birthMonth, birthDay] = birthday.split("-").map(Number);
//   const today = new Date();
//   const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();
//   if (
//     monthDiff < 0 ||
//     (monthDiff === 0 && today.getDate() < birthDate.getDate())
//   ) {
//     age--;
//   }
//   return age;
// }

// function getBirthDayInfo(birthday) {
//   if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//   const date = new Date(birthday);
//   const dayIndex = date.getDay();
//   const days = [
//     {
//       name: "Day of the Luminance",
//       description: "Radiates warmth and divine inspiration",
//     },
//     {
//       name: "Day of the Vortex",
//       description: "Swirls with transformative energy and insight",
//     },
//     {
//       name: "Day of the Flame",
//       description: "Ignites courage and bold action",
//     },
//     {
//       name: "Day of the Whisper",
//       description: "Carries intuitive messages from the cosmos",
//     },
//     {
//       name: "Day of the Horizon",
//       description: "Expands vision and boundless potential",
//     },
//     {
//       name: "Day of the Blossom",
//       description: "Blooms with love and creative harmony",
//     },
//     {
//       name: "Day of the Anchor",
//       description: "Grounds with strength and timeless wisdom",
//     },
//   ];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const [year, month, day] = birthday.split("-").map(Number);
//   const formattedDate = `${months[month - 1]} ${day}, ${year}`;
//   return { ...days[dayIndex], formattedDate };
// }

// export async function POST(request) {
//   try {
//     const {
//       cards,
//       name,
//       birthday,
//       model = "gemini",
//       spread = "single",
//     } = await request.json();
//     console.log("API Request Received:", {
//       cards,
//       name,
//       birthday,
//       model,
//       spread,
//     });

//     const effectiveStarSign = birthday ? getZodiacSign(birthday) : null;
//     const age = calculateAge(birthday);
//     const birthDayInfo = birthday ? getBirthDayInfo(birthday) : null;

//     if (!cards || !Array.isArray(cards) || cards.length === 0) {
//       console.error("Invalid cards input:", cards);
//       return NextResponse.json(
//         { error: "Cards array is required and must not be empty" },
//         { status: 400 }
//       );
//     }

//     if (!name || typeof name !== "string" || name.trim().length === 0) {
//       console.error("Invalid name input:", name);
//       return NextResponse.json(
//         { error: "Name is required and must be a non-empty string" },
//         { status: 400 }
//       );
//     }

//     if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
//       console.error("Invalid birthday input:", birthday);
//       return NextResponse.json(
//         { error: "Birthday is required in YYYY-MM-DD format" },
//         { status: 400 }
//       );
//     }

//     if (!effectiveStarSign) {
//       console.error("Invalid starSign derived from birthday:", birthday);
//       return NextResponse.json(
//         { error: "Unable to determine star sign from birthday" },
//         { status: 400 }
//       );
//     }

//     if (!age || age <= 0) {
//       console.error("Invalid age calculated from birthday:", birthday);
//       return NextResponse.json(
//         { error: "Invalid age derived from birthday" },
//         { status: 400 }
//       );
//     }

//     for (const card of cards) {
//       if (!card.name || !card.theme || !card.meaning || !card.position) {
//         console.error("Invalid card data:", card);
//         return NextResponse.json(
//           { error: "Each card must have name, theme, meaning, and position" },
//           { status: 400 }
//         );
//       }
//       if (!validThemes.includes(card.theme)) {
//         console.error("Invalid card theme:", card.theme);
//         return NextResponse.json(
//           { error: `Card theme must be one of: ${validThemes.join(", ")}` },
//           { status: 400 }
//         );
//       }
//     }

//     const spreadInfo = spreadConfig[spread] || spreadConfig["single"];
//     const positions = spreadInfo.positions.slice(0, cards.length);

//     if (positions.length < cards.length) {
//       console.error("Not enough positions for cards:", {
//         spread,
//         positions,
//         cards,
//       });
//       return NextResponse.json(
//         {
//           error: `Spread ${spread} does not have enough positions for ${cards.length} cards`,
//         },
//         { status: 400 }
//       );
//     }

//     const nameValue =
//       name
//         .toLowerCase()
//         .split("")
//         .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;
//     const lifeStage =
//       age < 30 ? "young adult" : age < 50 ? "mid-life" : "mature";
//     const dayInfluence = birthDayInfo
//       ? birthDayInfo.name
//       : "unknown cosmic day";
//     const dayDescription = birthDayInfo
//       ? birthDayInfo.description
//       : "a unique cosmic influence";

//     const prompt = `
// You are a mystical Star Card reader, interpreting a deck of 100 cards across 10 themes: Destiny, Emotion, Mind, Body, Shadow, Light, Past Life, Cosmos, Relationships, Transition. Your task is to create a poetic, family-friendly Star Card reading for a ${
//       spreadInfo.name
//     } spread with ${cards.length} card${
//       cards.length > 1 ? "s" : ""
//     }, starting with a personal influences section, followed by separate interpretations for each card, and concluding with an extended overall advice section that emphasizes the cards drawn and their meanings.

// User details:
// - Name: ${name}
// - Birth Date: ${birthday} (born on the ${dayInfluence}, which ${dayDescription})
// - Age: ${age} (${lifeStage})
// - Star Sign: ${effectiveStarSign}
// - Numerology Number: ${nameValue}

// The cards drawn are:
// ${cards
//   .map(
//     (card, index) =>
//       `${index + 1}. ${card.name} (Theme: ${card.theme}, Position: ${
//         positions[index] || "Unknown"
//       }, Meaning: ${card.meaning})`
//   )
//   .join("\n")}

// Instructions:
// 1. Start with a "Personal Influences:" section (2-3 sentences) that introduces the user's numerology number (${nameValue}), star sign (${effectiveStarSign}), life stage (${lifeStage}), and day of birth (${dayInfluence}), explaining how these shape the reading's tone and focus.
// 2. For each card, provide a 2-3 sentence interpretation labeled as "Card X: [Card Name] ([Position]):", addressing the user as "${name}" and tying the card's meaning to their life stage, star sign traits (e.g., Aries: bold action, Pisces: intuitive dreams), numerology number, and day of birth influence where relevant. Interpretations should be positive and uplifting, even for challenging meanings, emphasizing growth and opportunity.
// 3. Conclude with an extended "Overall Advice:" section (6-8 sentences) labeled "Overall Advice:". Explicitly state the cards drawn (e.g., "Your cards—[Card1] in [Position1], [Card2] in [Position2], ..."). Provide detailed, positive guidance focusing on how each card’s meaning and position in the ${
//       spreadInfo.name
//     } spread shapes the user’s path, including actionable steps and affirmations (e.g., "You are capable of overcoming any challenge with grace"). If a card suggests challenges, reframe it positively with affirmations to inspire resilience. Briefly (1-2 sentences) explain how the cards were selected based on the user’s name (numerology number ${nameValue}), age (${lifeStage}), star sign (${effectiveStarSign}), and day of birth (${dayInfluence}), and how these align with the reading. Ensure the advice is cohesive, forward-looking, and emphasizes the cards’ roles.
// 4. Use plain text headers exactly as specified (e.g., "Personal Influences:", "Card 1: [Name] ([Position]):", "Overall Advice:") without Markdown symbols like #, ##, **, or *.
// 5. Do not include the theme name in the section headers; include it in the body of each card’s interpretation if relevant.
// 6. Keep the tone poetic, mystical, and positive, avoiding negative predictions.
// 7. Ensure the overall advice names each card, describes its significance in the spread, and provides affirmations, with a brief note on how the user’s cosmic profile influenced the reading.

// Example for a 3-card Past-Present-Future spread:
// Personal Influences: Dear Emma, your numerology number 5, derived from your name, emphasizes transformation, while your Piscean star sign and Day of the Whisper infuse intuitive messages into your young adult journey. These energies shape a reading focused on growth and emotional clarity.
// Card 1: Cycle of Fire (Past): Dear Emma, in your past, Cycle of Fire ignited your Piscean intuition with its Destiny theme, sparking growth through bold changes. Your Day of the Whisper amplified this transformative energy, guiding you forward.
// Card 2: Suppressed Joy (Present): Currently, Suppressed Joy suggests hidden happiness ready to bloom, dear Emma, with its Emotion theme reflecting your numerology number 5. Your Piscean dreams encourage you to embrace this joy with open-hearted courage.
// Card 3: Phoenix Rise (Future): Looking ahead, Phoenix Rise foretells a radiant rebirth, dear Emma, its Transition theme aligning with your Day of the Whisper’s intuitive messages. Your inner strength will shine, guiding you to new horizons.
// Overall Advice: Dear Emma, your cards—Cycle of Fire in the Past, Suppressed Joy in the Present, and Phoenix Rise in the Future—weave a journey of transformation in this Past-Present-Future spread. Cycle of Fire reflects past growth that built your resilience, while Suppressed Joy urges you to uncover happiness now, affirming that you are worthy of boundless joy. Phoenix Rise promises a bright future, encouraging you to embrace change with confidence, as you are destined for greatness. Together, these cards guide you to trust your intuition and take bold steps forward. Your numerology number 5 and Piscean star sign, amplified by your Day of the Whisper, drew these cards to highlight your transformative path. Embrace this moment, Emma, knowing you are capable of creating a radiant future.

// Generate the reading now, ensuring the personal influences section, each card’s section, and the extended overall advice are clearly separated, using the exact header formats specified.
// `;

//     console.log("Prompt Sent to AI:", prompt);

//     let responseText = "";
//     let attempts = 0;
//     const maxAttempts = 3;

//     if (model === "gemini") {
//       const geminiModel = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         generationConfig: { maxOutputTokens: 2000 },
//       });
//       while (attempts < maxAttempts) {
//         try {
//           const result = await geminiModel.generateContent(prompt);
//           responseText = result.response.text();
//           console.log(`Gemini Attempt ${attempts + 1} Response:`, responseText);
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (
//             !responseText.includes("Overall Advice:") ||
//             !responseText.includes("Personal Influences:")
//           ) {
//             console.warn("Required sections missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`Gemini Attempt ${attempts + 1} Error: ${err}`);
//           attempts++;
//         }
//       }
//     } else if (model === "openrouter") {
//       while (attempts < maxAttempts) {
//         try {
//           const completion = await openai.chat.completions.create({
//             model: "openai/gpt-4o-mini",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 2000,
//           });
//           responseText = completion.choices[0].message.content;
//           console.log(
//             `OpenRouter Attempt ${attempts + 1} Response:`,
//             responseText
//           );
//           if (!cards.every((card) => responseText.includes(card.name))) {
//             console.warn("Some card names missing in response:", responseText);
//           }
//           if (
//             !responseText.includes("Overall Advice:") ||
//             !responseText.includes("Personal Influences:")
//           ) {
//             console.warn("Required sections missing:", responseText);
//           }
//           break;
//         } catch (err) {
//           console.error(`OpenRouter Attempt ${attempts + 1} Error: ${err}`);
//           attempts++;
//         }
//       }
//     } else {
//       console.error("Invalid model:", model);
//       return NextResponse.json(
//         { error: "Invalid model selected" },
//         { status: 400 }
//       );
//     }

//     if (!responseText || attempts >= maxAttempts) {
//       console.error("Failed to generate reading after attempts:", { attempts });
//       responseText =
//         `Personal Influences: Dear ${name}, your numerology number ${nameValue}, ${effectiveStarSign} star sign, and ${dayInfluence} shape your ${lifeStage} journey with transformative energy.\n` +
//         cards
//           .map(
//             (card, index) =>
//               `Card ${index + 1}: ${card.name} (${
//                 card.position
//               }): Dear ${name}, ${card.name} (${
//                 card.theme
//               }) suggests ${card.meaning.toLowerCase()} in your ${lifeStage} journey, influenced by your ${dayInfluence}. This card reflects your ${effectiveStarSign} energy, guiding you toward growth.\n`
//           )
//           .join("") +
//         `Overall Advice: Dear ${name}, your cards—${cards
//           .map((c, i) => `${c.name} in ${positions[i]}`)
//           .join(", ")}—illuminate your path in this ${
//           spreadInfo.name
//         } spread. Each card offers unique guidance, encouraging you to embrace opportunities with courage, as you are destined for greatness. Even if challenges arise, know that you possess the strength to overcome them with grace. Take bold steps forward, trusting your inner wisdom. Your numerology number ${nameValue} and ${effectiveStarSign} star sign, guided by ${dayInfluence}, selected these cards to reflect your journey. You are capable of creating a radiant future.\n`;
//       console.log("Fallback Reading Generated:", responseText);
//     }

//     return NextResponse.json({ reading: responseText });
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       { error: `Server error: ${err.message}` },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const spreadConfig = {
  single: { name: "Single Card Draw", positions: ["Insight"] },
  duality: { name: "Duality Spread", positions: ["Option 1", "Option 2"] },
  "past-present-future": {
    name: "Past-Present-Future",
    positions: ["Past", "Present", "Future"],
  },
  elemental: {
    name: "Elemental Spread",
    positions: ["Earth", "Air", "Fire", "Water"],
  },
  "cross-of-truth": {
    name: "Cross of Truth",
    positions: ["Situation", "Challenge", "Advice", "Outcome", "Core"],
  },
  relationship: {
    name: "Relationship Spread",
    positions: [
      "You",
      "Other",
      "Relationship",
      "Strengths",
      "Challenges",
      "Future",
    ],
  },
  horseshoe: {
    name: "Horseshoe Spread",
    positions: [
      "Past",
      "Present",
      "Future",
      "Influences",
      "Obstacles",
      "Advice",
      "Outcome",
    ],
  },
  "celtic-cross": {
    name: "Celtic Cross",
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
  },
  zodiac: {
    name: "Zodiac Spread",
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
  },
  "year-ahead": {
    name: "Year Ahead Spread",
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
  },
};

const validThemes = [
  "Destiny",
  "Emotion",
  "Mind",
  "Body",
  "Shadow",
  "Light",
  "Past Life",
  "Cosmos",
  "Relationships",
  "Transition",
];

// Enhanced zodiac trait descriptions for more personalized advice
const zodiacTraits = {
  Aries: {
    strengths: [
      "natural leadership",
      "courage",
      "pioneering spirit",
      "enthusiasm",
    ],
    challenges: ["impatience", "impulsiveness"],
    lifeAdvice: "channel your fiery energy into focused action",
    currentPhase: "embrace new beginnings with characteristic Aries boldness",
  },
  Taurus: {
    strengths: [
      "determination",
      "reliability",
      "patience",
      "appreciation for beauty",
    ],
    challenges: ["stubbornness", "resistance to change"],
    lifeAdvice: "use your steady nature to build lasting foundations",
    currentPhase:
      "trust your Taurus instinct for creating stability and abundance",
  },
  Gemini: {
    strengths: ["adaptability", "communication", "curiosity", "versatility"],
    challenges: ["inconsistency", "scattered energy"],
    lifeAdvice: "focus your diverse interests into meaningful connections",
    currentPhase: "embrace your Gemini gift for seeing multiple perspectives",
  },
  Cancer: {
    strengths: ["intuition", "nurturing nature", "emotional depth", "loyalty"],
    challenges: ["moodiness", "over-sensitivity"],
    lifeAdvice:
      "trust your intuitive wisdom while maintaining healthy boundaries",
    currentPhase: "honor your Cancer need for emotional security and home",
  },
  Leo: {
    strengths: ["confidence", "creativity", "generosity", "natural magnetism"],
    challenges: ["ego", "need for attention"],
    lifeAdvice: "shine your light while lifting others up",
    currentPhase: "step into your Leo power with heart-centered leadership",
  },
  Virgo: {
    strengths: [
      "attention to detail",
      "analytical mind",
      "helpfulness",
      "practicality",
    ],
    challenges: ["perfectionism", "worry"],
    lifeAdvice: "use your discerning nature to create meaningful improvements",
    currentPhase: "trust your Virgo ability to see what needs healing",
  },
  Libra: {
    strengths: ["diplomacy", "sense of justice", "charm", "aesthetic sense"],
    challenges: ["indecisiveness", "people-pleasing"],
    lifeAdvice: "seek balance while honoring your authentic voice",
    currentPhase: "embrace your Libra gift for creating harmony and beauty",
  },
  Scorpio: {
    strengths: ["intensity", "transformation", "intuition", "depth"],
    challenges: ["jealousy", "controlling tendencies"],
    lifeAdvice: "embrace transformation while releasing what no longer serves",
    currentPhase: "trust your Scorpio power for profound personal renewal",
  },
  Sagittarius: {
    strengths: ["optimism", "adventure", "philosophical mind", "honesty"],
    challenges: ["restlessness", "tactlessness"],
    lifeAdvice: "expand your horizons while staying grounded in wisdom",
    currentPhase: "follow your Sagittarius calling for growth and exploration",
  },
  Capricorn: {
    strengths: ["ambition", "discipline", "responsibility", "practical wisdom"],
    challenges: ["pessimism", "workaholism"],
    lifeAdvice: "build your legacy while remembering to enjoy the journey",
    currentPhase: "trust your Capricorn ability to create lasting success",
  },
  Aquarius: {
    strengths: [
      "innovation",
      "humanitarian spirit",
      "independence",
      "originality",
    ],
    challenges: ["detachment", "rebelliousness"],
    lifeAdvice: "champion your ideals while staying connected to your heart",
    currentPhase: "embrace your Aquarius vision for a better world",
  },
  Pisces: {
    strengths: [
      "compassion",
      "creativity",
      "intuition",
      "spiritual connection",
    ],
    challenges: ["escapism", "over-sensitivity"],
    lifeAdvice: "honor your sensitivity while maintaining healthy boundaries",
    currentPhase: "trust your Pisces connection to the divine flow of life",
  },
};

// Life stage specific guidance
const lifeStageGuidance = {
  "young adult": {
    focus: "identity formation and foundation building",
    challenges: "finding direction and establishing independence",
    opportunities: "limitless potential and fresh perspectives",
    advice: "embrace experimentation while building solid foundations",
  },
  "mid-life": {
    focus: "mastery and meaningful contribution",
    challenges: "balancing responsibilities and personal growth",
    opportunities: "deep wisdom and established skills",
    advice: "integrate your experience with continued growth",
  },
  mature: {
    focus: "wisdom sharing and legacy creation",
    challenges: "accepting change and maintaining vitality",
    opportunities: "profound insight and spiritual connection",
    advice: "embrace your role as wisdom keeper and guide",
  },
};

function getZodiacSign(birthday) {
  if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
  const [year, month, day] = birthday.split("-").map(Number);
  if (!month || !day || isNaN(month) || isNaN(day)) return null;
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius";
  return "Pisces";
}

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

function getBirthDayInfo(birthday) {
  if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
  const date = new Date(birthday);
  const dayIndex = date.getDay();
  const days = [
    {
      name: "Day of the Luminance",
      description: "Radiates warmth and divine inspiration",
    },
    {
      name: "Day of the Vortex",
      description: "Swirls with transformative energy and insight",
    },
    {
      name: "Day of the Flame",
      description: "Ignites courage and bold action",
    },
    {
      name: "Day of the Whisper",
      description: "Carries intuitive messages from the cosmos",
    },
    {
      name: "Day of the Horizon",
      description: "Expands vision and boundless potential",
    },
    {
      name: "Day of the Blossom",
      description: "Blooms with love and creative harmony",
    },
    {
      name: "Day of the Anchor",
      description: "Grounds with strength and timeless wisdom",
    },
  ];
  const months = [
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
  ];
  const [year, month, day] = birthday.split("-").map(Number);
  const formattedDate = `${months[month - 1]} ${day}, ${year}`;
  return { ...days[dayIndex], formattedDate };
}

// Enhanced prompt creation function
function createEnhancedPrompt(userDetails, cards, positions, spreadInfo) {
  const {
    name,
    birthday,
    age,
    effectiveStarSign,
    nameValue,
    lifeStage,
    dayInfluence,
    dayDescription,
  } = userDetails;
  const zodiacInfo = zodiacTraits[effectiveStarSign] || {};
  const lifeStageInfo = lifeStageGuidance[lifeStage] || {};

  return `
You are a mystical Star Card reader, interpreting a deck of 100 cards across 10 themes: Destiny, Emotion, Mind, Body, Shadow, Light, Past Life, Cosmos, Relationships, Transition. Your task is to create a poetic, family-friendly Star Card reading for a ${
    spreadInfo.name
  } spread with ${cards.length} card${
    cards.length > 1 ? "s" : ""
  }, starting with a personal influences section, followed by separate interpretations for each card, and concluding with an extensively detailed overall advice section.

User details:
- Name: ${name}
- Birth Date: ${birthday} (born on the ${dayInfluence}, which ${dayDescription})
- Age: ${age} (${lifeStage})
- Star Sign: ${effectiveStarSign}
- Numerology Number: ${nameValue}
- Zodiac Strengths: ${zodiacInfo.strengths?.join(", ") || "cosmic wisdom"}
- Life Stage Focus: ${lifeStageInfo.focus || "personal growth"}

The cards drawn are:
${cards
  .map(
    (card, index) =>
      `${index + 1}. ${card.name} (Theme: ${card.theme}, Position: ${
        positions[index] || "Unknown"
      }, Meaning: ${card.meaning})`
  )
  .join("\n")}

Instructions:
1. Start with a "Personal Influences:" section (2-3 sentences) that introduces the user's numerology number (${nameValue}), star sign (${effectiveStarSign}), life stage (${lifeStage}), and day of birth (${dayInfluence}), explaining how these shape the reading's tone and focus.

2. For each card, provide a 2-3 sentence interpretation labeled as "Card X: [Card Name] ([Position]):", addressing the user as "${name}" and tying the card's meaning to their life stage, star sign traits, numerology number, and day of birth influence where relevant.

3. Conclude with an EXTENSIVELY DETAILED "Overall Advice:" section (15-20 sentences) structured as follows:

   **Card Acknowledgment & Cosmic Selection:** (3-4 sentences) Begin by explicitly naming all cards drawn: "Dear ${name}, the cosmos has selected ${cards
    .map((card, index) => `${card.name} in ${positions[index]}`)
    .join(", ")} for your ${
    spreadInfo.name
  } reading." Explain how your numerology number ${nameValue} (derived from "${name}"), your ${effectiveStarSign} star sign with its gifts of ${
    zodiacInfo.strengths?.slice(0, 2).join(" and ") || "wisdom"
  }, your ${age}-year journey as a ${lifeStage} soul focusing on ${
    lifeStageInfo.focus || "growth"
  }, and being born on the ${dayInfluence} influenced this specific card selection. Detail how these cosmic factors aligned to bring you exactly the guidance you need.
   
   **Individual Card Significance:** (4-5 sentences) Analyze each card's deeper meaning in relation to your personal cosmic profile. For each card, explain: "Your ${
     cards[0]?.name || "first card"
   } in ${
    positions[0] || "its position"
  } specifically speaks to your ${effectiveStarSign} nature of ${
    zodiacInfo.strengths?.[0] || "strength"
  } by addressing ${
    cards[0]?.meaning || "your path"
  }." Continue this pattern for each card, showing how the ${
    cards[0]?.theme || "theme"
  } energy particularly resonates with your current ${lifeStage} phase and ${age}-year experience.
   
   **Life Stage Integration:** (3-4 sentences) Address how the entire spread specifically serves your current age and life stage. As a ${lifeStage} individual at ${age}, you are naturally focused on ${
    lifeStageInfo.focus || "personal development"
  }, and these cards provide guidance for the ${
    lifeStageInfo.challenges || "challenges"
  } and ${
    lifeStageInfo.opportunities || "opportunities"
  } typical of this phase. Explain how each card's position in the ${
    spreadInfo.name
  } spread offers wisdom for navigating your current life chapter with ${
    zodiacInfo.strengths?.[0] || "strength"
  } and ${zodiacInfo.strengths?.[1] || "wisdom"}.
   
   **Zodiac-Specific Guidance:** (3-4 sentences) Provide detailed advice tailored to ${effectiveStarSign} traits and characteristics. Your ${effectiveStarSign} nature brings ${
    zodiacInfo.strengths?.join(", ") || "unique gifts"
  }, and the cards counsel you to ${
    zodiacInfo.lifeAdvice || "embrace your authentic path"
  }. Address how your star sign's natural tendencies interact with each card's message, and how to ${
    zodiacInfo.currentPhase || "move forward with confidence"
  }. Include specific guidance on balancing your ${effectiveStarSign} strengths while being mindful of potential ${
    zodiacInfo.challenges?.join(" or ") || "growth areas"
  }.
   
   **Empowering Affirmations & Action Steps:** (4-5 sentences) Conclude with specific, actionable guidance and powerful affirmations. Include phrases like "You are destined for ${
     cards[0]?.theme || "greatness"
   } as shown by your ${
    cards[0]?.name || "cards"
  }," "Your ${effectiveStarSign} ${
    zodiacInfo.strengths?.[0] || "strength"
  } combined with ${
    cards[0]?.theme || "cosmic"
  } energy means you can overcome any challenge with grace," and "Trust that your ${age} years of wisdom, guided by ${cards
    .map((c) => c.name)
    .join(
      ", "
    )}, will lead you to profound transformation and joy." Provide at least three specific action steps based on the card meanings and conclude with the affirmation that you are capable of creating extraordinary positive change in your life.

4. Use plain text headers exactly as specified without Markdown symbols like #, ##, **, or *.
5. Keep the tone poetic, mystical, and deeply personal while being positive and uplifting.
6. Ensure every sentence in the overall advice directly relates to either the specific cards drawn, the user's age, zodiac sign, or personal cosmic profile.
7. Make the advice feel like it was written specifically for this individual based on their unique combination of cards and personal details.
8. The overall advice should be comprehensive, addressing past influences, present opportunities, and future potential as revealed by the cards.

Generate the reading now with the extensively detailed overall advice section that truly personalizes the guidance to ${name}'s unique cosmic profile and card combination.
`;
}

export async function POST(request) {
  try {
    const {
      cards,
      name,
      birthday,
      model = "gemini",
      spread = "single",
    } = await request.json();
    console.log("API Request Received:", {
      cards,
      name,
      birthday,
      model,
      spread,
    });

    const effectiveStarSign = birthday ? getZodiacSign(birthday) : null;
    const age = calculateAge(birthday);
    const birthDayInfo = birthday ? getBirthDayInfo(birthday) : null;

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      console.error("Invalid cards input:", cards);
      return NextResponse.json(
        { error: "Cards array is required and must not be empty" },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      console.error("Invalid name input:", name);
      return NextResponse.json(
        { error: "Name is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
      console.error("Invalid birthday input:", birthday);
      return NextResponse.json(
        { error: "Birthday is required in YYYY-MM-DD format" },
        { status: 400 }
      );
    }

    if (!effectiveStarSign) {
      console.error("Invalid starSign derived from birthday:", birthday);
      return NextResponse.json(
        { error: "Unable to determine star sign from birthday" },
        { status: 400 }
      );
    }

    if (!age || age <= 0) {
      console.error("Invalid age calculated from birthday:", birthday);
      return NextResponse.json(
        { error: "Invalid age derived from birthday" },
        { status: 400 }
      );
    }

    for (const card of cards) {
      if (!card.name || !card.theme || !card.meaning || !card.position) {
        console.error("Invalid card data:", card);
        return NextResponse.json(
          { error: "Each card must have name, theme, meaning, and position" },
          { status: 400 }
        );
      }
      if (!validThemes.includes(card.theme)) {
        console.error("Invalid card theme:", card.theme);
        return NextResponse.json(
          { error: `Card theme must be one of: ${validThemes.join(", ")}` },
          { status: 400 }
        );
      }
    }

    const spreadInfo = spreadConfig[spread] || spreadConfig["single"];
    const positions = spreadInfo.positions.slice(0, cards.length);

    if (positions.length < cards.length) {
      console.error("Not enough positions for cards:", {
        spread,
        positions,
        cards,
      });
      return NextResponse.json(
        {
          error: `Spread ${spread} does not have enough positions for ${cards.length} cards`,
        },
        { status: 400 }
      );
    }

    const nameValue =
      name
        .toLowerCase()
        .split("")
        .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) % 10 || 1;
    const lifeStage =
      age < 30 ? "young adult" : age < 50 ? "mid-life" : "mature";
    const dayInfluence = birthDayInfo
      ? birthDayInfo.name
      : "unknown cosmic day";
    const dayDescription = birthDayInfo
      ? birthDayInfo.description
      : "a unique cosmic influence";

    const userDetails = {
      name,
      birthday,
      age,
      effectiveStarSign,
      nameValue,
      lifeStage,
      dayInfluence,
      dayDescription,
    };

    const prompt = createEnhancedPrompt(
      userDetails,
      cards,
      positions,
      spreadInfo
    );

    console.log("Enhanced Prompt Sent to AI:", prompt);

    let responseText = "";
    let attempts = 0;
    const maxAttempts = 3;

    if (model === "gemini") {
      const geminiModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { maxOutputTokens: 3000 }, // Increased for longer advice
      });
      while (attempts < maxAttempts) {
        try {
          const result = await geminiModel.generateContent(prompt);
          responseText = result.response.text();
          console.log(`Gemini Attempt ${attempts + 1} Response:`, responseText);
          if (!cards.every((card) => responseText.includes(card.name))) {
            console.warn("Some card names missing in response:", responseText);
          }
          if (
            !responseText.includes("Overall Advice:") ||
            !responseText.includes("Personal Influences:")
          ) {
            console.warn("Required sections missing:", responseText);
          }
          break;
        } catch (err) {
          console.error(`Gemini Attempt ${attempts + 1} Error: ${err}`);
          attempts++;
        }
      }
    } else if (model === "openrouter") {
      while (attempts < maxAttempts) {
        try {
          const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 3000, // Increased for longer advice
          });
          responseText = completion.choices[0].message.content;
          console.log(
            `OpenRouter Attempt ${attempts + 1} Response:`,
            responseText
          );
          if (!cards.every((card) => responseText.includes(card.name))) {
            console.warn("Some card names missing in response:", responseText);
          }
          if (
            !responseText.includes("Overall Advice:") ||
            !responseText.includes("Personal Influences:")
          ) {
            console.warn("Required sections missing:", responseText);
          }
          break;
        } catch (err) {
          console.error(`OpenRouter Attempt ${attempts + 1} Error: ${err}`);
          attempts++;
        }
      }
    } else {
      console.error("Invalid model:", model);
      return NextResponse.json(
        { error: "Invalid model selected" },
        { status: 400 }
      );
    }

    if (!responseText || attempts >= maxAttempts) {
      console.error("Failed to generate reading after attempts:", { attempts });

      // Enhanced fallback with detailed structure
      const zodiacInfo = zodiacTraits[effectiveStarSign] || {};
      const lifeStageInfo = lifeStageGuidance[lifeStage] || {};

      responseText =
        `Personal Influences: Dear ${name}, your numerology number ${nameValue}, ${effectiveStarSign} star sign with its gifts of ${
          zodiacInfo.strengths?.join(" and ") || "wisdom"
        }, and ${dayInfluence} shape your ${lifeStage} journey with transformative energy focused on ${
          lifeStageInfo.focus || "growth"
        }.\n\n` +
        cards
          .map(
            (card, index) =>
              `Card ${index + 1}: ${card.name} (${
                positions[index] || card.position
              }): Dear ${name}, ${card.name} from the ${
                card.theme
              } theme suggests ${card.meaning.toLowerCase()} in your ${lifeStage} journey at age ${age}. As a ${effectiveStarSign}, your natural ${
                zodiacInfo.strengths?.[0] || "strength"
              } amplifies this card's guidance, while your ${dayInfluence} enhances its transformative power. This positioning speaks directly to your current focus on ${
                lifeStageInfo.focus || "personal development"
              }.\n`
          )
          .join("") +
        `\nOverall Advice: Dear ${name}, the cosmos has selected ${cards
          .map((card, index) => `${card.name} in ${positions[index]}`)
          .join(", ")} for your ${
          spreadInfo.name
        } reading, drawn through the influence of your numerology number ${nameValue} from "${name}", your ${effectiveStarSign} star sign with its ${
          zodiacInfo.strengths?.join(" and ") || "cosmic gifts"
        }, your ${age}-year journey as a ${lifeStage} soul, and being born on the ${dayInfluence}. These cosmic factors aligned perfectly to bring you the exact guidance needed for your current life chapter. Your ${
          cards[0]?.name || "primary card"
        } in ${
          positions[0] || "its position"
        } specifically addresses your ${effectiveStarSign} nature of ${
          zodiacInfo.strengths?.[0] || "inner strength"
        }, while each subsequent card builds upon this foundation to create a comprehensive map of your path forward. As a ${lifeStage} individual at ${age}, you are naturally focused on ${
          lifeStageInfo.focus || "meaningful growth"
        }, and these cards provide wisdom for the ${
          lifeStageInfo.opportunities || "opportunities"
        } and gentle guidance through any ${
          lifeStageInfo.challenges || "transitions"
        } typical of this beautiful phase of life. Your ${effectiveStarSign} gifts of ${
          zodiacInfo.strengths?.join(", ") || "cosmic wisdom"
        } are perfectly positioned to help you ${
          zodiacInfo.lifeAdvice || "embrace your authentic path"
        }, and the cards counsel you to ${
          zodiacInfo.currentPhase || "move forward with confidence and grace"
        }. You are destined for profound ${
          cards[0]?.theme || "transformation"
        } as shown by your ${
          cards[0]?.name || "guiding card"
        }, and your ${effectiveStarSign} ${
          zodiacInfo.strengths?.[0] || "strength"
        } combined with the ${
          cards[0]?.theme || "cosmic"
        } energy means you can create extraordinary positive change with ease and joy. Trust that your ${age} years of wisdom, guided by the messages within ${cards
          .map((c) => c.name)
          .join(
            ", "
          )}, will lead you to a future filled with abundance, love, and meaningful purpose. You are capable of achieving anything you set your heart upon, dear ${name}, and the universe is conspiring in your favor to manifest your highest good.\n`;

      console.log("Enhanced Fallback Reading Generated:", responseText);
    }

    return NextResponse.json({ reading: responseText });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: `Server error: ${err.message}` },
      { status: 500 }
    );
  }
}
