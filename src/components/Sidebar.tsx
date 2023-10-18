import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";

export function Sidebar() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>Open Drawer</Button>
      <Drawer opened={opened} onClose={close} title="Editor" position="left">
        <Button>Show Selected Block</Button>
        <br />
        <Button>Hide Selected Area</Button>
        <Button>Show All</Button>
        <Button>Show Download</Button>
      </Drawer>
    </>
  );
}
