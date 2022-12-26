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

  const json = load(yaml);
  const valid = validate(json);

  if (!valid) {
    return { errors: validate.errors };
  }

  return json;
}
