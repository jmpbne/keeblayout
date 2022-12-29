export default function KeyboardMissing({ keys }) {
  if (!(keys && keys.length > 0)) return null;

  return (
    <details open>
      <summary>Missing</summary>
      <div>
        <code>{keys.join(", ")}</code>
      </div>
    </details>
  );
}
