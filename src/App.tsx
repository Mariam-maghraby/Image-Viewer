import "./App.css";
import { InsertImagePlaceHolder } from "./components/ImageInserter";
// import { ImagePreview } from "./components/ImageViewer";

function App() {
  return (
    <>
      <InsertImagePlaceHolder />
      {/* <ImagePreview
        image={
          "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
        }
        onLoad={function (): void {
          console.log("onLoad");
        }}
      /> */}
    </>
  );
}

export default App;
