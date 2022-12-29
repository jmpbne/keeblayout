import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import Keyboard from "./components/Keyboard";
import KeyboardError from "./components/KeyboardError";
import KeyboardMissing from "./components/KeyboardMissing";
import KeyboardSample from "./components/KeyboardSample";

import { load, save } from "./core/storage";
import { parse, stringify } from "./core/transform";

export default function App() {
  const [data, setData] = useState("");
  const [state, setState] = useState({});

  const updateStateDebounced = useDebouncedCallback((data) => {
    save(data);
    setState(parse(data));
  }, 500);

  const handleInputOnChange = (e) => {
    setData(e.target.value);
    updateStateDebounced(e.target.value);
  };

  const handleBeautifyButtonOnClick = (e) => {
    if (state.source) setData(stringify(state));
  };

  useEffect(() => {
    const data = load();

    setData(data);
    setState(parse(data));
  }, []);

  return (
    <>
      <header>
        <h1>Yet Another Keyboard Layout Designer</h1>
        <p>
          by @jmpbne &middot;{" "}
          <a href="https://github.com/jmpbne/keeblayout" target="_blank">
            GitHub
          </a>
        </p>
        <p>&nbsp;</p>
        <p>
          Click the "Sample data" button to get a glimpse of how to use this
          app.
        </p>
        <p>
          Changes are saved automatically to local storage, unless you're in
          incognito mode.
        </p>
      </header>
      <main>
        <textarea
          onChange={handleInputOnChange}
          spellCheck={false}
          value={data}
        ></textarea>
        <p>
          <button onClick={handleBeautifyButtonOnClick}>Beautify</button> (will
          remove any reduntant data)
        </p>
        <KeyboardSample />
        <KeyboardError message={state.error} />
        <KeyboardMissing keys={state.missing} />
        <Keyboard title="Source" layers={state.source} labels={state.labels} />
        <Keyboard title="Target" layers={state.target} labels={state.labels} />
      </main>
    </>
  );
}
