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

// Define carousel slides with 10 images
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

// Fallback component for Suspense
function CarouselFallback() {
  return (
    <div className="w-full max-w-[600px] mx-auto h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mr-2"></div>
      <p className="text-gray-300 text-lg">Loading images...</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gradient-background2">
      <BottomToTopSmoke />
      <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            AI Tarot Insights
          </h1>
        </div>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center">
          <div className="animate-fade-in">
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
              <h2 className="text-xl gradient-title sm:text-2xl md:text-5xl font-semibold mb-4">
                Discover AI-Powered Tarot Readings
              </h2>
            </MotionWrapperDelay>
            <div className="flex justify-center items-center mb-6">
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
                {/* Wrap Carousel in Suspense for async image loading */}
                <Suspense fallback={<CarouselFallback />}>
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 3000,
                        stopOnInteraction: true,
                        stopOnMouseEnter: true,
                      }),
                    ]}
                    className="w-full max-w-[600px] mx-auto"
                  >
                    <CarouselContent>
                      {carouselSlides.map((slide, index) => (
                        <CarouselItem key={index}>
                          <Image
                            src={slide.src}
                            alt={slide.alt}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg shadow-2xl border-4 border-purple-200"
                            priority={index === 0}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </Suspense>
              </MotionWrapperDelay>
            </div>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Get personalized tarot readings guided by artificial intelligence.
              Whether you're seeking clarity, guidance, or spiritual insight,
              our AI-powered experience delivers tailored card interpretations
              that resonate deeply with your journey.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-4xl mx-auto">
              {/* Feature 1 */}
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
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
                  <div className="text-2xl sm:text-3xl mb-3">🔮</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    Smart Card Interpretation
                  </h3>
                  <p className="text-sm text-gray-300">
                    Receive insightful tarot card readings personalized by AI to
                    match your emotions and questions.
                  </p>
                </div>
              </MotionWrapperDelay>
              {/* Feature 2 */}
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
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
                  <div className="text-2xl sm:text-3xl mb-3">✨</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    Deep Emotional Insights
                  </h3>
                  <p className="text-sm text-gray-300">
                    Let the AI uncover emotional patterns, mental clarity, and
                    inner wisdom hidden in the cards.
                  </p>
                </div>
              </MotionWrapperDelay>
              {/* Feature 3 */}
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
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30">
                  <div className="text-2xl sm:text-3xl mb-3">🧠</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    Intuitive AI Guidance
                  </h3>
                  <p className="text-sm text-gray-300">
                    Combining tarot wisdom with machine learning to deliver
                    advice, clarity, and predictions.
                  </p>
                </div>
              </MotionWrapperDelay>
            </div>
            <Link href="/readingchoice">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Your AI Tarot Reading
              </button>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 mt-4">
              Fast • Intuitive • Guided by technology & symbolism
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 AI Tarot Insights. Your path illuminated by AI wisdom.</p>
        </div>
      </footer>
    </div>
  );
}
