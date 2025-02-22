import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .email({ message: "Email no válido" }),
    name: z.string().min(1, { message: "El nombre no puede ir vacío" }),
    password: z
      .string()
      .min(8, { message: "El password es muy corto, mínimo 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export const SuccessSchema = z.string();
export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const TokenSchema = z
  .string({ message: "Token inválido" })
  .length(6, { message: "Token inválido" });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "Email no válido" }),
  password: z
    .string()
    .min(1, { message: "El password es muy corto, mínimo 8 caracteres" }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "Email no válido" }),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const UserDataSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "Email no válido" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "El password es muy corto, mínimo 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export const ChangePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "El Password no puede ir vacio" }),
    password: z
      .string()
      .min(8, { message: "El password es muy corto, mínimo 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export type User = z.infer<typeof UserSchema>;
