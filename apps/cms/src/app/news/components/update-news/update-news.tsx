"use client";

import { cmsContract } from "@/cms-shared/api";
import { UpdateNewsBodySchema } from "@/cms-shared/validation";
import { TagSchema } from "@/shared/types";
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
import { NEWS_VISIBILITY } from "@prisma/client";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC, useState } from "react";

import { FormMultiSelect } from "../../../../components/multi-select/form-multi-select";
import { UpdateNewsFormSchema, useUpdateNewsForm } from "./hooks";

export type UpdateNewsProps = {
  defaultValues: DefaultValues<UpdateNewsFormSchema>;
  handleUpdateNews: (
    data: ClientInferRequest<typeof cmsContract.news.update>["body"],
  ) => Promise<ClientInferResponses<typeof cmsContract.news.update>>;
  tags: TagSchema[];
};

export const UpdateNews: FC<UpdateNewsProps> = ({ defaultValues, handleUpdateNews, tags }) => {
  const { control, handleSubmit, reset } = useUpdateNewsForm(defaultValues);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleUpdateNews({ ...data, tags: data.tags.map(tag => tag.value) });

    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Updated ${response.body.title} news`,
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
            <DialogTitle>Update News</DialogTitle>
          </DialogHeader>
          <FormInput containerClassName="mt-4" control={control} label="Name" name="title" />
          <FormInput
            containerClassName="mt-4"
            control={control}
            label="Description"
            name="description"
          />
          <FormSelect
            containerClassName="mt-4"
            control={control}
            label="Visibility"
            name="visibility"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select periodicity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={NEWS_VISIBILITY.HIDDEN}>Hidden</SelectItem>
                <SelectItem value={NEWS_VISIBILITY.VISIBLE}>Visible</SelectItem>
              </SelectGroup>
            </SelectContent>
          </FormSelect>
          <FormMultiSelect
            control={control}
            items={tags.map(tag => ({ label: tag.name, value: tag.id }))}
            name="tags"
            triggerText="Select tags"
          />
          <FormCheckbox
            containerClassName="mt-4"
            control={control}
            label="Is draft"
            name="isDraft"
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
