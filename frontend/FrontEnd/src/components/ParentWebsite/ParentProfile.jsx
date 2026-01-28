import React, { useState } from 'react';
import './ParentProfile.css';

const ParentProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Springfield, IL 62701',
    children: [
      { id: 1, name: 'Emma Smith', grade: '4', section: 'A' },
      { id: 2, name: 'Lucas Smith', grade: '2', section: 'B' },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    // TODO: Send update to backend API
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="parent-profile-container">
      <div className="profile-header">
        <h1>👤 My Profile</h1>
        <button 
          className={`edit-btn ${isEditing ? 'hidden' : ''}`}
          onClick={handleEdit}
        >
          ✏️ Edit Profile
        </button>
      </div>

      <div className="profile-content">
        {/* Parent Information Section */}
        <div className="profile-section">
          <h2>Parent Information</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={isEditing ? editData.name : profileData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={isEditing ? editData.email : profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={isEditing ? editData.phone : profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={isEditing ? editData.address : profileData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-input"
              rows="3"
            />
          </div>
        </div>

        {/* Children Information Section */}
        <div className="profile-section">
          <h2>My Children</h2>
          <div className="children-list">
            {(isEditing ? editData.children : profileData.children).map(child => (
              <div key={child.id} className="child-card">
                <div className="child-info">
                  <h3>{child.name}</h3>
                  <p>Grade {child.grade}, Section {child.section}</p>
                </div>
                <button className="child-view-btn">View Profile →</button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="form-actions">
            <button className="save-btn" onClick={handleSave}>
              ✓ Save Changes
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              ✕ Cancel
            </button>
          </div>
        )}

        {/* Additional Options */}
        <div className="profile-section">
          <h2>Settings</h2>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Email Notifications</h4>
                <p>Receive updates about grades and payments</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>SMS Reminders</h4>
                <p>Get payment reminders via SMS</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
