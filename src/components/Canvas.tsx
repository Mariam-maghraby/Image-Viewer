import { useEffect, useRef, useState } from "react";
import { Stack, Button } from "@mantine/core";
import exifr from "exifr";
import piexif from "piexifjs";

interface Image {
  imgSrc: string;
}

const Canvas = (props: Image) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  /*for using image in canvas*/
  const [img, setImg] = useState(null);

  const [imgMetaData, setImgMetaData] = useState(null);

  const canvasOffSetX = useRef(null);
  const canvasOffSetY = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);

  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y1, setY1] = useState(0);
  const [y2, setY2] = useState(0);

  const imagesBuffer = [];

  const getImgMetaData = async (file) => {
    const exifData = await exifr.parse(file);
    console.log("exifData", exifData);
    setImgMetaData(exifData);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
    };
    img.src = props.imgSrc;

    setImg(img);
    getImgMetaData(img);

    // context.save();

    // context.fillStyle = "#000000";
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    contextRef.current = context;

    const canvasOffSet = canvas.getBoundingClientRect();
    canvasOffSetX.current = canvasOffSet.top;
    canvasOffSetY.current = canvasOffSet.left;
  }, [props.imgSrc]);

  const startDrawingRectangle = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    startX.current = nativeEvent.clientX - canvasOffSetX.current;
    startY.current = nativeEvent.clientY - canvasOffSetY.current;

    setX1(startX.current);
    setY1(startY.current);

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

    contextRef.current.drawImage(
      img,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    contextRef.current.strokeRect(
      startX.current,
      startY.current,
      rectWidht,
      rectHeight
    );
    setX2(newMouseX);
    setY2(newMouseY);
  };

  const stopDrawingRectangle = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <Stack>
        {/* <Sidebar /> */}
        <Button
          onClick={() => {
            const width = x2 - x1;
            const height = y2 - y1;
            const local_x1 = x1;
            const local_y1 = y1;
            // const local_x2 = x2;
            // const local_y2 = y2;
            console.log(
              `x1: ${x1}, x2: ${x2},  y1: ${y1}, y2: ${y2}, width: ${
                x2 - x1
              }, height: ${y2 - y1}`
            );

            const pixelsData = contextRef.current.getImageData(
              local_x1,
              local_y1,
              width,
              height
            );
            const orginalData = pixelsData.data;
            const removedData = pixelsData.data;

            for (let i = 0; i < removedData.length; i += 4) {
              removedData[i] = 0;
              removedData[i + 1] = 0;
              removedData[i + 2] = 0;
            }
            contextRef.current.putImageData(pixelsData, local_x1, local_y1);

            contextRef.current.save();

            console.log("orginalData", orginalData);
            const dataObject = {
              orginalData: orginalData,
              local_x1: local_x1,
              local_y1: local_y1,
              width: width,
              height: height,
            };

            imagesBuffer.push(dataObject);

            const exifbytes = piexif.dump(imgMetaData);
            console.log("exifBytes:", exifbytes);

            const jpeg = canvasRef.current.toDataURL("image/jpeg", 0.75); // mime=JPEG, quality=0.75
            console.log(jpeg.length);

            // setImgMetaData(exifbytes);

            const newJpeg = piexif.insert(exifbytes, jpeg);
            console.log("newJpeg", newJpeg);
          }}>
          Hide Selected Area
        </Button>
        <Button
          onClick={() => {
            contextRef.current.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );

            console.log(`x, y: ${x1}, ${y1}`);
            const width = imagesBuffer[0].width;
            console.log("width", width);
            const height = imagesBuffer[0].height;

            const min_x = imagesBuffer[0].local_x1;
            const max_x = imagesBuffer[0].local_x2 + width;

            const min_y = imagesBuffer[0].local_y1;
            const max_y = imagesBuffer[0].local_y1 + height;

            if (x1 < max_x && x1 > min_x && y1 < max_y && y1 > min_y) {
              const pixelsData = contextRef.current.getImageData(
                min_x,
                min_y,
                width,
                height
              );
              const currentData = pixelsData.data;
              const originalData = imagesBuffer[0].orginalData;
              for (let i = 0; i < currentData.length; i += 4) {
                currentData[i] = originalData[i];
                currentData[i + 1] = originalData[i + 1];
                currentData[i + 2] = originalData[i + 2];
              }

              contextRef.current.putImageData(originalData, min_x, min_y);
            } else {
              alert("Please select the one of the hidden blocks");
            }
          }}>
          Show Selected Area
        </Button>
        <Button
          onClick={() => {
            contextRef.current.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            contextRef.current.drawImage(
              img,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }}>
          Show All hidden blocks
        </Button>
        <Button
          onClick={async () => {
            const link = document.createElement("a");
            link.download = "download.jpeg";
            const exifbytes = piexif.dump(imgMetaData);
            const currJpeg = canvasRef.current.toDataURL("image/jpeg", 0.75); // mime=JPEG, quality=0.75
            const newJpeg = piexif.insert(exifbytes, currJpeg);
            link.href = newJpeg;
            link.click();
            link.delete;
          }}>
          Download Image
        </Button>

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
