import React, { useState, useEffect } from 'react';
import AnnouncementCard from "./AnnouncementCard";
import { useNavigate } from "react-router-dom";
import '../IndexWebsiteCSS/Notebook.css';

const Notebook = ({ onClose }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('announcements');
  const [announcements, setAnnouncements] = useState([]);

  // Fetch dynamic announcements from Django backend
  useEffect(() => {
    fetch("/api/all-announcements/") // Django endpoint serving admin + Facebook posts
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error("Error fetching announcements:", err));
  }, []);

  const content = {
    'announcements': {
      title: "Announcements",
      content: (
        <div className="announcements-container">
          {announcements.length === 0 ? (
            <p>No announcements yet.</p>
          ) : (
            announcements.map(a => (
              <AnnouncementCard
                key={a.id}
                title={a.title}
                date={a.created_at}
                image={a.image}
                description={a.description}
              />
            ))
          )}
        </div>
      )
    },
    'school-info': {
      title: "School Information",
      content: (
        <>
          <h3>Welcome to CESI!</h3>
          <p>Caloocan Evangelical School Inc. (CESI) is a premier elementary institution dedicated to providing quality Christian education since 1985. We nurture young minds from Kindergarten to Grade 6.</p>
          <ul>
            <li>🏫 Founded: 1985</li>
            <li>📚 Grades: Kindergarten to Grade 6</li>
            <li>👨‍🎓 Student Population: 500+</li>
            <li>👩‍🏫 Faculty: 50 Certified Teachers</li>
            <li>📖 Curriculum: Enhanced K-12 Program</li>
          </ul>
        </>
      )
    },
    'mission-vision': {
      title: "Mission & Vision",
      content: (
        <>
          <h3>Our Mission</h3>
          <p>To provide holistic Christian education that develops students spiritually, academically, socially, and physically, preparing them to become responsible citizens and future leaders.</p>
          
          <h3>Our Vision</h3>
          <p>To be a leading Christian educational institution that produces God-fearing, competent, and compassionate individuals who contribute positively to society.</p>
          
          <h3>Core Values</h3>
          <ul>
            <li>✨ Christ-centeredness</li>
            <li>📖 Academic Excellence</li>
            <li>❤️ Compassion</li>
            <li>🤝 Integrity</li>
            <li>🌟 Service</li>
          </ul>
        </>
      )
    },
    'achievements': {
      title: "Achievements",
      content: (
        <>
          <h3>School Achievements & Awards</h3>
          <ul>
            <li>🏆 DepEd Academic Excellence Award 2022</li>
            <li>⭐ Regional Recognition for Innovative Teaching Methods</li>
            <li>🎨 NCR Art Competition Champions (Elementary Division)</li>
            <li>⚽ Caloocan City Sports Championship 2023</li>
            <li>📚 Reading Literacy Program Award</li>
            <li>🌿 Eco-School Award for Environmental Program</li>
            <li>🎵 Festival of Talents Regional Winners</li>
          </ul>
        </>
      )
    },
    'contact': {
      title: "Contact & Inquiry",
      content: (
        <>
          <h3>📞 Get in Touch</h3>
          <p><strong>Phone:</strong> (02) 123-4567 / 0917-123-4567</p>
          <p><strong>Email:</strong> info@cesi.edu.ph / admissions@cesi.edu.ph</p>
          <p><strong>Address:</strong> 123 Learning Street, Caloocan City, Metro Manila</p>
          
          <h3>⏰ Office Hours</h3>
          <p>Monday to Friday: 7:30 AM - 5:00 PM</p>
          <p>Saturday: 8:00 AM - 12:00 NN</p>
          
          <h3>📍 How to Find Us</h3>
          <p>Near Caloocan City Hall, beside Public Market. Accessible via jeepney routes: 1, 5, and 12.</p>
          
          <h3>💬 Social Media</h3>
          <p>Facebook: @CaloocanEvangelicalSchool</p>
          <p>Instagram: @cesiofficial</p>
        </>
      )
    }
  };

  return (
    <div className="notebook-container">
      <div className="notebook-header">
        <h2>CESI Student Manual</h2>
        <button className="close-btn" onClick={onClose}>✕ Close Book</button>
      </div>

      <div className="notebook-content">
        {/* Left Bookmarks */}
        <div className="bookmarks-left">
          {['announcements', 'school-info', 'mission-vision', 'achievements', 'contact'].map((tab) => (
            <button 
              key={tab}
              className={`bookmark-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {content[tab].title}
            </button>
          ))}
        </div>

        {/* Notebook Pages */}
        <div className="notebook-pages">
          {/* Left Page */}
          <div className="page-left">
            <div className="page-content">
              <h2>{content[activeTab].title}</h2>
              {content[activeTab].content}
            </div>
            <div className="page-footer">
              <div className="page-number">CESI Elementary</div>
              <div className="page-date">Student Edition</div>
            </div>
          </div>

          {/* Right Page */}
          <div className="page-right">
            <div className="action-section">
              <h3>📋 Quick Actions</h3>
              <button className="action-btn enrollment-btn">
                🎓 Enrollment Procedure
              </button>
              
              <div className="quick-info">
                <h4>❓ Need Help?</h4>
                <p>For admission inquiries, visit our Registrar's Office from Monday to Friday, 8:00 AM to 4:30 PM.</p>
              </div><div className="action-section">
                <h4>🔐 Portal Access</h4>
              <button
                    className="action-btn login-btn"
                    onClick={() => navigate("/login")}
                  >
                    🔐 Login Portal
                  </button> </div>
              <div className="quick-links">
                <h4>🔗 Quick Links</h4>
                <button className="link-btn">📄 Download Forms</button>
                <button className="link-btn">📅 School Calendar</button>
                <button className="link-btn">🍱 Lunch Menu</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;
