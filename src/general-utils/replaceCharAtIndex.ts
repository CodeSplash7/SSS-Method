export default function replaceCharAtIndex(
  mainString: string,
  index: number,
  replacement: string,
): string {
  if (index < 0 || index >= mainString.length) {
    throw new Error("Index is out of bounds.");
  }
  if (replacement.length !== 1) {
    throw new Error("Replacement must be a single character.");
  }

  return mainString.slice(0, index) + replacement + mainString.slice(index + 1);
}
