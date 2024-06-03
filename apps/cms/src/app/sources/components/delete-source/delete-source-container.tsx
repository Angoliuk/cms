import { cmsContract } from "@/cms-shared/api";
import { SourceIdSchema } from "@/shared/types";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { DeleteSource } from "./delete-source";

export type DeleteSourceContainerProps = {
  sourceId: SourceIdSchema;
};

export const DeleteSourceContainer: FC<DeleteSourceContainerProps> = ({ sourceId }) => {
  const handleDeleteSource = async () => {
    "use server";
    const response = await api.sources.delete({ params: { sourceId } });
    revalidatePath(cmsContract.sources.get.path);
    return response;
  };

  return <DeleteSource handleDeleteSource={handleDeleteSource} />;
};
