export function calculateFatigue(
  performance: {
    weight: number;
    reps: number;
  },
  parameters: {
    bodyWeight: number;
    freshPowerLevel: number;
    type?: "concentric" | "eccentric";
  } = { bodyWeight: 0, freshPowerLevel: 0, type: "concentric" },
) {
  const { weight, reps } = performance;
  const { bodyWeight, freshPowerLevel, type = "concentric" } = parameters;

  let totalLoad = bodyWeight + weight;
  if (type === "eccentric") totalLoad /= 1.3;

  if (totalLoad <= 0 || reps <= 0) return 0;

  const estimatedPowerLevel = totalLoad * (1 + 0.025 * reps) - bodyWeight - 3;

  // Calculate the difference between the fresh and current power levels
  const fatigueLoss = freshPowerLevel - estimatedPowerLevel;

  // Calculate the fatigue percentage relative to the fresh power level
  const fatiguePercentage = (fatigueLoss / freshPowerLevel) * 100;

  // Return the fatigue as a percentage (0% = no fatigue, 100% = maximum fatigue)
  return fatiguePercentage;
}

export function calculateReps(
  performance: {
    weight: number;
  },
  parameters: {
    bodyWeight: number;
    powerLevel: number;
    type?: "concentric" | "eccentric";
  },
) {
  const { weight } = performance;
  const { bodyWeight, powerLevel, type = "concentric" } = parameters;

  const adjustedPowerLevel = powerLevel + bodyWeight + 3;
  let totalLoad = bodyWeight + weight;
  if (type === "eccentric") totalLoad /= 1.3;

  if (totalLoad <= 0) throw new Error("Total load must be greater than 0");

  // Calculate reps based on the adjusted power level after considering fatigue as percentage
  const estimatedReps = (adjustedPowerLevel / totalLoad - 1) / 0.025;
  return Math.round(estimatedReps);
}

export function calculatePowerLevel(
  performance: {
    weight: number;
    reps: number;
  },
  parameters: {
    bodyWeight: number;
    fatigue: number;
    type: "concentric" | "eccentric";
  },
) {
  const { weight, reps } = performance;
  const { bodyWeight, type = "concentric", fatigue = 0 } = parameters;

  let totalLoad = bodyWeight + weight;
  if (type === "eccentric") totalLoad /= 1.3;
  if (totalLoad <= 0 || reps <= 0) return 0;

  const powerLevelEstimate = totalLoad * (1 + 0.025 * reps);

  // Convert fatigue from percentage to a decimal and adjust the power level
  const adjustedPowerLevel = powerLevelEstimate / (1 - fatigue / 100);

  // Subtract body weight and 3 to return the actual power level
  return adjustedPowerLevel - bodyWeight - 3;
}
