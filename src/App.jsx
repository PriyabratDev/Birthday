import { useEffect, useRef, useState } from "react";
import Loading from "./scenes/Loading";
import Intro from "./scenes/Intro";
import Wishes from "./scenes/Wishes";
import Story from "./scenes/Story";
import Montage from "./scenes/Montage";

// 1. Define the order of appearance
const scenes = [
  "loading",
  "intro",
  "wishes",
  "bou",            // Mom
  "baba",           // Dad
  "mama",           // Uncle
  "bada_mamu_mai",  // Elder Uncle & Aunt
  "sana_mai",       // Younger Aunt
  "liza_khudi",     // Liza Aunt
  "pinky_khudi",    // Pinky Aunt
  "golia_dada",     // Golia Uncle/Brother
  "bhauja",         // Sister-in-law
  "sudu_bhai",      // Sudu Brother
  "bro",            // Brother
  "omm",            // Omm
  "jeny",           // Jeny
  "kalu",           // Kalu
  "chuin",          // Little one
  "montage"
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [locked, setLocked] = useState(false);
  const cooldown = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (locked || cooldown.current || index === 0) return;

      cooldown.current = true;
      setIndex((i) => Math.min(i + 1, scenes.length - 1));

      setTimeout(() => {
        cooldown.current = false;
      }, 1200); // Slightly longer cooldown to prevent skipping
    }

    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [locked, index]);

  function next() {
    if (!locked) {
      setIndex((i) => Math.min(i + 1, scenes.length - 1));
    }
  }

  const current = scenes[index];

  return (
    <div className="scene-container">
      <div key={current} className="scene-wrapper animate">
        
        {current === "loading" && <Loading onDone={next} />}

        {current === "intro" && (
          <Intro unlockAudio={() => setAudioUnlocked(true)} />
        )}

        {/* Pass 'lock' to Wishes to fix the scrolling issue */}
        {current === "wishes" && <Wishes lock={setLocked} />}

        {/* --- FAMILY STORIES START HERE --- */}

        {current === "bou" && (
          <Story
            name="Bou"
            description="The heart of our world."
            video="/videos/bou.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "baba" && (
          <Story
            name="Baba"
            description="Our guiding light and strength."
            video="/videos/baba.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "mama" && (
          <Story
            name="Mama"
            description="Always there with a smile."
            video="/videos/mama.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "bada_mamu_mai" && (
          <Story
            name="Bada Mamu & Mai"
            description="Blessings from the elders."
            video="/videos/Bada_Mamu_Mai.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "sana_mai" && (
          <Story
            name="Sana Mai"
            description="Full of love and warmth."
            video="/videos/sana_mai.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "liza_khudi" && (
          <Story
            name="Liza Khudi"
            description="Bringing joy to every moment."
            video="/videos/liza_khudi.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "pinky_khudi" && (
          <Story
            name="Pinky Khudi"
            description="Smiles that light up the room."
            video="/videos/pinky_khudi.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "golia_dada" && (
          <Story
            name="Golia Dada"
            description="Supportive and kind always."
            video="/videos/golia_dada.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "bhauja" && (
          <Story
            name="Bhauja"
            description="More like a sister than an in-law."
            video="/videos/bhauja.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "sudu_bhai" && (
          <Story
            name="Sudu Bhai"
            description="A brother and a friend."
            video="/videos/sudu_bhai.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "bro" && (
          <Story
            name="Bro"
            description="Partners in crime since day one."
            video="/videos/bro.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "omm" && (
          <Story
            name="Omm"
            description="Wishing you the very best."
            video="/videos/omm.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "jeny" && (
          <Story
            name="Jeny"
            description="Sending love and happiness."
            video="/videos/jeny.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "kalu" && (
          <Story
            name="Kalu"
            description="Memories we cherish."
            video="/videos/kalu.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {current === "chuin" && (
          <Story
            name="The Little One"
            description="Small feet, biggest smiles."
            video="/videos/chuin.mp4"
            audio={audioUnlocked}
            lock={setLocked}
            onDone={next}
          />
        )}

        {/* --- END FAMILY STORIES --- */}

        {current === "montage" && (
          <Montage video="/videos/montage.mp4" audio={audioUnlocked} />
        )}
      </div>
    </div>
  );
}