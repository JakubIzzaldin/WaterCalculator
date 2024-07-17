import { WATER_CALCULATOR_CONFIG } from "../constants/waterCalculator.ts";

export const calculateDailyWaterIntake2 = (
  data: Record<string, number | string>,
) => {
  const sumItems = Object.entries(data).reduce((prev, [key, value]) => {
    if (
      WATER_CALCULATOR_CONFIG.find((item) => item.id === key)?.operation ===
      "add"
    ) {
      return prev + Number(value);
    }
    return prev;
  }, 0);
  const multiplyAllFactor = Object.entries(data).reduce(
    (prev, [key, value]) => {
      if (
        WATER_CALCULATOR_CONFIG.find((item) => item.id === key)?.operation ===
        "multiplyAll"
      ) {
        return prev * Number(value);
      }
      return prev;
    },
    1,
  );
  const { multiplied: multipliedItems } = WATER_CALCULATOR_CONFIG.reduce(
    (prev, act) => {
      if (act.operation === "multipleWith" && act.multiplyWithKey) {
        if (!prev.keys.includes(act.multiplyWithKey)) {
          prev.keys.push(act.multiplyWithKey);

          const multiplyWithFiltered = WATER_CALCULATOR_CONFIG.filter(
            (item) => item.multiplyWithKey === act.multiplyWithKey,
          );

          const product = multiplyWithFiltered.reduce((prev, item) => {
            return prev * Number(data[item.id]);
          }, 1);

          prev.multiplied *= product;
        }
      }
      return prev;
    },
    { multiplied: 1, keys: [] as string[] },
  );

  return Math.round((sumItems + multipliedItems) * multiplyAllFactor);
};
