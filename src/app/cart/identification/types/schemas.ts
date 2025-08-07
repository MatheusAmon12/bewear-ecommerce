import { z } from "zod";

export const addressFormSchema = z.object({
  email: z.email("E-mail inválido"),
  fullName: z.string().trim().min(1, "Nome completo é obrigatório"),
  cpf: z.string().trim().min(1, "CPF é obrigatório"),
  phone: z.string().trim().min(1, "Celular é obrigatório"),
  zipCode: z.string().trim().min(1, "CEP é obrigatório"),
  address: z.string().trim().min(1, "Endereço é obrigatório"),
  number: z.string().trim().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().trim().min(1, "Bairro é obrigatório"),
  city: z.string().trim().min(1, "Cidade é obrigatória"),
  state: z.string().trim().min(1, "Estado é obrigatório"),
});

export type AddressFormSchema = z.infer<typeof addressFormSchema>;
