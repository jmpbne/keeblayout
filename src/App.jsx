import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import Keyboard from "./components/Keyboard";
import KeyboardError from "./components/KeyboardError";
import KeyboardMissing from "./components/KeyboardMissing";
import KeyboardSample from "./components/KeyboardSample";

import { parse } from "./core/parse";
import { load, save } from "./core/storage";

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
    save(data);
    updateStateCore(data);
  }, 1000);

  useEffect(() => {
    updateStateCore(load());
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
      <main>
        <textarea
          defaultValue={state.raw}
          onChange={(e) => updateState(e.target.value)}
          spellCheck={false}
        ></textarea>
        <KeyboardSample />
        <KeyboardError message={state.result.error} />
        <KeyboardMissing keys={state.result.missing} />
        <Keyboard
          title="Source"
          layers={state.result.source}
          labels={state.result.labels}
        />
        <Keyboard
          title="Target"
          layers={state.result.target}
          labels={state.result.labels}
        />
      </main>
    </>
  );
}
