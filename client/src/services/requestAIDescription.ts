import axios from 'axios';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';
import { AIDescriptionResponse } from '@/interfaces/AIDescription.inteface';

const API_ENDPOINT = 'api/ai/generateDescription';

export const requestAIDescription = async (
  taskName: string
): Promise<string> => {
  try {
    const { data } = await axios.get<AIDescriptionResponse>(
      `${getApiBaseUrl()}${API_ENDPOINT}?task=${taskName}`
    );

    return data.result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    throw new Error('An error occurred while generating the AI description');
  }
};