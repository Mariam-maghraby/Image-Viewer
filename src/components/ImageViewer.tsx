import { Box, Image } from "@mantine/core";

export interface ImagePreviewProps {
  image: string;
  onLoadImg: () => void;
}

export function ImagePreview({ image: url, onLoadImg }: ImagePreviewProps) {
  return (
    <Box className="flex justify-center">
      <Image
        classNames={{ imageWrapper: "flex justify-center" }}
        width={"100%"}
        src={url}
        alt={"an uploaded image"}
        imageProps={{ onLoad: onLoadImg }}
      />
    </Box>
  );
}
