export const getApiBaseUrl = (): string => {
  return import.meta.env.DEV
    ? import.meta.env.VITE_TASKMOTION_API_DEV
    : import.meta.env.VITE_TASKMOTION_API_PROD;
};
