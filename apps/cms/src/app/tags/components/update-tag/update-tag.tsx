"use client";

import { cmsContract } from "@/cms-shared/api";
import { UpdateTagBodySchema } from "@/cms-shared/validation";
import { Button } from "@/ui-shared/components/button";
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
import { toast } from "@/ui-shared/components/toaster";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC, useState } from "react";

import { useUpdateTagForm } from "./hooks";

export type UpdateTagProps = {
  defaultValues: DefaultValues<UpdateTagBodySchema>;
  handleUpdateTag: (
    data: ClientInferRequest<typeof cmsContract.tags.update>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.tags.update>>;
};

export const UpdateTag: FC<UpdateTagProps> = ({ defaultValues, handleUpdateTag }) => {
  const { control, handleSubmit, reset } = useUpdateTagForm(defaultValues);

  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleUpdateTag(data);
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Updated ${response.body.name} tag`,
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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Update Tag</DialogTitle>
          </DialogHeader>
          <FormInput control={control} label="Name" name="name" />
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
