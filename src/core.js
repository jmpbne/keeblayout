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

const DEFAULT_DATA = `source:
- |
  esc f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12 --- prscr scrlk pause
  grave 1 2 3 4 5 6 7 8 9 0 minus equals bksp insert home pgup
  tab q w e r t y u i o p lbrack rbrack bslash delete end pgdn
  caps a s d f g h j k l scolon quote --- enter
  lshift z x c v b n m comma dot fslash --- --- rshift --- up
  lctrl fn lsuper lalt space --- --- --- --- --- ralt menu rsuper rctrl left down right
target:
- |
  q w e r t y u i o p
  a s d f g h j k l bksp
  lshift z x c v space b n m enter
- |
  1 2 3 4 5 6 7 8 9 0
  f1 f2 f3 f4 f5 f6 f7 f8 f9
  --- up left right down --- f10 f11 f12
labels:
  up: "↑"
  left: "←"
  right: "→"
  down: "↓"`;

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
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data || DEFAULT_DATA;
}

export function saveToStorage(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, data);
}
