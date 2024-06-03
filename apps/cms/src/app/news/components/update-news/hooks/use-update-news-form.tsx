import { updateNewsBodySchema } from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";
import { z } from "zod";

export type UpdateNewsFormSchema = z.infer<typeof updateNewsFormSchema>;
export const updateNewsFormSchema = updateNewsBodySchema.omit({ tags: true }).and(
  z.object({
    tags: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
  }),
);

export const useUpdateNewsForm = (defaultValues: DefaultValues<UpdateNewsFormSchema>) => {
  return useForm<UpdateNewsFormSchema>({
    defaultValues,
    resolver: zodResolver(updateNewsFormSchema),
  });
};
