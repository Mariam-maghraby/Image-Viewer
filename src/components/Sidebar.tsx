import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Stack } from "@mantine/core";

export function Sidebar() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Editor"
        size={"md"}
        overlayProps={{ blur: 4 }}>
        <Stack>
          <Button>Show Selected Block</Button>
          <br />
          <Button>Hide Selected Area</Button>
          <Button>Show All</Button>
          <Button>Show Download</Button>
        </Stack>
      </Drawer>

      <Button onClick={open}>Open Drawer</Button>
    </>
  );
}
