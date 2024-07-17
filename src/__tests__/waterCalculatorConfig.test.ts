import { WATER_CALCULATOR_CONFIG } from "../constants/waterCalculator";

function isMultiplyWithItem(
  config: Record<string, any>,
): config is { multiplyWithKey: string } {
  return "multiplyWithKey" in config;
}

describe("Water Calculator Config Tests", () => {
  it("should ensure all multiplyWithKey keys appear at least twice", () => {
    const keyCount: { [key: string]: number } = {};

    WATER_CALCULATOR_CONFIG.forEach((config) => {
      if (isMultiplyWithItem(config)) {
        if (!keyCount[config.multiplyWithKey]) {
          keyCount[config.multiplyWithKey] = 0;
        }
        keyCount[config.multiplyWithKey]++;
      }
    });

    const failingKeys = Object.keys(keyCount).filter(
      (key) => keyCount[key] < 2,
    );

    expect(failingKeys).toEqual([]);
  });
  it("should ensure all defaultValue keys are valid keys in values", () => {
    WATER_CALCULATOR_CONFIG.forEach((config) => {
      if (config.values) {
        const validKeys = Object.keys(config.values);
        expect(validKeys).toContain(config.defaultValueKey);
      }
    });
  });
});
