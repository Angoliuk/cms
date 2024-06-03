import { UpdateUserBodySchema, updateUserBodySchema } from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";

export const useUpdateUserForm = (defaultValues: DefaultValues<UpdateUserBodySchema>) => {
  return useForm<UpdateUserBodySchema>({
    defaultValues,
    resolver: zodResolver(updateUserBodySchema),
  });
};
