import React, { useState, useEffect } from 'react';
import './ParentGrades.css';

const ParentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [quarters, setQuarters] = useState([]);
  const [studentName, setStudentName] = useState('John Smith'); // Default, will be dynamic

  useEffect(() => {
    fetchQuarters();
    fetchGrades();
  }, []);

  const fetchQuarters = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/grades/quarters/');
      if (!response.ok) throw new Error('Failed to fetch quarters');
      const data = await response.json();
      setQuarters(data.results || data);
      if (data.results?.length > 0) {
        setSelectedQuarter(data.results[0].id);
      }
    } catch (err) {
      console.error('Error fetching quarters:', err);
    }
  };

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const url = new URL('http://127.0.0.1:8000/api/grades/grades/');
      if (studentName) {
        url.searchParams.append('student_name', studentName);
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch grades');
      const data = await response.json();
      setGrades(data.results || data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching grades:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGrades = selectedQuarter 
    ? grades.filter(grade => grade.quarter === selectedQuarter)
    : grades;

  const groupedBySubject = filteredGrades.reduce((acc, grade) => {
    if (!acc[grade.subject]) {
      acc[grade.subject] = [];
    }
    acc[grade.subject].push(grade);
    return acc;
  }, {});

  return (
    <div className="parent-grades-container">
      <div className="grades-header">
        <h1>📚 My Child's Grades</h1>
        <p className="student-info">Viewing grades for: <strong>{studentName}</strong></p>
      </div>

      <div className="grades-filters">
        <div className="filter-group">
          <label htmlFor="quarter-select">Select Quarter:</label>
          <select 
            id="quarter-select"
            value={selectedQuarter || ''}
            onChange={(e) => setSelectedQuarter(parseInt(e.target.value))}
            className="filter-select"
          >
            <option value="">All Quarters</option>
            {quarters.map(quarter => (
              <option key={quarter.id} value={quarter.id}>
                {quarter.quarter_display || `Q${quarter.quarter} ${quarter.year}`}
              </option>
            ))}
          </select>
        </div>

        <button onClick={fetchGrades} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {loading && <div className="loading">Loading grades...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && filteredGrades.length === 0 && (
        <div className="no-data">No grades available for this selection.</div>
      )}

      {!loading && filteredGrades.length > 0 && (
        <div className="grades-grid">
          {Object.entries(groupedBySubject).map(([subject, subjectGrades]) => (
            <div key={subject} className="grade-card">
              <div className="card-header">
                <h3>{subject.replace(/_/g, ' ')}</h3>
              </div>
              <div className="card-body">
                {subjectGrades.map(grade => (
                  <div key={grade.id} className="grade-item">
                    <div className="grade-score">
                      <span className="score-number">{grade.score}</span>
                      <span className="score-percent">%</span>
                    </div>
                    <div className="grade-details">
                      <p className="quarter-label">{grade.quarter_display}</p>
                      {grade.comments && (
                        <p className="comments">{grade.comments}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grades-summary">
        <h3>Quarter Overview</h3>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Average Score</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {quarters.map(quarter => {
              const quarterGrades = grades.filter(g => g.quarter === quarter.id);
              const average = quarterGrades.length > 0
                ? (quarterGrades.reduce((sum, g) => sum + parseFloat(g.score), 0) / quarterGrades.length).toFixed(2)
                : 'N/A';
              return (
                <tr key={quarter.id}>
                  <td>{quarter.quarter_display || `Q${quarter.quarter} ${quarter.year}`}</td>
                  <td className="average-cell">{average}</td>
                  <td>{quarterGrades.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentGrades;
