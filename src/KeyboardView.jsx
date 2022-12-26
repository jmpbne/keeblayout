import Keyboard from "./Keyboard";

export default function KeyboardView({ source, target }) {
  if (target) {
    return (
      <>
        <p>
          <strong>Keyboard:</strong>
        </p>
        <Keyboard layers={target} />
      </>
    );
  }

  if (source) {
    return (
      <>
        <p>
          Source keyboard (will be shown unless you define valid target
          keyboard):
        </p>
        <Keyboard layers={source} />
      </>
    );
  }

  return <></>;
}
