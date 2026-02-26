export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  stripeLink?: string;
  recommended?: boolean;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface InterviewSession {
  question: InterviewQuestion;
  userAnswer: string;
  aiFeedback?: string;
  score?: number;
}

export interface CareerPath {
  title: string;
  description: string;
  skills: string[];
  timeline: string;
  averageSalary: string;
}

export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  summary: string;
}

export type SubscriptionTier = 'free' | 'pro' | 'premium';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  subscriptionTier: SubscriptionTier;
  createdAt: Date;
  interviewsCompleted: number;
  resumeReviews: number;
}
