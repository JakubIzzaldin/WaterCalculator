import { WaterCalcConfig, WaterCalcFormType } from "../types/waterCalculator";

const WATER_CONFIG_ORDER = [
  "Weight",
  "Category",
  "Coffee",
  "PhysicalActivity",
  "Overweight",
  "Weather",
];

export const WATER_CALCULATOR_CONFIG: WaterCalcConfig<WaterCalcFormType>[] = [
  {
    type: "select",
    label: "Kava",
    id: "Coffee",
    values: {
      COFFEE_0: { value: 0, label: "0 káv" },
      COFFEE_1: { value: 150, label: "1 káva" },
      COFFEE_2: { value: 300, label: "2 kávy" },
      COFFEE_3: { value: 450, label: "3 kávy" },
      COFFEE_4: { value: 600, label: "4 kávy" },
    },
    defaultValueKey: "COFFEE_0",
    operation: "add",
  },
  {
    type: "select",
    label: "Kategorie",
    id: "Category",
    values: {
      INFANT: { value: 110, label: "Kojenec" },
      CHILD_1_3: { value: 95, label: "Dítě 1-3 roky" },
      CHILD_4_6: { value: 75, label: "Dítě 4-6 let" },
      CHILD_7_9: { value: 60, label: "Dítě 7-9 let" },
      CHILD_FROM_10: { value: 40, label: "Dítě od 10 let" },
      ADULT: { value: 35, label: "Dospělý" },
    },
    defaultValueKey: "ADULT",
    operation: "multipleWith",
    multiplyWithKey: "aaa",
  },
  {
    type: "text",
    label: "Váha",
    id: "Weight",
    values: {
      TEXT: { value: 0, label: "VAHA" },
    },
    rules: {
      validate: (value) => {
        return Number(value) <= 0 ? "Vaha nesmi byt <= 0" : true;
      },
    },
    defaultValueKey: "TEXT",
    operation: "multipleWith",
    multiplyWithKey: "aaa",
  },
  {
    type: "select",
    label: "Pocasi",
    id: "Weather",
    values: {
      NOT_HOT: { value: 1, label: "Není horko" },
      IS_HOT: { value: 1.1, label: "Je horko" },
    },
    defaultValueKey: "NOT_HOT",
    operation: "multiplyAll",
  },
  {
    type: "select",
    label: "Fyzicka aktivita",
    id: "PhysicalActivity",
    values: {
      N0_ACTIVITY: { value: 0, label: "Žádná aktivita" },
      MIN_30: { value: 400, label: "Min 30 minut" },
      MIN_90: { value: 800, label: "Min 90 minut" },
      MIN_120: { value: 1200, label: "Min 120 minut" },
      MIN_150: { value: 1600, label: "Min 150 minut" },
      MIN_180: { value: 2000, label: "Min 180 minut" },
    },
    defaultValueKey: "N0_ACTIVITY",
    operation: "add",
  },
  {
    type: "select",
    label: "Nadvaha",
    id: "Overweight",
    values: {
      OPTIMUM_WEIGHT: { value: 0, label: "Optimální váha" },
      UP_TO_10_KG: { value: 250, label: "Do 10 kg" },
      UP_TO_20_KG: { value: 500, label: "Do 20 kg" },
      UP_TO_30_KG: { value: 750, label: "Do 30 kg" },
      UP_TO_40_KG: { value: 1000, label: "Do 40 kg" },
      UP_TO_50_KG: { value: 1250, label: "Do 50 kg" },
    },
    defaultValueKey: "OPTIMUM_WEIGHT",
    operation: "add",
  },
];
export const SORTED_WATER_CONFIG = WATER_CALCULATOR_CONFIG.sort((a, b) => {
  return WATER_CONFIG_ORDER.indexOf(a.id) - WATER_CONFIG_ORDER.indexOf(b.id);
});
