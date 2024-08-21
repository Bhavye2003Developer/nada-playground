import { create } from "zustand";

type Inputs = {
  [name: string]: {
    value: any;
    type: string;
  };
};

type Output = {
  name: String;
  value: any;
};

interface PorgramState {
  inputs: Inputs;
  output: Output[];
  isInputChanged: boolean;
  reInitialiseInputs: (updatedInputs: Inputs) => void;
  updateValue: (inputName: string, value: any) => void;
  toggleInputChanged: () => void;
  updateOutput: (updatedOutput: Output[]) => void;
}

const useInputCache = create<PorgramState>()((set, get) => ({
  inputs: {},
  output: [],
  isInputChanged: false,
  reInitialiseInputs: (updatedInputs) =>
    set((state) => ({
      ...state,
      inputs: updatedInputs,
    })),
  // updateInputValue
  updateValue: (inputName, value) => {
    const inputElements = get().inputs;
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        [inputName]: {
          value: value,
          type: inputElements[inputName].type,
        },
      },
    }));
  },
  toggleInputChanged: () => {
    set((state) => ({
      ...state,
      isInputChanged: !get().isInputChanged,
    }));
  },

  updateOutput: (updatedOutput) => {
    console.log("output of updatedOutput: ", updatedOutput);
    set((state) => ({
      ...state,
      output: updatedOutput,
    }));
  },
}));

export default useInputCache;
