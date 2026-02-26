import React, { useState } from 'react';
import { getInterviewFeedback, generateInterviewQuestions } from '../services/geminiService';
import { handleApiError } from '../services/api';

const sampleQuestions = [
  {
    id: '1',
    question: 'Tell me about yourself and your professional background.',
    category: 'General',
    difficulty: 'easy' as const,
  },
  {
    id: '2',
    question: 'Describe a challenging project you worked on and how you overcame obstacles.',
    category: 'Behavioral',
    difficulty: 'medium' as const,
  },
  {
    id: '3',
    question: 'Where do you see yourself in 5 years?',
    category: 'Career Goals',
    difficulty: 'easy' as const,
  },
  {
    id: '4',
    question: 'How do you handle disagreements with your manager or teammates?',
    category: 'Behavioral',
    difficulty: 'medium' as const,
  },
  {
    id: '5',
    question: 'Explain a complex technical concept to a non-technical audience.',
    category: 'Communication',
    difficulty: 'hard' as const,
  },
];

const InterviewPractice: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(sampleQuestions[0]);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState('');
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  const handleGetFeedback = async () => {
    if (!answer.trim()) {
      setError('Please write your answer before requesting feedback.');
      return;
    }
    setError('');
    setLoading(true);
    setFeedback('');
    try {
      const result = await getInterviewFeedback(selectedQuestion.question, answer);
      setFeedback(result);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!jobTitle.trim()) {
      setError('Please enter a job title.');
      return;
    }
    setError('');
    setGeneratingQuestions(true);
    setGeneratedQuestions('');
    try {
      const result = await generateInterviewQuestions(jobTitle, 'mid-level');
      setGeneratedQuestions(result);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setGeneratingQuestions(false);
    }
  };

  return (
    <div className="interview-practice">
      <div className="page-header">
        <h1>🎤 Interview Practice</h1>
        <p>Practice with AI-powered questions and get instant feedback</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="interview-layout">
        {/* Questions Panel */}
        <div className="questions-panel">
          <h2>Sample Questions</h2>
          <div className="questions-list">
            {sampleQuestions.map((q) => (
              <button
                key={q.id}
                className={`question-item ${selectedQuestion.id === q.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedQuestion(q);
                  setAnswer('');
                  setFeedback('');
                }}
              >
                <span className={`difficulty-badge difficulty-${q.difficulty}`}>
                  {q.difficulty}
                </span>
                <span className="question-category">{q.category}</span>
                <p className="question-text">{q.question}</p>
              </button>
            ))}
          </div>

          {/* Generate Custom Questions */}
          <div className="generate-section">
            <h3>Generate Custom Questions</h3>
            <div className="generate-input-group">
              <input
                type="text"
                className="form-input"
                placeholder="Job title (e.g. Software Engineer)"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <button
                className="btn btn-secondary"
                onClick={handleGenerateQuestions}
                disabled={generatingQuestions}
              >
                {generatingQuestions ? 'Generating...' : 'Generate'}
              </button>
            </div>
            {generatedQuestions && (
              <div className="generated-questions">
                <pre className="ai-response">{generatedQuestions}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Practice Panel */}
        <div className="practice-panel">
          <div className="current-question">
            <div className="question-meta">
              <span className={`difficulty-badge difficulty-${selectedQuestion.difficulty}`}>
                {selectedQuestion.difficulty}
              </span>
              <span className="question-category">{selectedQuestion.category}</span>
            </div>
            <h2>{selectedQuestion.question}</h2>
          </div>

          <div className="answer-section">
            <label htmlFor="answer" className="answer-label">
              Your Answer
            </label>
            <textarea
              id="answer"
              className="answer-textarea"
              placeholder="Type your answer here... Try to use the STAR method (Situation, Task, Action, Result) for behavioral questions."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={8}
            />
            <div className="answer-actions">
              <button
                className="btn btn-primary"
                onClick={handleGetFeedback}
                disabled={loading}
              >
                {loading ? 'Analyzing...' : '✨ Get AI Feedback'}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setAnswer('');
                  setFeedback('');
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Feedback Section */}
          {loading && (
            <div className="feedback-loading">
              <div className="spinner"></div>
              <p>AI is analyzing your answer...</p>
            </div>
          )}
          {feedback && (
            <div className="feedback-section">
              <h3>✨ AI Feedback</h3>
              <div className="feedback-content">
                <pre className="ai-response">{feedback}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPractice;
