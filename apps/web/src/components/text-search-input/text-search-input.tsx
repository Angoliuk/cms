"use client";
import { Input, InputProps } from "@/ui-shared/components/input";
import { ChangeEvent, FC } from "react";

import { useDebounce } from "../../hooks/debounce";
import { useSearchParam } from "../../hooks/search-param";

export type TextSearchInputProps = { key?: string } & Omit<InputProps, "onChange">;

export const TextSearchInput: FC<TextSearchInputProps> = ({ key = "search", ...inputProps }) => {
  const { handleParamChange } = useSearchParam({ key });

  const { debounceCallback: handleSearchChange } = useDebounce<ChangeEvent<HTMLInputElement>>({
    callback: event => {
      handleParamChange(event?.target?.value);
    },
    debounce: 300,
  });

  return <Input {...inputProps} onChange={handleSearchChange} />;
};
