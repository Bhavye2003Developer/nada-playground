import useProgramCache from "../stores/useProgramCache";

export default () => {
  const outputElements = useProgramCache((state) => state.output);
  return (
    <div>
      {outputElements.length > 0 ? (
        <table>
          <thead>
            <tr>
              <td>Output Name</td>
              <td>Output Value</td>
            </tr>
          </thead>
          <tbody>
            {outputElements.map((outputElement) => (
              <tr key={outputElement.name}>
                <td>{outputElement.name}</td>
                <td>{outputElement.value || "No output"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No output"
      )}
    </div>
  );
};
