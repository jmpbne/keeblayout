export default function KeyboardMissing({ keys }) {
  if (!(keys && keys.length > 0)) return null;

  return (
    <>
      <h3>Missing</h3>
      <p>
        <code>{keys.join(", ")}</code>
      </p>
    </>
  );
}
