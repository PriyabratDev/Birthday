import { useEffect } from "react";

export default function Loading({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <section className="scene">
      <img src="/loading.gif" style={{ width: "140px" }} />
      <p>Preparing something special…</p>
    </section>
  );
}
