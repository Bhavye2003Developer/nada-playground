import useGlobals from "../stores/useGlobals";
import useProgramCache from "../stores/useProgramCache";
import examples from "../utils/CodeExamples";

function Header() {
  const runBtnClicked = useGlobals((state) => state.runBtnClicked);
  const [resetProgram, setCode] = useProgramCache((state) => [
    state.resetProgram,
    state.setCode,
  ]);

  return (
    <div className="flex justify-end">
      <button
        onClick={runBtnClicked}
        className="border border-black p-1 rounded-md hover:bg-green-400 my-4 mr-10"
      >
        RUN
      </button>
      <button
        onClick={resetProgram}
        className="border border-black p-1 rounded-md hover:bg-green-400 my-4 mr-10"
      >
        RESET
      </button>
      <select
        className="my-4 mr-10 p-2 rounded-md"
        onChange={(e) => {
          console.log("selected: ", e.target.value);
          setCode(e.target.value);
        }}
      >
        {examples.map((example) => (
          <option value={example.code} key={example.name}>
            {example.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;
