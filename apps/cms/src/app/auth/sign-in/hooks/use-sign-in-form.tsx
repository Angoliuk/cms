import { SignInBodySchema, signInBodySchema } from "@/cms-shared/validation";
import { useForm, zodResolver } from "@/ui-shared/components/form";

export const useSignInForm = () => {
  return useForm<SignInBodySchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInBodySchema),
  });
};
