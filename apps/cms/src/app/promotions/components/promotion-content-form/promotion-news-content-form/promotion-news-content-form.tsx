"use client";

import { NewsOptionSchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
import { DefaultValues } from "@/ui-shared/components/form";
import {
  FormSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui-shared/components/select";
import { FC } from "react";
import { v4 as uuid } from "uuid";

import { CreatePromotionFormSchema } from "../../create-promotion/hooks";
import { PromotionNewsContentFormSchema, usePromotionNewsContentForm } from "./hooks";

export type PromotionNewsContentFormProps = {
  defaultValues?: DefaultValues<PromotionNewsContentFormSchema> & Record<string, unknown>;
  handleSubmit: (content: CreatePromotionFormSchema["content"]) => void;
  news: NewsOptionSchema[];
};

export const PromotionNewsContentForm: FC<PromotionNewsContentFormProps> = ({
  defaultValues,
  handleSubmit,
  news,
}) => {
  const formId = uuid();
  const { control, handleSubmit: handleFormSubmit } = usePromotionNewsContentForm(defaultValues);

  return (
    <form id={formId} onSubmit={handleFormSubmit(async data => handleSubmit(data))}>
      <FormSelect control={control} label="News" name="newsId">
        <SelectTrigger>
          <SelectValue placeholder="Select news" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {news?.map(newsItem => {
              return (
                <SelectItem key={newsItem.id} value={newsItem.id}>
                  {newsItem.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </FormSelect>
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-44" form={formId} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
