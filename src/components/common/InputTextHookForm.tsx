import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type InputTextFieldRenderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  defaultValue?: TFieldValues[TName];
  rules?: RegisterOptions<TFieldValues, TName>;
  errorMessage?: string;
  testID?: string;
  label?: string;
};

export const InputTextHookForm = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  defaultValue,
  rules,
  errorMessage,
  testID,
  label,
}: InputTextFieldRenderProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <div className={"flex flex-col"}>
          <label>{label}</label>
          <input {...field} data-testid={testID} type={"number"} />
          {errorMessage && (
            <span className={"text-xs text-red-600"}>{errorMessage}</span>
          )}
        </div>
      )}
    />
  );
};
