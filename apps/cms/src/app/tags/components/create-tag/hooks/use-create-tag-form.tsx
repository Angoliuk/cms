import { CreateTagBodySchema, createTagBodySchema } from "@/cms-shared/validation";
import { useForm, zodResolver } from "@/ui-shared/components/form";

export const useCreateTagForm = () => {
  return useForm<CreateTagBodySchema>({
    defaultValues: { name: "" },
    resolver: zodResolver(createTagBodySchema),
  });
};
