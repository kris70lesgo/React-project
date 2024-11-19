import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


// Import ScrollTrigger if needed for animations
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Create context for GSAP
const ctx = gsap.context(() => {});
// useGSAP needs a scope to work properly
// Move the context inside the App component
// Remove the global context declaration

function App() {

  const[showCanvas ,setShowCanvas] = useState(false);
  const growingSpan = useRef(null);
  const mainRef = useRef(null);

  useGSAP(() => {
    const handleClick = (e) => {
      setShowCanvas(!showCanvas);
      
      gsap.set(growingSpan.current, {
        top: e.clientY,
        left: e.clientX,
        scale: 0,
        opacity: 1
      });

      const tl = gsap.timeline();

      tl.to(growingSpan.current, {
        scale: 1000,
        duration: 1.5,
        ease: "power3.inOut",
      })
      .to("body", {
        backgroundColor: "#fd2c2a",
        color: "black",
        duration: 1,
        ease: "power2.inOut",
      }, "<")
      .set(growingSpan.current, {
        opacity: 0,
        scale: 0,
      });
    };

    mainRef.current.addEventListener("click", handleClick);

    return () => {
      mainRef.current?.removeEventListener("click", handleClick);
    };
  }, [showCanvas]);

  return (
    <main 
      ref={mainRef}
      data-scroll-container 
      className="w-full min-h-screen cursor-pointer"
    >  
      <span ref={growingSpan} className="growing-span"></span>
      <div className="w-full h-[800px] bg-black  text-white relative font-['Helvetica-Now-Display']">
        {showCanvas && data[0].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}
        

        <div className="w-full h-screen text-white relative bg-red">
         <nav className="fixed top-0 left-0 w-full p-8 flex justify-between z-[999]">
            <div className="brand text2xl font-regular text-white">Brand</div>
            <div className="links flex gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a key={index}
                href={`#${link.toLowerCase()}`}
                className="text-md hover:text-gray-300">
                  {link}
                </a>
              ))

              }
            </div>
         </nav>

         <div>
          {showCanvas && data[8].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}
          
         </div>


         <div className="textcontainer   px-[40%] text-white">
           
           <h1 className="nowhere-text text-4xl font-regular pl-[30%]">Nowhere</h1>
          </div>
          
          
         </div>

         



      </div>









      <div className="about-section">
        


        <h2 className="about-text">about the brand</h2>
        <p className="about-text  ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis consequatur perferendis porro. Perspiciatis, nemo blanditiis. Esse, sit nisi quam iusto, harum quidem laboriosam quisquam neque debitis, possimus sint qui error.

        </p>
        <img className="w-[80%] mt-10"
        src="" alt="">
        </img>
      </div>
      {showCanvas && data[3].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}

      

    </main>
  );
}

export default App;
