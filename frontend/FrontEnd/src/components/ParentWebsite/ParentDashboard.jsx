import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ParentWebsiteCSS/ParentDashboard.css';

const navLinks = [
  { path: "/parent/dashboard", icon: "bi-speedometer2", label: "Dashboard", active: true },
  { path: "/parent/profile", icon: "bi-person", label: "Student Info" },
  { path: "/parent/ledger", icon: "bi-wallet2", label: "Payment Ledger" },
  { path: "/parent/grades", icon: "bi-mortarboard", label: "Grades" },
];

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [recentGrades, setRecentGrades] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      } else {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const sidebarNav = (
    <>
      <div className="profile-img-container mb-4 text-center">
        <div className="avatar-circle mx-auto mb-2">
          {isCollapsed ? <i className="bi bi-person"></i> : <span className="fw-bold">JD</span>}
        </div>
        {!isCollapsed && <h6 className="mt-2 fw-bold text-white">John Doe</h6>}
        {!isCollapsed && <small className="text-white-50">Parent</small>}
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {navLinks.map((item, idx) => (
          <li className="nav-item mb-2" key={item.path}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate(item.path); }}
              className={`nav-link ${item.active ? 'active-link text-dark' : 'text-white'}${hoveredIdx === idx ? ' active-link' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: 'pointer' }}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {!isCollapsed && item.label}
            </a>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger btn-sm w-100 mt-auto d-flex align-items-center justify-content-center py-2 border-0">
        <i className="bi bi-box-arrow-right"></i>
        {!isCollapsed && <span className="ms-2">Log out</span>}
      </button>
    </>
  );

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-md-row min-vh-100">
      {/* Mobile Header */}
      <div className="sidebar-mobile-header w-100 d-flex d-md-none">
        <button
          className="btn btn-link text-white p-0 me-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <i className="bi bi-list" style={{ fontSize: '2rem' }}></i>
        </button>
        <span className="fw-bold text-white">Parent Portal</span>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          <div className="sidebar-mobile-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <nav className="sidebar-mobile-menu open p-3 text-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">Menu</span>
              <button className="btn btn-link text-white p-0" onClick={() => setMobileMenuOpen(false)}>
                <i className="bi bi-x-lg" style={{ fontSize: '1.5rem' }}></i>
              </button>
            </div>
            {sidebarNav}
          </nav>
        </>
      )}

      {/* Desktop Sidebar */}
      <nav
        className={`sidebar d-none d-md-flex flex-column p-3 text-white${isCollapsed ? ' collapsed' : ''}`}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <button
          className="btn btn-sm mb-3 border-0 text-white align-self-end"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`} style={{ fontSize: '1.5rem' }}></i>
        </button>
        {sidebarNav}
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-soft-yellow" style={{ minWidth: 0 }}>
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">Welcome Back! 👋</h2>
          <p className="text-muted mb-0">Here's an overview of your children's progress and school payments</p>
        </div>

        <div className="row g-4">
          {/* Recent Grades Card */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-header bg-dark text-white py-3 px-4">
                <h6 className="mb-0 fw-bold">
                  <i className="bi bi-mortarboard-fill me-2"></i>Recent Grades
                </h6>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : recentGrades.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-sm mb-0">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Score</th>
                          <th>Quarter</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentGrades.map((grade, idx) => (
                          <tr key={idx}>
                            <td className="fw-semibold">{grade.subject}</td>
                            <td><span className="badge bg-primary">{grade.score}</span></td>
                            <td>Q{grade.quarter}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted text-center py-3">No grades available</p>
                )}
              </div>
              <div className="card-footer bg-light text-center py-2">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/parent/grades'); }} className="small text-decoration-none fw-bold">
                  View All Grades →
                </a>
              </div>
            </div>
          </div>

          {/* Recent Payments Card */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-header bg-dark text-white py-3 px-4">
                <h6 className="mb-0 fw-bold">
                  <i className="bi bi-wallet2 me-2"></i>Payment Status
                </h6>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : recentPayments.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-sm mb-0">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPayments.map((payment, idx) => (
                          <tr key={idx}>
                            <td className="fw-semibold">{payment.transaction_type}</td>
                            <td>₱{parseFloat(payment.amount).toFixed(2)}</td>
                            <td>
                              <span className={`badge ${payment.status === 'PAID' ? 'bg-success' : payment.status === 'PENDING' ? 'bg-warning' : 'bg-danger'}`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted text-center py-3">No payments</p>
                )}
              </div>
              <div className="card-footer bg-light text-center py-2">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/parent/ledger'); }} className="small text-decoration-none fw-bold">
                  View Ledger →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="row g-4 mt-2">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 text-center">
              <div className="card-body p-4">
                <div className="display-6 text-primary mb-2">👨‍🎓</div>
                <h6 className="fw-bold">Active Students</h6>
                <p className="text-muted mb-0">2 Children</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 text-center">
              <div className="card-body p-4">
                <div className="display-6 text-success mb-2">✅</div>
                <h6 className="fw-bold">Overall Status</h6>
                <p className="text-muted mb-0">On Track</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 text-center">
              <div className="card-body p-4">
                <div className="display-6 text-warning mb-2">⚠️</div>
                <h6 className="fw-bold">Pending Payments</h6>
                <p className="text-muted mb-0">1 Due</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 text-center">
              <div className="card-body p-4">
                <div className="display-6 text-info mb-2">📅</div>
                <h6 className="fw-bold">Next Event</h6>
                <p className="text-muted mb-0">Feb 15, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
