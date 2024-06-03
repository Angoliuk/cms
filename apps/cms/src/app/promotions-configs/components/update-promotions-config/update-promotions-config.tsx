"use client";

import { cmsContract } from "@/cms-shared/api";
import { UpdatePromotionsConfigBodySchema } from "@/cms-shared/validation";
import { PROMOTION_LOCATION } from "@/db";
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

import { useUpdatePromotionsConfigForm } from "./hooks";

export type UpdatePromotionsConfigProps = {
  defaultValues: DefaultValues<UpdatePromotionsConfigBodySchema>;
  handleUpdatePromotionsConfig: (
    data: ClientInferRequest<typeof cmsContract.promotionsConfigs.update>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.promotionsConfigs.update>>;
};

export const UpdatePromotionsConfig: FC<UpdatePromotionsConfigProps> = ({
  defaultValues,
  handleUpdatePromotionsConfig,
}) => {
  const { control, handleSubmit, reset } = useUpdatePromotionsConfigForm(defaultValues);

  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleUpdatePromotionsConfig(data);
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Updated ${response.body.location} promotionsConfig`,
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
            <DialogTitle>Update PromotionsConfig</DialogTitle>
          </DialogHeader>
          <FormInput
            containerClassName="mt-4"
            control={control}
            label="Promotions per page"
            name="promotionsPerPage"
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
