// //Signup.jsx

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Mail, Lock } from "lucide-react";
// import axios from "../utils/api";
// import styles from "../styles/Signup.module.css"; // Import the CSS module

// const SignUp = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
//       const res = await axios.post("/auth/signup", formData);

//       // Save token, email, and profile completion status to localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userEmail", res.data.user.email);
//       localStorage.setItem("userId", res.data.user.id);
//       localStorage.setItem("profileCompleted", false); // New users don't have a profile yet

//       setMessage("Sign-Up Successful! Redirecting...");
//       setTimeout(() => {
//         navigate("/profile-form"); // Redirect to profile form after signup
//       }, 1500);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h2 className={styles.title}>Create your account</h2>
//         <p className={styles.subtitle}>Join us and start building your career path</p>
//         {message && (
//           <div
//             className={`${styles.message} ${
//               message.includes("Successful") ? styles.success : styles.error
//             }`}
//           >
//             {message}
//           </div>
//         )}
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className={styles.inputGroup}>
//             <User className={styles.icon} size={20} />
//             <input
//               type="text"
//               name="name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Full Name"
//             />
//           </div>
//           <div className={styles.inputGroup}>
//             <Mail className={styles.icon} size={20} />
//             <input
//               type="email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Email address"
//             />
//           </div>
//           <div className={styles.inputGroup}>
//             <Lock className={styles.icon} size={20} />
//             <input
//               type="password"
//               name="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Password"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={styles.button}
//           >
//             {loading ? (
//               <div className={styles.spinner}></div>
//             ) : (
//               "Sign up"
//             )}
//           </button>
//         </form>
//         <p className={styles.loginLink}>
//           Already have an account?{" "}
//           <a href="/login" className={styles.link}>
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;




// Signup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Cpu } from "lucide-react";
import axios from "../utils/api";
import styles from "../styles/Signup.module.css";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      const res = await axios.post("/auth/signup", formData);

      // Save token, email, and profile completion status to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("profileCompleted", false); // New users don't have a profile yet

      setMessage("Sign-Up Successful! Redirecting...");
      setTimeout(() => {
        navigate("/profile-form"); // Redirect to profile form after signup
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Area with Gradient Background */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>AI Career Path Simulator</h1>
        <Cpu className={styles.headerIcon} size={32} />
      </div>
      
      <div className={styles.card}>
        <h2 className={styles.title}>Create your account</h2>
        <p className={styles.subtitle}>Start simulating your future career path today</p>
        
        {message && (
          <div
            className={`${styles.message} ${
              message.includes("Successful") ? styles.success : styles.error
            }`}
          >
            {message}
          </div>
        )}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <User className={styles.icon} size={20} />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Full Name"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <Mail className={styles.icon} size={20} />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Email address"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <Lock className={styles.icon} size={20} />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? (
              <div className={styles.spinner}></div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        
        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>🤖</div>
            <div className={styles.featureText}>AI-powered career path recommendations</div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>📊</div>
            <div className={styles.featureText}>Salary projection based on skills</div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>🎓</div>
            <div className={styles.featureText}>Personalized learning roadmaps</div>
          </div>
        </div>
        
        <p className={styles.loginLink}>
          Already have an account?{" "}
          <a href="/login" className={styles.link}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;