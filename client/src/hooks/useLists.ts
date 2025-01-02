import { requestUserLists } from '@/services/requestUserLists';
import useSWR from 'swr';

const getLocalStorage = (regex: RegExp) => {
  const keys = Object.keys(localStorage);
  const matchingKey = keys.find((key) => regex.test(key));

  if (matchingKey) {
    return localStorage.getItem(matchingKey);
  }
  return null;
};

export const useLists = () => {
  const authToken = getLocalStorage(/auth-token/i);
  const accessToken = JSON.parse(authToken as string).access_token;

  const { data, error, isLoading, mutate } = useSWR(
    accessToken ? [accessToken] : null,
    () => requestUserLists(accessToken)
  );

  const refreshLists = async () => {
    await mutate();
  };

  return { data, isLoading, error, refreshLists };
};
