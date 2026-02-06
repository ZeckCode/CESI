import React, { useState } from 'react';
import '../IndexWebsiteCSS/Home.css';
import '../IndexWebsiteCSS/App.css';
import Notebook from './Notebook';
import logo from "../../assets/CESI-logo.jpg";

// import Login from "./components/Login";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AdminDashboard from "./components/AdminDashboard";
// import TeacherDashboard from "./components/TeacherDashboard";
// import ParentDashboard from "./components/ParentDashboard";


function Home() {
  const [notebookOpen, setNotebookOpen] = useState(false);

  return (
    <div className="app">
      {/* Header - Full width */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo-circle">
              <img src={logo} alt="CESI Logo" className="logo-image" />
            </div>
            <div className="school-name">
              <h1>Caloocan Evangelical School Inc.</h1>
              <p>Preschool and Elementary Education</p>
            </div>
          </div>
          
          <button className="apply-btn">Apply Now</button>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="main-content">
        {!notebookOpen ? (
          <div className="book-cover-container">
            <div className="book-cover" onClick={() => setNotebookOpen(true)}>
              <div className="book-spine"></div>
              <div className="book-front">
                {/* Title ON the book cover */}
                <div className="book-title-content">
                  <h2 className="book-main-title">CESI Portal</h2>
                  <p className="book-subtitle">Student Hub</p>
                  <p className="tap-instruction">Tap the book to open</p>
                  <div className="tap-arrow">👇</div>
                </div>
                
                <div className="book-design">
                  <div className="design-circle"></div>
                  <div className="design-star">⭐</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Notebook onClose={() => setNotebookOpen(false)} />
        )}
      </main>

      {/* Footer - Full width */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <div className="footer-logo-circle">
              <img src={logo} alt="CESI Logo" className="footer-logo-image" />
            </div>
            <h3>Caloocan Evangelical School Inc.</h3>
          </div>

          <div className="footer-info">
            <p>📍 #47 P. Zamora St. Caloocan City</p>
            <p>📞 (02) 8-285-3702</p>
            <p>📧 www.cesicaloocan.com</p>
          </div>
          <div className="footer-copyright">
            <p>© 2025 CESI. All rights reserved.</p>
            <p className="school-mission">"Quality Christian Education for All"</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Home;