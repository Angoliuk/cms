import { cmsContract } from "@/cms-shared/api";
import { TagIdSchema } from "@/shared/types";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { DeleteTag } from "./delete-tag";

export type DeleteTagContainerProps = {
  tagId: TagIdSchema;
};

export const DeleteTagContainer: FC<DeleteTagContainerProps> = ({ tagId }) => {
  const handleDeleteTag = async () => {
    "use server";
    const response = await api.tags.delete({ params: { tagId } });
    revalidatePath(cmsContract.tags.get.path);
    return response;
  };

  return <DeleteTag handleDeleteTag={handleDeleteTag} />;
};
