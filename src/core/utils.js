export function transposeLayers(layers) {
  return layers[0].map((row, rowIndex) =>
    row.map((_, colIndex) => layers.map((layer) => layer[rowIndex][colIndex]))
  );
}
