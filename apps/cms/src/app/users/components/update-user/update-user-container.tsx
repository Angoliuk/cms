import { cmsContract } from "@/cms-shared/api";
import { UpdateUserBodySchema } from "@/cms-shared/validation";
import { UserIdSchema } from "@/shared/types";
import { DefaultValues } from "@/ui-shared/components/form";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { UpdateUser } from "./update-user";

export type UpdateUserContainerProps = {
  defaultValues: DefaultValues<UpdateUserBodySchema>;
  userId: UserIdSchema;
};

export const UpdateUserContainer: FC<UpdateUserContainerProps> = async ({
  defaultValues,
  userId,
}) => {
  const handleUpdateUser = async (
    data: ClientInferRequest<typeof cmsContract.users.update>["body"],
  ) => {
    "use server";
    const response = await api.users.update({ body: data, params: { userId } });
    revalidatePath(cmsContract.users.get.path);
    return response;
  };

  return <UpdateUser defaultValues={defaultValues} handleUpdateUser={handleUpdateUser} />;
};
