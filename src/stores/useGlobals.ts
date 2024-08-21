import { PyodideInterface } from "pyodide";
import { create } from "zustand";

interface globalTypes {
  pyodide: PyodideInterface | null;
  isRunBtnClicked: boolean;
  initialisePyodide: (pyodidie_obj: PyodideInterface) => void;
  runBtnClicked: () => void;
  resetRunBtnClicked: () => void;
}

const useGlobals = create<globalTypes>()((set) => ({
  pyodide: null,
  isRunBtnClicked: false,
  initialisePyodide: (pyodide_obj) => {
    set((state) => ({ ...state, pyodide: pyodide_obj }));
  },
  runBtnClicked: () => {
    set((state) => ({ ...state, isRunBtnClicked: true }));
  },

  resetRunBtnClicked: () => {
    set((state) => ({ ...state, isRunBtnClicked: false }));
  },
}));

export default useGlobals;
