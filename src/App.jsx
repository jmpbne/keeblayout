import { useEffect, useState } from "react";

import Keyboard from "./Keyboard";

import { parse } from "./core";

const defaultState = `source:
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
    --- up left right down --- f10 f11 f12`;

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
      <header>
        <h1>Yet Another Keyboard Layout Designer</h1>
        <p>
          Enter a valid YAML describing both source and target keyboard (one
          multiline string for each layer). It will be rendered automatically.
        </p>
      </header>
      <main>
        <textarea
          defaultValue={state.raw}
          onChange={(e) => updateState(e.target.value)}
          spellCheck={false}
        ></textarea>
        {state.result.source && (
          <>
            <p>Source:</p>
            <Keyboard layers={state.result.source} />
          </>
        )}
        {state.result.target && (
          <>
            <p>Target:</p>
            <Keyboard layers={state.result.target} />
          </>
        )}
        <p>Missing: {state.result._missing.join(", ")}</p>
      </main>
    </>
  );
}
