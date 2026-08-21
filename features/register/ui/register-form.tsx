"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

const RegisterForm = () => {
  return (
    <form className="bg-primary-foreground mt-10 h-90 w-full max-w-md rounded-lg border px-6 py-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" type="text" placeholder="How we greet you" />
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>
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

          <Button className={"h-12 w-full"} type="submit">
            Create Account
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default RegisterForm;
