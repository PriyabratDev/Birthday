import { useEffect } from "react";

export default function Wishes({ lock }) {
  useEffect(() => {
    if (lock) {
      lock(true);

      const timer = setTimeout(() => {
        lock(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
        lock(false); // Safety unlock
      };
    }
  }, [lock]);

  return (
    <section className="scene">
      <p>
        The following are messages and wishes from the people
        who love you the most.
      </p>
      <p className="animate" style={{ animationDelay: "1s" }}>
        Scroll to reveal them.
      </p>
    </section>
  );
}