import { transposeLayers } from "../core/utils";

export default function Keyboard({ title, layers, labels }) {
  if (!layers) return null;

  const transposedData = transposeLayers(layers);

  return (
    <details open>
      <summary>{title}</summary>
      <div>
        <table>
          <tbody>
            {transposedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.some((k) => k) &&
                      column.map((key, layerIndex) => (
                        <div key={layerIndex}>
                          {labels[key] || key || <>&nbsp;</>}
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
