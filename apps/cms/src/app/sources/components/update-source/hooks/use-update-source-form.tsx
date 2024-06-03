import { UpdateSourceBodySchema, updateSourceBodySchema } from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";

export const useUpdateSourceForm = (defaultValues: DefaultValues<UpdateSourceBodySchema>) => {
  return useForm<UpdateSourceBodySchema>({
    defaultValues,
    resolver: zodResolver(updateSourceBodySchema),
  });
};
