import React, { useState } from "react";

function Album() {
  //state för att sätta en fullständig url på en bild
  const [imageUrl, setImageUrl] = useState(null);
  //state array för bevara alla firestore docs 
  const [firestoreDocs, setFirestoreDocs] = useState([]); 
  //state för rendera loading
  const [loading, setLoading] = useState(false); 
  //state för att spara input data name
  const [name, setName] = useState(""); 
  //state för spara input data message
  const [message, setMessage] = useState(""); 

  //funktion för att ladda upp bilder 
  //myWidget är img storage, bestämmer vart bilderna ska gå via cloudname samt uploadpreset
  //sources bestämmer hur och vart ifrån kan jag ladda upp bilderna ifrån
  //local är bild album kamera rulle, camera är en direkt bild, även möjligt att ha media/web för att ladda upp en bild ifrån nätet
  //autominify betyder att bilderna blir optimerade efter storlke samt kvalite förbättriningar, samt bestämmer bästa formatet för bilden
  //maxfilesize bestämmer hur stor den får vara i bits 2MB är 2 miljoner bits
  //sätter multiple till false för att man endast ska kunna skicka en bild itaget för att enkelt kontrollera bild storlekarna
  //advance options är om man vill efter uppladdning kunna göra saker med bilden skala den eller vända på den massa annat
  //clip/ är om man vill kunna klippa ut saker samt fokusera redigering grejer
  const handleUpload = () => {
    //om name eller message är tomma så skicka ett alert meddelande
    if (name === "" || message === "") {
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
              Name: name || null,
              url: result.info.secure_url,
            });
            //nollställ inputs fälten för ux
            setName(""); 
            setMessage("");
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

  //hämta data ifrån firestore 
  const fetchFirestoreData = async () => {
    //vi sätter loading till true medans vi hämtar data 
    setLoading(true);
    try {
      //skapa en get request ifrån en collection som heter images
      //loppa igenom datan skapa en kopia på datan  sätt min firestore doc state och fyll den med all data ifrån kopian
      const snapshot = await db.collection("Images").get();
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirestoreDocs(docs);
    } catch (error) {
      console.error("Error fetching Firestore documents:", error);
    } finally {
      //när allt är slut avslutar med finally och sätt loading tillfalse
      setLoading(false);
    }
  };

  return (
    <>
    <div className="background"><img src="https://ew.com/thmb/-_4CQzYXTdD42RAC1WaaxohHEpE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/magic-mike-manganiello_610-9718d99ba2524482a986fec7a7a54c59.jpg" alt="" /></div>
    <div className="App">
      <div className="container">

      <div className="heading">
      <h1>Lost Baby Girl</h1>
      <h2>Upload a photo for Daddy</h2>
      </div>

      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          />
      </div>
<div className="buttonbox">
      <button onClick={handleUpload} className="upload-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
</svg>

      </button>
      <button onClick={fetchFirestoreData} className="fetch-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 100 100">
  <rect x="10" y="10" width="80" height="60" fill="#e0e0e0" stroke="#000" strokeWidth="2"/>
  <circle cx="30" cy="40" r="10" fill="#ffffff" stroke="#000" strokeWidth="2"/>
  <path d="M50,60 L70,50 L80,70 L60,80 Z" fill="#ffffff" stroke="#000" strokeWidth="2"/>
</svg>

      </button>
</div>

      {loading && <p>Loading...</p>}

      {firestoreDocs.length > 0 && (
        <div>
            {firestoreDocs.map((doc) => (
              <div key={doc.id}>
                <div>
                  <img
                    src={doc.url}
                    alt={"image"}
                    />
                  <p><strong>Name:</strong> {doc.Name}</p>
                  <p><strong>Message:</strong> {doc.Message}</p>
                </div>
              </div>
            ))}
        </div>
      )}
      </div>
    </div>
      </>
  );
}

export default Album;
