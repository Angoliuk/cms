"use client";

import { cmsContract } from "@/cms-shared/api";
import { UpdateSourceBodySchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
import { FormCheckbox } from "@/ui-shared/components/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui-shared/components/dialog";
import { DefaultValues } from "@/ui-shared/components/form";
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
import { FC, useState } from "react";

import { useUpdateSourceForm } from "./hooks";

export type UpdateSourceProps = {
  defaultValues: DefaultValues<UpdateSourceBodySchema>;
  handleUpdateSource: (
    data: ClientInferRequest<typeof cmsContract.sources.update>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.sources.update>>;
};

export const UpdateSource: FC<UpdateSourceProps> = ({ defaultValues, handleUpdateSource }) => {
  const { control, handleSubmit, reset } = useUpdateSourceForm(defaultValues);

  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleUpdateSource(data);
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Updated ${response.body.name} source`,
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
    <Dialog onOpenChange={setIsDialogOpened} open={isDialogOpened}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Update Source</DialogTitle>
          </DialogHeader>
          <FormInput containerClassName="mt-4" control={control} label="Name" name="name" />
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
          <FormInput
            containerClassName="mt-4"
            control={control}
            label="Key to link"
            name="linkKey"
          />
          <FormInput
            containerClassName="mt-4"
            control={control}
            label="Key to publicationDate"
            name="publicationDateKey"
          />
          <FormInput
            containerClassName="mt-4"
            control={control}
            label="Key to title"
            name="titleKey"
          />
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
          <FormCheckbox
            containerClassName="mt-4"
            control={control}
            label="Is active"
            name="isActive"
          />

          <DialogFooter className="mt-3">
            <Button className="w-full max-w-44" type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
