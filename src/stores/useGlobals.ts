import { PyodideInterface } from "pyodide";
import { create } from "zustand";

interface globalTypes {
  pyodide: PyodideInterface | null;
  initialisePyodide: (pyodidie_obj: PyodideInterface) => void;
}

const useGlobals = create<globalTypes>()((set) => ({
  pyodide: null,
  initialisePyodide: (pyodide_obj) => {
    set((state) => ({ ...state, pyodide: pyodide_obj }));
  },
}));

export default useGlobals;
