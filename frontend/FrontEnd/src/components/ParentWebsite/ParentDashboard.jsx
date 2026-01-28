import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ParentDashboard.css';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const [recentGrades, setRecentGrades] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [gradesRes, paymentsRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/api/grades/grades/?student_name=John Smith'),
        fetch('http://127.0.0.1:8000/api/finance/transactions/')
      ]);

      if (gradesRes.ok) {
        const gradesData = await gradesRes.json();
        setRecentGrades((gradesData.results || gradesData).slice(0, 3));
      }

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setRecentPayments((paymentsData.results || paymentsData).slice(0, 3));
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setLoading(false);
    }
  };

  return (
    <div className="parent-dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome Back! 👋</h1>
        <p>Here's an overview of your children's progress and school payments</p>
      </div>

      <div className="dashboard-grid">
        {/* Quick Stats */}
        <div className="dashboard-card stats-card">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">2</span>
              <span className="stat-label">Children</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4</span>
              <span className="stat-label">Subjects</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">₱5,500</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>

        {/* Recent Grades */}
        <div className="dashboard-card grades-card">
          <div className="card-header">
            <h3>📚 Recent Grades</h3>
            <button onClick={() => navigate('/parent/grades')} className="view-all-btn">
              View All →
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : recentGrades.length > 0 ? (
            <div className="grades-list">
              {recentGrades.map(grade => (
                <div key={grade.id} className="grade-item-compact">
                  <span className="subject">{grade.subject.replace(/_/g, ' ')}</span>
                  <span className="score">{grade.score}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No grades available yet</p>
          )}
        </div>

        {/* Payment Status */}
        <div className="dashboard-card payments-card">
          <div className="card-header">
            <h3>💰 Payment Status</h3>
            <button onClick={() => navigate('/parent/ledger')} className="view-all-btn">
              View Ledger →
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : recentPayments.length > 0 ? (
            <div className="payments-list">
              {recentPayments.map(payment => (
                <div key={payment.id} className={`payment-item status-${payment.status.toLowerCase()}`}>
                  <div>
                    <span className="payment-type">{payment.transaction_type}</span>
                    <span className="payment-amount">₱{payment.amount}</span>
                  </div>
                  <span className={`payment-status ${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No payments found</p>
          )}
        </div>

        {/* Announcements */}
        <div className="dashboard-card announcements-card">
          <h3>📢 Latest Announcements</h3>
          <div className="announcements-list">
            <div className="announcement-item">
              <span className="date">Today</span>
              <p>School will be closed on Monday for Teachers' Training Day</p>
            </div>
            <div className="announcement-item">
              <span className="date">Yesterday</span>
              <p>Q1 Report cards are now available for download</p>
            </div>
            <div className="announcement-item">
              <span className="date">2 days ago</span>
              <p>Final deadline for 2nd Quarter payments is January 31, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
