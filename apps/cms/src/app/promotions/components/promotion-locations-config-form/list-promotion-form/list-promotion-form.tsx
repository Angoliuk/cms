"use client";

import { BaseCreateListPromotionSchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
import { DefaultValues } from "@/ui-shared/components/form";
import { FormInput } from "@/ui-shared/components/input";
import { FormToggleGroup, ToggleGroupItem } from "@/ui-shared/components/toggle-group";
import { PROMOTION_LOCATION_LIST_TYPE } from "@prisma/client";
import { FC } from "react";
import { v4 as uuid } from "uuid";

import { CreatePromotionFormSchema } from "../../create-promotion/hooks";
import { useListPromotionForm } from "./hooks";

export type ListPromotionFormProps = {
  defaultValues?: DefaultValues<BaseCreateListPromotionSchema>;
  handleSubmit: (data: CreatePromotionFormSchema["locations"]["list"]) => void;
};

export const ListPromotionForm: FC<ListPromotionFormProps> = ({ defaultValues, handleSubmit }) => {
  const formId = uuid();
  const { control, handleSubmit: handleFormSubmit } = useListPromotionForm(defaultValues);

  return (
    <form id={formId} onSubmit={handleFormSubmit(data => handleSubmit(data))}>
      <FormToggleGroup control={control} name="listType" type="single">
        <ToggleGroupItem value={PROMOTION_LOCATION_LIST_TYPE.TAG_FILTER}>
          Tag filter
        </ToggleGroupItem>
        <ToggleGroupItem value={PROMOTION_LOCATION_LIST_TYPE.MAIN}>Main</ToggleGroupItem>
      </FormToggleGroup>
      <FormInput control={control} label="Priority" name="priority" type="number" />
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-44" form={formId} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
