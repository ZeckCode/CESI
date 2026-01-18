import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, DollarSign, TrendingUp, Bell } from 'lucide-react';
import '../AdminWebsiteCSS/Dashboard.css';

const API_URL = "http://127.0.0.1:8000/announcements/";

export default function Dashboard() {
  const [hoveredAnnouncement, setHoveredAnnouncement] = useState(null);

  const [announcements, setAnnouncements] = useState([]);
  const [announcement, setAnnouncement] = useState(""); // textarea value
  const [showModal, setShowModal] = useState(false);

  // Fetch announcements
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error("Failed to fetch announcements:", err));
  }, []);

  // Post announcement
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: announcement }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements((prev) => [data, ...prev]);
        setAnnouncement("");
        setShowModal(false);
      })
      .catch((err) => console.error("Failed to post announcement:", err));
  };

  // Sample data - Replace with API calls
  const enrollmentData = [
    { level: "Kindergarten", students: 48 },
    { level: "Grade 1", students: 52 },
    { level: "Grade 2", students: 46 },
    { level: "Grade 3", students: 50 },
    { level: "Grade 4", students: 49 },
    { level: "Grade 5", students: 45 },
    { level: "Grade 6", students: 42 },
  ];

  const paymentData = [
    { name: "Paid", value: 120, color: "#10b981" },
    { name: "Pending", value: 15, color: "#fbbf24" },
    { name: "Overdue", value: 10, color: "#ef4444" },
  ];

  const todaySchedule = [
    { time: "8:00 AM", class: "Kindergarten A - Math Fundamentals", teacher: "Mrs. Johnson" },
    { time: "9:30 AM", class: "Grade 1 B - Language Arts", teacher: "Mr. Santos" },
    { time: "11:00 AM", class: "Grade 2 - Science Fun", teacher: "Ms. Garcia" },
    { time: "1:00 PM", class: "Grade 3 A - Physical Education", teacher: "Mrs. Lee" },
  ];

  return (
     <div className="dashboard-page">
    <main className="dashboard-main">
      {/* Stats Overview */}
      <section className="dashboard-section">
        <div className="stats-grid">
          <div className="stat-card stat-card-blue">
            <div className="stat-header">
              <span className="stat-label">Total Students</span>
              <Users size={24} className="stat-icon" />
            </div>
            <div className="stat-value">332</div>
            <div className="stat-change">↑ 12% from last month</div>
          </div>

          <div className="stat-card stat-card-yellow">
            <div className="stat-header">
              <span className="stat-label">Total Revenue</span>
              <DollarSign size={24} className="stat-icon" />
            </div>
            <div className="stat-value">₱485,000</div>
            <div className="stat-change">↑ 8% from last month</div>
          </div>

          <div className="stat-card stat-card-green">
            <div className="stat-header">
              <span className="stat-label">Active Classes</span>
              <Calendar size={24} className="stat-icon" />
            </div>
            <div className="stat-value">12</div>
            <div className="stat-change">3 classes today</div>
          </div>

          <div className="stat-card stat-card-purple">
            <div className="stat-header">
              <span className="stat-label">Attendance Rate</span>
              <TrendingUp size={24} className="stat-icon" />
            </div>
            <div className="stat-value">94%</div>
            <div className="stat-change">↑ 2% from yesterday</div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Analytics Overview</h2>

        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Students per Level</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#1e40af" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Payment Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Announcements and Schedule */}
      <div className="charts-grid">
        {/* Announcements */}
        <div className="announcement-card">
          <div className="card-header">
            <Bell size={20} className="card-icon" />
            <h3 className="chart-title">Recent Announcements</h3>
          </div>

          <div className="announcements-header">
            <h3>Announcements</h3>
            <button onClick={() => setShowModal(true)}>+ Post</button>
          </div>

          {announcements.map((a) => (
            <div
              key={a.id}
              className={`announcement-item ${
                hoveredAnnouncement === a.id ? "announcement-item-hover" : ""
              }`}
              onMouseEnter={() => setHoveredAnnouncement(a.id)}
              onMouseLeave={() => setHoveredAnnouncement(null)}
            >
              <div className="announcement-header">
                <span className="announcement-title">{a.title ?? "Announcement"}</span>
                <span className="announcement-date">
                  {a.created_at ? new Date(a.created_at).toLocaleString() : ""}
                </span>
              </div>
              <p className="announcement-text">{a.text}</p>
              <p className="announcement-author">- Admin</p>
            </div>
          ))}

          {showModal && (
            <div className="modal-backdrop">
              <div className="modal">
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    required
                    placeholder="Write an announcement..."
                  />
                  <div className="modal-actions">
                    <button type="submit">Post</button>
                    <button type="button" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Schedule */}
        <div className="schedule-card">
          <div className="card-header">
            <Calendar size={20} className="card-icon" />
            <h3 className="chart-title">Today's Schedule</h3>
          </div>

          {todaySchedule.map((item, index) => (
            <div key={index} className="schedule-item">
              <div className="schedule-time">{item.time}</div>
              <div className="schedule-details">
                <div className="schedule-class">{item.class}</div>
                <div className="schedule-teacher">{item.teacher}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    </div>
  );
}
