import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  SORTED_WATER_CONFIG,
  WATER_CALCULATOR_CONFIG,
} from "../constants/waterCalculator.ts";
import { InputTextHookForm } from "./common/InputTextHookForm.tsx";
import { SelectFieldHookForm } from "./common/SelectInputHookForm.tsx";
import { calculateDailyWaterIntake2 } from "../helpers/calculateDailyWaterIntake.ts";
import { WaterCalcFormType } from "../types/waterCalculator.ts";

export const WaterCalculator = () => {
  const [waterIntake, setWaterIntake] = useState<number>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WaterCalcFormType>({
    defaultValues: WATER_CALCULATOR_CONFIG.reduce((prev, act) => {
      return { ...prev, [act.id]: act.values?.[act.defaultValueKey].value };
    }, {}),
  });

  const onSubmit: SubmitHandler<WaterCalcFormType> = (data) => {
    setWaterIntake(calculateDailyWaterIntake2(data));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col gap-2 w-56 border p-4 rounded-xl bg-sky-300"}
      >
        <h1 className={"text-center text-lg font-mono"}>Pitny rezim</h1>
        {SORTED_WATER_CONFIG.map((item) => {
          if (item.type === "select" && item.values) {
            return (
              <SelectFieldHookForm
                key={item.id}
                name={item.id}
                control={control}
                options={Object.values(item.values).map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                rules={{ valueAsNumber: true }}
                label={item.label}
              />
            );
          } else if (item.type === "text") {
            return (
              <InputTextHookForm
                key={item.id}
                control={control}
                name={item.id}
                rules={item.rules}
                label={item.label}
                errorMessage={
                  errors[item.id]?.message && String(errors[item.id]?.message)
                }
              />
            );
          } else return null;
        })}
        <button
          type="submit"
          className={
            "w-20 rounded-xl py-2 bg-green-700 self-center text-neutral-50 mt-5"
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
