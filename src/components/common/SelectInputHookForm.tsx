import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type SelectFieldRenderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  defaultValue?: TFieldValues[TName];
  rules?: RegisterOptions<TFieldValues, TName>;
  errorMessage?: string;
  testID?: string;
  options: Array<{ value: string | number; label: string }>;
  label?: string;
};

export const SelectFieldHookForm = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  defaultValue,
  rules,
  errorMessage,
  testID,
  options,
  label,
}: SelectFieldRenderProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-col">
          <label>{label}</label>
          <select
            {...field}
            data-testid={testID}
            onChange={(e) => {
              if (rules?.valueAsNumber) field.onChange(Number(e.target.value));
              else field.onChange(e.target.value);
            }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errorMessage && <span>{errorMessage}</span>}
        </div>
      )}
    />
  );
};
