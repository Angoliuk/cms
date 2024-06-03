import { NewsOptionSchema } from "@/cms-shared/validation";
import { tw } from "@/tailwind";
import { Card } from "@/ui-shared/components/card";
import { FC } from "react";

import { CONTENT_TYPE, CreatePromotionFormSchema } from "../create-promotion/hooks";
import { SavedContentCard } from "../saved-content-card";
import { PromotionImageContentForm } from "./promotion-image-content-form";
import { PromotionNewsContentForm } from "./promotion-news-content-form";
import { PromotionTextContentForm } from "./promotion-text-content-form";

export type ContentFormProps = {
  className?: string;
  contentType: CONTENT_TYPE;
  contentValues: CreatePromotionFormSchema["content"];
  handleChangeClick: () => void;
  handleSubmit: (content: CreatePromotionFormSchema["content"]) => void;
  isSaved: boolean;
  news: NewsOptionSchema[];
};

export const ContentForm: FC<ContentFormProps> = ({
  className,
  contentType,
  contentValues,
  handleChangeClick,
  handleSubmit,
  isSaved,
  news,
}) => {
  const promotionContentForms = {
    [CONTENT_TYPE.IMAGE]: () => (
      <PromotionImageContentForm
        defaultValues={contentType === CONTENT_TYPE.IMAGE ? contentValues : undefined}
        handleSubmit={handleSubmit}
      />
    ),
    [CONTENT_TYPE.NEWS]: () => (
      <PromotionNewsContentForm
        defaultValues={contentType === CONTENT_TYPE.NEWS ? contentValues : undefined}
        handleSubmit={handleSubmit}
        news={news}
      />
    ),
    [CONTENT_TYPE.TEXT]: () => (
      <PromotionTextContentForm
        defaultValues={contentType === CONTENT_TYPE.TEXT ? contentValues : undefined}
        handleSubmit={handleSubmit}
      />
    ),
  };

  return (
    <Card className={tw("mobile:w-full desktop:mt-12 w-4/12 px-6 py-4", className)}>
      {isSaved ? (
        <SavedContentCard handleClick={handleChangeClick} message="Content saved" />
      ) : (
        <>
          <p className="text-headlineS mb-4 text-center">Content</p>
          {contentType && contentType in promotionContentForms ? (
            promotionContentForms?.[contentType]?.()
          ) : (
            <p>Select content!</p>
          )}
        </>
      )}
    </Card>
  );
};
