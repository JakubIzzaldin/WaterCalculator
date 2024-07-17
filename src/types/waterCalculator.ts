import { Path, RegisterOptions } from "react-hook-form";

export type WaterCalcFormType = Record<string, any>;

type WaterCalcConfigBase<E extends WaterCalcFormType> = {
  type: "text" | "select";
  label: string;
  id: string;
  values?: Record<string, { value: number | string; label: string }>;
  defaultValueKey: string;
  operation: "add" | "multiplyAll" | "multipleWith";
  rules?: RegisterOptions<E, Path<E>>;
};

type MultiplyWithItem<E extends WaterCalcFormType> = {
  operation: "multipleWith";
  multiplyWithKey: string;
} & WaterCalcConfigBase<E>;

type NonMultiplyWithItem<E extends WaterCalcFormType> = {
  operation: "add" | "multiplyAll";
} & WaterCalcConfigBase<E>;

export type WaterCalcConfig<E extends WaterCalcFormType> =
  | MultiplyWithItem<E>
  | NonMultiplyWithItem<E>;
