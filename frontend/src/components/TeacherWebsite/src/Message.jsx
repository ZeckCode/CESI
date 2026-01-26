import React, { useState } from 'react';
import './Message.css';

const navLinks = [
  { href: "index.html", icon: "bi-speedometer2", label: "Dashboard" },
  { href: "ClassSchedule.html", icon: "bi-calendar3", label: "Class Schedule" },
  { href: "Students.html", icon: "bi-people", label: "Students" },
  { href: "Grade.html", icon: "bi-pencil-square", label: "Grade Encode" },
  { href: "AttendanceMonitoring.html", icon: "bi-check2-square", label: "Attendance Monitoring" },
  { href: "SPerformance.html", icon: "bi-graph-up-arrow", label: "Student Performance" },
  { href: "Message.html", icon: "bi-envelope", label: "Messages", active: true },
];

const Message = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  
  // Initial state set to the first Group Chat
  const [activeChat, setActiveChat] = useState({ 
    id: 101, 
    type: 'group', 
    name: "Grade 1 - Einstein (Parents)", 
    members: "30 Members" 
  });

  const groups = [
    { id: 101, name: "Grade 1 - Einstein (Parents)", members: "30 Members", lastMsg: "Reminder: Field trip tomorrow.", time: "9:15 AM" },
    { id: 102, name: "Faculty Room 101", members: "12 Members", lastMsg: "Meeting moved to 3PM.", time: "Yesterday" },
  ];

  const contacts = [
    { id: 1, name: "Maria Clara", role: "Parent", lastMsg: "Thank you teacher!", time: "10:30 AM" },
    { id: 2, name: "Juan Dela Cruz", role: "Student", lastMsg: "Sir, I sent the file.", time: "8:45 AM" },
    { id: 3, name: "Principal Ramos", role: "Admin", lastMsg: "Reports received.", time: "Oct 17" },
  ];

  const sidebarNav = (
    <>
      <div className="profile-img-container mb-4 text-center">
        <div className="avatar-circle-sidebar mx-auto mb-2">U</div>
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
      <button className="btn btn-danger btn-sm w-100 mt-auto d-flex align-items-center justify-content-center py-2 border-0">
        <i className="bi bi-box-arrow-right"></i>
        {!isCollapsed && <span className="ms-2">Log out</span>}
      </button>
    </>
  );

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-md-row min-vh-100 bg-soft-yellow overflow-hidden">
      {/* Sidebar */}
      <nav className={`sidebar d-none d-md-flex flex-column p-3 text-white ${isCollapsed ? 'collapsed' : ''}`}
           onMouseEnter={() => setIsCollapsed(false)} onMouseLeave={() => setIsCollapsed(true)}>
        <button className="btn btn-sm mb-3 border-0 text-white align-self-end" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`} style={{ fontSize: '1.5rem' }}></i>
        </button>
        {sidebarNav}
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 p-3 p-md-4 content-main">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold text-dark mb-0">Messages</h2>
          <button className="btn btn-dark rounded-pill px-3 shadow-sm">
            <i className="bi bi-plus-lg me-2"></i>New Chat
          </button>
        </div>

        <div className="row g-0 rounded-4 shadow-sm bg-white overflow-hidden chat-main-wrapper">
          {/* Left Column: Chat List */}
          <div className="col-md-4 border-end d-flex flex-column bg-white">
            <div className="p-3 bg-light border-bottom">
              <div className="input-group input-group-sm bg-white rounded-pill px-2 border">
                <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control border-0 shadow-none" placeholder="Search chats..." />
              </div>
            </div>

            <div className="flex-grow-1 overflow-auto chat-list-scroll">
              {/* Groups Section */}
              <div className="section-title px-3 py-2 bg-light-subtle text-muted small fw-bold">GROUP CHATS</div>
              {groups.map(g => (
                <div 
                  key={g.id} 
                  onClick={() => setActiveChat({ id: g.id, type: 'group', name: g.name, members: g.members })}
                  className={`chat-item d-flex align-items-center p-3 pointer ${activeChat.id === g.id ? 'active-chat' : ''}`}
                >
                  <div className="group-icon-circle me-3"><i className="bi bi-people-fill"></i></div>
                  <div className="flex-grow-1 min-width-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 text-truncate fw-bold">{g.name}</h6>
                      <small className="text-muted x-small">{g.time}</small>
                    </div>
                    <small className="text-muted text-truncate d-block">{g.lastMsg}</small>
                  </div>
                </div>
              ))}

              {/* Private Section */}
              <div className="section-title px-3 py-2 bg-light-subtle text-muted small fw-bold mt-2">DIRECT MESSAGES</div>
              {contacts.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => setActiveChat({ id: c.id, type: 'private', name: c.name, role: c.role })}
                  className={`chat-item d-flex align-items-center p-3 pointer ${activeChat.id === c.id ? 'active-chat' : ''}`}
                >
                  <div className="avatar-small me-3">{c.name.charAt(0)}</div>
                  <div className="flex-grow-1 min-width-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 text-truncate fw-bold">{c.name}</h6>
                      <small className="text-muted x-small">{c.time}</small>
                    </div>
                    <small className="text-muted text-truncate d-block">{c.lastMsg}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Chat Window */}
          <div className="col-md-8 d-flex flex-column bg-white">
            {/* Chat Header */}
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-white shadow-sm z-1">
              <div className="d-flex align-items-center">
                {activeChat.type === 'group' ? (
                  <div className="group-icon-circle-header me-3"><i className="bi bi-people-fill"></i></div>
                ) : (
                  <div className="avatar-small me-3 bg-primary text-white">{activeChat.name?.charAt(0)}</div>
                )}
                <div>
                  <h6 className="mb-0 fw-bold">{activeChat.name}</h6>
                  <small className="text-success small fw-medium">
                    {activeChat.type === 'group' ? activeChat.members : 'Online Now'}
                  </small>
                </div>
              </div>
              <div className="chat-actions">
                <button className="btn btn-light btn-sm rounded-circle me-2"><i className="bi bi-telephone"></i></button>
                <button className="btn btn-light btn-sm rounded-circle me-2"><i className="bi bi-camera-video"></i></button>
                <button className="btn btn-light btn-sm rounded-circle"><i className="bi bi-info-circle"></i></button>
              </div>
            </div>

            {/* Chat Body */}
            
            <div className="flex-grow-1 p-4 bg-light-chat overflow-auto d-flex flex-column gap-3">
              {/* Example Received Message */}
              <div className="message-wrapper d-flex flex-column align-items-start">
                {activeChat.type === 'group' && <small className="text-muted ms-2 mb-1">Mrs. Rodriguez (Parent)</small>}
                <div className="message-bubble received p-3 rounded-4 shadow-sm">
                  Good morning Teacher Jhon! Will the classroom be open early today for the project setup?
                </div>
                <small className="text-muted x-small mt-1 ms-2">9:10 AM</small>
              </div>

              {/* Example Sent Message */}
              <div className="message-wrapper d-flex flex-column align-items-end">
                <div className="message-bubble sent p-3 rounded-4 shadow-sm bg-primary text-white">
                  Yes, I'll be there by 7:00 AM to assist everyone. See you!
                </div>
                <small className="text-muted x-small mt-1 me-2">9:12 AM</small>
              </div>

              {/* Example Received Message 2 */}
              <div className="message-wrapper d-flex flex-column align-items-start">
                {activeChat.type === 'group' && <small className="text-muted ms-2 mb-1">Principal Ramos</small>}
                <div className="message-bubble received p-3 rounded-4 shadow-sm">
                  Please ensure all students bring their consent forms for the trip.
                </div>
                <small className="text-muted x-small mt-1 ms-2">10:05 AM</small>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white border-top">
              <div className="input-group bg-light rounded-pill border-0 px-2 align-items-center">
                <button className="btn border-0 text-muted"><i className="bi bi-plus-circle fs-5"></i></button>
                <button className="btn border-0 text-muted"><i className="bi bi-image fs-5"></i></button>
                <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Type a message..." />
                <button className="btn btn-primary rounded-pill px-4 shadow-sm send-btn">
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Message;