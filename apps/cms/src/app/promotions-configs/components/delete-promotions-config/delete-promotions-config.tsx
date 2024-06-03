"use client";

import { cmsContract } from "@/cms-shared/api";
import { Button } from "@/ui-shared/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui-shared/components/dialog";
import { toast } from "@/ui-shared/components/toaster";
import { ClientInferResponses } from "@ts-rest/core";
import { FC, useState } from "react";

export type DeletePromotionsConfigProps = {
  handleDeletePromotionsConfig: () => Promise<
    ClientInferResponses<typeof cmsContract.promotionsConfigs.delete>
  >;
};

export const DeletePromotionsConfig: FC<DeletePromotionsConfigProps> = ({
  handleDeletePromotionsConfig,
}) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const deletePromotionsConfig = async () => {
    const response = await handleDeletePromotionsConfig();
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Deleted ${response.body.location} promotionsConfig`,
        title: "Success!",
      });
    } else {
      toast({
        description: response.body.message,
        title: "Error!",
      });
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpened} open={isDialogOpened}>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete promotionsConfig</DialogTitle>
          <DialogDescription>Are you sure want to delete this promotionsConfig?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <Button className="w-full max-w-44" onClick={deletePromotionsConfig}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
