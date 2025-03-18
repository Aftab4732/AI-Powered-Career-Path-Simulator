// //Login.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Mail, Lock } from "lucide-react";
// import axios from "../utils/api";
// import "../styles/auth.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("/auth/login", formData);

//       // Save token and email to localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userEmail", formData.email); // Save the email
//       localStorage.setItem("profileCompleted", res.data.profileCompleted); // Save profile completion status

//       setMessage("Login Successful! Redirecting...");

//       setTimeout(() => {
//         if (res.data.profileCompleted) {
//           navigate("/profile"); // Redirect to profile if profile is completed
//         } else {
//           navigate("/profile-form"); // Redirect to profile form if profile is not completed
//         }
//       }, 1500);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-background">
//       <div className="auth-container">
//         <div className="auth-header">
//           <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
//           <p className="text-sm opacity-90">Sign in to continue your journey</p>
//         </div>
//         <div className="auth-form">
//           {message && (
//             <div className={`auth-message ${message.includes("Successful") ? "success" : "error"}`}>
//               {message}
//             </div>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="auth-input-group">
//               <Mail className="auth-icon" size={20} />
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 className="auth-input"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="auth-input-group">
//               <Lock className="auth-icon" size={20} />
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 className="auth-input"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="auth-button"
//             >
//               {loading ? (
//                 <div className="loading-spinner" />
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>
//           <div className="auth-alternate">
//             Don't have an account?{" "}
//             <Link to="/signup">Create Account</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, TrendingUp } from "lucide-react";
import axios from "../utils/api";
import "../styles/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", formData);

      // Save token and email to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("profileCompleted", res.data.profileCompleted);

      setMessage("Login Successful! Redirecting...");

      setTimeout(() => {
        if (res.data.profileCompleted) {
          navigate("/profile"); // Redirect to profile if profile is completed
        } else {
          navigate("/profile-form"); // Redirect to profile form if profile is not completed
        }
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-auth-background">
      <div className="career-auth-container">
        <div className="career-auth-header">
          <div className="career-logo">
            <TrendingUp size={28} />
            <h1>AI Career Path Simulator</h1>
          </div>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your career journey</p>
        </div>
        <div className="career-auth-form">
          {message && (
            <div className={`career-auth-message ${message.includes("Successful") ? "success" : "error"}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="career-auth-input-group">
              <Mail className="career-auth-icon" size={20} />
              <input
                type="email"
                name="email"
                required
                className="career-auth-input"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="career-auth-input-group">
              <Lock className="career-auth-icon" size={20} />
              <input
                type="password"
                name="password"
                required
                className="career-auth-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="career-auth-button"
            >
              {loading ? (
                <div className="career-loading-spinner" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="career-auth-alternate">
            Don't have an account?{" "}
            <Link to="/signup">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;