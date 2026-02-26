import React, { useState } from 'react';
import { analyzeResume } from '../services/geminiService';
import { handleApiError } from '../services/api';

const ResumeReview: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume content before analyzing.');
      return;
    }
    if (resumeText.trim().length < 100) {
      setError('Please provide more resume content for a meaningful analysis.');
      return;
    }
    setError('');
    setLoading(true);
    setAnalysis('');
    try {
      const result = await analyzeResume(resumeText);
      setAnalysis(result);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-review">
      <div className="page-header">
        <h1>📄 Resume Review</h1>
        <p>Get AI-powered analysis and optimization tips for your resume</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="resume-layout">
        <div className="resume-input-section">
          <div className="resume-instructions">
            <h2>How to Use</h2>
            <ol>
              <li>Copy all text from your resume</li>
              <li>Paste it in the text area below</li>
              <li>Click "Analyze Resume" for instant AI feedback</li>
            </ol>
          </div>

          <div className="form-group">
            <label htmlFor="resumeText">Paste Your Resume Content</label>
            <textarea
              id="resumeText"
              className="resume-textarea"
              placeholder="Paste your entire resume text here...

Example:
JOHN SMITH
Software Engineer | john@example.com | LinkedIn: linkedin.com/in/johnsmith

EXPERIENCE
Software Engineer - Tech Company (2020-Present)
• Led development of microservices architecture...

EDUCATION
B.S. Computer Science - University Name (2020)

SKILLS
JavaScript, React, Node.js, Python, SQL..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={20}
            />
          </div>

          <div className="resume-actions">
            <button
              className="btn btn-primary btn-large"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : '✨ Analyze Resume'}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setResumeText('');
                setAnalysis('');
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="resume-results-section">
          {loading && (
            <div className="feedback-loading">
              <div className="spinner"></div>
              <p>AI is analyzing your resume...</p>
            </div>
          )}
          {analysis ? (
            <div className="analysis-section">
              <h2>✨ Resume Analysis</h2>
              <div className="analysis-content">
                <pre className="ai-response">{analysis}</pre>
              </div>
            </div>
          ) : (
            !loading && (
              <div className="results-placeholder">
                <div className="placeholder-icon">📄</div>
                <h3>Your Analysis Awaits</h3>
                <p>
                  Paste your resume content on the left and click "Analyze Resume"
                  to receive detailed AI feedback including scores, improvements,
                  and ATS optimization tips.
                </p>
                <div className="placeholder-features">
                  <div className="placeholder-feature">
                    <span>✓</span> Overall score out of 100
                  </div>
                  <div className="placeholder-feature">
                    <span>✓</span> Strengths and weaknesses
                  </div>
                  <div className="placeholder-feature">
                    <span>✓</span> Keyword optimization
                  </div>
                  <div className="placeholder-feature">
                    <span>✓</span> ATS-friendly formatting tips
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;
