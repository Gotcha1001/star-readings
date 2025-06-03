// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import MotionWrapperDelay from "./components/FramerMotion/MotionWrapperDelay";
// import SmokeEffectIndividual from "./components/SmokeEffects/SmokeEffectIndividual";
// import BottomToTopSmoke from "./components/SmokeEffects/BottomToTopSmoke";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col gradient-background2">
//       <BottomToTopSmoke />
//       <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white py-4 sm:py-6">
//         <div className="container mx-auto px-4">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
//             AI Tarot Insights
//           </h1>
//         </div>
//       </header>
//       <main className="flex-grow">
//         <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center">
//           <div className="animate-fade-in">
//             <MotionWrapperDelay
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.5 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               variants={{
//                 hidden: { opacity: 0, x: 100 },
//                 visible: { opacity: 1, x: 0 },
//               }}
//             >
//               <h2 className="text-xl gradient-title sm:text-2xl md:text-5xl font-semibold mb-4">
//                 Discover AI-Powered Tarot Readings
//               </h2>
//             </MotionWrapperDelay>
//             <div className="flex justify-center items-center mb-6">
//               <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 variants={{
//                   hidden: { opacity: 0, y: -100 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//               >
//                 <Image
//                   src="/image.jpg" // make sure to replace this image
//                   alt="AI Tarot Reading Preview"
//                   width={600}
//                   height={400}
//                   className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] h-auto rounded-lg shadow-2xl border-4 border-purple-200"
//                 />
//               </MotionWrapperDelay>
//             </div>
//             <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
//               Get personalized tarot readings guided by artificial intelligence.
//               Whether you're seeking clarity, guidance, or spiritual insight,
//               our AI-powered experience delivers tailored card interpretations
//               that resonate deeply with your journey.
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-4xl mx-auto">
//               {/* Feature 1 */}
//               <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 variants={{
//                   hidden: { opacity: 0, x: 100 },
//                   visible: { opacity: 1, x: 0 },
//                 }}
//               >
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
//                   <div className="text-2xl sm:text-3xl mb-3">🔮</div>
//                   <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//                     Smart Card Interpretation
//                   </h3>
//                   <p className="text-sm text-gray-300">
//                     Receive insightful tarot card readings personalized by AI to
//                     match your emotions and questions.
//                   </p>
//                 </div>
//               </MotionWrapperDelay>
//               {/* Feature 2 */}
//               <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 variants={{
//                   hidden: { opacity: 0, y: -100 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//               >
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
//                   <div className="text-2xl sm:text-3xl mb-3">✨</div>
//                   <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//                     Deep Emotional Insights
//                   </h3>
//                   <p className="text-sm text-gray-300">
//                     Let the AI uncover emotional patterns, mental clarity, and
//                     inner wisdom hidden in the cards.
//                   </p>
//                 </div>
//               </MotionWrapperDelay>
//               {/* Feature 3 */}
//               <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 variants={{
//                   hidden: { opacity: 0, x: -100 },
//                   visible: { opacity: 1, x: 0 },
//                 }}
//               >
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
//                   <div className="text-2xl sm:text-3xl mb-3">🧠</div>
//                   <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//                     Intuitive AI Guidance
//                   </h3>
//                   <p className="text-sm text-gray-300">
//                     Combining tarot wisdom with machine learning to deliver
//                     advice, clarity, and predictions.
//                   </p>
//                 </div>
//               </MotionWrapperDelay>
//             </div>
//             <Link href="/readingchoice">
//               <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
//                 Get Your AI Tarot Reading
//               </button>
//             </Link>
//             <p className="text-xs sm:text-sm text-gray-400 mt-4">
//               Fast • Intuitive • Guided by technology & symbolism
//             </p>
//           </div>
//         </section>
//       </main>
//       <footer className="bg-gray-800 text-white py-4">
//         <div className="container mx-auto px-4 text-center">
//           <p>© 2025 AI Tarot Insights. Your path illuminated by AI wisdom.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Suspense } from "react";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";
// import MotionWrapperDelay from "./components/FramerMotion/MotionWrapperDelay";
// import BottomToTopSmoke from "./components/SmokeEffects/BottomToTopSmoke";
// import Autoplay from "embla-carousel-autoplay";

// // Define carousel slides with 10 images
// const carouselSlides = [
//   { src: "/tarot1.jpg", alt: "Tarot Reading Scene" },
//   { src: "/tarot2.jpg", alt: "Mystical Tarot Deck" },
//   { src: "/tarot3.jpg", alt: "AI-Powered Tarot Insights" },
//   { src: "/tarot4.jpg", alt: "Tarot Card Spread" },
//   { src: "/tarot5.jpg", alt: "Spiritual Tarot Journey" },
//   { src: "/tarot6.jpg", alt: "Tarot Wisdom Unveiled" },
//   { src: "/tarot7.jpg", alt: "Guided Tarot Experience" },
//   { src: "/tarot8.jpg", alt: "Tarot Clarity Moment" },
//   { src: "/tarot9.jpg", alt: "Intuitive Tarot Reading" },
//   { src: "/tarot10.jpg", alt: "Tarot Path to Insight" },
// ];

// // Fallback component for Suspense
// function CarouselFallback() {
//   return (
//     <div className="w-full max-w-[600px] mx-auto h-[400px] flex items-center justify-center">
//       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mr-2"></div>
//       <p className="text-gray-300 text-lg">Loading images...</p>
//     </div>
//   );
// }

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col gradient-background2">
//       <BottomToTopSmoke />
//       <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white py-4 sm:py-6">
//         <div className="container mx-auto px-4">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
//             AI Tarot Insights
//           </h1>
//         </div>
//       </header>
//       <main className="flex-grow">
//         <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center">
//           <div className="animate-fade-in">
//             <MotionWrapperDelay
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.5 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               variants={{
//                 hidden: { opacity: 0, x: 100 },
//                 visible: { opacity: 1, x: 0 },
//               }}
//             >
//               <h2 className="text-xl gradient-title sm:text-2xl md:text-5xl font-semibold mb-4">
//                 Discover AI-Powered Tarot Readings
//               </h2>
//             </MotionWrapperDelay>
//             <div className="flex justify-center items-center mb-6">
//               <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 variants={{
//                   hidden: { opacity: 0, y: -100 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//               >
//                 {/* Wrap Carousel in Suspense for async image loading */}
//                 <Suspense fallback={<CarouselFallback />}>
//                   <Carousel
//                     plugins={[
//                       Autoplay({
//                         delay: 3000,
//                         stopOnInteraction: true,
//                         stopOnMouseEnter: true,
//                       }),
//                     ]}
//                     className="w-full max-w-[600px] mx-auto"
//                   >
//                     <CarouselContent>
//                       {carouselSlides.map((slide, index) => (
//                         <CarouselItem key={index}>
//                           <Image
//                             src={slide.src}
//                             alt={slide.alt}
//                             width={600}
//                             height={400}
//                             className="w-full h-auto rounded-lg shadow-2xl border-4 border-purple-200"
//                             priority={index === 0}
//                           />
//                         </CarouselItem>
//                       ))}
//                     </CarouselContent>
//                     <CarouselPrevious />
//                     <CarouselNext />
//                   </Carousel>
//                 </Suspense>
//               </MotionWrapperDelay>
//             </div>
//             <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
//               Get personalized tarot readings guided by artificial intelligence.
//               Whether you're seeking clarity, guidance, or spiritual insight,
//               our AI-powered experience delivers tailored card interpretations
//               that resonate deeply with your journey.
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-4xl mx-auto">
//               {/* Feature 1 */}
//               <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 variants={{
//                   hidden: { opacity: 0, x: 100 },
//                   visible: { opacity: 1, x: 0 },
//                 }}
//               >
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
//                   <div className="text-2xl sm:text-3xl mb-3">🔮</div>
//                   <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//                     Smart Card Interpretation
//                   </h3>
//                   <p className="text-sm text-gray-300">
//                     Receive insightful tarot card readings personalized by AI to
//                     match your emotions and questions.
//                   </p>
//                 </div>
//               </MotionWrapperDelay>
//               {/* Feature 2 */}
//               <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 variants={{
//                   hidden: { opacity: 0, y: -100 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//               >
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
//                   <div className="text-2xl sm:text-3xl mb-3">✨</div>
//                   <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//                     Deep Emotional Insights
//                   </h3>
//                   <p className="text-sm text-gray-300">
//                     Let the AI uncover emotional patterns, mental clarity, and
//                     inner wisdom hidden in the cards.
//                   </p>
//                 </div>
//               </MotionWrapperDelay>
//               {/* Feature 3 */}
//               <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 variants={{
//                   hidden: { opacity: 0, x: -100 },
//                   visible: { opacity: 1, x: 0 },
//                 }}
//               >
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
//                   <div className="text-2xl sm:text-3xl mb-3">🧠</div>
//                   <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//                     Intuitive AI Guidance
//                   </h3>
//                   <p className="text-sm text-gray-300">
//                     Combining tarot wisdom with machine learning to deliver
//                     advice, clarity, and predictions.
//                   </p>
//                 </div>
//               </MotionWrapperDelay>
//             </div>
//             <Link href="/readingchoice">
//               <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
//                 Get Your AI Tarot Reading
//               </button>
//             </Link>
//             <p className="text-xs sm:text-sm text-gray-400 mt-4">
//               Fast • Intuitive • Guided by technology & symbolism
//             </p>
//           </div>
//         </section>
//       </main>
//       <footer className="bg-gray-800 text-white py-4">
//         <div className="container mx-auto px-4 text-center">
//           <p>© 2025 AI Tarot Insights. Your path illuminated by AI wisdom.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import MotionWrapperDelay from "./components/FramerMotion/MotionWrapperDelay";
import BottomToTopSmoke from "./components/SmokeEffects/BottomToTopSmoke";
import Autoplay from "embla-carousel-autoplay";

// Enhanced carousel slides showcasing the unique 100-card system
const carouselSlides = [
  { src: "/tarot1.jpg", alt: "Tarot Reading Scene" },
  { src: "/tarot2.jpg", alt: "Mystical Tarot Deck" },
  { src: "/tarot3.jpg", alt: "AI-Powered Tarot Insights" },
  { src: "/tarot4.jpg", alt: "Tarot Card Spread" },
  { src: "/tarot5.jpg", alt: "Spiritual Tarot Journey" },
  { src: "/tarot6.jpg", alt: "Tarot Wisdom Unveiled" },
  { src: "/tarot7.jpg", alt: "Guided Tarot Experience" },
  { src: "/tarot8.jpg", alt: "Tarot Clarity Moment" },
  { src: "/tarot9.jpg", alt: "Intuitive Tarot Reading" },
  { src: "/tarot10.jpg", alt: "Tarot Path to Insight" },
];
// Floating star particles animation data
const floatingStars = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  animationDelay: Math.random() * 5,
  animationDuration: Math.random() * 10 + 15,
}));

function CarouselFallback() {
  return (
    <div className="w-full max-w-[700px] mx-auto h-[450px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gradient-to-r from-purple-400 to-pink-400 mr-4"></div>
      <p className="text-gray-200 text-xl font-medium">
        Aligning with cosmic forces...
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gradient-background2 relative overflow-hidden">
      {/* Floating Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingStars.map((star) => (
          <div
            key={star.id}
            className="absolute animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <BottomToTopSmoke />

      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-800 text-white py-8 shadow-2xl relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center tracking-wide mb-4">
            ✨ Star Cards: Beyond Tarot ✨
          </h1>
          <p className="text-center text-lg sm:text-xl text-purple-200 font-light">
            100 Cosmic Cards • AI-Powered • Time-Synchronized Destiny
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        <section className="container mx-auto px-4 py-16 text-center">
          {/* Hero Title with Enhanced Description */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-title mb-8 leading-tight">
              Discover Your Cosmic Blueprint
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl text-purple-300">
                Through 100 Sacred Star Cards
              </span>
            </h2>
          </MotionWrapperDelay>

          {/* Revolutionary Features Banner */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                🌟 Revolutionary Star Reading System
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl mb-2">💫</div>
                  <p className="text-purple-200 font-semibold">
                    100 Unique Cards
                  </p>
                  <p className="text-sm text-gray-300">
                    Beyond traditional 78-card systems
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🧠</div>
                  <p className="text-purple-200 font-semibold">
                    Smart Algorithm
                  </p>
                  <p className="text-sm text-gray-300">
                    Name + Birth + Time synchronization
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-purple-200 font-semibold">
                    AI Super Intelligence
                  </p>
                  <p className="text-sm text-gray-300">
                    Advanced cosmic pattern analysis
                  </p>
                </div>
              </div>
            </div>
          </MotionWrapperDelay>

          {/* Enhanced Carousel */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, y: -30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Suspense fallback={<CarouselFallback />}>
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 4000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full max-w-[700px] mx-auto mb-12"
              >
                <CarouselContent>
                  {carouselSlides.map((slide, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          width={700}
                          height={450}
                          className="rounded-2xl shadow-2xl border-4 border-gradient-to-r from-purple-400 to-pink-400"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold text-lg drop-shadow-lg">
                            {slide.alt}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-purple-600/80 hover:bg-purple-500 border-purple-400" />
                <CarouselNext className="bg-purple-600/80 hover:bg-purple-500 border-purple-400" />
              </Carousel>
            </Suspense>
          </MotionWrapperDelay>

          {/* Enhanced Description */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                Enter a realm where ancient cosmic wisdom meets cutting-edge
                artificial intelligence. Star Cards transcends traditional
                divination with our exclusive collection of
                <span className="text-purple-300 font-semibold">
                  {" "}
                  100 mystical cards
                </span>
                , each one uniquely designed to channel universal energies and
                stellar frequencies.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our revolutionary algorithm doesn't just read cards—it reads{" "}
                <em>you</em>. By harmonizing your name's vibrational signature,
                birth date's cosmic imprint, and the precise moment of your
                inquiry, we create a personalized portal to your destiny.
                Experience readings so accurate, they'll leave you questioning
                the boundaries between science and magic.
              </p>
            </div>
          </MotionWrapperDelay>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {/* Feature 1 - Enhanced */}
            <MotionWrapperDelay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: 60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-md border border-purple-300/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  100 Sacred Star Cards
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Exclusive collection beyond traditional tarot. Each card
                  channels specific stellar energies and cosmic frequencies for
                  unparalleled insight depth.
                </p>
              </div>
            </MotionWrapperDelay>

            {/* Feature 2 - Enhanced */}
            <MotionWrapperDelay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-md border border-pink-300/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Time-Sync Algorithm
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Revolutionary system that synchronizes your name's numerology,
                  birth date's cosmic signature, and present moment's energy for
                  precision predictions.
                </p>
              </div>
            </MotionWrapperDelay>

            {/* Feature 3 - Enhanced */}
            <MotionWrapperDelay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 backdrop-blur-md border border-blue-300/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Super AI Intelligence
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Advanced artificial intelligence analyzes cosmic patterns,
                  personal vibrations, and universal alignments to deliver
                  insights that feel magically personalized.
                </p>
              </div>
            </MotionWrapperDelay>

            {/* Feature 4 - New */}
            <MotionWrapperDelay
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              variants={{
                hidden: { opacity: 0, y: -60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-md border border-emerald-300/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Precision Guidance
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Experience readings so accurate and personally relevant, they
                  provide actionable guidance for your immediate circumstances
                  and future decisions.
                </p>
              </div>
            </MotionWrapperDelay>
          </div>

          {/* Enhanced CTA Section */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 backdrop-blur-lg border border-purple-400/40 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Unlock Your Cosmic Destiny?
              </h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Join thousands who've discovered their true path through our
                revolutionary Star Cards system. Your personalized cosmic
                reading awaits.
              </p>

              <Link href="/readingchoice">
                <button className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-700 transition-all duration-400 text-white font-bold px-12 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 text-lg">
                  Begin Your Star Card Journey
                </button>
              </Link>

              <div className="flex justify-center items-center mt-6 space-x-8 text-sm text-purple-200">
                <span>🔮 Instant Reading</span>
                <span>🌟 100% Personalized</span>
                <span>⚡ AI-Powered</span>
              </div>
            </div>
          </MotionWrapperDelay>

          {/* Social Proof/Testimonial Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white/5 backdrop-blur border border-purple-300/20 rounded-xl p-4">
              <p className="text-sm text-gray-300 italic">
                "Mind-blowing accuracy!"
              </p>
              <p className="text-xs text-purple-400 mt-1">- Sarah M.</p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-purple-300/20 rounded-xl p-4">
              <p className="text-sm text-gray-300 italic">
                "Changed my life direction completely."
              </p>
              <p className="text-xs text-purple-400 mt-1">- Michael R.</p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-purple-300/20 rounded-xl p-4">
              <p className="text-sm text-gray-300 italic">
                "The future of divination is here."
              </p>
              <p className="text-xs text-purple-400 mt-1">- Luna K.</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 italic">
            Celestial Precision • Time-Synchronized Readings • 100-Card Cosmic
            System • Super AI Analysis
          </p>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-purple-900/50 text-gray-200 py-6 mt-auto border-t border-purple-500/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm mb-2">
            © 2025 Star Cards - Where Cosmic Wisdom Meets Artificial
            Intelligence
          </p>
          <p className="text-xs text-purple-300">
            🌟 Transcending Traditional Divination • Embracing Tomorrow's Wisdom
            Today 🌟
          </p>
        </div>
      </footer>
    </div>
  );
}
