import { useEffect } from "react";
import { static_analysis } from "../utils/static_analysis";
import useGlobals from "../stores/useGlobals";
import useProgramCache from "../stores/useProgramCache";
import { buildPermalink } from "../utils/helper";

function Editor() {
  const [
    isInputChanged,
    toggleInputChanged,
    updateOutput,
    reInitialiseInputs,
    code,
    setCode,
  ] = useProgramCache((state) => [
    state.isInputChanged,
    state.toggleInputChanged,
    state.updateOutput,
    state.reInitialiseInputs,
    state.code,
    state.setCode,
  ]);
  const [pyodide, isRunBtnClicked, resetRunBtnClicked] = useGlobals((state) => [
    state.pyodide,
    state.isRunBtnClicked,
    state.resetRunBtnClicked,
  ]);

  useEffect(() => {
    if (pyodide) {
      if (isRunBtnClicked) {
        const analysis = JSON.parse(pyodide.runPython(static_analysis(code)));
        console.log("complete analysis: ", analysis);

        reInitialiseInputs(analysis.inputs);
        updateOutput(analysis.output);

        // const porgram_json = compileProgram(pyodide.current, code);
        // console.log("compiled: ", porgram_json);
        resetRunBtnClicked();
      } else if (isInputChanged) {
        pyodide.runPython(static_analysis(code));
        console.log("Input has changed now...");
        toggleInputChanged();
      }
    }
  }, [isRunBtnClicked, isInputChanged]);

  return (
    <div className="h-full flex flex-1">
      <textarea
        className="resize-none w-full"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          buildPermalink();
        }}
      />
    </div>
  );
}

export default Editor;
