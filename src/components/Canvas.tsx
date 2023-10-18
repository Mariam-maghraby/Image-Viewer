import React, { useEffect, useRef } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
    };
    img.src =
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80";

    // context.fillStyle = "#000000";
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  });

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
