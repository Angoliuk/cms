import { CreateUserBodySchema, createUserBodySchema } from "@/cms-shared/validation";
import { useForm, zodResolver } from "@/ui-shared/components/form";

export const useCreateUserForm = () => {
  return useForm<CreateUserBodySchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(createUserBodySchema),
  });
};
