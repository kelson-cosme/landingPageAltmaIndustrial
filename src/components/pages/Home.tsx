import { useEffect, useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";

const totalFrames = 1187;

function padNumber(number: number, length: number) {
  return number.toString().padStart(length, "0");
}

type PhrasePosition = Partial<React.CSSProperties>;

const phrases: { text: string; position: PhrasePosition }[] = [
  {
    text: "Mais de 20 anos de experiência em soluções industriais.",
    position: { top: "20%", right: "50%", textAlign: "left" },
  },
  {
    text: "Especialistas em locação de caminhões munck e guindastes.",
    position: { top: "35%", left: "50%", transform: "translateX(-50%)", textAlign: "center" },
  },
  {
    text: "Montagens industriais com segurança e precisão.",
    position: { bottom: "25%", right: "10%", textAlign: "right" },
  },
  {
    text: "Atendemos projetos no setor sucroenergético e etanol.",
    position: { top: "60%", left: "15%", textAlign: "left" },
  },
  {
    text: "Eficiência, comprometimento e inovação em cada entrega.",
    position: { top: "40%", textAlign: "center" },
  },
];

function Home() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  const [currentFrame, setCurrentFrame] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(phrases[0].text);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      const frameIndex = Math.min(totalFrames, Math.max(1, Math.ceil(value * totalFrames)));
      if (frameIndex !== currentFrame) {
        setImgLoaded(false);
        setCurrentFrame(frameIndex);
      }

      const index = Math.floor(value * phrases.length);
      if (index !== activePhraseIndex) {
        setActivePhraseIndex(Math.min(phrases.length - 1, index));
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, currentFrame, activePhraseIndex]);

  // Troca suave do texto com delay, sem desmontar
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedText(phrases[activePhraseIndex].text);
    }, 100); // atraso sutil reduz transição bruta

    return () => clearTimeout(timeout);
  }, [activePhraseIndex]);

  const imageSrc = `/frames/frame_${padNumber(currentFrame, 4)}.jpg`;
  const currentPosition = phrases[activePhraseIndex].position;

  return (
    <div style={{ height: "300vh", backgroundColor: "#000" }}>
      {/* Frame principal */}
      <img
        src={imageSrc}
        alt={`Frame ${currentFrame}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => console.error("Erro ao carregar a imagem:", imageSrc)}
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          position: "sticky",
          top: 0,
          zIndex: 1,
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Overlay escurecido */}
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "100vh",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.70))",
          zIndex: 2,
        }}
      />

      {/* Frase com fade interno, sem desmontar */}
      <motion.div
  className="fixed z-3 text-white text-[4.0vh] font-normal pointer-events-none max-w-[80%]"
  style={{
    textShadow: "0 4px 20px rgba(0,0,0,0.8)",
    ...currentPosition,
  }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
>
  <motion.span
    animate={{ opacity: [0.5, 1] }}
    transition={{ duration: 0.4 }}
  >
    {displayedText}
  </motion.span>
</motion.div>


      {/* Espaço para scroll */}
      <div style={{ height: "200vh" }} />
    </div>
  );
}

export default Home;
