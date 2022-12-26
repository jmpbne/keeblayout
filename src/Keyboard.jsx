import { transposeLayers } from "./core";

export default function Keyboard({ layers }) {
  const transposedData = transposeLayers(layers);

  return (
    <table>
      <tbody>
        {transposedData.map((row, rowID) => (
          <tr key={rowID}>
            {row.map((column, columnID) => (
              <td key={columnID}>
                {column.map((key, keyID) => (
                  <div key={keyID}>{key}</div>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
