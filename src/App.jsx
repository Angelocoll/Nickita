import { useEffect, useState } from "react";
import Startsidan from "./Component/Startsidan";
import img from "./img/IMG.jpg";

function App() {
  // Dynamiskt sätt var(--vh) för att fixa iOS 100vh-problemet
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Kör funktionen direkt och när fönstret ändras
    setVh();
    window.addEventListener("resize", setVh);

    // Rensa event listener vid unmount
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <>
      <div className={`shadow`}>
        
      </div>

      <Startsidan />
    </>
  );
}

export default App;