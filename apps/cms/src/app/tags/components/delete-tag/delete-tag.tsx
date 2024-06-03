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

export type DeleteTagProps = {
  handleDeleteTag: () => Promise<ClientInferResponses<typeof cmsContract.tags.delete>>;
};

export const DeleteTag: FC<DeleteTagProps> = ({ handleDeleteTag }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const deleteTag = async () => {
    const response = await handleDeleteTag();
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Deleted ${response.body.name} tag`,
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
          <DialogTitle>Delete tag</DialogTitle>
          <DialogDescription>Are you sure want to delete this tag?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <Button className="w-full max-w-44" onClick={deleteTag}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
