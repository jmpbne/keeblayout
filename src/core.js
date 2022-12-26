import Ajv from "ajv";
import { load } from "js-yaml";

const SCHEMA = {
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

const EMPTY = "---";

export function parse(yaml) {
  const validate = new Ajv().compile(SCHEMA);
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

  return {
    source: parseKeyboard(data.source),
    target: parseKeyboard(data.target),
  };
}

function parseKeyboard(data) {
  // handle undefined target

  if (!data) return null;

  // convert string into nested array

  const layers = data.map((layerData) =>
    layerData
      .split("\n")
      .filter((rowData) => rowData)
      .map((rowData) =>
        rowData
          .trim()
          .split(/\s+/)
          .map((key) => (key !== EMPTY ? key : null))
      )
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

  // normalize layer dimensions

  for (const layer of layers) {
    for (const row of layer) {
      while (row.length < width) {
        row.push(null);
      }
    }

    while (layer.length < height) {
      layer.push([...Array(width).fill(null)]);
    }
  }

  return layers;
}

export function transposeLayers(layers) {
  return layers[0].map((row, rowIndex) =>
    row.map((_, colIndex) => layers.map((layer) => layer[rowIndex][colIndex]))
  );
}
