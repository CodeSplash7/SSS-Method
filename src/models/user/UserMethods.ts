import { IUser, PerformanceLevels } from "@/types/UserTypes";
import { UserSchema } from "./UserModel";
import { calculate1RM } from "@/general-utils/calculate1rm";

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
 * @returns {PerformanceLevels} An object containing the overall performance level
 * and individual performance levels for each exercise.
 */
UserSchema.methods.getPerformanceLevel = function (
  this: IUser,
  state: "peak" | "current"
): PerformanceLevels {
  const performanceLevels: PerformanceLevels = {
    overall: 0
  };
  for (let exercise of this.strengthProfile) {
    const performanceLevel = calculate1RM(exercise[`${state}Performance`]);
    performanceLevels[exercise.name] = performanceLevel;
    performanceLevels.overall =
      (performanceLevel + performanceLevels.overall) /
      (Object.keys(performanceLevels).length - 1);
  }
  return performanceLevels;
};
