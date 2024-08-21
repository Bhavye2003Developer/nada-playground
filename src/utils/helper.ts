import Interpreter, { InsType, outsType } from "./Interpreter";
import Report from "./Report";

const report = new Report();
const interpreter = new Interpreter();

export function reportDisplay(rlines: string[]) {
  report.display(rlines);
}

export function interpreterInputsRetrieve() {
  return interpreter.inputsRetrieve();
}

export function interpreterInputsShow(ins: InsType) {
  console.log("inputs showing...", ins);
  return interpreter.inputsShow(ins);
}

export function interpreterOutputsShow(outs: outsType) {
  return interpreter.outputsShow(outs);
}
