import { useEffect, useState } from "react";
import "../AdminWebsiteCSS/styles.css";

import React from "react";
import Sidebar from"./Sidebar";
const API_URL = "http://127.0.0.1:8000/announcements/";

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [announcement, setAnnouncement] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setAnnouncements(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: announcement }),
    })
      .then(res => res.json())
      .then(data => {
        setAnnouncements([data, ...announcements]);
        setAnnouncement("");
        setShowModal(false);
      });
  };

  return (
    <main className="dashboard">
      <section className="announcements">
        <div className="announcements-header">
          <h3>Announcements</h3>
          <button onClick={() => setShowModal(true)}>+ Post</button>
        </div>

        {announcements.map(a => (
          <div key={a.id} className="announcement-box">

            <p><br></br>{a.text}</p>
            <small>{new Date(a.created_at).toLocaleString()}</small>
              <p>- Admin</p>
          </div>
        ))}
      </section>

        <section className="quick-view">
        <StatCard title="Total Students" />
        <StatCard title="Paid Students" />
        <StatCard title="Unpaid Students" />
      </section>
      
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <textarea
                value={announcement}
                onChange={e => setAnnouncement(e.target.value)}
                required
              />
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({ title }) {
  return (
    <div className="stat-card">
      <div className="icon"></div>
      <p>{title}</p>
    </div>
  );
}
