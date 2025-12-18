import { useEffect, useState } from "react";
import StorySection from "./components/StorySection";
import FinalMontage from "./components/FinalMontage";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <img src="/loading.gif" alt="loading" />
        <p>Preparing something special…</p>
      </div>
    );
  }

  return (
    <>
      {/* Initial Birthday Screen */}
      <section className="intro-section center">
  <h1>Happy Birthday 🎉</h1>
  <br />
  <p>Keep scrolling</p>
</section>

      {/* Context Message */}
      <section className="intro-section center">
  <p>
    The following are messages and wishes from your family
    and people who care deeply about you.
  </p>
  <br />
  <p>Scroll to reveal the surprises.</p>
</section>

      {/* Family Sections */}
      <StorySection
        name="Mom"
        text="The quiet strength behind everything."
        video="/videos/mom.mp4"
      />
      <StorySection
        name="Dad"
        text="Always present, even in silence."
        video="/videos/dad.mp4"
      />
      <StorySection
        name="Best Friend"
        text="Chosen family matters."
        video="/videos/friend.mp4"
      />
      <StorySection
        name="Brother"
        text="Built-in ally for life."
        video="/videos/brother.mp4"
      />
      <StorySection
        name="ahem ahem"
        text="The one who knows your present."
        video="/videos/bhauja.mp4"
      />

      {/* Final Montage */}
      <FinalMontage video="/videos/montage.mp4" />
    </>
  );
}
