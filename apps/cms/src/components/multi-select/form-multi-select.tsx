import {
  Control,
  FieldPathByValue,
  FieldValues,
  PathValue,
  useController,
} from "@/ui-shared/components/form";
import { ReactElement } from "react";

import { Item, MultiSelect, MultiSelectProps } from "./multi-select";

export type FormMultiSelectProps<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, Item[] | null | undefined>,
> = {
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, TPath>;
  name: TPath;
} & Omit<MultiSelectProps, "defaultValue" | "onChange">;

export const FormMultiSelect = <
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, Item[] | null | undefined>,
>({
  control,
  defaultValue = [] as PathValue<TFieldValues, TPath>,
  name,
  ...props
}: FormMultiSelectProps<TFieldValues, TPath>): ReactElement | null => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });

  return (
    <MultiSelect {...props} defaultValue={field.value} onChange={value => field.onChange(value)} />
  );
};
