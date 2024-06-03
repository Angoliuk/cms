"use client";

import { cmsContract } from "@/cms-shared/api";
import { Button } from "@/ui-shared/components/button";
import { FormInput } from "@/ui-shared/components/input";
import { toast } from "@/ui-shared/components/toaster";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC } from "react";

import { useCreateTagForm } from "./hooks";

export type CreateTagProps = {
  handleCreateTag: (
    data: ClientInferRequest<typeof cmsContract.tags.create>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.tags.create>>;
};

export const CreateTag: FC<CreateTagProps> = ({ handleCreateTag }) => {
  const { control, handleSubmit, reset } = useCreateTagForm();

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleCreateTag(data);

    if (response.status === 200) {
      toast({
        description: `Created ${response.body.name} tag`,
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
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-44" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};
