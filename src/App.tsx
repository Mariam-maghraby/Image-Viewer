import { FileWithPath } from "@mantine/dropzone";
import "./App.css";
import {  InsertImagePlaceHolder } from "./components/ImageInserter";

function App() {
  return (
    <>
      <InsertImagePlaceHolder onUpload={function (files: FileWithPath[]): void {
        console.log(files);
      } } />
    </>
  );
}

export default App;
