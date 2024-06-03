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

export type DeleteSourceProps = {
  handleDeleteSource: () => Promise<ClientInferResponses<typeof cmsContract.sources.delete>>;
};

export const DeleteSource: FC<DeleteSourceProps> = ({ handleDeleteSource }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const deleteSource = async () => {
    const response = await handleDeleteSource();
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Deleted ${response.body.name} source`,
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
          <DialogTitle>Delete source</DialogTitle>
          <DialogDescription>Are you sure want to delete this source?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <Button className="w-full max-w-44" onClick={deleteSource}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
