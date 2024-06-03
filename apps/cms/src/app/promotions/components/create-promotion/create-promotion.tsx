"use client";

import { cmsContract } from "@/cms-shared/api";
import { NewsOptionSchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
import { Card } from "@/ui-shared/components/card";
import { FormCheckbox } from "@/ui-shared/components/checkbox";
import { toast } from "@/ui-shared/components/toaster";
import { FormToggleGroup, ToggleGroupItem } from "@/ui-shared/components/toggle-group";
import { objectToFormData } from "@/ui-shared/utils/form-data";
import { PROMOTION_LOCATION } from "@prisma/client";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC, useState } from "react";
import { v4 as uuid } from "uuid";

import { ContentForm } from "../promotion-content-form";
import { LocationsForm } from "../promotion-locations-config-form";
import { CONTENT_TYPE, CreatePromotionFormSchema, useCreatePromotionForm } from "./hooks";

export type CreatePromotionProps = {
  handleCreatePromotion: (
    data: ClientInferRequest<typeof cmsContract.promotions.create>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.promotions.create>>;
  news: NewsOptionSchema[];
};

export const CreatePromotion: FC<CreatePromotionProps> = ({ handleCreatePromotion, news }) => {
  const formId = uuid();
  const { control, getValues, handleSubmit, reset, setValue, watch } = useCreatePromotionForm();

  const [isContentSaved, setIsContentSaved] = useState(false);
  const [isConfigsSaved, setIsConfigsSaved] = useState<Record<PROMOTION_LOCATION, boolean>>({
    LIST: false,
    SEARCH: false,
  });

  const promotionTypes = watch("base.locations");
  const contentType = watch("contentType");

  const handleFormSubmit = handleSubmit(async data => {
    const formData = objectToFormData({
      ...data.base,
      ...data.content,
      ...(data.locations.list ?? {}),
      ...(data.locations.search ?? {}),
    });
    const response = await handleCreatePromotion(formData);

    if (response.status === 200) {
      toast({
        description: `Created ${response.body.id} promotion`,
        title: "Success!",
      });
    } else {
      toast({
        description: response.body.message,
        title: "Error!",
      });
    }

    reset();
    setIsContentSaved(false);
    setIsConfigsSaved({
      LIST: false,
      SEARCH: false,
    });
  });

  const handleContentSubmit = (content: CreatePromotionFormSchema["content"]) => {
    setIsContentSaved(true);
    setValue("content", content);
  };

  const handleListLocationSubmit = (location: CreatePromotionFormSchema["locations"]["list"]) => {
    setIsConfigsSaved({ ...isConfigsSaved, LIST: true });
    setValue(`locations.list`, location);
  };

  const handleSearchLocationSubmit = (
    location: CreatePromotionFormSchema["locations"]["search"],
  ) => {
    setIsConfigsSaved({ ...isConfigsSaved, SEARCH: true });
    setValue(`locations.search`, location);
  };

  return (
    <div>
      <div className="mobile:flex-col mobile:gap-4 flex gap-12">
        <Card className="mobile:w-full desktop:mt-12 w-4/12 px-6 py-4">
          <form id={formId} onSubmit={handleFormSubmit}>
            <p className="text-headlineS mb-4 text-center">Base</p>
            <FormToggleGroup
              className="justify-start gap-4"
              control={control}
              label="Promotion location"
              name="base.locations"
              type="multiple"
            >
              <ToggleGroupItem value={PROMOTION_LOCATION.LIST}>List</ToggleGroupItem>
              <ToggleGroupItem value={PROMOTION_LOCATION.SEARCH}>Search</ToggleGroupItem>
            </FormToggleGroup>
            <FormToggleGroup
              className="justify-start gap-4"
              containerClassName="mt-4 "
              control={control}
              label="Promotion content"
              name="contentType"
              type="single"
            >
              <ToggleGroupItem value={CONTENT_TYPE.TEXT}>Text</ToggleGroupItem>
              <ToggleGroupItem value={CONTENT_TYPE.IMAGE}>Image</ToggleGroupItem>
              <ToggleGroupItem value={CONTENT_TYPE.NEWS}>News</ToggleGroupItem>
            </FormToggleGroup>
            <FormCheckbox
              containerClassName="mt-4"
              control={control}
              label="Is draft"
              name="base.isDraft"
            />
          </form>
        </Card>
        <ContentForm
          contentType={contentType}
          contentValues={getValues("content")}
          handleChangeClick={() => setIsContentSaved(false)}
          handleSubmit={handleContentSubmit}
          isSaved={isContentSaved}
          news={news}
        />
        <LocationsForm
          handleChangeClick={type => setIsConfigsSaved({ ...isConfigsSaved, [type]: false })}
          handleListSubmit={handleListLocationSubmit}
          handleSearchSubmit={handleSearchLocationSubmit}
          locationValues={getValues("locations")}
          locationsSaveStatus={isConfigsSaved}
          promotionLocations={promotionTypes}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-[512px]" form={formId} type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};
