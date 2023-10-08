import { Box, Image} from "@mantine/core";



// modify to file object
export interface ImagePreviewProps {
    image: string;
    onLoad: () => void;
}

export function ImagePreview({ image: url, onLoad }: ImagePreviewProps) {
    
    return (
        <Box className="flex justify-center">
            <Image
                classNames={{ imageWrapper: "flex justify-center" }}
                imageProps={{ className: "" }}
                width={"70%"}
                src={url}
                alt={"an uploaded image"}
                onLoad={onLoad}
            />
        </Box>
    )
}