export default function Intro({ unlockAudio }) {
  return (
    <section className="scene" onClick={unlockAudio}>
      <h1>Happy Birthday 🎉</h1>
      <p>Tap once, then scroll</p>
    </section>
  );
}
