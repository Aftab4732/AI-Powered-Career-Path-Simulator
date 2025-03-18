//CallToActionSection.jsx
import { Link,useNavigate } from "react-router-dom";

const CallToActionSection = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const hasProfile = !!localStorage.getItem("profileCompleted");

  const handleButtonClick = () => {
    if (isAuthenticated && hasProfile) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="text-center py-16 text-white" style={{ 
      background: "linear-gradient(90deg, #6b21a8, #3b82f6)" 
    }}>
      <h2 className="text-4xl font-bold mb-4 font-poppins">Ready to Discover Your Career Path?</h2>
      <p className="text-lg mb-6">Join thousands of users who found their ideal careers with AI-powered insights.</p>
      <Link 
         onClick={handleButtonClick}
        className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition-all"
      >
        Start Now
      </Link>
    </div>
  );
};

export default CallToActionSection;




