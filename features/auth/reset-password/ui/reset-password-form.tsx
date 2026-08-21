import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

const ResetPasswordForm = () => {
  return (
    <form className="sm:bg-primary-foreground mt-10 h-68 w-full max-w-md rounded-lg px-6 py-4 sm:border">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="newPassword" className="text-muted-foreground">
              New Password
            </FieldLabel>
            <Input
              id="newPassword"
              type="password"
              placeholder="At least 8 characters"
            />
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>

          <Field>
            <FieldLabel
              htmlFor="confirmNewPassword"
              className="text-muted-foreground"
            >
              Confirm New Password
            </FieldLabel>
            <Input
              id="confirmNewPassword"
              type="password"
              placeholder="Repeat the new password"
            />
            {/* <FieldError>Choose another username.</FieldError> */}
          </Field>

          <Button className={"h-12 w-full"} type="submit">
            Save new password
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ResetPasswordForm;
