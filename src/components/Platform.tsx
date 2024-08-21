import { loadPyodide } from "pyodide";
import { InsType, outsType } from "../utils/Interpreter";
import Editor from "./Editor";
import InputDisplay from "./InputDisplay";
import OutputDisplay from "./OutputDisplay";
import { useEffect } from "react";
import init from "../utils/init";

function Platform() {
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Editor />
      <InputDisplay />
      <OutputDisplay />
    </div>
  );
}

export default Platform;
