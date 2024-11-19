import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import { useEffect } from "react";



function Div2(){
    return(
        <>
            <div>
                {data[1].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                 ))}
             </div>
            
        
        </>
        
    )
}

export default Div2;