"use client";

import { cmsContract } from "@/cms-shared/api";
import { NewsOptionSchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
import { Card } from "@/ui-shared/components/card";
import { FormCheckbox } from "@/ui-shared/components/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/ui-shared/components/dialog";
import { toast } from "@/ui-shared/components/toaster";
import { FormToggleGroup, ToggleGroupItem } from "@/ui-shared/components/toggle-group";
import { objectToFormData } from "@/ui-shared/utils/form-data";
import { PROMOTION_LOCATION } from "@prisma/client";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC, useState } from "react";
import { DefaultValues } from "react-hook-form";
import { v4 as uuid } from "uuid";

import { ContentForm } from "../promotion-content-form";
import { LocationsForm } from "../promotion-locations-config-form";
import { CONTENT_TYPE, UpdatePromotionFormSchema, useUpdatePromotionForm } from "./hooks";

export type UpdatePromotionProps = {
  defaultValues: DefaultValues<UpdatePromotionFormSchema>;
  handleUpdatePromotion: (
    data: ClientInferRequest<typeof cmsContract.promotions.update>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.promotions.update>>;
  news: NewsOptionSchema[];
};

export const UpdatePromotion: FC<UpdatePromotionProps> = ({
  defaultValues,
  handleUpdatePromotion,
  news,
}) => {
  const formId = uuid();
  const { control, getValues, handleSubmit, reset, setValue, watch } =
    useUpdatePromotionForm(defaultValues);

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isContentSaved, setIsContentSaved] = useState(false);
  const [locationsSaveStatus, setLocationsSaveStatus] = useState<
    Record<PROMOTION_LOCATION, boolean>
  >({
    LIST: false,
    SEARCH: false,
  });

  const promotionTypes = watch("base.locations");
  const contentType = watch("contentType");

  const handleFormSubmit = handleSubmit(async data => {
    const formData = objectToFormData({
      ...data.base,
      ...data.content,
      ...(data.locations?.list ?? {}),
      ...(data.locations?.search ?? {}),
    });
    const response = await handleUpdatePromotion(formData);
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Updated ${response.body.id} promotion`,
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
    setLocationsSaveStatus({
      LIST: false,
      SEARCH: false,
    });
  });

  const handleContentSubmit = (content: UpdatePromotionFormSchema["content"]) => {
    setIsContentSaved(true);
    setValue("content", content);
  };

  const handleListLocationSubmit = (location: UpdatePromotionFormSchema["locations"]["list"]) => {
    setLocationsSaveStatus({ ...locationsSaveStatus, LIST: true });
    setValue(`locations.list`, location);
  };

  const handleSearchLocationSubmit = (
    location: UpdatePromotionFormSchema["locations"]["search"],
  ) => {
    setLocationsSaveStatus({ ...locationsSaveStatus, SEARCH: true });
    setValue(`locations.search`, location);
  };

  return (
    <Dialog onOpenChange={setIsDialogOpened} open={isDialogOpened}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] max-w-[1024px] overflow-scroll">
        <div className="flex flex-col gap-4">
          <Card className="mt-4 w-full px-6 py-4">
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
            className="desktop:mt-0 w-full"
            contentType={contentType}
            contentValues={getValues("content")}
            handleChangeClick={() => setIsContentSaved(false)}
            handleSubmit={handleContentSubmit}
            isSaved={isContentSaved}
            news={news}
          />
          <LocationsForm
            className="desktop:mt-0 w-full"
            handleChangeClick={type =>
              setLocationsSaveStatus({ ...locationsSaveStatus, [type]: false })
            }
            handleListSubmit={handleListLocationSubmit}
            handleSearchSubmit={handleSearchLocationSubmit}
            locationValues={getValues("locations")}
            locationsSaveStatus={locationsSaveStatus}
            promotionLocations={promotionTypes}
          />
        </div>
        <DialogFooter className="mt-4 flex justify-center">
          <Button className="w-full max-w-[512px]" form={formId} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
