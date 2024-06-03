"use client";
import { FC } from "react";

import { useSearchParam } from "../../hooks/search-param";
import { TagsInput } from "../tags-input";

export type TagSearchInputProps = { key?: string };

export const TagsSearchInput: FC<TagSearchInputProps> = ({ key = "tags" }) => {
  const { handleParamChange } = useSearchParam({ key });

  const handleTagsChange = (tags: string[]) => {
    handleParamChange(tags.join(";"));
  };

  return <TagsInput handleChange={handleTagsChange} />;
};
