import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .regex(/^[^0-9]*$/, {
      message: "Numbers are not allowed",
    }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
