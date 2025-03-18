// //profile.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CareerPathTimeline from "../components/CareerPathTimeline";
// import SkillGapChart from "../components/SkillGapChart";
// import { fetchProfile } from "../utils/api";
// import { 
//   Paper, 
//   Title,
//   Text,
//   Container,
//   Group,
//   Stack,
//   Image,
//   Box,
//   Loader,
//   Progress,
//   Button,
//   Modal
// } from "@mantine/core";
// import { 
//   IconSchool, 
//   IconBriefcase,
//   IconMail,
//   IconPhone,
//   IconCalendar,
//   IconFileText,
//   IconDownload,
//   IconEye
// } from '@tabler/icons-react';
// import '../styles/profilestyle.css';

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [resumeModalOpened, setResumeModalOpened] = useState(false);
//   const [requiredSkills] = useState({
//     requiredSkills: [
//       { name: "React", level: "expert" },
//       { name: "JavaScript", level: "advanced" },
//       { name: "Node.js", level: "intermediate" }
//     ]
//   });
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("userEmail");

//   const getSkillLevelPercentage = (level) => {
//     const levels = {
//       'beginner': 20,
//       'intermediate': 40,
//       'advanced': 60,
//       'pro': 80,
//       'expert': 100
//     };
//     return levels[level] || 0;
//   };

//   // Handle resume view
//   const handleResumeView = () => {
//     if (!profileData?.resume) {
//       alert("No resume available");
//       return;
//     }

//     // If resume is a URL, open in new tab
//     if (profileData.resume.url) {
//       window.open(profileData.resume.url, '_blank');
//       return;
//     }

//     // If resume is text content, show in modal
//     if (profileData.resume.text) {
//       setResumeModalOpened(true);
//       return;
//     }

//     // If resume is a base64 PDF
//     if (profileData.resume.base64) {
//       const byteCharacters = atob(profileData.resume.base64);
//       const byteNumbers = new Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteNumbers[i] = byteCharacters.charCodeAt(i);
//       }
//       const byteArray = new Uint8Array(byteNumbers);
//       const file = new Blob([byteArray], { type: 'application/pdf' });
//       const fileURL = URL.createObjectURL(file);
//       window.open(fileURL, '_blank');
//       return;
//     }

//     alert("Resume format not supported");
//   };

//   // Handle resume download
//   const handleResumeDownload = () => {
//     if (!profileData?.resume) {
//       alert("No resume available");
//       return;
//     }

//     // If resume is a direct URL
//     if (profileData.resume.url) {
//       const link = document.createElement('a');
//       link.href = profileData.resume.url;
//       link.download = `${profileData.name}_resume`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       return;
//     }

//     // If resume is text content
//     if (profileData.resume.text) {
//       const blob = new Blob([profileData.resume.text], { type: 'text/plain' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${profileData.name}_resume.txt`;
//       document.body.appendChild(link);
//       link.click();
//       URL.revokeObjectURL(url);
//       document.body.removeChild(link);
//       return;
//     }

//     // If resume is a base64 PDF
//     if (profileData.resume.base64) {
//       const byteCharacters = atob(profileData.resume.base64);
//       const byteNumbers = new Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteNumbers[i] = byteCharacters.charCodeAt(i);
//       }
//       const byteArray = new Uint8Array(byteNumbers);
//       const file = new Blob([byteArray], { type: 'application/pdf' });
//       const fileURL = URL.createObjectURL(file);
//       const link = document.createElement('a');
//       link.href = fileURL;
//       link.download = `${profileData.name}_resume.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       URL.revokeObjectURL(fileURL);
//       document.body.removeChild(link);
//       return;
//     }

//     alert("Resume format not supported");
//   };

//   // Resume Modal Component with improved error handling
//   const ResumeModal = ({ opened, onClose, resumeData }) => (
//     <Modal
//       opened={opened}
//       onClose={onClose}
//       title="Resume Content"
//       size="xl"
//       padding="md"
//     >
//       <Paper p="md" withBorder>
//         {resumeData ? (
//           <>
//             <Text size="sm" weight={500} mb="xs">
//               Pages: {resumeData.info?.pages || 'N/A'}
//             </Text>
//             <Box className="resume-modal-content">
//               <Text>{resumeData.text || 'No text content available'}</Text>
//             </Box>
//           </>
//         ) : (
//           <Text color="red">Resume data not available</Text>
//         )}
//       </Paper>
//     </Modal>
//   );

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       if (!userEmail) {
//         navigate("/signup");
//         return;
//       }
//       try {
//         const data = await fetchProfile(userEmail);
//         if (data && data.careerPath) {
//           setProfileData(data);
//         } else {
//           navigate("/profile-form");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         navigate("/profile-form");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfileData();
//   }, [navigate, userEmail]);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <Loader size="xl" />
//       </div>
//     );
//   }

//   if (!profileData) {
//     return (
//       <div className="error-container">
//         <Text color="red" size="xl">Error loading profile</Text>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <Container size="xl">
//         {/* Profile Header */}
//         <Paper shadow="sm" p="xl" radius="md" withBorder className="profile-section">
//           <div className="profile-header">
//             {/* Profile Picture */}
//             <Box className="profile-image-container">
//               <Image
//                 src={profileData.photo}
//                 alt={profileData.name}
//                 className="profile-image"
//                 radius="md"
//               />
//             </Box>

//             {/* Profile Information */}
//             <Stack spacing="xs" className="profile-info">
//               <Title order={2} mb="md">{profileData.name}</Title>
              
//               <Group spacing="lg" className="info-group">
//                 <IconCalendar size={20} />
//                 <Text><span className="info-label">Birth Date:</span> {profileData.birthDate}</Text>
//               </Group>

//               <Group spacing="lg" className="info-group">
//                 <IconMail size={20} />
//                 <Text><span className="info-label">Email:</span> {profileData.email || userEmail}</Text>
//               </Group>

//               <Group spacing="lg" className="info-group">
//                 <IconPhone size={20} />
//                 <Text><span className="info-label">Contact:</span> {profileData.contact}</Text>
//               </Group>

//               <Group spacing="lg" className="info-group">
//                 <IconSchool size={20} />
//                 <Text><span className="info-label">Education:</span> {profileData.education}</Text>
//               </Group>

//               <Group spacing="lg" className="info-group">
//                 <IconBriefcase size={20} />
//                 <Text><span className="info-label">Experience:</span> {profileData.experience} years</Text>
//               </Group>
//               <Group spacing="lg" className="info-group">
//                 <IconBriefcase size={20} />
//                 <Text><span className="info-label">Selected Career:</span> {profileData.selectedCareer}</Text>
//               </Group>
//               <Group spacing="lg" className="info-group">
//                 <IconBriefcase size={20} />
//                 <Text><span className="info-label">Recommended Career:</span> {profileData.recommendedCareer || "Not Selected Yet"}</Text>
//               </Group>

//               {/* Resume Section */}
//               {profileData.resume && (
//       <Group spacing="lg" className="info-group">
//         <IconFileText size={20} />
//         <Text><span className="info-label">Resume:</span></Text>
//         <div className="resume-buttons">
//           <Button 
//             variant="light" 
//             size="xs"
//             leftIcon={<IconEye size={16} />}
//             onClick={handleResumeView}
//             disabled={!profileData.resume}
//           >
//             View
//           </Button>
//           <Button 
//             variant="light" 
//             size="xs"
//             leftIcon={<IconDownload size={16} />}
//             onClick={handleResumeDownload}
//             disabled={!profileData.resume}
//           >
//             Download
//           </Button>
//         </div>
//       </Group>
//               )}

//               {/* Edit Profile Button */}
//               <Button
//                 variant="filled"
//                 onClick={() => navigate("/profile-form", { state: { profileData } })}
//                 className="edit-profile-button"
//               >
//                 Edit Profile
//               </Button>
//             </Stack>
//           </div>
//         </Paper>

//         {/* Skills Section */}
//         <Paper shadow="sm" p="xl" radius="md" withBorder className="profile-section">
//           <Title order={3} mb="lg">Skills</Title>
//           <div className="skills-container">
//             {profileData.skills?.map((skill, index) => (
//               <div key={index} className="skill-item">
//                 <Text size="md">{skill.name}</Text>
//                 <Group spacing="md">
//                   <Text size="sm" color="dimmed">{skill.level}</Text>
//                   <Progress 
//                     value={getSkillLevelPercentage(skill.level)} 
//                     size="sm" 
//                     radius="xl"
//                     className="skill-progress"
//                     color={getSkillLevelPercentage(skill.level) >= 80 ? "green" : "blue"}
//                   />
//                 </Group>
//               </div>
//             ))}
//           </div>
//         </Paper>

//         {/* Career Path Timeline */}
//         <Paper shadow="sm" p="xl" radius="md" withBorder className="profile-section">
//           <Title order={3} mb="lg">Career Path Timeline</Title>
//           <CareerPathTimeline careerPath={profileData.careerPath} />
//         </Paper>

//         {/* Skill Gap Analysis */}
//         <Paper shadow="sm" p="xl" radius="md" withBorder>
//           <Title order={3} mb="lg">Skill Gap Analysis</Title>
//           <SkillGapChart 
//             userSkills={profileData.skills}
//             requiredSkills={requiredSkills.requiredSkills}
//           />
//         </Paper>
//       </Container>

//       {/* Resume Modal */}
//       <ResumeModal
//         opened={resumeModalOpened}
//         onClose={() => setResumeModalOpened(false)}
//         resumeData={profileData.resume}
//       />
//     </div>
//   );
// };

// export default Profile;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CareerPathTimeline from "../components/CareerPathTimeline";
import SkillGapChart from "../components/SkillGapChart";
import { fetchProfile } from "../utils/api";
import { 
  Paper, 
  Title,
  Text,
  Container,
  Group,
  Stack,
  Image,
  Box,
  Loader,
  Progress,
  Button,
  Modal,
  Divider,
  Tabs
} from "@mantine/core";
import { 
  IconSchool, 
  IconBriefcase,
  IconMail,
  IconPhone,
  IconCalendar,
  IconFileText,
  IconDownload,
  IconEye,
  IconUser,
  IconChartBar,
  IconTrendingUp,
  IconHome
} from '@tabler/icons-react';
import '../styles/profilestyle.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeModalOpened, setResumeModalOpened] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [requiredSkills] = useState({
    requiredSkills: [
      { name: "React", level: "expert" },
      { name: "JavaScript", level: "advanced" },
      { name: "Node.js", level: "intermediate" }
    ]
  });
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const getSkillLevelPercentage = (level) => {
    const levels = {
      'beginner': 20,
      'intermediate': 40,
      'advanced': 60,
      'pro': 80,
      'expert': 100
    };
    return levels[level] || 0;
  };

  // Handle resume view
  const handleResumeView = () => {
    if (!profileData?.resume) {
      alert("No resume available");
      return;
    }

    // If resume is a URL, open in new tab
    if (profileData.resume.url) {
      window.open(profileData.resume.url, '_blank');
      return;
    }

    // If resume is text content, show in modal
    if (profileData.resume.text) {
      setResumeModalOpened(true);
      return;
    }

    // If resume is a base64 PDF
    if (profileData.resume.base64) {
      const byteCharacters = atob(profileData.resume.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
      return;
    }

    alert("Resume format not supported");
  };

  // Handle resume download
  const handleResumeDownload = () => {
    if (!profileData?.resume) {
      alert("No resume available");
      return;
    }

    // If resume is a direct URL
    if (profileData.resume.url) {
      const link = document.createElement('a');
      link.href = profileData.resume.url;
      link.download = `${profileData.name}_resume`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // If resume is text content
    if (profileData.resume.text) {
      const blob = new Blob([profileData.resume.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${profileData.name}_resume.txt`;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      return;
    }

    // If resume is a base64 PDF
    if (profileData.resume.base64) {
      const byteCharacters = atob(profileData.resume.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `${profileData.name}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(fileURL);
      document.body.removeChild(link);
      return;
    }

    alert("Resume format not supported");
  };

  // Resume Modal Component with improved error handling
  const ResumeModal = ({ opened, onClose, resumeData }) => (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Resume Content"
      size="xl"
      padding="md"
    >
      <Paper p="md" withBorder>
        {resumeData ? (
          <>
            <Text size="sm" weight={500} mb="xs">
              Pages: {resumeData.info?.pages || 'N/A'}
            </Text>
            <Box className="resume-modal-content">
              <Text>{resumeData.text || 'No text content available'}</Text>
            </Box>
          </>
        ) : (
          <Text color="red">Resume data not available</Text>
        )}
      </Paper>
    </Modal>
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userEmail) {
        navigate("/signup");
        return;
      }
      try {
        const data = await fetchProfile(userEmail);
        if (data && data.careerPath) {
          setProfileData(data);
        } else {
          navigate("/profile-form");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/profile-form");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [navigate, userEmail]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loader size="xl" color="indigo" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="error-container">
        <Text color="red" size="xl">Error loading profile</Text>
      </div>
    );
  }



  return (
    <div className="profile-container">
      {/* Left Sidebar */}
      <Container size="xl" className="main-content">
        {/* Header Banner */}
        <div className="profile-header-banner">
          <Title order={1} className="mb-1">{profileData.name}</Title>
          <Text size="lg">{profileData.selectedCareer}</Text>
        </div>

        {/* Profile Header */}
        <Paper shadow="sm" p="xl" radius="md" withBorder className="profile-section mt-6">
          <div className="profile-header">
            {/* Profile Picture */}
            <Box className="profile-image-container">
              <Image
                src={profileData.photo}
                alt={profileData.name}
                radius="md"
                className="profile-image"
              />
            </Box>

            {/* Profile Information */}
            <Stack spacing="xs" className="profile-info">
              <Group spacing="lg" className="info-group">
                <IconCalendar size={20} className="info-icon" />
                <Text><span className="info-label">Birth Date:</span> {profileData.birthDate}</Text>
              </Group>

              <Group spacing="lg" className="info-group">
                <IconMail size={20} className="info-icon" />
                <Text><span className="info-label">Email:</span> {profileData.email || userEmail}</Text>
              </Group>

              <Group spacing="lg" className="info-group">
                <IconPhone size={20} className="info-icon" />
                <Text><span className="info-label">Contact:</span> {profileData.contact}</Text>
              </Group>

              <Group spacing="lg" className="info-group">
                <IconSchool size={20} className="info-icon" />
                <Text><span className="info-label">Education:</span> {profileData.education}</Text>
              </Group>

              <Group spacing="lg" className="info-group">
                <IconBriefcase size={20} className="info-icon" />
                <Text><span className="info-label">Experience:</span> {profileData.experience} years</Text>
              </Group>
              <Group spacing="lg" className="info-group">
                <IconBriefcase size={20} className="info-icon" />
                <Text><span className="info-label">Selected Career:</span> {profileData.selectedCareer}</Text>
              </Group>
              <Group spacing="lg" className="info-group">
                <IconBriefcase size={20} className="info-icon" />
                <Text><span className="info-label">Recommended Career:</span> {profileData.recommendedCareer || "Not Selected Yet"}</Text>
              </Group>

              {/* Resume Section */}
              {profileData.resume && (
                <Group spacing="lg" className="info-group">
                  <IconFileText size={20} className="info-icon" />
                  <Text><span className="info-label">Resume:</span></Text>
                  <div className="resume-buttons">
                    <Button 
                      variant="light" 
                      size="xs"
                      leftIcon={<IconEye size={16} />}
                      onClick={handleResumeView}
                      disabled={!profileData.resume}
                      className="button-view"
                    >
                      View
                    </Button>
                    <Button 
                      variant="light" 
                      size="xs"
                      leftIcon={<IconDownload size={16} />}
                      onClick={handleResumeDownload}
                      disabled={!profileData.resume}
                      className="button-download"
                    >
                      Download
                    </Button>
                  </div>
                </Group>
              )}

              {/* Edit Profile Button */}
              <Button
                variant="filled"
                onClick={() => navigate("/profile-form", { state: { profileData } })}
                className="edit-profile-button"
              >
                Edit Profile
              </Button>
            </Stack>
          </div>
        </Paper>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <div 
            className={`tab-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </div>
          <div 
            className={`tab-item ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => setActiveTab("skills")}
          >
            Skills
          </div>
          <div 
            className={`tab-item ${activeTab === "career" ? "active" : ""}`}
            onClick={() => setActiveTab("career")}
          >
            Career Path
          </div>
          <div 
            className={`tab-item ${activeTab === "gap" ? "active" : ""}`}
            onClick={() => setActiveTab("gap")}
          >
            Skill Gap
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Skills Section */}
          {(activeTab === "overview" || activeTab === "skills") && (
            <Paper shadow="sm" p="xl" radius="md" withBorder className="profile-section">
              <div className="section-header">
                <div className="section-icon">
                  <IconChartBar size={20} />
                </div>
                <Title order={3}>Skills</Title>
              </div>
              <Divider className="mb-4" />
              <div className="skills-container">
                {profileData.skills?.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-name">
                      <Text size="md">{skill.name}</Text>
                    </div>
                    <div className="skill-level-container">
                      <Text size="sm" className="skill-level-text">{skill.level}</Text>
                      <Progress 
                        value={getSkillLevelPercentage(skill.level)} 
                        size="md" 
                        radius="xl"
                        className="skill-progress"
                        color={getSkillLevelPercentage(skill.level) >= 80 ? "green" : "blue"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Paper>
          )}

          {/* Career Path Timeline */}
          {(activeTab === "overview" || activeTab === "career") && (
            <Paper shadow="sm" p="xl" radius="md" withBorder className="profile-section">
              <div className="section-header">
                <div className="section-icon">
                  <IconTrendingUp size={20} />
                </div>
                <Title order={3}>Career Path Timeline</Title>
              </div>
              <Divider className="mb-4" />
              <div className="timeline">
                <CareerPathTimeline careerPath={profileData.careerPath} />
              </div>
            </Paper>
          )}

          {/* Skill Gap Analysis */}
          {(activeTab === "overview" || activeTab === "gap") && (
            <Paper shadow="sm" p="xl" radius="md" withBorder className="profile-section">
              <div className="section-header">
                <div className="section-icon">
                  <IconChartBar size={20} />
                </div>
                <Title order={3}>Skill Gap Analysis</Title>
              </div>
              <Divider className="mb-4" />
              <div className="skill-gap-container">
                <SkillGapChart 
                  userSkills={profileData.skills}
                  requiredSkills={requiredSkills.requiredSkills}
                />
              </div>
            </Paper>
          )}
        </div>
      </Container>

      {/* Resume Modal */}
      <ResumeModal
        opened={resumeModalOpened}
        onClose={() => setResumeModalOpened(false)}
        resumeData={profileData.resume}
      />
    </div>
  );
};

export default Profile;