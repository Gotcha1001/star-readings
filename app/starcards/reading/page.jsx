"use client";

import { Suspense } from "react";
import StarReadingContent from "./StarReadingContent";



export default function StarReadingPage() {
    return (
        <div className="relative min-h-screen">
            {/* Background Particles */}

            {/* Main Content */}
            <Suspense fallback={<div className="text-center p-4 text-white">Loading your Star Card reading...</div>}>
                <StarReadingContent />
            </Suspense>
        </div>
    );
}