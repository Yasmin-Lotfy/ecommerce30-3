"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, loginSchemaType } from "@/schemas/auth.schemas";
import { loginUser } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: loginSchemaType) {
   setIsLoading(true)
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(response);
    if (response?.ok) {
      toast.success("User login Successfully");

      router.push("/products");
      setIsLoading(false)
    } else {
      toast.error("User Login Failed");
      setIsLoading(false)
    }
  }
  return (
    <>
      <main>
        <div className="max-w-5xl mx-auto my-5">
          <Card className="p-5">
            <h2 className="text-3xl font-bold">Login Now and start shopping</h2>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-3.5"
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Email"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Password"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button  className="w-full my-3">

                {isLoading ? <Spinner/> : "Login"}
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}
