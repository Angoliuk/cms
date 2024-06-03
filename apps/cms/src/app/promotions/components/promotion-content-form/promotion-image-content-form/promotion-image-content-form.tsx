"use client";

import { CreatePromotionWithImageContentSchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
import { DefaultValues, useController } from "@/ui-shared/components/form";
import { FormInput, Input } from "@/ui-shared/components/input";
import { FC } from "react";
import { v4 as uuid } from "uuid";

import { CreatePromotionFormSchema } from "../../create-promotion/hooks";
import { usePromotionImageContentForm } from "./hooks";

export type PromotionImageContentFormProps = {
  defaultValues?: DefaultValues<CreatePromotionWithImageContentSchema> & Record<string, unknown>;
  handleSubmit: (content: CreatePromotionFormSchema["content"]) => void;
};

export const PromotionImageContentForm: FC<PromotionImageContentFormProps> = ({
  defaultValues,
  handleSubmit: handleSubmit,
}) => {
  const formId = uuid();
  const { control, handleSubmit: handleFormSubmit } = usePromotionImageContentForm(defaultValues);

  // TODO: file upload component
  const { field, fieldState } = useController({
    control,
    name: "image",
  });

  return (
    <form id={formId} onSubmit={handleFormSubmit(data => handleSubmit(data))}>
      <Input
        {...field}
        error={fieldState.isTouched && (fieldState.error?.message ?? fieldState.error?.type)}
        label="Image"
        onChange={e => field.onChange(e.target.files?.[0])}
        type="file"
        value={undefined}
      />
      <FormInput containerClassName="mt-4" control={control} label="Link" name="link" />
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-44" form={formId} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
