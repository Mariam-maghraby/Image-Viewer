import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar";
import {  Stack } from "@mantine/core";

interface Image {
  imgSrc: string;
}

const Canvas = (props: Image) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  /*for using image in canvas*/
  const [img, setImg] = useState(null);

  const canvasOffSetX = useRef(null);
  const canvasOffSetY = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
    };
    img.src = props.imgSrc;
    setImg(img);

    // context.save();

    // context.fillStyle = "#000000";
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    contextRef.current = context;

    const canvasOffSet = canvas.getBoundingClientRect();
    canvasOffSetX.current = canvasOffSet.top;
    canvasOffSetY.current = canvasOffSet.left;
  }, []);

  const startDrawingRectangle = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    startX.current = nativeEvent.clientX - canvasOffSetX.current;
    startY.current = nativeEvent.clientY - canvasOffSetY.current;

    setIsDrawing(true);
  };

  const drawRectangle = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
    const newMouseY = nativeEvent.clientY - canvasOffSetY.current;

    const rectWidht = newMouseX - startX.current;
    const rectHeight = newMouseY - startY.current;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    contextRef.current.drawImage(img, 0, 0, img.width, img.height);

    contextRef.current.strokeRect(
      startX.current,
      startY.current,
      rectWidht,
      rectHeight
    );
  };

  const stopDrawingRectangle = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <Stack>
        <Sidebar />
        <canvas
          id="canvas"
          width="600px"
          height="800px"
          ref={canvasRef}
          {...props}
          onMouseDown={startDrawingRectangle}
          onMouseMove={drawRectangle}
          onMouseUp={stopDrawingRectangle}
          onMouseLeave={stopDrawingRectangle}
        />
      </Stack>
    </>
  );
};

export default Canvas;
