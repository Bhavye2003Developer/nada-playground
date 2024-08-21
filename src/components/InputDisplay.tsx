import { useEffect } from "react";
import useProgramCache from "../stores/useProgramCache";

export default function InputDisplay() {
  const inputs = useProgramCache((state) => state.inputs);

  useEffect(() => {
    console.log("inputs changed: ", inputs);
  }, [inputs]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Input Name</td>
            <td>Input Value</td>
            <td>Type</td>
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
    <tr>
      <td>{inputInfo.name}</td>
      <td>
        <input
          type="text"
          value={inputInfo.value}
          onChange={(e) => {
            update(e.target.value);
          }}
        />
      </td>
      <td>{inputInfo.type}</td>
    </tr>
  );
}
