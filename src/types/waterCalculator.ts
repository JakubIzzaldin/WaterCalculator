import {
  categoryObject,
  coffeeConsumptionObject,
  overweightObject,
  physicalActivityObject,
  weatherObject,
  weightObject,
} from "../constants/waterCalculator.ts";

export type Category = (typeof categoryObject)[keyof typeof categoryObject];

export type Overweight =
  (typeof overweightObject)[keyof typeof overweightObject];

export type PhysicalActivity =
  (typeof physicalActivityObject)[keyof typeof physicalActivityObject];

export type CoffeeConsumption =
  (typeof coffeeConsumptionObject)[keyof typeof coffeeConsumptionObject];

export type Weather = (typeof weatherObject)[keyof typeof weatherObject];
export type Weight = (typeof weightObject)[keyof typeof weightObject];

export type WaterCalculatorFormDefaultValue = {
  Weather: Weather["value"];
  CoffeeConsumption: CoffeeConsumption["value"];
  PhysicalActivity: PhysicalActivity["value"];
  Overweight: Overweight["value"];
  Category: Category["value"];
  Weight: number | undefined;
};
export type WaterCalculatorKeys = keyof WaterCalculatorFormDefaultValue;

export type WaterCalculatorInputConfig = Record<
  WaterCalculatorKeys,
  Record<string, { value: number | string; label: string }>
>;
