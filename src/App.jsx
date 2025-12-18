import { useEffect, useState } from "react";
import "./App.css";

const wishes = [
  { name: "Mom", video: "/videos/mom.mp4" },
  { name: "Dad", video: "/videos/dad.mp4" },
  { name: "Friend1", video: "/videos/friend1.mp4" },
  { name: "Friend2", video: "/videos/friend2.mp4" },
  { name: "Friend3", video: "/videos/friend3.mp4" },
  { name: "Brother", video: "/videos/brother.mp4" },
  { name: "Bhauja", video: "/videos/bhauja.mp4" }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [opened, setOpened] = useState(0);
  const [showMontage, setShowMontage] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loading && visible < wishes.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 600);
      return () => clearTimeout(t);
    }
  }, [visible, loading]);

  if (loading) {
    return (
      <div className="loading">
        <img src="/loading.gif" />
        <p>Preparing something special…</p>
      </div>
    );
  }

  if (showMontage) {
    return (
      <div className="montage">
        <video src="/videos/montage.mp4" autoPlay controls playsInline />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {wishes.slice(0, visible).map((w, i) => (
          <div
            key={i}
            className="name"
            onTouchStart={() => open(w.video)}
            onClick={() => open(w.video)}
          >
            {w.name}
          </div>
        ))}
      </div>

      {currentVideo && (
        <div className="video-overlay">
          <video
            src={currentVideo}
            autoPlay
            controls
            playsInline
            onEnded={close}
          />
          <button className="close" onClick={close}>×</button>
        </div>
      )}
    </>
  );

  function open(video) {
    setCurrentVideo(video);
    setOpened(o => o + 1);
  }

  function close() {
    setCurrentVideo(null);
    if (opened + 1 === wishes.length) {
      setTimeout(() => setShowMontage(true), 800);
    }
  }
}
