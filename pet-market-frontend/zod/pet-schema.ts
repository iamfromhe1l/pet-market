import { z } from 'zod';
import { LengthString, RequiredString } from './types';
import { ZOD_BASE_ERROR_MESSAGES, ZOD_PET_ERROR_MESSAGES } from './constants';

export const PetSchema = z.object({
  title: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .min(3, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Название питомца',
        RequiredString.A,
        LengthString.S,
        3,
      ),
    })
    .max(50, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Название питмоца',
        RequiredString.A,
        LengthString.L,
        50,
      ),
    }),
  birthDate: z
    .date({ message: ZOD_BASE_ERROR_MESSAGES.REUIRED })
    .max(new Date(), ZOD_PET_ERROR_MESSAGES.INVALID_DATE)
    .optional(),
  breed: z.string({ message: ZOD_BASE_ERROR_MESSAGES.REUIRED }),
  categoryId: z.string({ message: ZOD_BASE_ERROR_MESSAGES.REUIRED }),
  price: z
    .number({ message: ZOD_BASE_ERROR_MESSAGES.REUIRED })
    .min(0, {
      message: 'Питомец не может стоить меньше 0 руб.',
    })
    .max(100000000, {
      message: 'Питомец не может стоить больше 100000000 руб.',
    }),
  description: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .min(3, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Описание питомца',
        RequiredString.A,
        LengthString.S,
        3,
      ),
    })
    .max(50, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Описание питмоца',
        RequiredString.A,
        LengthString.L,
        50,
      ),
    })
    .optional(),
  count: z
    .number({ message: ZOD_BASE_ERROR_MESSAGES.REUIRED })
    .min(1, {
      message: 'Количество питомцев не может быть менее 1',
    })
    .max(1000, {
      message: 'Количество питомцев не может быть более 1000',
    }),
  sex: z.enum(['male', 'female', 'unknown'], {
    message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
  }),
});
