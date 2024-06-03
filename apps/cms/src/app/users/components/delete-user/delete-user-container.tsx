import { cmsContract } from "@/cms-shared/api";
import { UserIdSchema } from "@/shared/types";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { DeleteUser } from "./delete-user";

export type DeleteUserContainerProps = {
  userId: UserIdSchema;
};

export const DeleteUserContainer: FC<DeleteUserContainerProps> = ({ userId }) => {
  const handleDeleteUser = async () => {
    "use server";
    const response = await api.users.delete({ params: { userId } });
    revalidatePath(cmsContract.users.get.path);
    return response;
  };

  return <DeleteUser handleDeleteUser={handleDeleteUser} />;
};
