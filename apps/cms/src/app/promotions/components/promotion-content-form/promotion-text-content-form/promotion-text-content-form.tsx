"use client";

import { CreatePromotionWithTextContentSchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
import { DefaultValues } from "@/ui-shared/components/form";
import { FormInput } from "@/ui-shared/components/input";
import { FC } from "react";
import { v4 as uuid } from "uuid";

import { CreatePromotionFormSchema } from "../../create-promotion/hooks";
import { usePromotionTextContentForm } from "./hooks";

export type PromotionTextContentFormProps = {
  defaultValues?: DefaultValues<CreatePromotionWithTextContentSchema> & Record<string, unknown>;
  handleSubmit: (content: CreatePromotionFormSchema["content"]) => void;
};

export const PromotionTextContentForm: FC<PromotionTextContentFormProps> = ({
  defaultValues,
  handleSubmit,
}) => {
  const formId = uuid();
  const { control, handleSubmit: handleFormSubmit } = usePromotionTextContentForm(defaultValues);

  return (
    <form id={formId} onSubmit={handleFormSubmit(data => handleSubmit(data))}>
      <FormInput control={control} label="Link" name="link" />
      <FormInput containerClassName="mt-4" control={control} label="Text" name="text" />
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-44" form={formId} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
