


// "use client";

// import { useState, useEffect } from "react";

// export default function AIStarReading({
//     cards,
//     name,
//     birthDate,
//     model,
//     spread,
//     readingTrigger,
//     onError,
// }) {
//     const [readings, setReadings] = useState([]);
//     const [advice, setAdvice] = useState("");
//     const [error, setError] = useState(null);
//     const [numerologyIntro, setNumerologyIntro] = useState("");

//     useEffect(() => {
//         if (!cards || cards.length === 0 || readingTrigger === 0) return;

//         const fetchReading = async () => {
//             try {
//                 console.log("Fetching reading with trigger:", readingTrigger);
//                 const response = await fetch("/api/starcards", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         cards,
//                         name,
//                         birthday: birthDate,
//                         model,
//                         spread,
//                     }),
//                 });
//                 console.log("API Response Status:", response.status);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 console.log("API Response Data:", data);
//                 if (data.error) {
//                     throw new Error(data.error);
//                 }
//                 const readingText = data.reading || "";
//                 const sections = readingText.split(/(Personal Influences:|Card \d+: .*?\):|Overall Advice:)/i).filter(Boolean);
//                 console.log("Parsed Sections:", sections);

//                 const parsedReadings = [];
//                 let advice = "";
//                 let numerologyIntro = "";
//                 let currentHeader = null;

//                 for (const section of sections) {
//                     if (section.match(/Personal Influences:/i)) {
//                         currentHeader = section.trim();
//                     } else if (section.match(/Card \d+: .*?\):/i)) {
//                         currentHeader = section.trim();
//                     } else if (section.match(/Overall Advice:/i)) {
//                         currentHeader = section.trim();
//                     } else if (currentHeader) {
//                         if (currentHeader.match(/Personal Influences:/i)) {
//                             numerologyIntro = section.trim();
//                         } else if (currentHeader.match(/Card \d+: .*?\):/i)) {
//                             const themeMatch = cards.find((card) =>
//                                 currentHeader.includes(card.name)
//                             )?.theme;
//                             parsedReadings.push({
//                                 header: currentHeader,
//                                 content: section.trim(),
//                                 theme: themeMatch || "Unknown",
//                             });
//                         } else if (currentHeader === "Overall Advice:") {
//                             advice = section.trim();
//                         }
//                     }
//                 }

//                 console.log("Parsed Readings:", parsedReadings);
//                 console.log("Parsed Advice:", advice);
//                 console.log("Numerology Intro:", numerologyIntro);
//                 setReadings(parsedReadings);
//                 setAdvice(advice);
//                 setNumerologyIntro(numerologyIntro);
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching reading:", err);
//                 setError("Unable to generate reading at this time.");
//                 setReadings([]);
//                 setAdvice("");
//                 setNumerologyIntro("");
//                 onError?.(err.message);
//             }
//         };

//         fetchReading();
//     }, [cards, name, birthDate, model, spread, readingTrigger, onError]);

//     if (error) {
//         return <p className="text-red-400 text-lg">{error}</p>;
//     }

//     if (readings.length === 0 && !advice && !numerologyIntro) {
//         return <p className="text-gray-300">Generating your reading...</p>;
//     }

//     return (
//         <div className="mt-4 space-y-4 max-w-2xl">
//             {numerologyIntro && (
//                 <div className="p-4 bg-white/10 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">Personal Influences:</h3>
//                     <p>{numerologyIntro}</p>
//                 </div>
//             )}
//             {readings.map((reading, index) => (
//                 <div key={index} className="p-4 bg-white/10 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">{reading.header}</h3>
//                     <p className="text-sm text-purple-200">Theme: {reading.theme}</p>
//                     <p>{reading.content}</p>
//                 </div>
//             ))}
//             {advice && (
//                 <div className="p-4 bg-purple-900/20 border border-purple-500 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">Overall Advice:</h3>
//                     <p>{advice}</p>
//                 </div>
//             )}
//         </div>
//     );
// }




// "use client";

// import { useState, useEffect } from "react";

// export default function AIStarReading({
//     cards,
//     name,
//     birthDate,
//     model,
//     spread,
//     readingTrigger,
//     onError,
// }) {
//     const [readings, setReadings] = useState([]);
//     const [advice, setAdvice] = useState("");
//     const [error, setError] = useState(null);
//     const [numerologyIntro, setNumerologyIntro] = useState("");
//     const [adviceSections, setAdviceSections] = useState({});

//     useEffect(() => {
//         if (!cards || cards.length === 0 || readingTrigger === 0) return;

//         const fetchReading = async () => {
//             try {
//                 console.log("Fetching reading with trigger:", readingTrigger);
//                 const response = await fetch("/api/starcards", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         cards,
//                         name,
//                         birthday: birthDate,
//                         model,
//                         spread,
//                     }),
//                 });
//                 console.log("API Response Status:", response.status);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 console.log("API Response Data:", data);
//                 if (data.error) {
//                     throw new Error(data.error);
//                 }

//                 const readingText = data.reading || "";
//                 const sections = readingText.split(/(Personal Influences:|Card \d+: .*?\):|Overall Advice:)/i).filter(Boolean);
//                 console.log("Parsed Sections:", sections);

//                 const parsedReadings = [];
//                 let adviceText = "";
//                 let numerologyIntro = "";
//                 let currentHeader = null;

//                 for (const section of sections) {
//                     if (section.match(/Personal Influences:/i)) {
//                         currentHeader = section.trim();
//                     } else if (section.match(/Card \d+: .*?\):/i)) {
//                         currentHeader = section.trim();
//                     } else if (section.match(/Overall Advice:/i)) {
//                         currentHeader = section.trim();
//                     } else if (currentHeader) {
//                         if (currentHeader.match(/Personal Influences:/i)) {
//                             numerologyIntro = section.trim();
//                         } else if (currentHeader.match(/Card \d+: .*?\):/i)) {
//                             const themeMatch = cards.find((card) =>
//                                 currentHeader.includes(card.name)
//                             )?.theme;
//                             parsedReadings.push({
//                                 header: currentHeader,
//                                 content: section.trim(),
//                                 theme: themeMatch || "Unknown",
//                             });
//                         } else if (currentHeader === "Overall Advice:") {
//                             adviceText = section.trim();
//                         }
//                     }
//                 }

//                 // Parse adviceText into subsections
//                 const adviceSubsections = {
//                     cardAcknowledgment: "",
//                     individualCard: "",
//                     lifeStage: "",
//                     zodiacGuidance: "",
//                     affirmations: ""
//                 };

//                 // Split adviceText by sentences and assign to subsections based on content
//                 const sentences = adviceText.split(". ").map(s => s.trim() + ".");
//                 let currentSection = null;
//                 let cardAcknowledgmentSentences = [];
//                 let individualCardSentences = [];
//                 let lifeStageSentences = [];
//                 let zodiacGuidanceSentences = [];
//                 let affirmationsSentences = [];

//                 for (const sentence of sentences) {
//                     if (sentence.includes("the cosmos has selected") || sentence.includes("Dear " + name)) {
//                         currentSection = "cardAcknowledgment";
//                         cardAcknowledgmentSentences.push(sentence);
//                     } else if (cards.some(card => sentence.includes(card.name))) {
//                         currentSection = "individualCard";
//                         individualCardSentences.push(sentence);
//                     } else if (sentence.includes("life stage") || sentence.includes("individual at") || sentence.includes("you are naturally focused")) {
//                         currentSection = "lifeStage";
//                         lifeStageSentences.push(sentence);
//                     } else if (sentence.includes("Your " + (getZodiacSign(birthDate) || "")) || sentence.includes("star sign")) {
//                         currentSection = "zodiacGuidance";
//                         zodiacGuidanceSentences.push(sentence);
//                     } else if (sentence.includes("You are destined for") || sentence.includes("affirmation") || sentence.includes("action steps")) {
//                         currentSection = "affirmations";
//                         affirmationsSentences.push(sentence);
//                     } else if (currentSection) {
//                         // Continue adding to the current section if no new section is detected
//                         if (currentSection === "cardAcknowledgment") cardAcknowledgmentSentences.push(sentence);
//                         if (currentSection === "individualCard") individualCardSentences.push(sentence);
//                         if (currentSection === "lifeStage") lifeStageSentences.push(sentence);
//                         if (currentSection === "zodiacGuidance") zodiacGuidanceSentences.push(sentence);
//                         if (currentSection === "affirmations") affirmationsSentences.push(sentence);
//                     }
//                 }

//                 adviceSubsections.cardAcknowledgment = cardAcknowledgmentSentences.join(" ");
//                 adviceSubsections.individualCard = individualCardSentences.join(" ");
//                 adviceSubsections.lifeStage = lifeStageSentences.join(" ");
//                 adviceSubsections.zodiacGuidance = zodiacGuidanceSentences.join(" ");
//                 adviceSubsections.affirmations = affirmationsSentences.join(" ");

//                 console.log("Parsed Readings:", parsedReadings);
//                 console.log("Parsed Advice Sections:", adviceSubsections);
//                 console.log("Numerology Intro:", numerologyIntro);

//                 setReadings(parsedReadings);
//                 setAdviceSections(adviceSubsections);
//                 setNumerologyIntro(numerologyIntro);
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching reading:", err);
//                 setError("Unable to generate reading at this time.");
//                 setReadings([]);
//                 setAdviceSections({});
//                 setNumerologyIntro("");
//                 onError?.(err.message);
//             }
//         };

//         fetchReading();
//     }, [cards, name, birthDate, model, spread, readingTrigger, onError]);

//     // Helper function to get zodiac sign (replicated from api route to avoid import issues)
//     function getZodiacSign(birthday) {
//         if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//         const [year, month, day] = birthday.split("-").map(Number);
//         if (!month || !day || isNaN(month) || isNaN(day)) return null;
//         if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
//         if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
//         if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
//         if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
//         if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
//         if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
//         if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
//         if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
//         if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
//         if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
//         if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
//         return "Pisces";
//     }

//     if (error) {
//         return <p className="text-red-400 text-lg">{error}</p>;
//     }

//     if (readings.length === 0 && !advice && !numerologyIntro) {
//         return <p className="text-gray-300">Generating your reading...</p>;
//     }

//     return (
//         <div className="mt-4 space-y-4 max-w-2xl">
//             {numerologyIntro && (
//                 <div className="p-4 bg-white/10 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">Personal Influences:</h3>
//                     <p>{numerologyIntro}</p>
//                 </div>
//             )}
//             {readings.map((reading, index) => (
//                 <div key={index} className="p-4 bg-white/10 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">{reading.header}</h3>
//                     <p className="text-sm text-purple-200">Theme: {reading.theme}</p>
//                     <p>{reading.content}</p>
//                 </div>
//             ))}
//             {Object.keys(adviceSections).length > 0 && (
//                 <div className="p-4 bg-purple-900/20 border border-purple-500 rounded-lg text-white space-y-4">
//                     <h3 className="text-lg font-semibold">Overall Advice:</h3>
//                     {adviceSections.cardAcknowledgment && (
//                         <div>
//                             <h4 className="text-md font-semibold text-yellow-300">Cosmic Selection</h4>
//                             <p>{adviceSections.cardAcknowledgment}</p>
//                         </div>
//                     )}
//                     {adviceSections.individualCard && (
//                         <div>
//                             <h4 className="text-md font-semibold text-yellow-300">Individual Card Insights</h4>
//                             <p>{adviceSections.individualCard}</p>
//                         </div>
//                     )}
//                     {adviceSections.lifeStage && (
//                         <div>
//                             <h4 className="text-md font-semibold text-yellow-300">Life Stage Guidance</h4>
//                             <p>{adviceSections.lifeStage}</p>
//                         </div>
//                     )}
//                     {adviceSections.zodiacGuidance && (
//                         <div>
//                             <h4 className="text-md font-semibold text-yellow-300">Zodiac-Specific Wisdom</h4>
//                             <p>{adviceSections.zodiacGuidance}</p>
//                         </div>
//                     )}
//                     {adviceSections.affirmations && (
//                         <div>
//                             <h4 className="text-md font-semibold text-yellow-300">Empowering Actions and Affirmations</h4>
//                             <p>{adviceSections.affirmations}</p>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }



// "use client";

// import { useState, useEffect } from "react";

// export default function AIStarReading({
//     cards,
//     name,
//     birthDate,
//     model,
//     spread,
//     readingTrigger,
//     onError,
// }) {
//     const [readings, setReadings] = useState([]);
//     const [advice, setAdvice] = useState("");
//     const [error, setError] = useState(null);
//     const [numerologyIntro, setNumerologyIntro] = useState("");
//     const [adviceSections, setAdviceSections] = useState({});

//     useEffect(() => {
//         if (!cards || cards.length === 0 || readingTrigger === 0) return;

//         const fetchReading = async () => {
//             try {
//                 console.log("Fetching reading with trigger:", readingTrigger);
//                 const response = await fetch("/api/starcards", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         cards,
//                         name,
//                         birthday: birthDate,
//                         model,
//                         spread,
//                     }),
//                 });
//                 console.log("API Response Status:", response.status);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 console.log("API Response Data:", data);
//                 if (data.error) {
//                     throw new Error(data.error);
//                 }

//                 const readingText = data.reading || "";
//                 const sections = readingText.split(/(Personal Influences:|Card \d+: .*?\):|Overall Advice:)/i).filter(Boolean);
//                 console.log("Parsed Sections:", sections);

//                 const parsedReadings = [];
//                 let adviceText = "";
//                 let numerologyIntro = "";
//                 let currentHeader = null;

//                 for (const section of sections) {
//                     if (section.match(/Personal Influences:/i)) {
//                         currentHeader = section.trim();
//                     } else if (section.match(/Card \d+: .*?\):/i)) {
//                         currentHeader = section.trim();
//                     } else if (section.match(/Overall Advice:/i)) {
//                         currentHeader = section.trim();
//                     } else if (currentHeader) {
//                         if (currentHeader.match(/Personal Influences:/i)) {
//                             numerologyIntro = section.trim();
//                         } else if (currentHeader.match(/Card \d+: .*?\):/i)) {
//                             const themeMatch = cards.find((card) =>
//                                 currentHeader.includes(card.name)
//                             )?.theme;
//                             parsedReadings.push({
//                                 header: currentHeader,
//                                 content: section.trim(),
//                                 theme: themeMatch || "Unknown",
//                             });
//                         } else if (currentHeader === "Overall Advice:") {
//                             adviceText = section.trim();
//                         }
//                     }
//                 }

//                 // Parse adviceText into subsections
//                 const adviceSubsections = {
//                     cardAcknowledgment: "",
//                     individualCard: [],
//                     lifeStage: "",
//                     zodiacGuidance: "",
//                     affirmations: ""
//                 };

//                 // Split adviceText by sentences and assign to subsections
//                 const sentences = adviceText.split(". ").map(s => s.trim() + ".");
//                 let currentSection = null;
//                 let cardAcknowledgmentSentences = [];
//                 let individualCardSentences = [];
//                 let lifeStageSentences = [];
//                 let zodiacGuidanceSentences = [];
//                 let affirmationsSentences = [];

//                 // Track sentences for each card
//                 const cardSentences = cards.map(() => []);
//                 let currentCardIndex = -1;

//                 for (const sentence of sentences) {
//                     if (sentence.includes("the cosmos has selected") || sentence.includes("Dear " + name)) {
//                         currentSection = "cardAcknowledgment";
//                         cardAcknowledgmentSentences.push(sentence);
//                     } else if (cards.some((card, index) => {
//                         if (sentence.includes(card.name)) {
//                             currentCardIndex = index;
//                             return true;
//                         }
//                         return false;
//                     })) {
//                         currentSection = "individualCard";
//                         if (currentCardIndex >= 0) {
//                             cardSentences[currentCardIndex].push(sentence);
//                         }
//                     } else if (sentence.includes("life stage") || sentence.includes("individual at") || sentence.includes("you are naturally focused")) {
//                         currentSection = "lifeStage";
//                         lifeStageSentences.push(sentence);
//                     } else if (sentence.includes("Your " + (getZodiacSign(birthDate) || "")) || sentence.includes("star sign")) {
//                         currentSection = "zodiacGuidance";
//                         zodiacGuidanceSentences.push(sentence);
//                     } else if (sentence.includes("You are destined for") || sentence.includes("affirmation") || sentence.includes("action steps")) {
//                         currentSection = "affirmations";
//                         affirmationsSentences.push(sentence);
//                     } else if (currentSection) {
//                         // Continue adding to the current section
//                         if (currentSection === "cardAcknowledgment") cardAcknowledgmentSentences.push(sentence);
//                         if (currentSection === "individualCard" && currentCardIndex >= 0) cardSentences[currentCardIndex].push(sentence);
//                         if (currentSection === "lifeStage") lifeStageSentences.push(sentence);
//                         if (currentSection === "zodiacGuidance") zodiacGuidanceSentences.push(sentence);
//                         if (currentSection === "affirmations") affirmationsSentences.push(sentence);
//                     }
//                 }

//                 adviceSubsections.cardAcknowledgment = cardAcknowledgmentSentences.join(" ");
//                 adviceSubsections.individualCard = cardSentences.map(sentences => sentences.join(" "));
//                 adviceSubsections.lifeStage = lifeStageSentences.join(" ");
//                 adviceSubsections.zodiacGuidance = zodiacGuidanceSentences.join(" ");
//                 adviceSubsections.affirmations = affirmationsSentences.join(" ");

//                 console.log("Parsed Readings:", parsedReadings);
//                 console.log("Parsed Advice Sections:", adviceSubsections);
//                 console.log("Numerology Intro:", numerologyIntro);

//                 setReadings(parsedReadings);
//                 setAdviceSections(adviceSubsections);
//                 setNumerologyIntro(numerologyIntro);
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching reading:", err);
//                 setError("Unable to generate reading at this time.");
//                 setReadings([]);
//                 setAdviceSections({});
//                 setNumerologyIntro("");
//                 onError?.(err.message);
//             }
//         };

//         fetchReading();
//     }, [cards, name, birthDate, model, spread, readingTrigger, onError]);

//     // Helper function to get zodiac sign
//     function getZodiacSign(birthday) {
//         if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
//         const [year, month, day] = birthday.split("-").map(Number);
//         if (!month || !day || isNaN(month) || isNaN(day)) return null;
//         if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
//         if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
//         if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
//         if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
//         if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
//         if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
//         if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
//         if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
//         if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
//         if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
//         if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
//         return "Pisces";
//     }

//     if (error) {
//         return <p className="text-red-400 text-lg">{error}</p>;
//     }

//     if (readings.length === 0 && !advice && !numerologyIntro) {
//         return <p className="text-gray-300">Generating your reading...</p>;
//     }

//     return (
//         <div className="mt-4 space-y-4 max-w-2xl">
//             {numerologyIntro && (
//                 <div className="p-4 bg-white/10 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">Personal Influences:</h3>
//                     <p>{numerologyIntro}</p>
//                 </div>
//             )}
//             {readings.map((reading, index) => (
//                 <div key={index} className="p-4 bg-white/10 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">{reading.header}</h3>
//                     <p className="text-sm text-purple-200">Theme: {reading.theme}</p>
//                     <p>{reading.content}</p>
//                 </div>
//             ))}
//             {Object.keys(adviceSections).length > 0 && (
//                 <div className="p-4 bg-purple-900/20 border border-purple-500 rounded-lg text-white space-y-4">
//                     <h3 className="font-semibold text-3xl gradient-title text-center ">Overall Advice:</h3>
//                     {adviceSections.cardAcknowledgment && (
//                         <div>
//                             <h4 className="text-md font-semibold text-2xl text-yellow-300">Cosmic Selection</h4>
//                             <p>{adviceSections.cardAcknowledgment}</p>
//                         </div>
//                     )}
//                     {adviceSections.individualCard && adviceSections.individualCard.length > 0 && (
//                         <div>
//                             <h4 className="text-md font-semibold text-2xl text-yellow-300">Individual Card Insights</h4>
//                             {adviceSections.individualCard.map((cardText, index) => (
//                                 cardText && (
//                                     <div key={index} className="mt-2">
//                                         <h5 className="text-sm font-medium text-indigo-600">
//                                             {cards[index]?.name} ({cards[index]?.position})
//                                         </h5>
//                                         <p className="text-white">{cardText}</p>
//                                     </div>
//                                 )
//                             ))}
//                         </div>
//                     )}
//                     {adviceSections.lifeStage && (
//                         <div>
//                             <h4 className="text-md font-semibold text-2xl text-yellow-300">Life Stage Guidance</h4>
//                             <p>{adviceSections.lifeStage}</p>
//                         </div>
//                     )}
//                     {adviceSections.zodiacGuidance && (
//                         <div>
//                             <h4 className="text-md font-semibold text-yellow-300">Zodiac-Specific Wisdom</h4>
//                             <p>{adviceSections.zodiacGuidance}</p>
//                         </div>
//                     )}
//                     {adviceSections.affirmations && (
//                         <div>
//                             <h4 className="text-md font-semibold text-yellow-300">Empowering Actions and Affirmations</h4>
//                             <p>{adviceSections.affirmations}</p>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }



"use client";

import { useState, useEffect, useRef } from "react";

export default function AIStarReading({
    cards,
    name,
    birthDate,
    model,
    spread,
    readingTrigger,
    onError,
}) {
    const [readings, setReadings] = useState([]);
    const [advice, setAdvice] = useState("");
    const [error, setError] = useState(null);
    const [numerologyIntro, setNumerologyIntro] = useState("");
    const [adviceSections, setAdviceSections] = useState({});
    const lastTriggerRef = useRef(null); // Track the last readingTrigger value

    useEffect(() => {
        if (!cards || cards.length === 0 || readingTrigger === 0) {
            console.log("Skipping fetch: invalid cards or readingTrigger is 0");
            return;
        }

        // Prevent fetching if readingTrigger hasn't changed
        if (lastTriggerRef.current === readingTrigger) {
            console.log("Skipping fetch: readingTrigger unchanged", readingTrigger);
            return;
        }

        console.log("Initiating fetch for readingTrigger:", readingTrigger);
        lastTriggerRef.current = readingTrigger;

        const fetchReading = async () => {
            try {
                console.log("Fetching reading with cards:", JSON.stringify(cards));
                const response = await fetch("/api/starcards", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        cards,
                        name,
                        birthday: birthDate,
                        model,
                        spread,
                    }),
                });
                console.log("API Response Status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("API Response Data:", data);
                if (data.error) {
                    throw new Error(data.error);
                }

                const readingText = data.reading || "";
                const sections = readingText.split(/(Personal Influences:|Card \d+: .*?\):|Overall Advice:)/i).filter(Boolean);
                console.log("Parsed Sections:", sections);

                const parsedReadings = [];
                let adviceText = "";
                let numerologyIntro = "";
                let currentHeader = null;

                for (const section of sections) {
                    if (section.match(/Personal Influences:/i)) {
                        currentHeader = section.trim();
                    } else if (section.match(/Card \d+: .*?\):/i)) {
                        currentHeader = section.trim();
                    } else if (section.match(/Overall Advice:/i)) {
                        currentHeader = section.trim();
                    } else if (currentHeader) {
                        if (currentHeader.match(/Personal Influences:/i)) {
                            numerologyIntro = section.trim();
                        } else if (currentHeader.match(/Card \d+: .*?\):/i)) {
                            const themeMatch = cards.find((card) =>
                                currentHeader.includes(card.name)
                            )?.theme;
                            parsedReadings.push({
                                header: currentHeader,
                                content: section.trim(),
                                theme: themeMatch || "Unknown",
                            });
                        } else if (currentHeader === "Overall Advice:") {
                            adviceText = section.trim();
                        }
                    }
                }

                // Parse adviceText into subsections
                const adviceSubsections = {
                    cardAcknowledgment: "",
                    individualCard: [],
                    lifeStage: "",
                    zodiacGuidance: "",
                    affirmations: ""
                };

                // Split adviceText by sentences and assign to subsections
                const sentences = adviceText.split(". ").map(s => s.trim() + ".");
                let currentSection = null;
                let cardAcknowledgmentSentences = [];
                let lifeStageSentences = [];
                let zodiacGuidanceSentences = [];
                let affirmationsSentences = [];

                // Track sentences for each card
                const cardSentences = cards.map(() => []);
                let currentCardIndex = -1;

                for (const sentence of sentences) {
                    if (sentence.includes("the cosmos has selected") || sentence.includes("Dear " + name)) {
                        currentSection = "cardAcknowledgment";
                        cardAcknowledgmentSentences.push(sentence);
                    } else if (cards.some((card, index) => {
                        if (sentence.includes(card.name)) {
                            currentCardIndex = index;
                            return true;
                        }
                        return false;
                    })) {
                        currentSection = "individualCard";
                        if (currentCardIndex >= 0) {
                            cardSentences[currentCardIndex].push(sentence);
                        }
                    } else if (sentence.includes("life stage") || sentence.includes("individual at") || sentence.includes("you are naturally focused")) {
                        currentSection = "lifeStage";
                        lifeStageSentences.push(sentence);
                    } else if (sentence.includes("Your " + (getZodiacSign(birthDate) || "")) || sentence.includes("star sign")) {
                        currentSection = "zodiacGuidance";
                        zodiacGuidanceSentences.push(sentence);
                    } else if (sentence.includes("You are destined for") || sentence.includes("affirmation") || sentence.includes("action steps")) {
                        currentSection = "affirmations";
                        affirmationsSentences.push(sentence);
                    } else if (currentSection) {
                        // Continue adding to the current section
                        if (currentSection === "cardAcknowledgment") cardAcknowledgmentSentences.push(sentence);
                        if (currentSection === "individualCard" && currentCardIndex >= 0) cardSentences[currentCardIndex].push(sentence);
                        if (currentSection === "lifeStage") lifeStageSentences.push(sentence);
                        if (currentSection === "zodiacGuidance") zodiacGuidanceSentences.push(sentence);
                        if (currentSection === "affirmations") affirmationsSentences.push(sentence);
                    }
                }

                // Split each card's sentences into paragraphs
                const cardParagraphs = cardSentences.map(sentences => {
                    const paragraphs = [];
                    let currentParagraph = [];
                    const transitionWords = ["if", "however", "therefore", "meanwhile", "consequently", "nonetheless"];

                    sentences.forEach((sentence, idx) => {
                        currentParagraph.push(sentence);
                        // Create a new paragraph after 2 sentences or at a transition word
                        if (currentParagraph.length >= 2 ||
                            transitionWords.some(word => sentence.toLowerCase().startsWith(word)) ||
                            idx === sentences.length - 1) {
                            paragraphs.push(currentParagraph.join(" "));
                            currentParagraph = [];
                        }
                    });

                    // Add any remaining sentences to a final paragraph
                    if (currentParagraph.length > 0) {
                        paragraphs.push(currentParagraph.join(" "));
                    }
                    return paragraphs;
                });

                adviceSubsections.cardAcknowledgment = cardAcknowledgmentSentences.join(" ");
                adviceSubsections.individualCard = cardParagraphs;
                adviceSubsections.lifeStage = lifeStageSentences.join(" ");
                adviceSubsections.zodiacGuidance = zodiacGuidanceSentences.join(" ");
                adviceSubsections.affirmations = affirmationsSentences.join(" ");

                console.log("Parsed Readings:", parsedReadings);
                console.log("Parsed Advice Sections:", adviceSubsections);
                console.log("Numerology Intro:", numerologyIntro);

                setReadings(parsedReadings);
                setAdviceSections(adviceSubsections);
                setNumerologyIntro(numerologyIntro);
                setError(null);
            } catch (err) {
                console.error("Error fetching reading:", err);
                setError("Unable to generate reading at this time.");
                setReadings([]);
                setAdviceSections({});
                setNumerologyIntro("");
                onError?.(err.message);
            }
        };

        fetchReading();
    }, [cards, name, birthDate, model, spread, readingTrigger, onError]);

    // Helper function to get zodiac sign
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
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
        return "Pisces";
    }

    if (error) {
        return <p className="text-red-400 text-lg">{error}</p>;
    }

    if (readings.length === 0 && !advice && !numerologyIntro) {
        return <p className="text-gray-300">Generating your reading...</p>;
    }

    return (
        <div className="mt-4 space-y-4 max-w-2xl">
            {numerologyIntro && (
                <div className="p-4 bg-white/10 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Personal Influences:</h3>
                    <p>{numerologyIntro}</p>
                </div>
            )}
            {readings.map((reading, index) => (
                <div key={index} className="p-4 bg-white/10 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">{reading.header}</h3>
                    <p className="text-sm text-purple-200">Theme: {reading.theme}</p>
                    <p>{reading.content}</p>
                </div>
            ))}
            {Object.keys(adviceSections).length > 0 && (
                <div className="p-4 bg-purple-900/20 border border-purple-500 rounded-lg text-white space-y-4">
                    <h3 className="font-semibold text-3xl gradient-title text-center">Overall Advice:</h3>
                    {adviceSections.cardAcknowledgment && (
                        <div>
                            <h4 className="text-md font-semibold text-2xl text-yellow-300">Cosmic Selection</h4>
                            <p>{adviceSections.cardAcknowledgment}</p>
                        </div>
                    )}
                    {adviceSections.individualCard && adviceSections.individualCard.length > 0 && (
                        <div>
                            <h4 className="text-md font-semibold text-2xl text-yellow-300">Individual Card Insights</h4>
                            {adviceSections.individualCard.map((cardParagraphs, index) => (
                                cardParagraphs && cardParagraphs.length > 0 && (
                                    <div key={index} className="mt-4">
                                        <h5 className="text-sm font-medium text-indigo-600">
                                            {cards[index]?.name} ({cards[index]?.position})
                                        </h5>
                                        {cardParagraphs.map((paragraph, paraIndex) => (
                                            <p key={paraIndex} className="text-white mt-4">{paragraph}</p>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                    {adviceSections.lifeStage && (
                        <div>
                            <h4 className="text-md font-semibold text-2xl text-yellow-300">Life Stage Guidance</h4>
                            <p>{adviceSections.lifeStage}</p>
                        </div>
                    )}
                    {adviceSections.zodiacGuidance && (
                        <div>
                            <h4 className="text-md font-semibold text-yellow-300">Zodiac-Specific Wisdom</h4>
                            <p>{adviceSections.zodiacGuidance}</p>
                        </div>
                    )}
                    {adviceSections.affirmations && (
                        <div>
                            <h4 className="text-md font-semibold text-yellow-300">Empowering Actions and Affirmations</h4>
                            <p>{adviceSections.affirmations}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}