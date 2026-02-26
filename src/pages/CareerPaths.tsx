import React, { useState } from 'react';
import { getCareerRecommendations } from '../services/geminiService';
import { handleApiError } from '../services/api';

const experienceLevels = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior (6-10 years)', 'Executive (10+ years)'];

const popularSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Machine Learning',
  'Project Management', 'Data Analysis', 'UX Design', 'Marketing', 'Sales',
  'Leadership', 'Communication', 'Problem Solving', 'Cloud Computing',
];

const CareerPaths: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [interests, setInterests] = useState('');
  const [experience, setExperience] = useState(experienceLevels[0]);
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleGetRecommendations = async () => {
    if (selectedSkills.length === 0) {
      setError('Please select at least one skill.');
      return;
    }
    setError('');
    setLoading(true);
    setRecommendations('');
    try {
      const interestsList = interests.split(',').map((i) => i.trim()).filter(Boolean);
      const result = await getCareerRecommendations(selectedSkills, interestsList, experience);
      setRecommendations(result);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-paths">
      <div className="page-header">
        <h1>🗺️ Career Path Discovery</h1>
        <p>Discover career paths tailored to your unique skills and interests</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="career-layout">
        <div className="career-form-section">
          <div className="form-section">
            <h2>Your Skills</h2>
            <p>Select the skills you currently have:</p>
            <div className="skills-grid">
              {popularSkills.map((skill) => (
                <button
                  key={skill}
                  className={`skill-tag ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="custom-skill-input">
              <input
                type="text"
                className="form-input"
                placeholder="Add custom skill..."
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
              />
              <button className="btn btn-secondary" onClick={addCustomSkill}>
                Add
              </button>
            </div>
            {selectedSkills.length > 0 && (
              <div className="selected-skills">
                <strong>Selected: </strong>
                {selectedSkills.map((skill) => (
                  <span key={skill} className="skill-tag selected">
                    {skill}
                    <button onClick={() => toggleSkill(skill)} className="skill-remove">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>Your Interests</h2>
            <div className="form-group">
              <label htmlFor="interests">What areas interest you most?</label>
              <input
                id="interests"
                type="text"
                className="form-input"
                placeholder="e.g. healthcare, education, finance, technology"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Experience Level</h2>
            <div className="experience-options">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  className={`experience-option ${experience === level ? 'selected' : ''}`}
                  onClick={() => setExperience(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary btn-large"
            onClick={handleGetRecommendations}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : '✨ Get Career Recommendations'}
          </button>
        </div>

        {/* Results */}
        <div className="career-results-section">
          {loading && (
            <div className="feedback-loading">
              <div className="spinner"></div>
              <p>AI is analyzing your profile...</p>
            </div>
          )}
          {recommendations ? (
            <div className="recommendations-section">
              <h2>✨ Your Career Recommendations</h2>
              <div className="recommendations-content">
                <pre className="ai-response">{recommendations}</pre>
              </div>
            </div>
          ) : (
            !loading && (
              <div className="results-placeholder">
                <div className="placeholder-icon">🗺️</div>
                <h3>Your Career Map Awaits</h3>
                <p>
                  Fill in your skills, interests, and experience level, then click
                  "Get Career Recommendations" to see personalized paths curated by AI.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPaths;
