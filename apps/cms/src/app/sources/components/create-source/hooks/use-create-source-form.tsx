import { CreateSourceBodySchema, createSourceBodySchema } from "@/cms-shared/validation";
import { useForm, zodResolver } from "@/ui-shared/components/form";

export const useCreateSourceForm = () => {
  return useForm<CreateSourceBodySchema>({
    defaultValues: {
      descriptionKey: "",
      idKey: "",
      imageLinkKey: "",
      isActive: true,
      linkKey: "",
      name: "",
      periodicity: "DAILY",
      publicationDateKey: "",
      titleKey: "",
      url: "",
    },
    resolver: zodResolver(createSourceBodySchema),
  });
};
