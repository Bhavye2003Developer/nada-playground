import { useEffect } from "react";
import { static_analysis } from "../utils/static_analysis";
import useGlobals from "../stores/useGlobals";
import useProgramCache from "../stores/useProgramCache";
import { buildPermalink } from "../utils/helper";
import ReactCodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { lintGutter } from "@codemirror/lint";

function MyEditor() {
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

  const codeChange = (code: string, _: any) => {
    setCode(code || "");
    buildPermalink();
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (pyodide) {
      if (isRunBtnClicked) {
        const analysis = JSON.parse(pyodide.runPython(static_analysis(code)));
        console.log("complete analysis: ", analysis);

        reInitialiseInputs(analysis.inputs);
        updateOutput(analysis.output);

        resetRunBtnClicked();
      } else if (isInputChanged) {
        pyodide.runPython(static_analysis(code));
        console.log("Input has changed now...");
        toggleInputChanged();
      }
    }
  }, [isRunBtnClicked, isInputChanged]);

  useEffect(() => {}, [code]);

  return (
    <div className="h-full w-full">
      <ReactCodeMirror
        lang="python"
        value={code}
        className="w-full h-full"
        extensions={[python(), lintGutter()]}
        onChange={codeChange}
        basicSetup={{
          syntaxHighlighting: true,
        }}
        theme={"dark"}
      />
    </div>
  );
}

export default MyEditor;
