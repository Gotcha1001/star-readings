"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";

export function ParticlesDemo() {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        // Use a soft, starry color palette
        setColor(resolvedTheme === "dark" ? "#e6e6fa" : "#d1d5db"); // Light blue for dark mode, soft gray for light mode
    }, [resolvedTheme]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Particles
                    className="absolute inset-0"
                    quantity={50} // Brighter, closer stars
                    size={Math.random() * 2 + 1}
                    ease={120}
                    color={resolvedTheme === "dark" ? "rgb(255, 255, 255)" : "#9ca3af"}
                    vyMin={-0.1}
                    vyMax={0.1}
                    vxMin={-0.1}
                    vxMax={0.1}
                    refresh
                />
                <Particles
                    className="absolute inset-0"
                    quantity={100} // Fainter, distant stars
                    size={Math.random() * 1 + 0.5}
                    ease={150}
                    color={resolvedTheme === "dark" ? "#0e1483" : "#d1d5db"}
                    vyMin={-0.05}
                    vyMax={0.05}
                    vxMin={-0.05}
                    vxMax={0.05}
                    refresh
                />
            </div>
        </div>
    );
}