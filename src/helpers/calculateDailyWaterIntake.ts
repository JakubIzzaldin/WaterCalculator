import { WaterCalculatorFormDefaultValue } from "../types/waterCalculator.ts";

export const calculateDailyWaterIntake = (
  data: WaterCalculatorFormDefaultValue,
) => {
  const totalIntake =
    data.Category * (data.Weight || 1) +
    data.CoffeeConsumption +
    data.PhysicalActivity +
    data.Overweight;

  const adjustmentFactor = 1 + data.Weather;

  return Math.round(totalIntake * adjustmentFactor);
};
