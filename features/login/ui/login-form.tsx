"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import Link from "next/link";

const LoginForm = () => {
  return (
    <form className="bg-primary-foreground mt-10 h-80 w-full max-w-md rounded-lg border px-6 py-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="example@example.com" />
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="********" />
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>

          <div className="flex w-full justify-end">
            <Button variant={"link"} className={"text-muted-foreground"}>
              <Link href={"/forgot-password"}>Forgot Password?</Link>
            </Button>
          </div>

          <Button className={"h-12 w-full"} type="submit">
            Sign In
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default LoginForm;
