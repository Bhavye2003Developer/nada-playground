import useGlobals from "../stores/useGlobals";
import useProgramCache from "../stores/useProgramCache";

function Header() {
  const runBtnClicked = useGlobals((state) => state.runBtnClicked);
  const resetProgram = useProgramCache((state) => state.resetProgram);

  return (
    <div className="flex">
      <button
        onClick={runBtnClicked}
        className="border border-black p-1 rounded-md hover:bg-green-400 m-4 mr-10"
      >
        RUN
      </button>
      <button
        onClick={resetProgram}
        className="border border-black p-1 rounded-md hover:bg-green-400 m-4 mr-10"
      >
        RESET
      </button>
    </div>
  );
}

export default Header;
