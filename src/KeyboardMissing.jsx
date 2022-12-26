export default function KeyboardMissing({ keys }) {
  return keys && keys.length > 0 ? <p>Missing: {keys.join(", ")}</p> : <></>;
}
