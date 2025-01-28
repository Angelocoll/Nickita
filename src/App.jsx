import { useState } from "react";
import Startsidan from "./Component/Startsidan";
import img from "./img/IMG.jpg";


function App() {
  return (
    <>
    <div className="shadow">
    <div className="img"><img src={img} alt="" /></div>
    </div>
    
    <Startsidan/>
    </>
  );
}

export default App;
