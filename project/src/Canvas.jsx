import { useEffect, useState } from "react";
import canvasImage from "./canvasimage";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const scale = window.devicePixelRatio;
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = canvasImage[index.value];

    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;

      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [index]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${size * 1.5}px`,
        height: `${size * 1.5}px`,
        position: "relative", // changed from 'absolute' to 'relative'
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zIndex,
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;
