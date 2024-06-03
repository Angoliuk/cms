"use client";

import { BaseCreateSearchPromotionSchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
import { DefaultValues } from "@/ui-shared/components/form";
import { FormInput } from "@/ui-shared/components/input";
import { FC } from "react";
import { v4 as uuid } from "uuid";

import { CreatePromotionFormSchema } from "../../create-promotion/hooks";
import { useSearchPromotionForm } from "./hooks";

export type SearchPromotionFormProps = {
  defaultValues?: DefaultValues<BaseCreateSearchPromotionSchema>;
  handleSubmit: (location: CreatePromotionFormSchema["locations"]["search"]) => void;
};

export const SearchPromotionForm: FC<SearchPromotionFormProps> = ({
  defaultValues,
  handleSubmit,
}) => {
  const formId = uuid();
  const { control, handleSubmit: handleFormSubmit } = useSearchPromotionForm(defaultValues);

  return (
    <form id={formId} onSubmit={handleFormSubmit(data => handleSubmit(data))}>
      <FormInput control={control} label="Search" name="search" />
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-44" form={formId} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
