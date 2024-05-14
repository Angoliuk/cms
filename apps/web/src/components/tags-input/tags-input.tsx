import { Input } from "@/ui-shared/components/input";
import React, { ChangeEventHandler, KeyboardEventHandler, useState } from "react";

import { useDebounce } from "../../hooks";

type TagsInputProps = {
  initialTags?: string[] | undefined;
  onChange: (tags: string[]) => void;
};

export const TagsInput = ({ initialTags, onChange }: TagsInputProps) => {
  const [tags, setTags] = useState<string[]>(initialTags ?? []);
  const [inputValue, setInputValue] = useState<string>("");

  const { debounceCallback: debounceOnChange } = useDebounce<string[]>({ callback: onChange, debounce: 300 });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const updatedTags = [...tags, inputValue.trim()];
      setTags([...tags, inputValue.trim()]);
      debounceOnChange(updatedTags);
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(tags.filter(tag => tag !== tagToRemove));
    debounceOnChange(updatedTags);
  };

  return (
    <div>
      <Input
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type and press Enter to add tags"
        type="text"
        value={inputValue}
      />
      <div className="mt-2">
        {tags.map((tag, index) => (
          <button
            className="w-fit rounded-md border border-stone-200 bg-transparent px-3 py-1 text-sm"
            key={index}
            onClick={() => handleTagRemove(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
