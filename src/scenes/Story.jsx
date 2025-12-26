import { useEffect, useRef, useState } from "react";

export default function Story({ name, description, video, audio, lock, onDone }) {
  const videoRef = useRef(null);
  const [state, setState] = useState(0); 
  // 0 = description, 1 = name, 2 = playing
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Lock scene navigation
  useEffect(() => {
    lock(true);
    return () => lock(false);
  }, [lock]);

  // 1. Auto transition: Description -> Name (Wait 2 seconds)
  useEffect(() => {
    if (state === 0) {
      const t = setTimeout(() => setState(1), 2000);
      return () => clearTimeout(t);
    }
  }, [state]);

  // 2. NEW: Auto transition: Name -> Video (Wait 1.5 seconds)
  useEffect(() => {
    if (state === 1) {
      const t = setTimeout(() => setState(2), 1500); // 1.5s delay
      return () => clearTimeout(t);
    }
  }, [state]);

  // Handle Playback Logic
  useEffect(() => {
    if (state === 2 && videoRef.current) {
      // Set volume preference (mute if audio is not unlocked)
      videoRef.current.muted = !audio;

      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay blocked, falling back to muted:", error);
          // Fallback: If browser blocks audio, mute and try again
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
      }
    }
  }, [state, audio]);

  // Optional: Keep click to skip the wait if the user is impatient
  const handleInteraction = () => {
    if (state === 1) {
      setState(2);
    }
  };

  return (
    <section className="scene" onClick={handleInteraction}>
      <video
        ref={videoRef}
        src={video}
        playsInline
        preload="auto"
        // Ensure you use the "opacity" CSS fix I mentioned earlier for smooth playback
        className={`video ${state === 2 ? "show" : "blur"}`} 
        onLoadedData={() => setIsVideoReady(true)}
        onEnded={onDone}
      />

      {/* Show Loading text if playing but buffering */}
      {state === 2 && !isVideoReady && <p style={{zIndex: 10}}>Loading...</p>}

      {state === 0 && (
        <p className="intro animate">{description}</p>
      )}

      {state === 1 && (
        <h1 className="animate">{name}</h1>
      )}
    </section>
  );
}