import { useEffect, useState } from "react";
import { static_analysis } from "../utils/static_analysis";
import useGlobals from "../stores/useGlobals";
import useProgramCache from "../stores/useProgramCache";
import { buildPermalink } from "../utils/helper";
import ReactCodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { linter, lintGutter } from "@codemirror/lint";

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

  useEffect(() => {}, [code]);

  return (
    <div className="h-full flex flex-1">
      {/* <textarea
        className="resize-none w-full"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          buildPermalink();
        }}
      /> */}

      {/* <Editor
        language="python"
        defaultValue={code}
        options={{
          minimap: { enabled: false },
        }}
        onChange={(code, _) => {
          setCode(code || "");
          buildPermalink();
        }}
      /> */}

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

      {/* <CodeEditor
      className="w-full"
        value={code}
        language="python"
        placeholder="Please enter JS code."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      /> */}
    </div>
  );
}

export default MyEditor;
