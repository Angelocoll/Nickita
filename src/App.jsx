import { useState } from "react";
import Startsidan from "./Component/Startsidan";
import img from "./img/IMG.jpg";


function App() {
  return (
    <div className="root">
    <div className="shadow">
    <div className="img"><img src={img} alt="" /></div>
    </div>
    
    <Startsidan/>
    </div>
  );
}

export default App;
