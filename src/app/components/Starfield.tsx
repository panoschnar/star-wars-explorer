"use client";

import { useEffect, useRef } from "react";

const Starfield = () => {
    const starfieldRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const starCount = 150;
        const starfield = starfieldRef.current;

        if (starfield) {
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement("div");
                star.className = "star";
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.animationDuration = `${Math.random() * 5 + 3}s`; // Random speed
                star.style.animationDelay = `${Math.random() * 5}s`; // Random start position
                starfield.appendChild(star);
            }
        }

        return () => {
            if (starfield) {
                starfield.innerHTML = "";
            }
        };
    }, []);

    return <div className="starfield" ref={starfieldRef}></div>;
};

export default Starfield;
