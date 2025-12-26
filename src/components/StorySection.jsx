import { useEffect, useRef, useState } from "react";

export default function StorySection({ name, text, video }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const consumedScroll = useRef(false);

  const [active, setActive] = useState(false);
  const [state, setState] = useState(0);
  // state:
  // 0 = emotional intro
  // 1 = name revealed
  // 2 = video playing
  // 3 = video finished

  /* -----------------------------------
     Detect section enter / exit
  ----------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* -----------------------------------
     Auto intro → name reveal
  ----------------------------------- */
  useEffect(() => {
    if (active && state === 0) {
      const t = setTimeout(() => setState(1), 1000);
      return () => clearTimeout(t);
    }
  }, [active, state]);

  /* -----------------------------------
     Scroll intent (only when active)
  ----------------------------------- */
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

  /* -----------------------------------
     Video control + rigid scroll lock
  ----------------------------------- */
  useEffect(() => {
    if (!videoRef.current) return;

    if (state === 2) {
      document.body.style.overflow = "hidden";
      videoRef.current.play();
    } else {
      document.body.style.overflow = "";
      videoRef.current.pause();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  /* -----------------------------------
     Reset when section exits viewport
  ----------------------------------- */
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

  /* -----------------------------------
     Render
  ----------------------------------- */
  return (
    <section ref={ref} className="story">
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
