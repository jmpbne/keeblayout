import { useEffect, useState } from "react";

import { parse } from "./core";

const defaultState = `source:
  - |
    q w e r t y u i o p
    a s d f g h j k l
    control alt shift z x c v b n m space enter`;

export default function App() {
  const [state, setState] = useState({
    raw: "",
    result: {},
  });

  function updateState(data) {
    setState({
      raw: data,
      result: parse(data),
    });
  }

  useEffect(() => {
    updateState(defaultState);
  }, []);

  return (
    <>
      <h1>Yet Another Keyboard Layout Designer</h1>
      <p>
        Enter a valid YAML describing both source and target keyboard (one
        multiline string for each layer). It will be rendered automatically.
      </p>
      <textarea
        defaultValue={state.raw}
        onChange={(e) => updateState(e.target.value)}
        spellCheck={false}
      ></textarea>
      <code>{JSON.stringify(state.result, null, 2)}</code>
    </>
  );
}
