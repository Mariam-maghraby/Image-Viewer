import React, { useEffect, useRef } from "react";

interface Image {
  imgSrc: string;
}

const Canvas = (props: Image) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = props.imgSrc;

    // context.fillStyle = "#000000";
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  });

  return <canvas width="600px" height="800px" ref={canvasRef} {...props} />;
};

export default Canvas;
