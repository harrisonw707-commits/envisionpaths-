import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

let genAI: GoogleGenerativeAI | null = null;

const getGenAI = (): GoogleGenerativeAI => {
  if (!genAI) {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY.');
    }
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
};

export const getInterviewFeedback = async (
  question: string,
  answer: string
): Promise<string> => {
  const model = getGenAI().getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `You are an expert interview coach. Evaluate the following interview answer and provide constructive feedback.

Interview Question: ${question}

Candidate's Answer: ${answer}

Please provide:
1. Overall assessment (score out of 10)
2. Strengths of the answer
3. Areas for improvement
4. Suggested better response
5. Key tips for this type of question

Be encouraging but honest in your feedback.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
};

export const getCareerRecommendations = async (
  skills: string[],
  interests: string[],
  experience: string
): Promise<string> => {
  const model = getGenAI().getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `You are a career counselor. Based on the following profile, recommend career paths.

Skills: ${skills.join(', ')}
Interests: ${interests.join(', ')}
Experience Level: ${experience}

Please provide:
1. Top 3 recommended career paths
2. Required skills to develop for each path
3. Estimated timeline to transition
4. Average salary ranges
5. Specific next steps to take

Format as structured, actionable advice.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const analyzeResume = async (resumeText: string): Promise<string> => {
  const model = getGenAI().getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `You are an expert resume reviewer and career coach. Analyze the following resume and provide detailed feedback.

Resume Content:
${resumeText}

Please provide:
1. Overall score (out of 100)
2. Key strengths
3. Areas needing improvement
4. Important keywords that should be added
5. Formatting and structure recommendations
6. ATS (Applicant Tracking System) optimization tips
7. Specific suggestions for each section

Be thorough and constructive in your analysis.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateInterviewQuestions = async (
  jobTitle: string,
  level: string
): Promise<string> => {
  const model = getGenAI().getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `Generate 5 challenging but realistic interview questions for a ${level} ${jobTitle} position.

For each question, provide:
1. The question itself
2. What the interviewer is looking for
3. Key points a great answer should include

Format as a numbered list.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
