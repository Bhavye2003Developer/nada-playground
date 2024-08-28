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
    <div className="flex justify-end items-center space-x-4 p-2 bg-gray-100 border-b border-gray-300">
      <button
        onClick={() => {
          console.log("inside run btn");
          runBtnClicked();
          resetMessages();
        }}
        className="px-4 py-2 text-white bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {isRunBtnClicked ? "Executing..." : "RUN"}
      </button>
      <button
        onClick={resetProgram}
        className="px-4 py-2 text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        RESET
      </button>
      <CodeShareBtn />
      <select
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
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
