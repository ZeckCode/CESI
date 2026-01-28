import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/useAuth";
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleNumber, setRoleNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Role mapping: 1 = Admin, 2 = Teacher, 3 = Parent, 4 = Student
  const roleMap = {
    '1': { role: 'ADMIN', route: '/admin', label: 'Admin' },
    '2': { role: 'TEACHER', route: '/teacher', label: 'Teacher' },
    '3': { role: 'PARENT_STUDENT', route: '/parent', label: 'Parent' },
    '4': { role: 'PARENT_STUDENT', route: '/parent', label: 'Student' }, // Students use parent portal for now
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Validate role number
    if (!roleNumber || !roleMap[roleNumber]) {
      setError("Please select a valid role (1-4)");
      return;
    }

    // For debugging: Accept ANY credentials
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    const selectedRole = roleMap[roleNumber];
    
    // Mock user object for debugging
    const mockUser = {
      username: username,
      role: selectedRole.role,
      roleNumber: roleNumber,
      roleName: selectedRole.label
    };

    // Update auth context
    login({ user: mockUser });

    // Store in localStorage for persistence
    localStorage.setItem('debugUser', JSON.stringify(mockUser));
    
    console.log('🔐 DEBUG LOGIN:', mockUser);

    // Navigate to the appropriate portal
    navigate(selectedRole.route, { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🏫 School Portal Login</h1>
        <p className="debug-notice">⚠️ DEBUG MODE: Any credentials accepted</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter any username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Select Role (1-4)</label>
            <div className="role-selection">
              {/* Radio buttons for role selection */}
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="1"
                  checked={roleNumber === '1'}
                  onChange={(e) => setRoleNumber(e.target.value)}
                />
                <span>1 - Admin</span>
              </label>
              
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="2"
                  checked={roleNumber === '2'}
                  onChange={(e) => setRoleNumber(e.target.value)}
                />
                <span>2 - Teacher</span>
              </label>
              
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="3"
                  checked={roleNumber === '3'}
                  onChange={(e) => setRoleNumber(e.target.value)}
                />
                <span>3 - Parent</span>
              </label>
              
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="4"
                  checked={roleNumber === '4'}
                  onChange={(e) => setRoleNumber(e.target.value)}
                />
                <span>4 - Student</span>
              </label>
            </div>

            {/* Alternative: Number input textbox */}
            <div className="alternative-input">
              <label>Or type role number (1-4):</label>
              <input
                type="text"
                value={roleNumber}
                onChange={(e) => setRoleNumber(e.target.value)}
                placeholder="1, 2, 3, or 4"
                className="form-input role-number-input"
                maxLength="1"
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="login-button">
            Login as {roleNumber ? roleMap[roleNumber]?.label : 'User'}
          </button>
        </form>

        <div className="role-reference">
          <h4>Quick Reference:</h4>
          <ul>
            <li><strong>1</strong> = Admin Portal</li>
            <li><strong>2</strong> = Teacher Portal</li>
            <li><strong>3</strong> = Parent Portal</li>
            <li><strong>4</strong> = Student Portal (uses Parent Portal)</li>
          </ul>
        </div>

        <p className="dev-note">
          📝 <strong>For Auth Developer:</strong> Replace this with real authentication.<br/>
          Expected backend endpoint: <code>POST /api/accounts/login/</code><br/>
          Expected response: <code>{'{ "user": { "role": "ADMIN|TEACHER|PARENT_STUDENT" }, "token": "..." }'}</code>
        </p>
      </div>
    </div>
  );
}
