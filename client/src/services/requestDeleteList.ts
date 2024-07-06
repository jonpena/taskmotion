import axios from 'axios';

export const requestDeleteList = async (listId: string) => {
  try {
    let apiUrl = '';
    if (import.meta.env.DEV) {
      apiUrl = import.meta.env.VITE_TASKMOTION_API_DEV;
    } else {
      apiUrl = import.meta.env.VITE_TASKMOTION_API_PROD;
    }
    const { data } = await axios.delete(apiUrl + listId);
    return data;
  } catch (error) {
    console.log(error);
  }
};
