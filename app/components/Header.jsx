"use client";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white py-4 shadow-lg">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link href="/">AI Starcard Insights</Link>
                </h1>
                <nav className="space-x-4">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/readingchoice" className="hover:underline">Choose Reading</Link>
                    <Link href="/starcards/reading?spread=single&cards=1" className="hover:underline">Star Cards</Link>
                </nav>
            </div>
        </header>
    );
}