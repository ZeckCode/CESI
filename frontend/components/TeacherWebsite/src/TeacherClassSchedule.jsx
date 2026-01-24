import React, { useState, useEffect } from 'react';
import './TeacherClassSchedule.css';

const navLinks = [
  { href: "index.html", icon: "bi-speedometer2", label: "Dashboard" },
  { href: "ClassSchedule.html", icon: "bi-calendar3", label: "Class Schedule", active: true },
  { href: "Students.html", icon: "bi-people", label: "Students" },
  { href: "Grade.html", icon: "bi-pencil-square", label: "Grade Encode" },
  { href: "AttendanceMonitoring.html", icon: "bi-check2-square", label: "Attendance Monitoring" },
  { href: "SPerformance.html", icon: "bi-graph-up-arrow", label: "Student Performance" },
  { href: "Message.html", icon: "bi-envelope", label: "Messages" },
];

const TeacherClassSchedule = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // Toggle between 'table' and 'calendar'

  const scheduleData = [
    { id: 1, subject: "Mathematics 10", section: "Grade 10 - Einstein", days: ["M", "W", "F"], time: "08:00 AM - 09:00 AM", startTime: "08:00 AM", room: "Room 302", students: 42, color: "#cfe2ff" },
    { id: 2, subject: "Advanced Algebra", section: "Grade 11 - Newton", days: ["T", "TH"], time: "10:30 AM - 12:00 PM", startTime: "10:00 AM", room: "Lab 1", students: 35, color: "#d1e7dd" },
    { id: 3, subject: "Mathematics 10", section: "Grade 10 - Galileo", days: ["M", "W", "F"], time: "01:00 PM - 02:00 PM", startTime: "01:00 PM", room: "Room 302", students: 40, color: "#fff3cd" },
    { id: 4, subject: "Statistics", section: "Grade 12 - Pascal", days: ["T", "TH"], time: "02:00 PM - 03:30 PM", startTime: "02:00 PM", room: "Room 405", students: 38, color: "#f8d7da" },
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsCollapsed(false);
      else setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to find class for a specific calendar cell
  const getClassForSlot = (day, time) => {
    const dayInitial = day === "Thursday" ? "TH" : day.charAt(0);
    return scheduleData.find(cls => 
      cls.days.includes(dayInitial) && cls.startTime === time
    );
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
            <a
              href={item.href}
              className={`nav-link ${item.active ? 'active-link text-dark' : 'text-white'}${hoveredIdx === idx ? ' active-link' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger btn-sm w-100 mt-auto d-flex align-items-center justify-content-center py-2">
        <i className="bi bi-box-arrow-right"></i>
        {!isCollapsed && <span className="ms-2">Log out</span>}
      </button>
    </>
  );

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-md-row min-vh-100">
      {/* Mobile Header */}
      <div className="sidebar-mobile-header w-100 d-flex d-md-none">
        <button className="btn btn-link text-white p-0 me-2" onClick={() => setMobileMenuOpen(true)}>
          <i className="bi bi-list" style={{ fontSize: '2rem' }}></i>
        </button>
        <span className="fw-bold text-white text-uppercase">Teacher Portal</span>
        <span></span>
      </div>

      {/* Mobile Sidebar Drawer */}
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
        <button className="btn btn-sm mb-3 border-0 text-white align-self-end" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`} style={{ fontSize: '1.5rem' }}></i>
        </button>
        {sidebarNav}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow-1 p-4 bg-soft-yellow" style={{ minWidth: 0 }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h3 className="fw-bold text-dark mb-0">Class Schedule</h3>
            <p className="text-muted mb-0">Academic Year 2025-2026 | Second Semester</p>
          </div>
          <div className="btn-group shadow-sm bg-white rounded-3">
            <button 
                className={`btn ${viewMode === 'table' ? 'btn-dark' : 'btn-outline-dark'}`} 
                onClick={() => setViewMode('table')}>
                <i className="bi bi-table me-2"></i>Table
            </button>
            <button 
                className={`btn ${viewMode === 'calendar' ? 'btn-dark' : 'btn-outline-dark'}`} 
                onClick={() => setViewMode('calendar')}>
                <i className="bi bi-calendar-week me-2"></i>Calendar
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3"><i className="bi bi-book text-primary fs-4"></i></div>
                <div><h6 className="text-muted mb-0">Total Classes</h6><h4 className="fw-bold mb-0">8 Classes</h4></div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3"><i className="bi bi-people text-success fs-4"></i></div>
                <div><h6 className="text-muted mb-0">Total Students</h6><h4 className="fw-bold mb-0">312 Students</h4></div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3"><i className="bi bi-clock text-warning fs-4"></i></div>
                <div><h6 className="text-muted mb-0">Hours / Week</h6><h4 className="fw-bold mb-0">18 Hours</h4></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content View */}
        {viewMode === 'table' ? (
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="bg-dark text-white text-center">
                  <tr>
                    <th className="py-3">Subject</th>
                    <th>Section</th>
                    <th>Days</th>
                    <th>Time</th>
                    <th>Room</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {scheduleData.map((cls) => (
                    <tr key={cls.id}>
                      <td className="fw-bold text-primary">{cls.subject}</td>
                      <td><span className="badge bg-light text-dark border">{cls.section}</span></td>
                      <td>{cls.days.join('-')}</td>
                      <td>{cls.time}</td>
                      <td>{cls.room}</td>
                      <td><button className="btn btn-sm btn-outline-dark rounded-pill px-3">View Class</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
            
            <div className="table-responsive">
              <table className="table table-bordered mb-0 calendar-table">
                <thead>
                  <tr className="bg-light text-center">
                    <th style={{ width: '100px' }}>Time</th>
                    {daysOfWeek.map(day => <th key={day}>{day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(time => (
                    <tr key={time}>
                      <td className="text-center small fw-bold bg-light align-middle">{time}</td>
                      {daysOfWeek.map(day => {
                        const cls = getClassForSlot(day, time);
                        return (
                          <td key={day} style={{ height: '90px', verticalAlign: 'top', backgroundColor: cls ? cls.color : 'transparent' }}>
                            {cls && (
                              <div className="calendar-block p-1">
                                <div className="fw-bold small">{cls.subject}</div>
                                <div className="text-muted x-small">{cls.section}</div>
                                <div className="text-muted x-small">{cls.room}</div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherClassSchedule;