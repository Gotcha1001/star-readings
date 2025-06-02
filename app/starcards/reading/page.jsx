// app/starcards/reading/page.jsx
import { Suspense } from "react";
import StarReadingContent from "./StarReadingContent";

export default function StarReadingPage() {
    return (
        <Suspense fallback={<div className="text-center p-4 text-white">Loading your Star Card reading...</div>}>
            <StarReadingContent />
        </Suspense>
    );
}