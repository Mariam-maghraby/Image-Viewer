import { useRef, useState } from "react";
import { Text, Box, Group, useMantineTheme } from "@mantine/core";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES, FileWithPath } from "@mantine/dropzone";
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  SelectionLayer,
  wrapShape,
} from "react-shape-editor";

function arrayReplace(arr: [], index: number, item: any) {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1),
  ];
}

const RectShape = wrapShape(({ width, height }) => (
  <rect width={width} height={height} fill="rgba(0,0,255,0.5)" />
));

let idIterator = 1;

export function ImageViewer() {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const [items, setItems] = useState([
    { id: "1", x: 20, y: 120, width: 145, height: 140 },
    { id: "2", x: 15, y: 0, width: 150, height: 95 },
  ]);

  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });
  const [selectedShapeIds, setSelectedShapeIds] = useState([]);

  
  

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <>
        <ShapeEditor
          
          vectorWidth={vectorWidth}
          vectorHeight={vectorHeight}>
          <ImageLayer
            key={index}
            src={imageUrl}
            onLoad={({ naturalWidth, naturalHeight }) => {
              setVectorDimensions({
                vectorWidth: naturalWidth,
                vectorHeight: naturalHeight,
              });
            }}
          />
          <DrawLayer
            onAddShape={({ x, y, width, height }) => {
              setItems((currentItems) => [
                ...currentItems,
                { id: `id${idIterator}`, x, y, width, height },
              ]);
              idIterator += 1;
            }}
          />
          {items.map((item, index) => {
            const { id, height, width, x, y } = item;
            return (
              <RectShape
                key={id}
                shapeId={id}
                height={height}
                width={width}
                x={x}
                y={y}
                onChange={(newRect) => {
                  setItems((currentItems) =>
                    arrayReplace(currentItems, index, {
                      ...item,
                      ...newRect,
                    })
                  );
                }}
                onDelete={() => {
                  setItems((currentItems) =>
                    arrayReplace(currentItems, index, [])
                  );
                }}
              />
            );
          })}
        </ShapeEditor>
      </>
    );
  });

  if (files.length == 0) {
    return (
      <Dropzone
        onDrop={setFiles}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg]}>
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" className="text-gray-500" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    );
  }

  if (files.length) {
    return <Box>{previews}</Box>;
  }
}
