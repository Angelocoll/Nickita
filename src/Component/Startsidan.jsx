import React, { useState } from "react";
import "../styling/Startsidan.css";
import emailjs from "@emailjs/browser";

function Startsidan() {
    const [attendance, setAttendance] = useState("");
    const [eating, setEating] = useState("");
    const [name, setName] = useState("");
    const [Allergi, setAllergi] = useState("");

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
                "service_w6gpev9", // Byt ut med ditt EmailJS Service ID
                "template_i8698uv", // Byt ut med ditt EmailJS Template ID
                templateParams,
                "rbr02god0F_jeuIC7" // Byt ut med din Public Key från EmailJS
            )
            .then(
                () => {
                    alert("Tack för din anmälan! Ett e-postmeddelande har skickats.");
                },
                (error) => {
                    console.error("Ett fel uppstod:", error);
                    alert("Kunde inte skicka e-post. Försök igen senare.");
                }
            );
    };

    return (
        <div className="container">
            <div className="boxes">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 29.6" width="16" height="16" className="heart-icon">
                    <path d="M23.6,0c-2.8,0-5.3,1.1-7.6,3.2C13.7,1.1,11.2,0,8.4,0C3.7,0,0,3.7,0,8.4c0,4.2,3.4,8.2,10.3,13.8 c1.5,1.2,3.2,2.5,5.1,3.9c1.9-1.4,3.6-2.7,5.1-3.9C28.6,16.6,32,12.6,32,8.4C32,3.7,28.3,0,23.6,0z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 29.6" width="16" height="16" className="heartt-icon">
                    <path d="M23.6,0c-2.8,0-5.3,1.1-7.6,3.2C13.7,1.1,11.2,0,8.4,0C3.7,0,0,3.7,0,8.4c0,4.2,3.4,8.2,10.3,13.8 c1.5,1.2,3.2,2.5,5.1,3.9c1.9-1.4,3.6-2.7,5.1-3.9C28.6,16.6,32,12.6,32,8.4C32,3.7,28.3,0,23.6,0z"></path>
                </svg>
                <h1>Nickita 30 År</h1>
                <p>Den 12 Apil är du Välkommen att fira kvällen med mig på xxx klockan xx.</p>
                <p>För de som vill äta så börjar kvällen xx:xx för er som vill anlända senare är ni välkommna klockan xx:xx.</p>
                <p>Det bjuds på välkomstdrink (+shot!) och sen har baren öppet natten lång<br /> (iaf till 03:00)</p>
                <p>OSA senast xx nedan om du kan komma eller inte Om du önskar mat och i så fall om du har matpreferenser.</p>
                <p>Infomation <br /><br />Plats: Red Fox<br /><br />När: 19:00<br /><br />OSA senast: 6 april<br /><br />Tema: Black & White</p> 
            </div>

            <div className="boxes box">
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
                    <label htmlFor="kommer_yes">Ja</label>

                    <input
                        type="radio"
                        name="Kommer"
                        id="kommer_no"
                        value="no"
                        checked={attendance === "no"}
                        onChange={() => setAttendance("no")}
                    />
                    <label htmlFor="kommer_no">Nej</label>
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
                    <label htmlFor="äter_yes">Ja</label>

                    <input
                        type="radio"
                        name="äta"
                        id="äter_no"
                        value="no"
                        checked={eating === "no"}
                        onChange={() => setEating("no")}
                    />
                    <label htmlFor="äter_no">Nej</label>
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

            <div className="buttons">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 29.6" width="16" height="16" className="hearttt-icon">
                        <path d="M23.6,0c-2.8,0-5.3,1.1-7.6,3.2C13.7,1.1,11.2,0,8.4,0C3.7,0,0,3.7,0,8.4c0,4.2,3.4,8.2,10.3,13.8 c1.5,1.2,3.2,2.5,5.1,3.9c1.9-1.4,3.6-2.7,5.1-3.9C28.6,16.6,32,12.6,32,8.4C32,3.7,28.3,0,23.6,0z"></path>
                    </svg>
                    Ta bild
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 29.6" width="16" height="16" className="heartttt-icon">
                        <path d="M23.6,0c-2.8,0-5.3,1.1-7.6,3.2C13.7,1.1,11.2,0,8.4,0C3.7,0,0,3.7,0,8.4c0,4.2,3.4,8.2,10.3,13.8 c1.5,1.2,3.2,2.5,5.1,3.9c1.9-1.4,3.6-2.7,5.1-3.9C28.6,16.6,32,12.6,32,8.4C32,3.7,28.3,0,23.6,0z"></path>
                    </svg>
                    Se bilder
                </button>
            </div>
        </div>
    );
}

export default Startsidan;
