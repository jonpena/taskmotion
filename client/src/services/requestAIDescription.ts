import axios from 'axios';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';
import { AIDescriptionResponse } from '@/interfaces/dataAI.inteface';

export const requestAIDescription = async (
  taskName: string
): Promise<string> => {
  try {
    const { data } = await axios.get<AIDescriptionResponse>(
      `${getApiBaseUrl()}api/ai/generateDescription?task=${taskName}`
    );
    return data.result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    throw new Error('An error occurred while generating the AI description');
  }
};
