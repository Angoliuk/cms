"use client";
import { Input, InputProps } from "@/ui-shared/components/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FC } from "react";

import { useDebounce } from "../../hooks";

export type TextSearchInputProps = { key?: string } & Omit<InputProps, "onChange">;

export const TextSearchInput: FC<TextSearchInputProps> = ({ key = "search", ...inputProps }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { debounceCallback: onSearchChange } = useDebounce<ChangeEvent<HTMLInputElement>>({
    callback: event => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, event?.target?.value ?? "");

      router.push(pathname + "?" + params.toString());
    },
    debounce: 300,
  });

  return <Input {...inputProps} onChange={onSearchChange} />;
};
