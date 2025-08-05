"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { SignInFormSchema, signInFormSchema } from "../types/schemas";

const SignInForm = () => {
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignInFormSubmit = (data: SignInFormSchema) => {
    console.log(data);
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
        <Button form="sign-in-form" type="submit">
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
