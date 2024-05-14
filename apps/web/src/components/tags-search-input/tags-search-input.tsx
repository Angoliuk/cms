"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

import { TagsInput } from "../tags-input";

export type TagSearchInputProps = { key?: string };

export const TagsSearchInput: FC<TagSearchInputProps> = ({ key = "tags" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (tags: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, tags.join(";"));

    router.push(pathname + "?" + params.toString());
  };

  return <TagsInput onChange={onChange} />;
};
