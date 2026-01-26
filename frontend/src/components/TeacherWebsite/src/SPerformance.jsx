import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './SPerformance.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const navLinks = [
  { href: "index.html", icon: "bi-speedometer2", label: "Dashboard" },
  { href: "ClassSchedule.html", icon: "bi-calendar3", label: "Class Schedule" },
  { href: "Students.html", icon: "bi-people", label: "Students" },
  { href: "Grade.html", icon: "bi-pencil-square", label: "Grade Encode" },
  { href: "AttendanceMonitoring.html", icon: "bi-check2-square", label: "Attendance Monitoring" },
  { href: "SPerformance.html", icon: "bi-graph-up-arrow", label: "Student Performance", active: true },
  { href: "Message.html", icon: "bi-envelope", label: "Messages" },
];

const SPerformance = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("Grade 1 - Einstein");

  const grades = ["Grade 1 - Einstein", "Grade 2 - Newton", "Grade 3 - Galileo", "Grade 4 - Pascal", "Grade 5 - Darwin", "Grade 6 - Atom"];

  // Bar Chart: Grade Distribution
  const barData = {
    labels: ['75-80', '81-85', '86-90', '91-95', '96-100'],
    datasets: [{
      label: 'Students',
      data: [4, 8, 15, 10, 3],
      backgroundColor: '#0077b6',
      borderRadius: 6,
    }]
  };

  // Doughnut Chart: Passing Rate
  const doughnutData = {
    labels: ['Passed', 'Failed'],
    datasets: [{
      data: [36, 4],
      backgroundColor: ['#198754', '#dc3545'],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
  };

  const sidebarNav = (
    <>
      <div className="profile-img-container mb-4 text-center">
        <div className="avatar-circle mx-auto mb-2">U</div>
        {!isCollapsed && <h6 className="mt-2 fw-bold text-white">Username</h6>}
        {!isCollapsed && <small className="text-white-50">Faculty Member</small>}
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {navLinks.map((item, idx) => (
          <li className="nav-item mb-2" key={item.label}>
            <a href={item.href} 
               className={`nav-link ${item.active ? 'active-link text-dark' : 'text-white'}${hoveredIdx === idx ? ' active-link' : ''}`}
               onMouseEnter={() => setHoveredIdx(idx)} 
               onMouseLeave={() => setHoveredIdx(null)}>
              <i className={`bi ${item.icon} me-2`}></i>
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger btn-sm w-100 mt-auto border-0 py-2">
        <i className="bi bi-box-arrow-right"></i>
        {!isCollapsed && <span className="ms-2">Log out</span>}
      </button>
    </>
  );

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-md-row min-vh-100 bg-soft-yellow overflow-hidden">
      <nav className={`sidebar d-none d-md-flex flex-column p-3 text-white ${isCollapsed ? 'collapsed' : ''}`}
           onMouseEnter={() => setIsCollapsed(false)} onMouseLeave={() => setIsCollapsed(true)}>
        <button className="btn btn-sm mb-3 border-0 text-white align-self-end" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`} style={{ fontSize: '1.5rem' }}></i>
        </button>
        {sidebarNav}
      </nav>

      <main className="flex-grow-1 p-4 overflow-auto content-main">
        <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-0">Student Performance</h2>
            <p className="text-muted mb-0">Analysis Dashboard • A.Y. 2025-2026</p>
          </div>
          <select className="form-select border-0 shadow-sm w-auto fw-bold" value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
            {grades.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </header>

        {/* Top Analytics Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-5 border-primary">
              <div className="d-flex align-items-center">
                <div className="icon-circle bg-primary-subtle text-primary me-3"><i className="bi bi-calculator"></i></div>
                <div>
                  <small className="text-muted fw-bold">CLASS AVERAGE</small>
                  <h3 className="fw-bold mb-0">88.5%</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-5 border-success">
              <div className="d-flex align-items-center">
                <div className="icon-circle bg-success-subtle text-success me-3"><i className="bi bi-trophy"></i></div>
                <div>
                  <small className="text-muted fw-bold">TOP PERFORMER</small>
                  <h3 className="fw-bold mb-0">96.2%</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-5 border-danger">
              <div className="d-flex align-items-center">
                <div className="icon-circle bg-danger-subtle text-danger me-3"><i className="bi bi-person-exclamation"></i></div>
                <div>
                  <small className="text-muted fw-bold">UNDERPERFORMING</small>
                  <h3 className="fw-bold mb-0">4 <span className="fs-6 fw-normal">Students</span></h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="row g-4 mb-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h6 className="fw-bold text-uppercase text-muted mb-4">Grade Distribution Frequency</h6>
              <div className="chart-area">
                <Bar data={barData} options={commonOptions} />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h6 className="fw-bold text-uppercase text-muted mb-4">Passing Rate Status</h6>
              <div className="chart-area">
                <Doughnut data={doughnutData} options={commonOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Ranking Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
          <div className="p-3 bg-dark text-white d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0 text-uppercase">Ranking Top Performers</h6>
            <span className="badge bg-primary px-3">Top 5 Students</span>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-center">
              <thead className="table-light small">
                <tr>
                  <th>RANK</th>
                  <th className="text-start">STUDENT NAME</th>
                  <th>GWA</th>
                  <th>REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { r: 1, n: "Sofia Rodriguez", g: "96.2%", s: "With Honors" },
                  { r: 2, n: "Liam Johnson", g: "94.8%", s: "With Honors" },
                  { r: 3, n: "Emma Watson", g: "93.5%", s: "With Honors" },
                  { r: 4, n: "Noah Brown", g: "92.1%", s: "With Honors" },
                  { r: 5, n: "Lucas Garcia", g: "91.7%", s: "Passed" },
                ].map((s) => (
                  <tr key={s.r}>
                    <td><span className={`badge rounded-circle ${s.r === 1 ? 'bg-warning text-dark' : 'bg-light text-muted'}`}>{s.r}</span></td>
                    <td className="text-start ps-4 fw-bold">{s.n}</td>
                    <td className="fw-bold text-primary">{s.g}</td>
                    <td><span className={`badge ${s.s === "With Honors" ? "bg-success-subtle text-success" : "bg-info-subtle text-info"}`}>{s.s}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Underperforming Students Section */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-5">
          <div className="p-3 bg-danger text-white d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0 text-uppercase">Students At Risk / Underperforming</h6>
            <span className="badge bg-white text-danger px-3">Action Required</span>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-center">
              <thead className="table-light small">
                <tr>
                  <th className="text-start ps-4">STUDENT NAME</th>
                  <th>GWA</th>
                  <th>ATTENDANCE</th>
                  <th>PRIMARY ISSUE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "John Michael Smith", g: "74.2%", a: "75%", i: "Low Exam Scores" },
                  { n: "Sarah Jane Miller", g: "73.5%", a: "60%", i: "Chronic Absences" },
                  { n: "Robert Wilson", g: "74.8%", a: "82%", i: "Missing Projects" },
                  { n: "Grace Davis", g: "72.1%", a: "90%", i: "Low Performance Tasks" },
                ].map((s, index) => (
                  <tr key={index}>
                    <td className="text-start ps-4 fw-bold text-danger">{s.n}</td>
                    <td className="fw-bold text-dark">{s.g}</td>
                    <td>
                      <div className="progress mx-auto" style={{ height: '8px', width: '100px' }}>
                        <div 
                          className={`progress-bar ${parseInt(s.a) < 75 ? 'bg-danger' : 'bg-warning'}`} 
                          role="progressbar" 
                          style={{ width: s.a }}>
                        </div>
                      </div>
                      <small className="x-small text-muted">{s.a} Attendance</small>
                    </td>
                    <td>
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill">
                        {s.i}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1">
                        <i className="bi bi-envelope-at me-1"></i> Notify Parent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SPerformance;