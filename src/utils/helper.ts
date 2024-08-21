import Interpreter from "./Interpreter";
import Report from "./Report";

const report = new Report();
const interpreter = new Interpreter();

export function reportDisplay(rlines) {
  console.log("rlines here boy");
  report.display(rlines);
}

export function interpreterInputsRetrieve() {
  return interpreter.inputsRetrieve();
}

export function interpreterInputsShow(ins) {
  console.log("inputs showing...", ins);
  return interpreter.inputsShow(ins);
}

export function interpreterOutputsShow(outs) {
  return interpreter.outputsShow(outs);
}
