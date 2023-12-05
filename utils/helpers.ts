export const getOppositeColor = (hexColor: string) => {
  // Check if the provided color is a valid hexadecimal format
  const validHexFormat = /^#([0-9A-Fa-f]{6})$/.test(hexColor);

  if (!validHexFormat) {
    console.log('Invalid hexadecimal color format');
    return '#000000';
  }

  // Extract color components
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate the opposite of each component
  const oppositeR = 255 - r;
  const oppositeG = 255 - g;
  const oppositeB = 255 - b;

  // Convert components back to hexadecimal format and concatenate them
  const oppositeColor = `#${oppositeR.toString(16).padStart(2, '0')}${oppositeG
    .toString(16)
    .padStart(2, '0')}${oppositeB.toString(16).padStart(2, '0')}`;

  return oppositeColor;
};
