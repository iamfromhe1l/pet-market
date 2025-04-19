import { z } from 'zod';
import { ZOD_AUTH_ERROR_MESSAGES, ZOD_BASE_ERROR_MESSAGES } from './constants';
import { RequiredString, LengthString } from './types';

const baseSchemaObject = {
  email: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .email({ message: ZOD_AUTH_ERROR_MESSAGES.INVALID_EMAIL })
    .min(4, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH('Почта', RequiredString.F, LengthString.S, 4),
    })
    .max(50, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH('Почта', RequiredString.F, LengthString.L, 50),
    }),
  password: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .min(8, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH('Пароль', RequiredString.M, LengthString.S, 8),
    })
    .max(14, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH('Пароль', RequiredString.M, LengthString.L, 14),
    }),
};

export const LoginSchema = z.object(baseSchemaObject);

export const RegisterSchema = z.object({
  ...baseSchemaObject,
  username: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .min(2, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH('Имя', RequiredString.A, LengthString.S, 2),
    })
    .max(20, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH('Имя', RequiredString.A, LengthString.L, 20),
    }),
});
