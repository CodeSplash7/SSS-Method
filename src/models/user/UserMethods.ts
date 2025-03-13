import { IUser, LiftRecord, PowerLevels } from "@/types/UserTypes";
import { UserSchema } from "./UserModel";
import { calculate1RM } from "@/general-utils/calculate1rm";
import { calculatePowerLevel } from "@/general-utils/liftingMetrics";

/**
 * Calculates the performance levels for a user based on their strength profile.
 *
 * This instance method computes individual performance levels for each exercise
 * and calculates an overall performance level. The `state` parameter determines
 * whether the calculation uses "peak" or "current" performance data.
 *
 * @method
 * @this {IUser} The current user instance.
 * @param {"peak" | "current"} state - The performance state to calculate:
 * - "peak": Uses the user's best recorded performance.
 * - "current": Uses the user's current performance level.
 * @returns {PowerLevels} An object containing the overall performance level
 * and individual performance levels for each exercise.
 */
UserSchema.methods.getPowerLevels = function (
  this: IUser,
  state: "peak" | "current",
): PowerLevels {
  const powerLevels: PowerLevels = {
    overall: 0,
  };
  for (let exercise of this.strengthProfile) {
    // identify the lift
    const liftId = exercise[`${state}LiftId` as "peakLiftId" | "currentLiftId"];
    const lift = this.liftHistory.find(
      (liftRecord: LiftRecord) => liftRecord._id === liftId,
    );
    if (!lift) continue;

    // append the value
    const powerLevel = lift?.parameters.powerLevel;
    powerLevels[exercise.name] = powerLevel;
    powerLevels.overall =
      (powerLevel + powerLevels.overall) /
      (Object.keys(powerLevels).length - 1);
  }
  return powerLevels;
};
