import { Button } from "@/ui-shared/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui-shared/components/dropdown-menu";
import { FC, useState } from "react";

export type Item = {
  label: string;
  value: string;
};

export type MultiSelectProps = {
  defaultValue?: Item[];
  items: Item[];
  onChange: (value: Item[]) => void;
  triggerText?: string;
};

export const MultiSelect: FC<MultiSelectProps> = ({
  defaultValue = [],
  items,
  onChange,
  triggerText,
}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>(defaultValue);

  const handleSelectChange = (newItem: Item) => {
    if (selectedItems.includes(newItem)) {
      const updatedItems = selectedItems.filter(item => item.value != newItem.value);
      setSelectedItems(updatedItems);
      onChange(updatedItems);
    } else {
      const updatedItems = [...selectedItems, newItem];
      setSelectedItems(updatedItems);
      onChange(updatedItems);
    }
  };

  const isOptionSelected = (searchedItem: Item) => {
    return selectedItems.find(item => searchedItem.value === item.value) ? true : false;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 font-bold" variant="outline">
          <span>{triggerText}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" onCloseAutoFocus={e => e.preventDefault()}>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map(item => {
          return (
            <DropdownMenuCheckboxItem
              checked={isOptionSelected(item)}
              key={item.value}
              onCheckedChange={() => handleSelectChange(item)}
              onSelect={e => e.preventDefault()}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
