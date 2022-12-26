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
  // undefined target
  if (!data) return [null, null];

  // convert string into nested array
  const layers = data.map((layerData) =>
    layerData
      .split("\n")
      .filter((rowData) => rowData)
      .map((rowData) => rowData.trim().split(/\s+/))
  );

  // get largest dimensions
  let width = 0;
  let height = 0;

  for (const layer of layers) {
    height = Math.max(height, layer.length);

    for (const row of layer) {
      width = Math.max(width, row.length);
    }
  }

  return [layers, [width, height]];
}
