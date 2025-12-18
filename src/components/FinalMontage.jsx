import { useEffect, useRef, useState } from "react";

export default function FinalMontage({ video }) {
    const ref = useRef(null);
    const videoRef = useRef(null);
    const [active, setActive] = useState(false);
    const [state, setState] = useState(0); // 0=intro,1=play,2=end
    const consumed = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => e.isIntersecting && setActive(true),
            { threshold: 0.6 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        function onScroll() {
            if (!active) return;
            if (state === 0 && !consumed.current) {
                consumed.current = true;
                setState(1);
            }
        }
        window.addEventListener("wheel", onScroll, { passive: true });
        window.addEventListener("touchmove", onScroll, { passive: true });
        return () => {
            window.removeEventListener("wheel", onScroll);
            window.removeEventListener("touchmove", onScroll);
        };
    }, [active, state]);

    useEffect(() => {
        if (state === 1 && videoRef.current) videoRef.current.play();
    }, [state]);
    useEffect(() => {
        if (!active) {
            setState(0);
            consumed.current = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [active]);

    return (
        <section ref={ref} className="story">
            <video
                ref={videoRef}
                src={video}
                playsInline
                onEnded={() => setState(2)}
                className={`bg-video ${state === 1 ? "playing" : ""}`}
            />
            <div className="overlay">
                {state === 0 && (
                    <p className="intro">All these moments… just for you.</p>
                )}
                {state === 2 && (
                    <h1 className="final-text">Happy Birthday ❤️</h1>
                )}
            </div>
        </section>
    );
}
