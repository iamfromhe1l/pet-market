import { z } from 'zod';
import { ZOD_BASE_ERROR_MESSAGES } from './constants';
import { LengthString, RequiredString } from './types';

const Breed = z
  .string({ message: ZOD_BASE_ERROR_MESSAGES.REUIRED })
  .min(3, {
    message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
      'Порода',
      RequiredString.F,
      LengthString.S,
      3,
    ),
  })
  .max(50, {
    message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
      'Порода',
      RequiredString.F,
      LengthString.L,
      50,
    ),
  });

export const BreedSchema = z.object({ breed: Breed });

export const CategorySchema = z.object({
  name: z
    .string({
      message: ZOD_BASE_ERROR_MESSAGES.REUIRED,
    })
    .min(3, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Название категории',
        RequiredString.A,
        LengthString.S,
        3,
      ),
    })
    .max(50, {
      message: ZOD_BASE_ERROR_MESSAGES.LENGTH(
        'Название категории',
        RequiredString.A,
        LengthString.L,
        50,
      ),
    }),
  breeds: z.array(Breed),
});
