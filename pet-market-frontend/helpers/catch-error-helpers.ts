import { UNDEFINDED_ERROR } from '@/api/consts';
import { BaseResponse } from '@/api/types';
import axios from 'axios';

export function getAxiosError<DataType = unknown>(
  e: unknown,
): BaseResponse<DataType> {
  if (axios.isAxiosError(e)) {
    return {
      error: e.response?.data.message ?? UNDEFINDED_ERROR,
      data: null,
    };
  }

  return {
    error: UNDEFINDED_ERROR,
    data: null,
  };
}
