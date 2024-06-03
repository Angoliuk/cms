"use client";

import { cmsContract } from "@/cms-shared/api";
import { Button } from "@/ui-shared/components/button";
import { FormInput } from "@/ui-shared/components/input";
import {
  FormSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui-shared/components/select";
import { toast } from "@/ui-shared/components/toaster";
import { PROMOTION_LOCATION } from "@prisma/client";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC } from "react";

import { useCreatePromotionsConfigForm } from "./hooks";

export type CreatePromotionsConfigProps = {
  handleCreatePromotionsConfig: (
    data: ClientInferRequest<typeof cmsContract.promotionsConfigs.create>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.promotionsConfigs.create>>;
};

export const CreatePromotionsConfig: FC<CreatePromotionsConfigProps> = ({
  handleCreatePromotionsConfig,
}) => {
  const { control, handleSubmit, reset } = useCreatePromotionsConfigForm();

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleCreatePromotionsConfig(data);

    if (response.status === 200) {
      toast({
        description: `Created ${response.body.location} tag`,
        title: "Success!",
      });
    } else {
      toast({
        description: response.body.message,
        title: "Error!",
      });
    }

    reset();
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <FormSelect control={control} label="Location" name="location">
        <SelectTrigger>
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={PROMOTION_LOCATION.LIST}>List</SelectItem>
            <SelectItem value={PROMOTION_LOCATION.SEARCH}>Search</SelectItem>
          </SelectGroup>
        </SelectContent>
      </FormSelect>
      <FormInput
        containerClassName="mt-4"
        control={control}
        label="Promotions per page"
        name="promotionsPerPage"
      />
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-44" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};
