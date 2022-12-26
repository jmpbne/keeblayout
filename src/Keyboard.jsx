import { transposeLayers } from "./core";

export default function Keyboard({ layers }) {
  const transposedData = transposeLayers(layers);

  return (
    <table>
      <tbody>
        {transposedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((column, colIndex) => (
              <td key={colIndex}>
                {column.some((k) => k) &&
                  column.map((key, layerIndex) => (
                    <div key={layerIndex}>{key || <>&nbsp;</>}</div>
                  ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
