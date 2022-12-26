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
  let json;

  try {
    json = load(yaml);
  } catch (e) {
    return { error: e.reason };
  }

  if (!validate(json)) {
    const first = validate.errors[0];
    return { error: `${first.instancePath} ${first.message}` };
  }

  return json;
}
