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
    labels: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
    },
  },
  required: ["source"], // target is optional on purpose
};

const EMPTY = "---";

const LOCAL_STORAGE_KEY = "keeblayoutData";

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

  const source = parseKeyboard(data.source);
  const target = parseKeyboard(data.target);
  const missing = getMissingKeys(source, target);

  return {
    source,
    target,
    labels: data.labels || {},
    missing,
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

function getMissingKeys(sourceLayers, targetLayers) {
  if (!targetLayers) {
    return [];
  }

  const source = new Set(sourceLayers.flat(2).filter((k) => k));
  const target = new Set(targetLayers.flat(2).filter((k) => k));
  const missing = [];

  for (const k of source) {
    if (!target.has(k)) {
      missing.push(k);
    }
  }

  missing.sort();
  return missing;
}

export function transposeLayers(layers) {
  return layers[0].map((row, rowIndex) =>
    row.map((_, colIndex) => layers.map((layer) => layer[rowIndex][colIndex]))
  );
}

export function loadFromStorage() {
  return localStorage.getItem(LOCAL_STORAGE_KEY) || "";
}

export function saveToStorage(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, data);
}
