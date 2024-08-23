import { loadPyodide } from "pyodide";
import { InsType, outsType } from "./Interpreter";
import {
  interpreterInputsRetrieve,
  interpreterInputsShow,
  interpreterOutputsShow,
  reportDisplay,
} from "./helper";
import useGlobals from "../stores/useGlobals";

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

function initWindowProperties() {
  window.reportDisplay = reportDisplay;
  window.interpreterInputsRetrieve = interpreterInputsRetrieve;
  window.interpreterInputsShow = interpreterInputsShow;
  window.interpreterOutputsShow = interpreterOutputsShow;
}

async function init() {
  const pyodide_obj = await initPyodide();
  console.log("init: ", pyodide_obj);

  await pyodide_obj.loadPackage("micropip");
  const micropip = pyodide_obj.pyimport("micropip");

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

  await micropip.install("nada_dsl-0.1.0-py3-none-any.whl");
  initWindowProperties();

  useGlobals.getState().initialisePyodide(pyodide_obj);
}

export default init;
