//App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileForm from './pages/ProfileForm';
import Recommendation from './pages/Recommendation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LearningPath from './pages/LearningPath';
import MarketTrends from "./pages/MarketTrends";
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizSelectionPage from "./pages/QuizSelection";
import QuizInstructions from "./pages/QuizInstruction";
import QuizPage from "./pages/QuizPage";
import { ThemeProvider } from "./context/ThemeContext";
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css'; 
import './index.css';

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname); // Check if the current route is an auth page
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is logged in
  const hasProfile = !!localStorage.getItem("profileCompleted"); // Check if the user has completed their profile

  return (
    <MantineProvider>
    <ThemeProvider>
    <div className="app-container flex">
      {/* Conditionally render the Sidebar */}
      {!isAuthPage && <Sidebar />}

      <div className="main-content flex-1 p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Profile Form Route */}
          <Route path="/profile-form" element={<ProfileForm />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} hasProfile={hasProfile} />
            }
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/recommendations" element={<Recommendation />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/market-trends" element={<MarketTrends />} />
            <Route path="/quiz-selection" element={<QuizSelectionPage />} />
            <Route path="/quiz-instructions" element={<QuizInstructions />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
    </ThemeProvider>
    </MantineProvider>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
