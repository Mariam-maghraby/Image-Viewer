import { useState } from "react";
import { Text, Box, Group, useMantineTheme } from "@mantine/core";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES, FileWithPath } from "@mantine/dropzone";

import Canvas from "./Canvas";

export function ImageViewer() {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const preview = files.map((file) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <>
        {/* <Button onClick={() => files.pop()} > Upload New Image</Button> */}
        <Canvas imgSrc={imageUrl} />
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
            <Text size="sm" className="text-gray-500" inline >
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    );
  }

  if (files.length) {
    return (
      <>
        <Box>{preview[0]}</Box>
      </>
    );
  }
}
