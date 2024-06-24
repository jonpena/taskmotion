import axios from 'axios';

export const requestDeleteList = async (listId: string) => {
  try {
    if (import.meta.env.DEV) {
      const { data } = await axios.delete(
        'http://localhost:8787/api/lists/' + listId
      );
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
