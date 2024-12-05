export function calculate1RM(performance: {
  reps: number;
  weight: number;
}): number {
  const { weight, reps } = performance;
  return weight * (1 + 0.0333 * reps);
}
