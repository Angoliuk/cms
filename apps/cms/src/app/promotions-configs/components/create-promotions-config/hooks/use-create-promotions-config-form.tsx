import {
  CreatePromotionsConfigBodySchema,
  createPromotionsConfigBodySchema,
} from "@/cms-shared/validation";
import { useForm, zodResolver } from "@/ui-shared/components/form";

export const useCreatePromotionsConfigForm = () => {
  return useForm<CreatePromotionsConfigBodySchema>({
    defaultValues: { location: "LIST", promotionsPerPage: 0 },
    resolver: zodResolver(createPromotionsConfigBodySchema),
  });
};
