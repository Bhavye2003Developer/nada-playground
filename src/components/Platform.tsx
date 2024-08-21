import Editor from "./Editor";
import InputDisplay from "./InputDisplay";
import OutputDisplay from "./OutputDisplay";
import { useEffect } from "react";
import init from "../utils/init";
import Header from "./Header";

function Platform() {
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Header />
      <Editor />
      <InputDisplay />
      <OutputDisplay />
    </div>
  );
}

export default Platform;
