import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/profile");
                if (response.data) {
                    setProfileData(response.data);
                } else {
                    navigate("/edit-profile");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                navigate("/edit-profile");
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <div className="profile-container">
            {profileData ? (
                <div>
                    <h1>{profileData.name}</h1>
                    <p><strong>Skills:</strong> {profileData.skills ? profileData.skills.join(", ") : "No skills added"}</p>
                    <p><strong>Experience:</strong> {profileData.experience}</p>
                    <p><strong>Education:</strong> {profileData.education}</p>
                    <button onClick={() => navigate("/edit-profile")} className="edit-btn">Edit Profile</button>
                </div>
            ) : (
                <div>
                    <h2>Redirecting to Profile Setup...</h2>
                </div>
            )}
        </div>
    );
};

export default Profile;

            // const fetchCareerPath = async () => {
            //   try {
            //     const response = await axios.get(`http://localhost:5000/api/career-path?email=${userEmail}`);
            //     setCareerPath(response.data);
            //   } catch (error) {
            //     console.error("Error fetching career path:", error);
            //   }
            // };
          

            // fetchCareerPath();