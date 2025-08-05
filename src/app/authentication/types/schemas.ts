import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.email({ error: "E-mail inválido" }),
  password: z.string().trim().min(1, "Senha é obrigatório"),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Nome muito curto")
      .nonempty("Nome é obrigatório"),
    email: z.email("E-mail inválido"),
    password: z.string().trim().min(1, "Senha é obrigatório"),
    passwordConfirmation: z.string().trim().min(1, "Senhas não conferem"),
  })
  .refine((values) => values.passwordConfirmation === values.password, {
    error: "Senhas não conferem",
    path: ["passwordConfirmation"],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
