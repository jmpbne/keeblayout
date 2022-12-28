import Keyboard from "./Keyboard";

export default function KeyboardView({ source, target, labels }) {
  if (target) {
    return (
      <>
        <h3>Target keyboard</h3>
        <Keyboard layers={target} labels={labels} />
      </>
    );
  }

  if (source) {
    return (
      <>
        <h3>Source keyboard</h3>
        <p>(will be shown unless you define valid target keyboard)</p>
        <Keyboard layers={source} labels={labels} />
      </>
    );
  }

  return <></>;
}
