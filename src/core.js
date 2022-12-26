import Ajv from "ajv";
import { load } from "js-yaml";

const schema = {
  type: "object",
  properties: {
    source: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
    target: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
  },
  required: ["source"], // target is optional on purpose
};

export function parse(yaml) {
  const validate = new Ajv().compile(schema);
  let data;

  try {
    data = load(yaml);
  } catch (e) {
    return { error: e.reason };
  }

  if (!validate(data)) {
    const first = validate.errors[0];
    return { error: `${first.instancePath} ${first.message}` };
  }

  const [source, sourceSize] = parseKeyboard(data.source);
  const [target, targetSize] = parseKeyboard(data.target);

  data = {
    source,
    sourceSize,
    target,
    targetSize,
  };

  return data;
}

function parseKeyboard(data) {
  if (!data) return [null, null];

  const layers = data.map((layerData) =>
    layerData
      .split("\n")
      .filter((rowData) => rowData)
      .map((rowData) => rowData.trim().split(/\s+/))
  );
  console.log(layers);

  return [layers, null];
}
