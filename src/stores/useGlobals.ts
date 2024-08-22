import { PyodideInterface } from "pyodide";
import { create } from "zustand";
import { getBaseLink } from "../utils/helper";

interface globalTypes {
  pyodide: PyodideInterface | null;
  isRunBtnClicked: boolean;
  initialisePyodide: (pyodidie_obj: PyodideInterface) => void;
  runBtnClicked: () => void;
  resetRunBtnClicked: () => void;
  sharedLink: string;
  updateSharedLink: (updatedLink: string) => void;
}

const useGlobals = create<globalTypes>()((set) => ({
  pyodide: null,
  isRunBtnClicked: false,
  sharedLink: getBaseLink(),
  initialisePyodide: (pyodide_obj) => {
    set((state) => ({ ...state, pyodide: pyodide_obj }));
  },
  runBtnClicked: () => {
    set((state) => ({ ...state, isRunBtnClicked: true }));
  },

  resetRunBtnClicked: () => {
    set((state) => ({ ...state, isRunBtnClicked: false }));
  },
  updateSharedLink: (updatedLink: string) => {
    set((state) => ({ ...state, sharedLink: updatedLink }));
  },
}));

export default useGlobals;
