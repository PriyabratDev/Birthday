import { useEffect, useRef } from "react";

export default function Montage({ video, audio }) {
  const ref = useRef(null);

  useEffect(() => {
    if (audio) ref.current.play();
  }, [audio]);

  return (
    <section className="scene">
      <video ref={ref} src={video} playsInline />
      <h1>Happy Birthday ❤️</h1>
    </section>
  );
}
