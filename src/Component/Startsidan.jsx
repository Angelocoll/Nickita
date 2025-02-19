import React, { useState, useEffect, useRef } from "react";
import "../Startsidan.css";
import emailjs from "@emailjs/browser";
import img from "../img/tes.png";
import imgen from "../img/nickita.webp";
import imgens from "../img/bild.jpg";

function Startsidan() {
  const [attendance, setAttendance] = useState("");
  const [eating, setEating] = useState("");
  const [name, setName] = useState("");
  const [Allergi, setAllergi] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [imageUrl, setImageUrl] = useState(null);
  const [namee, setNamee] = useState("");
  const [message, setMessage] = useState("");
  const confettiContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const confettiContainer = confettiContainerRef.current;

    if (confettiContainer) {
      const confettiCount = 50;
      const confettiColors = ["#FFD700", "black"];

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.backgroundColor = randomColor;

        const randomX = Math.random() * 100 - 50;
        const randomDuration = Math.random() * 3 + 2;
        confetti.style.setProperty("--x", randomX + "vw");
        confetti.style.animationDuration = randomDuration + "s";

        confettiContainer.appendChild(confetti);
      }

      setTimeout(() => {
        if (confettiContainer) {
          confettiContainer.innerHTML = "";
        }
      }, 5000);
    }
  }, []);

  const handleSubmit = () => {
    if (!name) {
      alert("Fyll i ditt namn innan du skickar.");
      return;
    }

    const templateParams = {
      name,
      attendance,
      eating,
      Allergi,
    };

    emailjs
      .send(
        "service_faufpvw",
        "template_i8698uv",
        templateParams,
        "rbr02god0F_jeuIC7"
      )
      .then(
        () => {
          alert("Jag hoppas att du är redo för en oförglömlig kväll!");

          setName("");
          setAttendance("");
          setEating("");
          setAllergi("");
        },
        (error) => {
          console.error("Ett fel uppstod:", error);
          alert("Kunde inte skicka. Försök igen senare.");
        }
      );
  };

  const handleUpload = () => {
    if (namee === "" || message === "") {
      alert("Du måste fylla i namn och meddelande");
      return;
    }
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dlofpydih",
        uploadPreset: "Nickita",
        sources: ["local", "camera"],
        multiple: false,
        showAdvancedOptions: false,
        autoMinify: true,
        maxFileSize: 2000000,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
          try {
            await db.collection("Images").add({
              Message: message || null,
              Name: namee || null,
              url: result.info.secure_url,
            });
            setNamee("");
            setMessage("");
            setShowModal(false);
          } catch (firestoreError) {
            console.error("Firestore: uppladdnings fel", firestoreError);
          }
        } else if (error) {
          console.error("Cloudinary uppladdnings fel", error);
        }
      }
    );
    myWidget.open();
  };

  return (
    <>
      <header>
        <div>
      🥂
        </div>
        <h1> Nickita 30 År 
         </h1>
       <div>

         🥂
       </div>
      </header>
      <div className="hidden">
        <h1 className="hidden">Nickita 30 År</h1>
      </div>

      <div className="container">
        <div className="boxes boxx">
          <div className="confetti-container" ref={confettiContainerRef}>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
          </div>
          <img src={img} alt="" />
          <div className="shad"></div>
          <p>
            Den 12 April är du Välkommen att fira kvällen med mig på Red fox klockan
            22:00. För de som vill äta så börjar kvällen 19:00. <br />
            Det bjuds på välkomstdrink (+shot!) och sen har baren öppet natten
            lång<br /> <span>(iaf till 03:00)</span> <br />
            OSA senast 6 April nedan om du kan komma eller inte Om du önskar mat och i
            så fall om du har matpreferenser. <br />
            Asiatisk buffe står på menyn.
          </p>
          <p>
            <span className="info">Infomation</span> <br />
            Plats: Red Fox - Tema: Festival<br />
            <br />
            När: 22:00 - OSA senast: 6 april
          </p>
        </div>

        <div className="boxes box">
          <div>
            <img src={imgen} alt="" />
            <button onClick={() => {
              setShowModal(true);
            }}>
              Ta bild
            </button>
            {isMobile && (
              <button>
                Se bilder
              </button>
            )}
          </div>
          <div>
            <h2>Anmälan</h2>
            <label htmlFor="kommer_yes">Kommer du?</label>
            <div>
              <input
                type="radio"
                name="Kommer"
                id="kommer_yes"
                value="yes"
                checked={attendance === "yes"}
                onChange={() => setAttendance("yes")}
              />
              <label className="lab" htmlFor="kommer_yes">
                Ja
              </label>

              <input
                type="radio"
                name="Kommer"
                id="kommer_no"
                value="no"
                checked={attendance === "no"}
                onChange={() => setAttendance("no")}
              />
              <label className="lab" htmlFor="kommer_no">
                Nej
              </label>
            </div>

            <label htmlFor="äter_yes">Ska du äta? <br /> (350Kr per person)</label>
            <div>
              <input
                type="radio"
                name="äta"
                id="äter_yes"
                value="yes"
                checked={eating === "yes"}
                onChange={() => setEating("yes")}
              />
              <label className="lab" htmlFor="äter_yes">
                Ja
              </label>

              <input
                type="radio"
                name="äta"
                id="äter_no"
                value="no"
                checked={eating === "no"}
                onChange={() => setEating("no")}
              />
              <label className="lab" htmlFor="äter_no">
                Nej
              </label>
            </div>
            <input
              type="text"
              placeholder="Ditt Namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Allergier"
              value={Allergi}
              onChange={(e) => setAllergi(e.target.value)}
            />

<div className="butt">
              <button onClick={handleSubmit}>Skicka</button>
            </div>
          </div>
          {!isMobile && (
            <div>
              <img src={imgens} alt="" />
              <button onClick={() => {}}>Se bilder</button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ladda upp en bild</h2>
            <div className="input-container">
              <input
                type="text"
                value={namee}
                onChange={(e) => setNamee(e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
              />
            </div>
            <button onClick={handleUpload} className="upload-button">
              Ladda upp
            </button>
            <button onClick={() => setShowModal(false)} className="close-button">
              Avbryt
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Startsidan;