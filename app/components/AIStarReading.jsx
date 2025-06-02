// "use client";

// import { useState, useEffect } from "react";

// export default function AIStarReading({ cards, name, age, birthDate, model, spread, resetTrigger, onError }) {
//     const [reading, setReading] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchReading() {
//             console.log("AIStarReading Inputs:", { cards, name, age, birthDate, model, spread });

//             if (!cards || !Array.isArray(cards) || cards.length === 0 || !name || !age || !birthDate || !model || !spread) {
//                 const errorMsg = `Missing required inputs: ${[
//                     !cards && "cards",
//                     cards && !Array.isArray(cards) && "cards (must be an array)",
//                     cards && cards.length === 0 && "cards (must not be empty)",
//                     !name && "name",
//                     !age && "age",
//                     !birthDate && "birthDate",
//                     !model && "model",
//                     !spread && "spread",
//                 ].filter(Boolean).join(", ")}`;
//                 console.error(errorMsg);
//                 setError(errorMsg);
//                 onError(errorMsg);
//                 setLoading(false);
//                 return;
//             }

//             for (const card of cards) {
//                 if (!card.name || !card.theme || !card.meaning || !card.position) {
//                     const errorMsg = `Invalid card data: missing name, theme, meaning, or position for card ${JSON.stringify(card)}`;
//                     console.error(errorMsg);
//                     setError(errorMsg);
//                     onError(errorMsg);
//                     setLoading(false);
//                     return;
//                 }
//             }

//             setLoading(true);
//             try {
//                 const response = await fetch("/api/starcards", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         cards,
//                         name: name.trim(),
//                         age: parseInt(age),
//                         birthday: birthDate,
//                         model,
//                         spread,
//                     }),
//                 });
//                 console.log("API Response Status:", response.status);

//                 if (!response.ok) {
//                     let errorMsg = `API request failed with status ${response.status}`;
//                     if (response.status === 405) {
//                         errorMsg = "The server does not allow this request method. Please check the API configuration.";
//                     } else if (response.status === 400) {
//                         try {
//                             const data = await response.json();
//                             errorMsg = data.error || "Invalid request data.";
//                         } catch {
//                             errorMsg = "Invalid request data, and unable to parse error details.";
//                         }
//                     }
//                     console.error(errorMsg);
//                     setError(errorMsg);
//                     onError(errorMsg);
//                     setLoading(false);
//                     return;
//                 }

//                 const data = await response.json();
//                 console.log("API Response Data:", data);

//                 if (data.error) {
//                     console.error("API Error:", data.error);
//                     setError(data.error);
//                     onError(data.error);
//                 } else {
//                     setReading(data.reading);
//                     setError(null);
//                 }
//             } catch (err) {
//                 const errorMsg = `Network error: ${err.message}`;
//                 console.error(errorMsg, err);
//                 setError(errorMsg);
//                 onError(errorMsg);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (resetTrigger) {
//             setReading("");
//             setError(null);
//             setLoading(false);
//             console.log("Reset triggered in AIStarReading");
//             return;
//         }

//         fetchReading();
//     }, [cards, name, age, birthDate, model, spread, resetTrigger, onError]);

//     return (
//         <div className="mt-4 p-4 bg-white/10 rounded-lg text-white max-w-2xl">
//             <h3 className="text-lg font-semibold">Your Star Card Reading</h3>
//             {loading ? (
//                 <p>Generating your Star Card reading...</p>
//             ) : error ? (
//                 <p className="text-red-400">Error: {error}</p>
//             ) : reading ? (
//                 <p>{reading}</p>
//             ) : (
//                 <p>Unable to generate reading at this time.</p>
//             )}
//         </div>
//     );
// }



// "use client";

// import { useState, useEffect } from "react";

// export default function AIStarReading({ cards, name, age, birthDate, model, spread, resetTrigger, onError }) {
//     const [mainReading, setMainReading] = useState("");
//     const [overallAdvice, setOverallAdvice] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchReading() {
//             console.log("AIStarReading Inputs:", { cards, name, age, birthDate, model, spread });

//             if (!cards || !Array.isArray(cards) || cards.length === 0 || !name || !age || !birthDate || !model || !spread) {
//                 const errorMsg = `Missing required inputs: ${[
//                     !cards && "cards",
//                     cards && !Array.isArray(cards) && "cards (must be an array)",
//                     cards && cards.length === 0 && "cards (must not be empty)",
//                     !name && "name",
//                     !age && "age",
//                     !birthDate && "birthDate",
//                     !model && "model",
//                     !spread && "spread",
//                 ].filter(Boolean).join(", ")}`;
//                 console.error(errorMsg);
//                 setError(errorMsg);
//                 onError(errorMsg);
//                 setLoading(false);
//                 return;
//             }

//             for (const card of cards) {
//                 if (!card.name || !card.theme || !card.meaning || !card.position) {
//                     const errorMsg = `Invalid card data: missing name, theme, meaning, or position for card ${JSON.stringify(card)}`;
//                     console.error(errorMsg);
//                     setError(errorMsg);
//                     onError(errorMsg);
//                     setLoading(false);
//                     return;
//                 }
//             }

//             setLoading(true);
//             try {
//                 const response = await fetch("/api/starcards", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         cards,
//                         name: name.trim(),
//                         age: parseInt(age),
//                         birthday: birthDate,
//                         model,
//                         spread,
//                     }),
//                 });
//                 console.log("API Response Status:", response.status);

//                 if (!response.ok) {
//                     let errorMsg = `API request failed with status ${response.status}`;
//                     if (response.status === 405) {
//                         errorMsg = "The server does not allow this request method. Please check the API configuration.";
//                     } else if (response.status === 400) {
//                         try {
//                             const data = await response.json();
//                             errorMsg = data.error || "Invalid request data.";
//                         } catch {
//                             errorMsg = "Invalid request data, and unable to parse error details.";
//                         }
//                     }
//                     console.error(errorMsg);
//                     setError(errorMsg);
//                     onError(errorMsg);
//                     setLoading(false);
//                     return;
//                 }

//                 const data = await response.json();
//                 console.log("API Response Data:", data);

//                 if (data.error) {
//                     console.error("API Error:", data.error);
//                     setError(data.error);
//                     onError(data.error);
//                 } else {
//                     // Split the reading into main reading and overall advice
//                     const readingText = data.reading || "";
//                     const splitRegex = /(Overall Advice:)/i;
//                     const parts = readingText.split(splitRegex);
//                     if (parts.length >= 3 && parts[1].match(/Overall Advice:/i)) {
//                         // Main reading is before "Overall Advice", advice is after
//                         setMainReading(parts[0].trim());
//                         setOverallAdvice(parts[2].trim());
//                     } else {
//                         // No "Overall Advice" section found; use entire text as main reading
//                         setMainReading(readingText.trim());
//                         setOverallAdvice("");
//                         console.warn("No 'Overall Advice' section found in reading:", readingText);
//                     }
//                     setError(null);
//                 }
//             } catch (err) {
//                 const errorMsg = `Network error: ${err.message}`;
//                 console.error(errorMsg, err);
//                 setError(errorMsg);
//                 onError(errorMsg);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (resetTrigger) {
//             setMainReading("");
//             setOverallAdvice("");
//             setError(null);
//             setLoading(false);
//             console.log("Reset triggered in AIStarReading");
//             return;
//         }

//         fetchReading();
//     }, [cards, name, age, birthDate, model, spread, resetTrigger, onError]);

//     return (
//         <div className="mt-4 space-y-4 max-w-2xl">
//             <div className="p-4 bg-white/10 rounded-lg text-white">
//                 <h3 className="text-lg font-semibold">Your Star Card Reading</h3>
//                 {loading ? (
//                     <p>Generating your Star Card reading...</p>
//                 ) : error ? (
//                     <p className="text-red-400">Error: {error}</p>
//                 ) : mainReading ? (
//                     <p>{mainReading}</p>
//                 ) : (
//                     <p>Unable to generate reading at this time.</p>
//                 )}
//             </div>
//             {overallAdvice && (
//                 <div className="p-4 bg-purple-900/20 border border-purple-500 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">Overall Advice</h3>
//                     <p>{overallAdvice}</p>
//                 </div>
//             )}
//         </div>
//     );
// }





// "use client";

// import { useState, useEffect } from "react";

// export default function AIStarReading({ cards, name, age, birthDate, model, spread, readingTrigger, onError }) {
//     const [mainReading, setMainReading] = useState("");
//     const [overallAdvice, setOverallAdvice] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchReading() {
//             console.log("AIStarReading Inputs:", { cards, name, age, birthDate, model, spread, readingTrigger });

//             if (!cards || !Array.isArray(cards) || cards.length === 0 || !name || !age || !birthDate || !model || !spread) {
//                 const errorMsg = `Missing required inputs: ${[
//                     !cards && "cards",
//                     cards && !Array.isArray(cards) && "cards (must be an array)",
//                     cards && cards.length === 0 && "cards (must not be empty)",
//                     !name && "name",
//                     !age && "age",
//                     !birthDate && "birthDate",
//                     !model && "model",
//                     !spread && "spread",
//                 ].filter(Boolean).join(", ")}`;
//                 console.error(errorMsg);
//                 setError(errorMsg);
//                 onError(errorMsg);
//                 setLoading(false);
//                 return;
//             }

//             for (const card of cards) {
//                 if (!card.name || !card.theme || !card.meaning || !card.position) {
//                     const errorMsg = `Invalid card data: missing name, theme, meaning, or position for card ${JSON.stringify(card)}`;
//                     console.error(errorMsg);
//                     setError(errorMsg);
//                     onError(errorMsg);
//                     setLoading(false);
//                     return;
//                 }
//             }

//             setLoading(true);
//             try {
//                 const response = await fetch("/api/starcards", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         cards,
//                         name: name.trim(),
//                         age: parseInt(age),
//                         birthday: birthDate,
//                         model,
//                         spread,
//                     }),
//                 });
//                 console.log("API Response Status:", response.status);

//                 if (!response.ok) {
//                     let errorMsg = `API request failed with status ${response.status}`;
//                     if (response.status === 405) {
//                         errorMsg = "The server does not allow this request method. Please check the API configuration.";
//                     } else if (response.status === 400) {
//                         try {
//                             const data = await response.json();
//                             errorMsg = data.error || "Invalid request data.";
//                         } catch {
//                             errorMsg = "Invalid request data, and unable to parse error details.";
//                         }
//                     }
//                     console.error(errorMsg);
//                     setError(errorMsg);
//                     onError(errorMsg);
//                     setLoading(false);
//                     return;
//                 }

//                 const data = await response.json();
//                 console.log("API Response Data:", data);

//                 if (data.error) {
//                     console.error("API Error:", data.error);
//                     setError(data.error);
//                     onError(data.error);
//                 } else {
//                     // Split the reading into main reading and overall advice
//                     const readingText = data.reading || "";
//                     const splitRegex = /(Overall Advice:)/i;
//                     const parts = readingText.split(splitRegex);
//                     if (parts.length >= 3 && parts[1].match(/Overall Advice:/i)) {
//                         setMainReading(parts[0].trim());
//                         setOverallAdvice(parts[2].trim());
//                     } else {
//                         setMainReading(readingText.trim());
//                         setOverallAdvice("");
//                         console.warn("No 'Overall Advice' section found in reading:", readingText);
//                     }
//                     setError(null);
//                 }
//             } catch (err) {
//                 const errorMsg = `Network error: ${err.message}`;
//                 console.error(errorMsg, err);
//                 setError(errorMsg);
//                 onError(errorMsg);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (readingTrigger === 0) {
//             setMainReading("");
//             setOverallAdvice("");
//             setError(null);
//             setLoading(false);
//             console.log("Reading reset in AIStarReading");
//             return;
//         }

//         fetchReading();
//     }, [readingTrigger]); // Only trigger on readingTrigger changes

//     return (
//         <div className="mt-4 space-y-4 max-w-2xl">
//             <div className="p-4 bg-white/10 rounded-lg text-white">
//                 <h3 className="text-lg font-semibold">Your Star Card Reading</h3>
//                 {loading ? (
//                     <p>Generating your Star Card reading...</p>
//                 ) : error ? (
//                     <p className="text-red-400">Error: {error}</p>
//                 ) : mainReading ? (
//                     <p>{mainReading}</p>
//                 ) : (
//                     <p>Unable to generate reading at this time.</p>
//                 )}
//             </div>
//             {overallAdvice && (
//                 <div className="p-4 bg-purple-900/20 border border-purple-500 rounded-lg text-white">
//                     <h3 className="text-lg font-semibold">Overall Advice</h3>
//                     <p>{overallAdvice}</p>
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
//     age,
//     birthDate,
//     model,
//     spread,
//     readingTrigger,
//     onError,
// }) {
//     const [readings, setReadings] = useState([]);
//     const [advice, setAdvice] = useState("");
//     const [error, setError] = useState(null);

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
//                         age,
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
//                 // Match headers like "Card X: Name (Position):" or "Overall Advice:"
//                 const sections = readingText.split(/(Card \d+: .*?\):|Overall Advice:)/i).filter(Boolean);
//                 console.log("Parsed Sections:", sections);

//                 const parsedReadings = [];
//                 let advice = "";
//                 let currentHeader = null;

//                 for (const section of sections) {
//                     if (section.match(/Card \d+: .*?\):/i)) {
//                         currentHeader = section.trim();
//                     } else if (section.match(/Overall Advice:/i)) {
//                         currentHeader = section.trim();
//                     } else if (currentHeader) {
//                         if (currentHeader.match(/Card \d+: .*?\):/i)) {
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

//                 setReadings(parsedReadings);
//                 setAdvice(advice);
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching reading:", err);
//                 setError("Unable to generate reading at this time.");
//                 setReadings([]);
//                 setAdvice("");
//                 onError?.(err.message);
//             }
//         };

//         fetchReading();
//     }, [cards, name, age, birthDate, model, spread, readingTrigger, onError]);

//     if (error) {
//         return <p className="text-red-400 text-lg">{error}</p>;
//     }

//     if (readings.length === 0 && !advice) {
//         return <p className="text-gray-300">Generating your reading...</p>;
//     }

//     return (
//         <div className="mt-4 space-y-4 max-w-2xl">
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



"use client";

import { useState, useEffect } from "react";

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

    useEffect(() => {
        if (!cards || cards.length === 0 || readingTrigger === 0) return;

        const fetchReading = async () => {
            try {
                console.log("Fetching reading with trigger:", readingTrigger);
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
                let advice = "";
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
                            advice = section.trim();
                        }
                    }
                }

                console.log("Parsed Readings:", parsedReadings);
                console.log("Parsed Advice:", advice);
                console.log("Numerology Intro:", numerologyIntro);
                setReadings(parsedReadings);
                setAdvice(advice);
                setNumerologyIntro(numerologyIntro);
                setError(null);
            } catch (err) {
                console.error("Error fetching reading:", err);
                setError("Unable to generate reading at this time.");
                setReadings([]);
                setAdvice("");
                setNumerologyIntro("");
                onError?.(err.message);
            }
        };

        fetchReading();
    }, [cards, name, birthDate, model, spread, readingTrigger, onError]);

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
            {advice && (
                <div className="p-4 bg-purple-900/20 border border-purple-500 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Overall Advice:</h3>
                    <p>{advice}</p>
                </div>
            )}
        </div>
    );
}