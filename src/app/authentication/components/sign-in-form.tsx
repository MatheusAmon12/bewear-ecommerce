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

import { SignInFormSchema, signInFormSchema } from "../types/schemas";

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignInFormSubmit = async (formValues: SignInFormSchema) => {
    await authClient.signIn.email({
      email: formValues.email,
      password: formValues.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: ({ error }) => {
          if (error.code === "USER_NOT_FOUND") {
            toast.error("E-mail não econtrado");
            return form.setError("email", {
              message: "E-mail não encontrado",
            });
          }
          if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("E-mail ou senha inválidos");
            return form.setError("email", {
              message: "E-mail ou senha inválidos",
            });
          }
          toast.error(error.message);
        },
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Preencha o seu nome e senha para efetuar o login no Bewear.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          id="sign-in-form"
          onSubmit={form.handleSubmit(handleSignInFormSubmit)}
        >
          <CardContent className="grid gap-6">
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
                    <Input placeholder="Digite sua senha" {...field} />
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
          form="sign-in-form"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="size-4 animate-spin" />
          )}
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
