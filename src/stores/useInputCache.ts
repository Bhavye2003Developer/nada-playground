import { create } from "zustand";

const useInputCache = create((set, get) => ({
  inputs: {},
  isInputChanged: false,
  output: [],
  reInitialiseInputs: (updatedInputs) =>
    set((state) => ({
      ...state,
      inputs: updatedInputs,
    })),
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
    set((state) => ({
      ...state,
      output: updatedOutput,
    }));
  },
}));

export default useInputCache;
