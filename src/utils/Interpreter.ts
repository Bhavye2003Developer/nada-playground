import useInputCache from "../stores/useInputCache";

export default class Interpreter {
  constructor() {
    this.cache = { inputs: {}, signature: null };
  }

  inputsRetrieve() {
    const inputsFromScreen = useInputCache.getState().inputs;

    const a = {
      my_int2: {
        value: 64,
        type: "PublicInteger",
      },
      my_int3: {
        value: 158,
        type: "SecretInteger",
      },
    };

    const b = {
      my_int1: [236, "PublicInteger"],
      my_int2: [125, "SecretInteger"],
    };

    const inputs = {};
    Object.keys(inputsFromScreen).forEach((inputName) => {
      const inputElement = inputsFromScreen[inputName];
      inputs[inputName] = [inputElement.value, inputElement.type];
    });
    console.log("inputsretrive func: ", inputs);
    return inputs;
  }

  getFormatedInputs(ins) {
    console.log("inside getFormattedInputs: ", this.cache.inputs, ins);

    const inputs = useInputCache.getState().inputs;
    for (let i = 0; i < ins.length; ++i) {
      const name = ins[i][0];
      if (name in this.cache.inputs && name in inputs) {
        this.cache.inputs[name] = inputs[name].value;
      } else if (!(name in inputs)) {
        delete this.cache.inputs[name];
      }
    }

    let inputsJSON = "";
    let inputsJSONSchema = {
      $schema: "https://json-schema.org/draft/2019-09/schema",
      type: "object",
      properties: {},
    };
    for (let i = 0; i < ins.length; i++) {
      const name = ins[i][0];
      if (!(name in this.cache.inputs)) {
        this.cache.inputs[name] = 1 + Math.floor(Math.random() * 255);
      }
      const value = this.cache.inputs[name];

      inputsJSON +=
        '  "' +
        name +
        '": ' +
        JSON.stringify({ value: value, type: ins[i][1] }, null, 2)
          .replace(/\n/g, "")
          .replace(/\s\s/g, "") +
        (i == ins.length - 1 ? "" : ",") +
        "\n";
      inputsJSONSchema["properties"][name] = {
        type: "object",
        properties: {
          value: {
            type: "integer",
            minimum: 1,
            maximumExclusive: "2147483647",
          },
          type: {
            oneOf: [{ const: "PublicInteger" }, { const: "SecretInteger" }],
          },
        },
      };
    }
    inputsJSON = JSON.parse("{\n" + inputsJSON + "}");
    return inputsJSON;
  }

  inputsShow(ins) {
    console.log("ins inside inputsShow: ", ins);

    const signature = ins.join(",");
    if (signature == this.cache.signature) {
      console.log("The signature is same as before");
      return this.getFormatedInputs(ins);
    } else {
      this.cache.signature = signature;
    }

    console.log("cache: ", this.cache);

    return this.getFormatedInputs(ins);
  }

  outputsShow(outs) {
    // table.innerHTML = "<tr><td>Output Name</td><td>Output Value</td></tr>";
    const output = [];
    console.log("outs inside show: ", [...outs]);
    for (let i = 0; i < outs.length; i++) {
      const output_name = outs[i][0];
      const output_value = outs[i][1];

      output.push({ name: output_name, value: output_value });
    }
    useInputCache.getState().updateOutput(output);
    return output;
  }
}
