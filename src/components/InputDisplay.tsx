import { useEffect, useState } from "react";
import useInputCache from "../stores/useInputCache";

const a = {
  my_int1: [132, "PublicInteger"],
  my_int2: [173, "SecretInteger"],
};

export default function InputDisplay() {
  const inputs = useInputCache((state) => state.inputs);

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

function InputRow({ inputInfo }) {
  const [updateValue, toggleInputChanged] = useInputCache((state) => [
    state.updateValue,
    state.toggleInputChanged,
  ]);

  const update = async (value) => {
    await updateValue(inputInfo.name, parseInt(value));
    toggleInputChanged();
  };

  return (
    <tr>
      <td>{inputInfo.name}</td>
      <td>
        <input
          type="number"
          value={inputInfo.value}
          onChange={(e) => {
            update(e.target.value || 0);
          }}
        />
      </td>
      <td>{inputInfo.type}</td>
    </tr>
  );
}
