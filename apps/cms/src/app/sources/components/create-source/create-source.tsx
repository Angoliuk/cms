"use client";

import { cmsContract } from "@/cms-shared/api";
import { Button } from "@/ui-shared/components/button";
import { FormCheckbox } from "@/ui-shared/components/checkbox";
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
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC } from "react";

import { useCreateSourceForm } from "./hooks";

export type CreateSourceProps = {
  handleCreateSource: (
    data: ClientInferRequest<typeof cmsContract.sources.create>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.sources.create>>;
};

export const CreateSource: FC<CreateSourceProps> = ({ handleCreateSource }) => {
  const { control, handleSubmit, reset } = useCreateSourceForm();

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleCreateSource(data);

    if (response.status === 200) {
      toast({
        description: `Created ${response.body.name} source`,
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
      <FormInput control={control} label="Name" name="name" />
      <FormInput containerClassName="mt-4" control={control} label="URL" name="url" />
      <FormInput
        containerClassName="mt-4"
        control={control}
        label="Key to description"
        name="descriptionKey"
      />
      <FormInput containerClassName="mt-4" control={control} label="Key to id" name="idKey" />
      <FormInput
        containerClassName="mt-4"
        control={control}
        label="Key to imageLink"
        name="imageLinkKey"
      />
      <FormInput containerClassName="mt-4" control={control} label="Key to link" name="linkKey" />
      <FormInput
        containerClassName="mt-4"
        control={control}
        label="Key to publicationDate"
        name="publicationDateKey"
      />
      <FormInput containerClassName="mt-4" control={control} label="Key to title" name="titleKey" />
      <FormSelect
        containerClassName="mt-4"
        control={control}
        label="Periodicity"
        name="periodicity"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select periodicity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="DAILY">Daily</SelectItem>
            <SelectItem value="HOURLY">Hourly</SelectItem>
          </SelectGroup>
        </SelectContent>
      </FormSelect>
      <FormCheckbox containerClassName="mt-4" control={control} label="Is active" name="isActive" />

      <div className="mt-4 flex flex-col items-center gap-3">
        <Button className="w-full max-w-44" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};
