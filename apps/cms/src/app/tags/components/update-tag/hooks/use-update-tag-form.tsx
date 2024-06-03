import { UpdateTagBodySchema, updateTagBodySchema } from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";

export const useUpdateTagForm = (defaultValues: DefaultValues<UpdateTagBodySchema>) => {
  return useForm<UpdateTagBodySchema>({
    defaultValues,
    resolver: zodResolver(updateTagBodySchema),
  });
};
