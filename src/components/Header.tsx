import { useEffect } from "react";
import useGlobals from "../stores/useGlobals";
import useProgramCache from "../stores/useProgramCache";
import examples from "../utils/CodeExamples";
import CodeShareBtn from "./CodeShareBtn";

function Header() {
  const [runBtnClicked, isRunBtnClicked] = useGlobals((state) => [
    state.runBtnClicked,
    state.isRunBtnClicked,
  ]);
  const [resetProgram, setCode, resetMessages] = useProgramCache((state) => [
    state.resetProgram,
    state.setCode,
    state.resetMessages,
  ]);

  useEffect(() => {
    if (isRunBtnClicked) console.log("header - Executing...");
    else console.log("header - RUN");
  }, [isRunBtnClicked]);

  return (
    <div className="flex justify-end">
      <button
        onClick={() => {
          console.log("inside run btn");
          runBtnClicked();
          resetMessages();
        }}
        className="border border-black p-1 rounded-md hover:bg-green-400 my-4 mr-10"
      >
        {isRunBtnClicked ? "Executing..." : "RUN"}
      </button>
      <button
        onClick={resetProgram}
        className="border border-black p-1 rounded-md hover:bg-green-400 my-4 mr-10"
      >
        RESET
      </button>
      <CodeShareBtn />
      <select
        className="my-4 mr-10 p-2 rounded-md"
        onChange={(e) => {
          const code = e.target.value;
          setCode(code);
        }}
      >
        {examples.map((example) => (
          <option value={example.code} key={example.name}>
            {example.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;
