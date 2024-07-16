import { SubmitHandler, useForm } from "react-hook-form";
import {
  WATER_CALCULATOR_DEFAULT_VALUE,
  WATER_CALCULATOR_INPUT_CONFIG,
} from "../constants/waterCalculator.ts";
import { SelectFieldHookForm } from "./common/SelectInputHookForm.tsx";
import { WaterCalculatorFormDefaultValue } from "../types/waterCalculator.ts";
import { InputTextHookForm } from "./common/InputTextHookForm.tsx";
import { calculateDailyWaterIntake } from "../helpers/calculateDailyWaterIntake.ts";
import { useState } from "react";

export const WaterCalculator = () => {
  const [waterIntake, setWaterIntake] = useState<number>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WaterCalculatorFormDefaultValue>({
    defaultValues: WATER_CALCULATOR_DEFAULT_VALUE,
  });

  const onSubmit: SubmitHandler<WaterCalculatorFormDefaultValue> = (data) => {
    setWaterIntake(calculateDailyWaterIntake(data));
  };

  return (
    <div className={"flex gap-10"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col gap-2 w-56 border p-4 rounded-xl bg-sky-300"}
      >
        <h1 className={"text-center text-lg font-mono"}>Pitny rezim</h1>
        <InputTextHookForm<WaterCalculatorFormDefaultValue, "Weight">
          control={control}
          name={"Weight"}
          rules={{
            valueAsNumber: true,
            validate: (value) => {
              return Number(value) <= 0 ? "Vaha nesmi byt <= 0" : true;
            },
          }}
          label={"Váha"}
          errorMessage={errors.Weight?.message}
        />

        <SelectFieldHookForm<WaterCalculatorFormDefaultValue, "Weather">
          name={"Weather"}
          control={control}
          options={Object.values(WATER_CALCULATOR_INPUT_CONFIG.Weather).map(
            (option) => ({
              value: option.value,
              label: option.label,
            }),
          )}
          rules={{ valueAsNumber: true }}
          label={"Pocasi"}
        />

        <SelectFieldHookForm<WaterCalculatorFormDefaultValue, "Category">
          name={"Category"}
          control={control}
          options={Object.values(WATER_CALCULATOR_INPUT_CONFIG.Category).map(
            (option) => ({
              value: option.value,
              label: option.label,
            }),
          )}
          rules={{ valueAsNumber: true }}
          label={"Kategorie"}
        />
        <SelectFieldHookForm<
          WaterCalculatorFormDefaultValue,
          "CoffeeConsumption"
        >
          name={"CoffeeConsumption"}
          control={control}
          options={Object.values(
            WATER_CALCULATOR_INPUT_CONFIG.CoffeeConsumption,
          ).map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          rules={{ valueAsNumber: true }}
          label={"Konzumace kavy"}
        />

        <SelectFieldHookForm<WaterCalculatorFormDefaultValue, "Overweight">
          name={"Overweight"}
          control={control}
          options={Object.values(WATER_CALCULATOR_INPUT_CONFIG.Overweight).map(
            (option) => ({
              value: option.value,
              label: option.label,
            }),
          )}
          rules={{ valueAsNumber: true }}
          label={"Nadvaha"}
        />

        <SelectFieldHookForm<
          WaterCalculatorFormDefaultValue,
          "PhysicalActivity"
        >
          name={"PhysicalActivity"}
          control={control}
          options={Object.values(
            WATER_CALCULATOR_INPUT_CONFIG.PhysicalActivity,
          ).map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          rules={{ valueAsNumber: true }}
          label={"Fyzicka aktivita"}
        />
        <button
          type="submit"
          className={
            " w-20 rounded-xl py-2 bg-green-700 self-center text-neutral-50 mt-5"
          }
        >
          Pocitat
        </button>
      </form>

      {waterIntake && (
        <h1 data-testid="water-intake-result">
          Vypit musis alespon: {waterIntake} ml
        </h1>
      )}
    </div>
  );
};
