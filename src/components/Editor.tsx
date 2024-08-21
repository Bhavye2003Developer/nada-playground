import { useEffect, useState } from "react";
import useInputCache from "../stores/useInputCache";
import { static_analysis } from "../utils/static_analysis";
import useGlobals from "../stores/useGlobals";

function Editor() {
  const [code, setCode] = useState("");
  const [execute, setExecute] = useState(false);
  const reInitialiseInputs = useInputCache((state) => state.reInitialiseInputs);
  const [isInputChanged, toggleInputChanged, updateOutput] = useInputCache(
    (state) => [
      state.isInputChanged,
      state.toggleInputChanged,
      state.updateOutput,
    ]
  );
  const pyodide = useGlobals((state) => state.pyodide);

  useEffect(() => {
    if (pyodide) {
      if (execute) {
        const analysis = JSON.parse(pyodide.runPython(static_analysis(code)));
        console.log("complete analysis: ", analysis);

        reInitialiseInputs(analysis.inputs);
        updateOutput(analysis.output);

        // const porgram_json = compileProgram(pyodide.current, code);
        // console.log("compiled: ", porgram_json);
        setExecute(false);
      } else if (isInputChanged) {
        pyodide.runPython(static_analysis(code));
        console.log("Input has changed now...");
        toggleInputChanged();
      }
    }
  }, [execute, isInputChanged]);

  return (
    <>
      <textarea
        rows={20}
        cols={40}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={() => {
          setExecute(true);
        }}
      >
        Run
      </button>
    </>
  );
}

export default Editor;
