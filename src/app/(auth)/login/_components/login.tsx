// 'use client'

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Form, FormField } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { INITIAL_LOGIN_FORM } from "@/constants/auth-constant";
// import { loginForm, loginSchema } from "@/validations/auth-validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";


// export default function Login() {
//     const form=useForm<loginForm>({
//         resolver:zodResolver(loginSchema),
//         defaultValues:INITIAL_LOGIN_FORM

//     })
//     const onSubmit=form.handleSubmit(async(data)=>{

//     })
//   return (
//     <Card>
//       <CardHeader className="text-center ">
//         <CardTitle className="text-xl">Welcome</CardTitle>
//         <CardDescription>Login access all features</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={onSubmit} className="space-y-4">
//           <FieldGroup>
//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Email</FieldLabel>
//                   <Input
//                     {...field}
//                     type="email"
//                     placeholder="Insert your email"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Password</FieldLabel>
//                   <Input
//                     {...field}
//                     type="password"
//                     placeholder="******"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//           <Button type="submit">Login</Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/constants/auth-constant";
import { LoginForm, loginSchemaForm } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM,
  );

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      loginAction(formData);
    });
  });

  useEffect(() => {
    if (loginState?.status === "error") {
      toast.error("Login Failed", {
        description: loginState.errors?._form?.[0],
      });
      startTransition(() => {
        loginAction(null);
      });
    }
  }, [loginState]);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome</CardTitle>
        <CardDescription>Login to access all features</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormInput
              form={form}
              name="email"
              label="Email"
              placeholder="Insert email here"
              type="email"
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="******"
              type="password"
            />
            <Button type="submit">
              {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
