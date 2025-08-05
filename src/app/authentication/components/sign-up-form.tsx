"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { SignUpFormSchema, signUpFormSchema } from "../types/schemas";

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleSignUpFormSubmit = async (formValues: SignUpFormSchema) => {
    await authClient.signUp.email({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Conta criada com sucesso");
          router.replace("/");
        },
        onError: ({ error }) => {
          if (error.code === "USER_ALREADY_EXISTS") {
            toast.error("E-mail já cadastrado");
            return form.setError("email", { message: "Email já cadastrado" });
          }
          toast.error(error.message);
        },
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>
          Crie uma nova conta na Bewear preenchendo os dados abaixo
          corretamente.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          id="sign-up-form"
          onSubmit={form.handleSubmit(handleSignUpFormSubmit)}
        >
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha novamente"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </form>
      </Form>
      <CardFooter>
        <Button
          form="sign-up-form"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="size-4 animate-spin" />
          )}
          Criar conta
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
