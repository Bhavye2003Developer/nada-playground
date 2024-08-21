import { useEffect, useRef, useState } from "react";

import InputDisplay from "./components/InputDisplay";

import { static_analysis } from "./utils/static_analysis";
import {
  interpreterInputsRetrieve,
  interpreterInputsShow,
  interpreterOutputsShow,
  reportDisplay,
} from "./utils/helper";
import OutputDisplay from "./components/OutputDisplay";
import useInputCache from "./stores/useInputCache";
import { InsType, outsType } from "./utils/Interpreter";
import { loadPyodide, PyodideInterface } from "pyodide";

const initPyodide = async () => {
  const pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
  });
  console.log("pyodide initiated", typeof pyodide);
  return pyodide;
};

declare global {
  interface Window {
    reportDisplay: (rlines: string[]) => void;
    interpreterInputsRetrieve: () => {
      [name: string]: string | number[];
    };
    interpreterInputsShow: (ins: InsType) => string;
    interpreterOutputsShow: (outs: outsType) => {
      name: string;
      value: number;
    }[];
  }
}

function App() {
  const [code, setCode] = useState("");
  const [execute, setExecute] = useState(false);
  const pyodide = useRef<null | PyodideInterface>(null);
  const reInitialiseInputs = useInputCache((state) => state.reInitialiseInputs);
  const [isInputChanged, toggleInputChanged, updateOutput] = useInputCache(
    (state) => [
      state.isInputChanged,
      state.toggleInputChanged,
      state.updateOutput,
    ]
  );

  useEffect(() => {
    window.reportDisplay = reportDisplay;
    window.interpreterInputsRetrieve = interpreterInputsRetrieve;
    window.interpreterInputsShow = interpreterInputsShow;
    window.interpreterOutputsShow = interpreterOutputsShow;

    const init = async function () {
      const pyodide_inst = await initPyodide();
      console.log("init: ", pyodide_inst);

      await pyodide_inst.loadPackage("micropip");
      const micropip = pyodide_inst.pyimport("micropip");

      await micropip.install(
        "https://files.pythonhosted.org/packages/a8/94/7d468bcd22d491db6c0651188278a8790fba5951784e03c618cba55f97bc/parsial-0.1.0-py3-none-any.whl"
      );
      await micropip.install(
        "https://files.pythonhosted.org/packages/bb/e5/6d9baab97743fab7c168d3ee330ebc1b3d6c90df37469a5ce4e3fa90f811/richreports-0.2.0-py3-none-any.whl"
      );
      await micropip.install(
        "https://files.pythonhosted.org/packages/45/86/4736ac618d82a20d87d2f92ae19441ebc7ac9e7a581d7e58bbe79233b24a/asttokens-2.4.1-py2.py3-none-any.whl"
      );
      await micropip.install("nada_audit-0.0.0-py3-none-any.whl");

      // await micropip.install("nada_dsl-0.1.0-py3-none-any.whl");

      pyodide.current = pyodide_inst;
    };
    init();
  }, []);

  useEffect(() => {
    if (pyodide.current) {
      if (execute) {
        const analysis = JSON.parse(
          pyodide.current.runPython(static_analysis(code))
        );
        console.log("complete analysis: ", analysis);

        reInitialiseInputs(analysis.inputs);
        updateOutput(analysis.output);

        // const porgram_json = compileProgram(pyodide.current, code);
        // console.log("compiled: ", porgram_json);
        setExecute(false);
      } else if (isInputChanged) {
        JSON.parse(pyodide.current.runPython(static_analysis(code)));
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
      <InputDisplay />
      <OutputDisplay />
    </>
  );
}

export default App;
