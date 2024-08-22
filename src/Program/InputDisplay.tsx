import useProgramCache from "../stores/useProgramCache";
import DisplayPanel from "../components/DisplayPanel";

import { useEffect } from "react";

export default function InputDisplay() {
  const inputs = useProgramCache((state) => state.inputs);

  useEffect(() => {
    console.log("inputs changed: ", inputs);
  }, [inputs]);

  return (
    <DisplayPanel name="Input">
      <div className="">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-1">Input Name</th>
              <th className="px-6 py-1">Input Value</th>
              <th className="px-6 py-1">Type</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(inputs).map((inputName) => (
              <InputRow
                key={inputName}
                inputInfo={{
                  ...inputs[inputName],
                  name: inputName,
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DisplayPanel>
  );
}

function InputRow({
  inputInfo,
}: {
  inputInfo: {
    value: any;
    type: string;
    name: string;
  };
}) {
  const [updateValue, toggleInputChanged] = useProgramCache((state) => [
    state.updateValue,
    state.toggleInputChanged,
  ]);

  const update = (value: any) => {
    updateValue(inputInfo.name, eval(value));
    toggleInputChanged();
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{inputInfo.name}</td>
      <td className="px-6 py-4">
        <input
          type="text"
          value={inputInfo.value}
          onChange={(e) => {
            update(e.target.value);
          }}
        />
      </td>
      <td className="px-6 py-4">{inputInfo.type}</td>
    </tr>
  );
}
