import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import '../styles/settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileCompleted");
    navigate("/login");
  };

  // Delete Account function
  const handleDeleteAccount = () => {
    // Add backend API call here
    console.log("Account deleted (mock)");
    localStorage.clear();
    navigate("/signup");
  };

  // Update email function
  const handleEmailUpdate = (e) => {
    e.preventDefault();
    // Add backend API call here
    console.log("Email updated to:", email);
    localStorage.setItem("userEmail", email);
    // Show success message
  };

  // Update password function
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // Add backend API call here
    console.log("Password updated");
    setPassword("");
    // Show success message
  };

  return (
    <div className={`settings-page ${theme}`}>
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        
        <div className="settings-layout">
          {/* Sidebar Navigation */}
          <div className="settings-sidebar">
            <div 
              className={`sidebar-item ${activeTab === "general" ? "active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              General
            </div>
            <div 
              className={`sidebar-item ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </div>
            <div 
              className={`sidebar-item ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </div>
            <div 
              className={`sidebar-item ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </div>
            <div 
              className={`sidebar-item danger ${activeTab === "danger" ? "active" : ""}`}
              onClick={() => setActiveTab("danger")}
            >
              Danger Zone
            </div>
          </div>

          {/* Main Content Area */}
          <div className="settings-content">
            {/* General Settings Tab */}
            {activeTab === "general" && (
              <div className="settings-section">
                <h2>General Settings</h2>
                
                <div className="setting-card">
                  <div className="setting-header">
                    <h3>Appearance</h3>
                    <p>Customize how the application looks</p>
                  </div>
                  <div className="setting-options">
                    <div className="toggle-option">
                      <span>Dark Mode</span>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={theme === "dark"}
                          onChange={toggleTheme}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="setting-card">
                  <div className="setting-header">
                    <h3>Language</h3>
                    <p>Choose your preferred language</p>
                  </div>
                  <div className="setting-options">
                    <select className="select-dropdown">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === "account" && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                
                <div className="setting-card">
                  <div className="setting-header">
                    <h3>Profile Information</h3>
                    <p>Edit your personal information</p>
                  </div>
                  <div className="setting-options">
                    <button 
                      onClick={() => navigate('/profile')} 
                      className="primary-button"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>

                <div className="setting-card">
                  <div className="setting-header">
                    <h3>Email Address</h3>
                    <p>Update your email address</p>
                  </div>
                  <div className="setting-options">
                    <form onSubmit={handleEmailUpdate} className="settings-form">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="New email address"
                        required
                        className="settings-input"
                      />
                      <button type="submit" className="primary-button">
                        Update Email
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings Tab */}
            {activeTab === "security" && (
              <div className="settings-section">
                <h2>Security Settings</h2>
                
                <div className="setting-card">
                  <div className="setting-header">
                    <h3>Change Password</h3>
                    <p>Update your account password</p>
                  </div>
                  <div className="setting-options">
                    <form onSubmit={handlePasswordUpdate} className="settings-form">
                      <input
                        type="password"
                        placeholder="Current password"
                        required
                        className="settings-input"
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New password"
                        required
                        className="settings-input"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        required
                        className="settings-input"
                      />
                      <button type="submit" className="primary-button">
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>

                <div className="setting-card">
                  <div className="setting-header">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security</p>
                  </div>
                  <div className="setting-options">
                    <button className="primary-button">
                      Setup 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings Tab */}
            {activeTab === "notifications" && (
              <div className="settings-section">
                <h2>Notification Settings</h2>
                
                <div className="setting-card">
                  <div className="setting-header">
                    <h3>Push Notifications</h3>
                    <p>Manage notification preferences</p>
                  </div>
                  <div className="setting-options">
                    <div className="toggle-option">
                      <span>Enable All Notifications</span>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={notificationsEnabled}
                          onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    
                    <div className="toggle-option">
                      <span>Course Updates</span>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={notificationsEnabled}
                          disabled={!notificationsEnabled}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    
                    <div className="toggle-option">
                      <span>Assignment Reminders</span>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={notificationsEnabled}
                          disabled={!notificationsEnabled}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    
                    <div className="toggle-option">
                      <span>System Announcements</span>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={notificationsEnabled}
                          disabled={!notificationsEnabled}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="setting-card">
                  <div className="setting-header">
                    <h3>Email Notifications</h3>
                    <p>Manage email notification preferences</p>
                  </div>
                  <div className="setting-options">
                    <div className="toggle-option">
                      <span>Weekly Digest</span>
                      <label className="switch">
                        <input type="checkbox" checked={true} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    <div className="toggle-option">
                      <span>Important Announcements</span>
                      <label className="switch">
                        <input type="checkbox" checked={true} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === "danger" && (
              <div className="settings-section danger-section">
                <h2>Danger Zone</h2>
                
                <div className="setting-card danger-card">
                  <div className="setting-header">
                    <h3>Log Out Everywhere</h3>
                    <p>Log out from all devices</p>
                  </div>
                  <div className="setting-options">
                    <button onClick={handleLogout} className="warning-button">
                      Log Out Everywhere
                    </button>
                  </div>
                </div>

                <div className="setting-card danger-card">
                  <div className="setting-header">
                    <h3>Delete Account</h3>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <div className="setting-options">
                    <button 
                      onClick={() => setShowDeleteConfirm(true)} 
                      className="danger-button"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.</p>
            <div className="modal-form">
              <input 
                type="text" 
                placeholder="Type 'DELETE' to confirm" 
                className="settings-input"
              />
            </div>
            <div className="modal-buttons">
              <button onClick={() => setShowDeleteConfirm(false)} className="secondary-button">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="danger-button">
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;