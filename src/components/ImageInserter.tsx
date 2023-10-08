import { Group, Text, useMantineTheme } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  MIME_TYPES,
} from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

interface ImagePlaceHolderProps extends Partial<DropzoneProps> {
  onUpload: (files: FileWithPath[]) => void;
}

export function InsertImagePlaceHolder({
  onUpload,
  ...props
}: ImagePlaceHolderProps) {
  const theme = useMantineTheme();

  const handleUpload = (files: FileWithPath[]) => {
    onUpload(files);
  };

  return (
    <Dropzone
      onDrop={handleUpload}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg]}
      {...props}>
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
