interface Part {
  text: string;
}

interface Content {
  parts: Part[];
  role: string;
}

interface Candidate {
  content: Content;
  finishReason: string;
  avgLogprobs: number;
}

interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

interface Response {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
}

export interface AIDescriptionResponse {
  result: {
    response: Response;
  };
}
