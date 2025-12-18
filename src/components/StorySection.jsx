import { useEffect, useRef, useState } from "react";

export default function StorySection({ name, text, video }) {
  const ref = useRef(null);
  const videoRef = useRef(null);

  const [active, setActive] = useState(false);
  const [state, setState] = useState(0); // 0=intro, 1=name, 2=play, 3=done
  const consumedScroll = useRef(false);

  // Detect entry / exit
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto intro → name
  useEffect(() => {
    if (active && state === 0) {
      const t = setTimeout(() => setState(1), 1000);
      return () => clearTimeout(t);
    }
  }, [active, state]);

  // Scroll intent (only when active)
  useEffect(() => {
    if (!active) return;

    function onScroll() {
      if (state === 1 && !consumedScroll.current) {
        consumedScroll.current = true;
        setState(2);
      }
    }

    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [active, state]);

  // Video control
  useEffect(() => {
    if (!videoRef.current) return;
    if (state === 2) videoRef.current.play();
    else videoRef.current.pause();
  }, [state]);

  // Reset when section exits
  useEffect(() => {
    if (!active) {
      setState(0);
      consumedScroll.current = false;

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [active]);

  return (
    <section ref={ref} className={`story ${active ? "active" : ""}`}>
      <video
        ref={videoRef}
        src={video}
        muted
        playsInline
        onEnded={() => setState(3)}
        className={`bg-video ${state === 2 ? "playing" : ""}`}
      />

      {active && (
        <div className="overlay">
          {state === 0 && <p className="intro">{text}</p>}
          {state >= 1 && (
            <h1 className={`name ${state === 2 ? "subtitle" : ""}`}>
              {name}
            </h1>
          )}
        </div>
      )}
    </section>
  );
}
