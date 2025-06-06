"use client";

import { useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input"; // Import shadcn/ui Input
import Button from "../../components/Button";
import CardSpread from "../../components/CardSpread";
import AIStarReading from "../../components/AIStarReading";
import starDeck from "../../data/starDeck";
import { debounce } from "lodash";
import { drawStarCards } from "@/app/data/drawStarCards";
import FeatureMotionWrapper from "@/app/components/FramerMotion/FeatureMotionWrapperMap";
import MotionWrapperDelay from "@/app/components/FramerMotion/MotionWrapperDelay";

// Existing zodiacWeights, ageWeights, numerologyDescriptions, letterMeanings, spreadConfig
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

const ageWeights = {
    young: { Transition: 3, Relationships: 2, Mind: 1 },
    mid: { Relationships: 3, Destiny: 2, Body: 1 },
    mature: { Destiny: 3, "Past Life": 2, Light: 1 },
};

const numerologyDescriptions = {
    1: "Leadership, independence, and new beginnings define your essence. Your bold energy drives you to forge your own path, inspiring others with your pioneering spirit.",
    2: "Harmony, cooperation, and intuition guide your journey. You thrive in balance, fostering connections and bringing peace to those around you.",
    3: "Creativity, expression, and joy radiate from you. Your vibrant spirit uplifts others, sparking inspiration through your words and actions.",
    4: "Stability, discipline, and a strong foundation anchor your life. You build with purpose, creating lasting structures with your steadfast resolve.",
    5: "Freedom, change, and adventure fuel your soul. You embrace transformation with courage, seeking new horizons and dynamic experiences.",
    6: "Love, responsibility, and nurturing are your gifts. You cultivate care and community, fostering deep bonds with those you cherish.",
    7: "Wisdom, spirituality, and introspection shape your path. You seek truth and inner clarity, diving deep into the mysteries of existence.",
    8: "Ambition, power, and abundance propel you forward. You manifest success with determination, achieving greatness through focused effort.",
    9: "Compassion, completion, and universal love define your purpose. You align with a higher calling, uplifting others with your selfless heart.",
};

const letterMeanings = {
    a: "Ambition, leadership. Initiates bold beginnings.",
    b: "Balance, harmony. Nurtures connections.",
    c: "Creativity, expression. Sparks inspiration.",
    d: "Determination, stability. Builds strong foundations.",
    e: "Exploration, freedom. Seeks new horizons.",
    f: "Faith, compassion. Fosters care and trust.",
    g: "Growth, wisdom. Cultivates inner clarity.",
    h: "Healing, intuition. Guides with empathy.",
    i: "Insight, individuality. Illuminates unique paths.",
    j: "Joy, optimism. Spreads uplifting energy.",
    k: "Knowledge, spirituality. Seeks higher truth.",
    l: "Love, loyalty. Strengthens bonds.",
    m: "Mastery, resilience. Anchors with strength.",
    n: "Nurturing, adaptability. Embraces change.",
    o: "Openness, unity. Connects with the cosmos.",
    p: "Passion, purpose. Drives meaningful action.",
    q: "Quest, curiosity. Explores the unknown.",
    r: "Renewal, courage. Transforms with boldness.",
    s: "Sensitivity, soulfulness. Deepens emotional wisdom.",
    t: "Truth, discipline. Aligns with authenticity.",
    u: "Understanding, harmony. Bridges hearts and minds.",
    v: "Vision, vitality. Ignites dynamic energy.",
    w: "Wonder, intuition. Embraces mystical insights.",
    x: "Transformation, mystery. Unlocks hidden potential.",
    y: "Yearning, inspiration. Aspires to greatness.",
    z: "Zeal, completion. Celebrates fulfilled journeys.",
};

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
        positions: ["You", "Other", "Relationship", "Strengths", "Challenges", "Future"],
        description: "Relationship dynamics.",
    },
    horseshoe: {
        name: "Horseshoe Spread",
        cards: 7,
        positions: ["Past", "Present", "Future", "Influences", "Obstacles", "Advice", "Outcome"],
        description: "Examine influences and outcomes.",
    },
    "celtic-cross": {
        name: "Celtic Cross",
        cards: 10,
        positions: ["Present", "Challenge", "Past", "Future", "Above", "Below", "Advice", "External Influences", "Hopes/Fears", "Outcome"],
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
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December", "Overview",
        ],
        description: "A month-by-month forecast for the year.",
    },
};

// Existing getZodiacSign, calculateAge, getBirthDayInfo, getAstrologicalProfile, calculateNameBreakdown
function getZodiacSign(birthday) {
    if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
    const [year, month, day] = birthday.split("-").map(Number);
    if (isNaN(month) || isNaN(day)) return null;
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

function calculateAge(birthday) {
    if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
    const [birthYear, birthMonth, birthDay] = birthday.split("-").map(Number);
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    let age = today.getFullYear() - birthYear;
    const monthDiff = today.getMonth() - birthMonth;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
        age--;
    }
    return age;
}

function getBirthDayInfo(birthday) {
    if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
    const date = new Date(birthday);
    const dayIndex = date.getDay();
    const days = [
        { name: "Day of the Luminance", description: "Radiates warmth and divine inspiration" },
        { name: "Day of the Vortex", description: "Swirls with transformative energy and insight" },
        { name: "Day of the Flame", description: "Ignites courage and bold action" },
        { name: "Day of the Whisper", description: "Carries intuitive messages from the cosmos" },
        { name: "Day of the Horizon", description: "Expands vision and boundless potential" },
        { name: "Day of the Blossom", description: "Blooms with love and creative harmony" },
        { name: "Day of the Anchor", description: "Grounds with strength and timeless wisdom" },
    ];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const [year, month, day] = birthday.split("-").map(Number);
    const formattedDate = `${months[month - 1]} ${day}, ${year}`;
    return { ...days[dayIndex], formattedDate };
}

function getAstrologicalProfile(birthday) {
    if (!birthday || !birthday.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
    const [year, month, day] = birthday.split("-").map(Number);
    const zodiac = getZodiacSign(birthday);
    if (!zodiac) return null;

    const zodiacInfo = {
        Aries: {
            planet: "Mars",
            house: "1st (Self)",
            traits: "You blaze with courage and initiative, born to lead with fiery passion. Your challenge is impatience, but your drive forges new paths.",
            luckyColors: ["red", "white"],
            luckyGems: ["diamond", "ruby"],
            luckyDays: ["Tuesday", "Sunday"],
            luckyBase: 1,
        },
        Taurus: {
            planet: "Venus",
            house: "2nd (Values)",
            traits: "Grounded and sensual, you build stability with unwavering determination. Stubbornness can hinder you, yet your loyalty shines.",
            luckyColors: ["green", "pink"],
            luckyGems: ["emerald", "rose quartz"],
            luckyDays: ["Friday", "Monday"],
            luckyBase: 2,
        },
        Gemini: {
            planet: "Mercury",
            house: "3rd (Communication)",
            traits: "Curious and adaptable, your wit sparkles in every conversation. Indecisiveness may cloud your brilliance, but your versatility inspires.",
            luckyColors: ["yellow", "green"],
            luckyGems: ["aquamarine", "agate"],
            luckyDays: ["Wednesday", "Friday"],
            luckyBase: 5,
        },
        Cancer: {
            planet: "Moon",
            house: "4th (Home)",
            traits: "Nurturing and intuitive, you create emotional sanctuaries. Over-sensitivity can challenge you, but your empathy heals.",
            luckyColors: ["silver", "white"],
            luckyGems: ["pearl", "moonstone"],
            luckyDays: ["Monday", "Thursday"],
            luckyBase: 2,
        },
        Leo: {
            planet: "Sun",
            house: "5th (Creativity)",
            traits: "Radiant and bold, you command attention with creative flair. Pride can dim your glow, yet your warmth uplifts all.",
            luckyColors: ["gold", "orange"],
            luckyGems: ["amber", "topaz"],
            luckyDays: ["Sunday", "Tuesday"],
            luckyBase: 1,
        },
        Virgo: {
            planet: "Mercury",
            house: "6th (Health)",
            traits: "Precise and analytical, you perfect every detail with care. Over-criticism may limit you, but your service transforms.",
            luckyColors: ["navy", "brown"],
            luckyGems: ["sapphire", "peridot"],
            luckyDays: ["Wednesday", "Friday"],
            luckyBase: 5,
        },
        Libra: {
            planet: "Venus",
            house: "7th (Relationships)",
            traits: "Harmonious and charming, you balance relationships with grace. Indecision can sway you, yet your diplomacy prevails.",
            luckyColors: ["blue", "pastel pink"],
            luckyGems: ["opal", "lapis lazuli"],
            luckyDays: ["Friday", "Wednesday"],
            luckyBase: 6,
        },
        Scorpio: {
            planet: "Pluto",
            house: "8th (Transformation)",
            traits: "Intense and magnetic, you dive deep into life’s mysteries. Jealousy may challenge you, but your resilience conquers.",
            luckyColors: ["black", "deep red"],
            luckyGems: ["topaz", "obsidian"],
            luckyDays: ["Tuesday", "Thursday"],
            luckyBase: 9,
        },
        Sagittarius: {
            planet: "Jupiter",
            house: "9th (Exploration)",
            traits: "Adventurous and optimistic, you seek truth across horizons. Restlessness can scatter you, but your wisdom guides.",
            luckyColors: ["purple", "blue"],
            luckyGems: ["turquoise", "amethyst"],
            luckyDays: ["Thursday", "Sunday"],
            luckyBase: 3,
        },
        Capricorn: {
            planet: "Saturn",
            house: "10th (Career)",
            traits: "Ambitious and disciplined, you build empires with patience. Rigidity may constrain you, but your legacy endures.",
            luckyColors: ["grey", "dark green"],
            luckyGems: ["garnet", "onyx"],
            luckyDays: ["Saturday", "Wednesday"],
            luckyBase: 8,
        },
        Aquarius: {
            planet: "Uranus",
            house: "11th (Community)",
            traits: "Visionary and original, you innovate with a master vibration. Apathy can dim your potential, but your determination shines.",
            luckyColors: ["electric blue", "electric white", "multi-colors"],
            luckyGems: ["hessonite garnet", "agate"],
            luckyDays: ["Sunday", "Thursday"],
            luckyBase: 4,
        },
        Pisces: {
            planet: "Neptune",
            house: "12th (Spirituality)",
            traits: "Dreamy and compassionate, you merge with the cosmos. Escapism may blur your path, but your intuition illuminates.",
            luckyColors: ["sea green", "violet"],
            luckyGems: ["aquamarine", "amethyst"],
            luckyDays: ["Thursday", "Monday"],
            luckyBase: 7,
        },
    };

    const cusps = [
        { start: [12, 20], end: [1, 21], name: "Cusp of Mystery", description: "Blending ambition and innovation, you bridge tradition and rebellion.", signs: ["Capricorn", "Aquarius"] },
        { start: [1, 17], end: [2, 19], name: "Cusp of Sensitivity", description: "Merging vision and empathy, you weave dreams with insight.", signs: ["Aquarius", "Pisces"] },
        { start: [2, 17], end: [3, 22], name: "Cusp of Rebirth", description: "Fusing intuition and courage, you spark transformative beginnings.", signs: ["Pisces", "Aries"] },
        { start: [3, 19], end: [4, 21], name: "Cusp of Power", description: "Combining drive and stability, you build with dynamic force.", signs: ["Aries", "Taurus"] },
        { start: [4, 18], end: [5, 22], name: "Cusp of Energy", description: "Uniting groundedness and curiosity, you radiate vibrant ideas.", signs: ["Taurus", "Gemini"] },
        { start: [5, 19], end: [6, 22], name: "Cusp of Magic", description: "Blending wit and nurturing, you enchant with emotional depth.", signs: ["Gemini", "Cancer"] },
        { start: [6, 19], end: [7, 24], name: "Cusp of Oscillation", description: "Merging care and radiance, you balance heart and charisma.", signs: ["Cancer", "Leo"] },
        { start: [7, 21], end: [8, 24], name: "Cusp of Exposure", description: "Fusing drama and precision, you shine with meticulous flair.", signs: ["Leo", "Virgo"] },
        { start: [8, 21], end: [9, 24], name: "Cusp of Beauty", description: "Combining service and harmony, you create with elegant balance.", signs: ["Virgo", "Libra"] },
        { start: [9, 21], end: [10, 24], name: "Cusp of Drama", description: "Blending charm and intensity, you captivate with passionate depth.", signs: ["Libra", "Scorpio"] },
        { start: [10, 21], end: [11, 23], name: "Cusp of Revolution", description: "Uniting depth and adventure, you transform with bold vision.", signs: ["Scorpio", "Sagittarius"] },
        { start: [11, 20], end: [12, 23], name: "Cusp of Prophecy", description: "Merging exploration and discipline, you foresee enduring truths.", signs: ["Sagittarius", "Capricorn"] },
    ];

    const isCusp = cusps.find((cusp) => {
        const startMonth = cusp.start[0], startDay = cusp.start[1];
        const endMonth = cusp.end[0], endDay = cusp.end[1];
        return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay);
    });

    const cuspInfo = isCusp ? {
        name: isCusp.name,
        description: isCusp.description,
        signs: isCusp.signs.join(" and "),
    } : null;

    const monthSupport = [
        "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra",
        "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces", "Aries",
    ][month - 1];

    const famousBirthdaysMap = {
        "1-22": ["Francis Bacon", "Lord Byron", "Piper Laurie", "Stacey Dash"],
        "6-15": ["Helen Hunt", "Courteney Cox", "Neil Patrick Harris", "Jim Belushi"],
    };
    const defaultFamousBirthdays = ["Leonardo da Vinci", "Marie Curie", "Albert Einstein"];
    const selectedFamousBirthdays = famousBirthdaysMap[`${month}-${day}`] || defaultFamousBirthdays;

    const { planet, house, traits, luckyColors, luckyGems, luckyDays, luckyBase } = zodiacInfo[zodiac];
    const luckyNumbers = Array.from({ length: 9 }, (_, i) => luckyBase + i * 9).join(", ");
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month - 1];

    return {
        zodiac,
        planet,
        house,
        traits,
        cusp: cuspInfo,
        monthSupport,
        lunar: `The Full Moon in ${monthName}'s first half brings opportunities for growth and connection.`,
        lucky: {
            colors: luckyColors.join(", "),
            gems: luckyGems.join(", "),
            days: luckyDays.join(", "),
            numbers: luckyNumbers,
        },
        famousBirthdays: selectedFamousBirthdays,
    };
}

function calculateNameBreakdown(name) {
    if (!name || !name.trim()) return { breakdown: [], sum: 0, nameValue: null };
    const breakdown = [];
    let sum = 0;
    const cleanName = name.toLowerCase();
    for (const char of cleanName) {
        if (char >= 'a' && char <= 'z') {
            const value = char.charCodeAt(0) - 96;
            const meaning = letterMeanings[char] || "Unknown influence.";
            breakdown.push({ letter: char.toUpperCase(), value, meaning });
            sum += value;
        }
    }
    const nameValue = sum % 9 || 9;
    return { breakdown, sum, nameValue };
}

// Utility function to detect mobile devices
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function StarReadingContent() {
    const searchParams = useSearchParams();
    const spreadId = searchParams.get("spread") || "past-present-future";
    const cardCount = parseInt(searchParams.get("cards")) || 3;
    const spread = spreadConfig[spreadId] || spreadConfig["past-present-future"];

    const [drawnCards, setDrawnCards] = useState([]);
    const [flippedStates, setFlippedStates] = useState([]);
    const [model, setModel] = useState("gemini");
    const [readingTrigger, setReadingTrigger] = useState(0);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [starSign, setStarSign] = useState("");
    const [apiError, setApiError] = useState(null);
    const [nameValue, setNameValue] = useState(null);
    const [ageCategory, setAgeCategory] = useState("");
    const [age, setAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleApiError = useCallback((error) => {
        setApiError(error.message || "Error occurred");
        setIsLoading(false);
    }, []);

    const handleBirthDateChange = useCallback((e) => {
        const value = e.target.value;
        setBirthDate(value);
        if (value && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const sign = getZodiacSign(value);
            setStarSign(sign || "");
            const calculatedAge = calculateAge(value);
            setAge(calculatedAge);
            console.log("Star Sign Set:", sign, "Age:", calculatedAge);
        } else {
            setStarSign("");
            setAge(null);
        }
    }, []);

    const calculateInfluences = useCallback(() => {
        if (!name.trim() || !birthDate) return;
        const { nameValue, breakdown, sum } = calculateNameBreakdown(name.trim());
        setNameValue(nameValue);
        const calculatedAge = calculateAge(birthDate);
        setAge(calculatedAge);
        const calculatedAgeCategory = calculatedAge < 30 ? "young" : calculatedAge < 50 ? "mid" : "mature";
        setAgeCategory(calculatedAgeCategory);
    }, [name, birthDate]);

    const drawCards = useCallback(() => {
        if (isLoading) {
            console.log("Draw Cards Blocked: Already loading");
            return;
        }
        if (!name.trim()) {
            setApiError("Please enter a valid name.");
            console.log("Draw Cards Blocked: Name is empty");
            return;
        }
        if (!birthDate || !birthDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            setApiError("Please enter a valid birth date in YYYY-MM-DD format.");
            console.log("Draw Cards Blocked: Invalid birth date");
            return;
        }
        setIsLoading(true);
        try {
            calculateInfluences();
            const cards = drawStarCards(name.trim(), birthDate, starSign, spreadId, cardCount);
            if (!cards.length && cardCount > 0) {
                throw new Error("Failed to draw cards. Insufficient cards in deck.");
            }
            console.log("Cards Drawn:", cards);
            setDrawnCards(cards);
            setFlippedStates(new Array(cards.length).fill(false));
            setReadingTrigger((prev) => prev + 1);
            setApiError(null);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    }, [name, birthDate, starSign, spreadId, cardCount, calculateInfluences, isLoading, handleApiError]);

    const debouncedDrawCards = useMemo(() => debounce(drawCards, 500), [drawCards]);

    const handleCardClick = useCallback((index) => {
        setFlippedStates((prev) => {
            const newStates = [...prev];
            newStates[index] = !prev[index];
            return newStates;
        });
    }, []);

    const resetSpread = useCallback(() => {
        setDrawnCards([]);
        setFlippedStates([]);
        setReadingTrigger(0);
        setApiError(null);
        setNameValue(null);
        setAgeCategory("");
        setAge(null);
        setIsLoading(false);
    }, []);

    const stableDrawnCards = useMemo(() => drawnCards, [drawnCards]);
    const nameBreakdown = nameValue ? calculateNameBreakdown(name.trim()) : null;
    const birthDayInfo = birthDate ? getBirthDayInfo(birthDate) : null;
    const astroProfile = birthDate ? getAstrologicalProfile(birthDate) : null;

    return (
        <div className="flex flex-col items-center justify-center p-6 gradient-background2">
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <h1 className="text-3xl font-bold mb-6 gradient-title text-white">Star Cards: {spread.name}</h1>
            </MotionWrapperDelay>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                }}
            >
                <p className="text-base text-gray-300 mb-6 text-center max-w-2xl">{spread.description}</p>
            </MotionWrapperDelay>

            <div className="mb-6 space-y-4 w-full max-w-md">
                <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                />
                <Input
                    type={isMobileDevice() ? "text" : "date"}
                    placeholder={isMobileDevice() ? "YYYY-MM-DD" : undefined}
                    pattern={isMobileDevice() ? "\\d{4}-\\d{2}-\\d{2}" : undefined}
                    value={birthDate}
                    onChange={handleBirthDateChange}
                    title="Enter birth date in YYYY-MM-DD format (e.g., 1990-05-15)"
                    className="w-full"
                />
                {starSign && (
                    <p className="text-sm text-center text-purple-300">
                        🌟 Your star sign is <span className="font-semibold">{starSign}</span>
                    </p>
                )}
                {apiError && birthDate && !birthDate.match(/^\d{4}-\d{2}-\d{2}$/) && (
                    <p className="text-sm text-center text-red-500">
                        Please enter a valid date in YYYY-MM-DD format (e.g., 1990-05-15).
                    </p>
                )}
            </div>

            {nameValue && nameBreakdown && ageCategory && age && starSign && birthDayInfo && astroProfile && (
                <div className="mb-8 p-8 bg-gradient-to-r from-purple-900 via-indigo-500 to-black rounded-xl text-white max-w-2xl mx-auto border border-purple-300/30 shadow-lg">
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, y: 100 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <h3 className="text-2xl font-bold gradient-title mb-4 text-purple-200">Your Cosmic Profile</h3>
                    </MotionWrapperDelay>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <p className="text-base mb-4 leading-relaxed">
                            Greetings, dear {name}, the cosmos knows you intimately. Born on {birthDayInfo.formattedDate}, the {birthDayInfo.name} ({birthDayInfo.description}), your arrival was marked by a surge of dynamic change. At {age} years, you shine in your {ageCategory.replace("young", "young adult").replace("mid", "mid-life").replace("mature", "wise")} phase, where the energies of {Object.keys(ageWeights[ageCategory]).join(", ")} shape your journey. As a {starSign}, your spirit resonates with {zodiacWeights[starSign]?.primary || "Destiny"} and {zodiacWeights[starSign]?.secondary || "Cosmos"} themes, guiding the Star Cards to illuminate your unique path.
                        </p>
                    </MotionWrapperDelay>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <h4 className="text-lg font-semibold mt-4 mb-2 text-yellow-300">Your Astrological Essence</h4>
                    </MotionWrapperDelay>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, y: -100 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <p className="text-base mb-3 leading-relaxed">
                            Guided by {astroProfile.planet}, your {astroProfile.zodiac} essence radiates through the {astroProfile.house} house, a realm of {astroProfile.house.split("(")[1].replace(")", "").toLowerCase()}. {astroProfile.traits} {astroProfile.cusp ? `Born on the ${astroProfile.cusp.name}, you embody ${astroProfile.cusp.description.toLowerCase()}` : ""} {astroProfile.lunar} {astroProfile.monthSupport} offers support this month, guiding you with wisdom and strength.
                        </p>
                    </MotionWrapperDelay>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-300">
                            <li><span className="font-medium text-white">Lucky Colors:</span> {astroProfile.lucky.colors}</li>
                            <li><span className="font-medium text-white">Lucky Gems:</span> {astroProfile.lucky.gems}</li>
                            <li><span className="font-medium text-white">Lucky Days:</span> {astroProfile.lucky.days}</li>
                            <li><span className="font-medium text-white">Lucky Numbers:</span> {astroProfile.lucky.numbers}</li>
                            <li><span className="font-medium text-white">Famous Birthdays:</span> {astroProfile.famousBirthdays.join(", ")}</li>
                        </ul>
                    </MotionWrapperDelay>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <h4 className="text-lg font-semibold mt-4 mb-2 text-yellow-300">Your Name’s Cosmic Vibration</h4>
                    </MotionWrapperDelay>
                    <p className="text-base mb-3">
                        Your name, {name}, weaves a celestial melody. Each letter carries a sacred vibration, contributing to your numerology number:
                    </p>
                    <ol className="list-decimal pl-6 space-y-1.5 text-sm text-gray-300">
                        {nameBreakdown.breakdown.map((item, index) => (
                            <li key={index}>
                                <span className="font-medium text-white">{item.letter}</span> = {item.value}: {item.meaning}
                            </li>
                        ))}
                    </ol>
                    <p className="text-base mt-4">
                        Summing these values ({nameBreakdown.breakdown.map((b) => b.value).join(" + ")}) gives {nameBreakdown.sum}, which reduces to your numerology number {nameValue}. This vibration of {numerologyDescriptions[nameValue].split(".")[0].toLowerCase()} shapes your essence. {numerologyDescriptions[nameValue].split(".")[1]} Your Star Cards will reflect these cosmic influences, guiding you toward harmony and growth.
                    </p>
                </div>
            )}
            <div className="flex gap-3 mb-6">
                <Button text="Use Gemini" onClick={() => setModel("gemini")} disabled={model === "gemini"} />
                <Button text="Use OpenRouter" onClick={() => setModel("openrouter")} disabled={model === "openrouter"} />
            </div>
            {stableDrawnCards.length > 0 && (
                <p className="text-white text-lg mb-4">Flip the cards to reveal their cosmic messages.</p>
            )}
            {apiError && (
                <p className="text-red-500 text-lg mb-4">{apiError}</p>
            )}
            <CardSpread
                cards={stableDrawnCards}
                flippedStates={flippedStates}
                handleCardClick={handleCardClick}
            />
            <div>
                <div className="flex gap-3 mt-4">
                    <Button text="Create" onClick={debouncedDrawCards} disabled={stableDrawnCards.length > 0 || isLoading} />
                    <Button text="Reset" onClick={resetSpread} disabled={stableDrawnCards.length === 0} />
                    <Link href="/readingchoice">
                        <Button text="Choose Another Spread" />
                    </Link>
                </div>
                {stableDrawnCards.length > 0 && (
                    <AIStarReading
                        cards={stableDrawnCards}
                        name={name.trim()}
                        birthDate={birthDate}
                        model={model}
                        spread={spreadId}
                        readingTrigger={readingTrigger}
                        onError={handleApiError}
                    />
                )}
            </div>
        </div>
    );
}