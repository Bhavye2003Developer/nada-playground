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
    <div className="flex flex-col w-full h-screen">
      <Header />

      <div className="flex h-screen mb-3 mx-2">
        <div className="w-full border border-black mr-1">
          <Editor />
        </div>
        <div className="w-full flex flex-col">
          <InputDisplay />
          <div className="mb-3"></div>
          <OutputDisplay />
        </div>
      </div>
    </div>
  );
}

export default Platform;
