import React, { useState } from "react";
import "../Startsidan.css";
import emailjs from "@emailjs/browser";
import img from "../img/tes.png";
import imgen from "../img/nickita.webp";

function Startsidan() {
    const [attendance, setAttendance] = useState("");
    const [eating, setEating] = useState("");
    const [name, setName] = useState("");
    const [Allergi, setAllergi] = useState("");
    const [showModal, setShowModal] = useState(false); // För popup/modal


    //state för att sätta en fullständig url på en bild
      const [imageUrl, setImageUrl] = useState(null);
      //state för att spara input data name
      const [namee, setNamee] = useState(""); 
      //state för spara input data message
      const [message, setMessage] = useState("");

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
                "service_faufpvw", // Byt ut med ditt EmailJS Service ID
                "template_i8698uv", // Byt ut med ditt EmailJS Template ID
                templateParams,
                "rbr02god0F_jeuIC7" // Byt ut med din Public Key från EmailJS
            )
            .then(
                () => {
                    alert("Tack för din anmälan! Ett e-postmeddelande har skickats.");

                    setName("");
                    setAttendance("");
                    setEating("");
                    setAllergi("");
                },
                (error) => {
                    console.error("Ett fel uppstod:", error);
                    alert("Kunde inte skicka e-post. Försök igen senare.");
                }
            );

    };

    const handleUpload = () => {
        //om name eller message är tomma så skicka ett alert meddelande
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
            maxFileSize: 2000000, // Max size 2MB
          },
          async (error, result) => {
            //om inte error finns men result finns och result.event är lika med sucess gå in i denna
            if (!error && result && result.event === "success") {
    //sätt imgurl till result.info.secure_url detta är vad vi får tillbaka ett objeckt ifrån result vi går bara djupare in på den
              setImageUrl(result.info.secure_url);
    //försök sätt in objektet och add till firestores med collection images viktigt rätt struktur i postet om inte name finns eller message sätt den till null
              try {
                await db.collection("Images").add({
                  Message: message || null,
                  Name: namee || null,
                  url: result.info.secure_url,
                });
                //nollställ inputs fälten för ux
                setNamee(""); 
                setMessage("");
                setShowModal(false);
                //om nåt gick fel fånga felet console.log(felet så att vi kan lösa det eller iallafall se om det handlar om cloud eller firestore)
              } catch (firestoreError) {
                console.error("Firestore: uppladdnings fel", firestoreError);
              }
            } else if (error) {
              console.error("Cloudinary uppladdnings fel", error);
            }
          }
        );
        //öppna widget för att ladda upp bildenså snabbt funktionen körs inbyggt att inget går vidare om widget inte får vad den önskar och förväntar sig 
        //definerat att den förväntar sig en bild med bild.format i cloyd
        myWidget.open();
      };

    return (
        <>
        <header><h1>Nickita 30 År</h1> </header>
        <div className="hidden"><h1 className="hidden">Nickita 30 År</h1></div>
        

        <div className="container">
            <div className="boxes boxx">
                <img src={img} alt="" />
                <div className="shad"></div>
                <p>
                    Den 12 April är du Välkommen att fira kvällen med mig på xxx klockan xx. 
                    För de som vill äta så börjar kvällen xx:xx för er som vill anlända senare är ni välkomna klockan xx:xx.
                    </p>
                <p>Det bjuds på välkomstdrink (+shot!) och sen har baren öppet natten lång<br /> <span>(iaf till 03:00)</span> <br />OSA senast xx nedan om du kan komma eller inte Om du önskar mat och i så fall om du har matpreferenser.
                </p>
                <p><span className="info">Infomation</span> <br />Plats: Red Fox - Tema: Festival<br /><br />När: 19:00 - OSA senast: 6 april</p> 
            </div>

            <div className="boxes box">
                <div>
                    <img src={imgen} alt="" />
                    <button onClick={() => { setShowModal(true);}}>
                    Ta bild
                </button>
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
                    <label className="lab" htmlFor="kommer_yes">Ja</label>

                    <input
                        type="radio"
                        name="Kommer"
                        id="kommer_no"
                        value="no"
                        checked={attendance === "no"}
                        onChange={() => setAttendance("no")}
                        />
                    <label className="lab" htmlFor="kommer_no">Nej</label>
                </div>

                <label htmlFor="äter_yes">Ska du äta?</label>
                <div>
                    <input
                        type="radio"
                        name="äta"
                        id="äter_yes"
                        value="yes"
                        checked={eating === "yes"}
                        onChange={() => setEating("yes")}
                        />
                    <label className="lab" htmlFor="äter_yes">Ja</label>

                    <input
                        type="radio"
                        name="äta"
                        id="äter_no"
                        value="no"
                        checked={eating === "no"}
                        onChange={() => setEating("no")}
                        />
                    <label className="lab" htmlFor="äter_no">Nej</label>
                </div>
                <input
                    type="text"
                    placeholder="Ditt Namn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                <input type="text" placeholder="Allergier" value={Allergi}
                    onChange={(e) => setAllergi(e.target.value)} />

                <div className="butt">
                    <button onClick={handleSubmit}>Skicka</button>
                </div>
            </div>
                <div>
                    <img src={imgen} alt="" />
                <button>
                    Se bilder
                </button>
                </div>
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
