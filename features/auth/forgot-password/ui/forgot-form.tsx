import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

const ForgotForm = () => {
  return (
    <form className="sm:bg-primary-foreground mt-10 h-44 w-full max-w-md rounded-lg px-6 py-4 sm:border">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email" className='text-muted-foreground'>Email</FieldLabel>
            <Input id="email" type="email" placeholder="example@example.com" />
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>

          <Button className={"h-12 w-full"} type="submit">
            Send reset link
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ForgotForm;
