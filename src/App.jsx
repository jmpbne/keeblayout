import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import KeyboardError from "./KeyboardError";
import KeyboardMissing from "./KeyboardMissing";
import KeyboardSample from "./KeyboardSample"
import KeyboardView from "./KeyboardView";

import { loadFromStorage, parse, saveToStorage } from "./core";

export default function App() {
  const [state, setState] = useState({
    raw: "",
    result: {},
  });

  const updateStateCore = function (data) {
    setState({
      raw: data,
      result: parse(data),
    });
  };

  const updateState = useDebouncedCallback((data) => {
    saveToStorage(data);
    updateStateCore(data);
  }, 1000);

  useEffect(() => {
    updateStateCore(loadFromStorage());
  }, []);

  return (
    <>
      <header>
        <h1>Yet Another Keyboard Layout Designer</h1>
        <p>
          Enter a valid YAML describing both source and target keyboard (one
          multiline string for each layer). It will be rendered automatically.
        </p>
        <p>
          Changes are saved automatically, unless your browser can't put data to
          local storage.
        </p>
      </header>
      <hr />
      <main>
        <textarea
          defaultValue={state.raw}
          onChange={(e) => updateState(e.target.value)}
          spellCheck={false}
        ></textarea>
        <KeyboardSample />
        <KeyboardError message={state.result.error} />
        <KeyboardMissing keys={state.result.missing} />
        <KeyboardView
          source={state.result.source}
          target={state.result.target}
          labels={state.result.labels}
        />
      </main>
    </>
  );
}
