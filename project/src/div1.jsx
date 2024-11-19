import React from "react";
import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import { useEffect } from "react";



function Div1(){
    return(
        <>
            <div>
                {data[0].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                 ))}
             </div>
            <div>
                {data[1].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                ))}
        </div>
        
        </>
        
    )
}

export default Div1;

