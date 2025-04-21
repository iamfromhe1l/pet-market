import { z } from 'zod';
import { ZOD_BASE_ERROR_MESSAGES } from './constants';
import { RequiredString, LengthString } from './types';

export const BecomeKennelSchema = z.object({
  name: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .min(4, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Название питомника',
        RequiredString.A,
        LengthString.S,
        4,
      ),
    })
    .max(40, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Название питомника',
        RequiredString.A,
        LengthString.L,
        40,
      ),
    }),
  description: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .min(10, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Описание питомника',
        RequiredString.A,
        LengthString.S,
        10,
      ),
    })
    .max(255, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Описание питомника',
        RequiredString.A,
        LengthString.L,
        255,
      ),
    }),
  address: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .min(20, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Адрес питомника',
        RequiredString.M,
        LengthString.S,
        20,
      ),
    })
    .max(255, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Адрес питомника',
        RequiredString.M,
        LengthString.L,
        255,
      ),
    }),
});
