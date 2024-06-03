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

export type DeletePromotionProps = {
  handleDeletePromotion: () => Promise<ClientInferResponses<typeof cmsContract.promotions.delete>>;
};

export const DeletePromotion: FC<DeletePromotionProps> = ({ handleDeletePromotion }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const deletePromotion = async () => {
    const response = await handleDeletePromotion();
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Deleted ${response.body.id} promotion`,
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
          <DialogTitle>Delete promotion</DialogTitle>
          <DialogDescription>Are you sure want to delete this promotion?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <Button className="w-full max-w-44" onClick={deletePromotion}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
