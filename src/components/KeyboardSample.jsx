import { DEFAULT_DATA } from "../core/data";

export default function KeyboardSample() {
  return (
    <details>
      <summary>Sample data</summary>
      <div>
        <textarea value={DEFAULT_DATA} readOnly></textarea>
      </div>
    </details>
  );
}
