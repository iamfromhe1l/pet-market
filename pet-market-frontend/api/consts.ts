import axios from 'axios';

export const UNDEFINDED_ERROR = 'Неизвестная ошибка';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL!}`,
  withCredentials: true,
});
