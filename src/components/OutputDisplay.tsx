import useProgramCache from "../stores/useProgramCache";
import DisplayPannel from "./DisplayPannel";

export default () => {
  const outputElements = useProgramCache((state) => state.output);
  return (
    <DisplayPannel name="Output">
      <>
        {outputElements.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-1">Output Name</th>
                <th className="px-6 py-1">Output Value</th>
              </tr>
            </thead>
            <tbody>
              {outputElements.map((outputElement) => (
                <tr
                  key={outputElement.name}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{outputElement.name}</td>
                  <td className="px-6 py-4">
                    {outputElement.value || "No output"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No output"
        )}
      </>
    </DisplayPannel>
  );
};
