import { SignUpBodySchema, signUpBodySchema } from "@/cms-shared/validation";
import { useForm, zodResolver } from "@/ui-shared/components/form";

export const useSignUpForm = () => {
  return useForm<SignUpBodySchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signUpBodySchema),
  });
};
