//ProfileForm.jsx
import React, { useState, useEffect } from "react";
import axios from "../utils/api";
import { fetchProfile } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import SkillRatingForm from "./SkillRatingForm"
import { 
  TextInput,
  Select,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Group,
  FileInput,
  Container,
  Loader,
  Grid,
  Avatar,
  Divider,
  Box
} from "@mantine/core";
import { IconUpload, IconUser, IconFileUpload, IconChevronDown  } from '@tabler/icons-react';
import "../styles/profileform.css"
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    skills: [], // Changed to array for skill objects
    experience: "",
    education: "",
    contact: "",
    birthDate: "",
    photo: null,
    resume: null,
    recommendedCareer: "",
    selectedCareer: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userEmail || !token) {
        navigate("/signup");
        return;
      }
      try {
        const data = await fetchProfile(userEmail);
        if (data) {
          // Convert string skills to skill objects if needed
          const skills = Array.isArray(data.skills) 
            ? data.skills 
            : data.skills.split(',').map(skill => ({
                name: skill.trim(),
                level: 'beginner'
              }));

          setFormData({
            name: data.name,
            skills,
            experience: data.experience || "",
            education: data.education || "",
            contact: data.contact || "",
            birthDate: data.birthDate || "",
            photo: data.photo || null,
            resume: data.resume || null,
            recommendedCareer: data.recommendedCareer || "",
            selectedCareer: data.selectedCareer || data.recommendedCareer || ""
          });
        }
      } catch (error) {
        setMessage("Error loading profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [userEmail, navigate, token, location.state]);


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (updatedSkills) => {
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      setMessage("User email not found. Please log in again.");
      navigate("/signup");
      return;
    }
  
    const dataToSend = new FormData();
    dataToSend.append("email", userEmail);
    dataToSend.append("name", formData.name.trim());
    dataToSend.append("skills", JSON.stringify(formData.skills)); // Send skills as JSON string
    dataToSend.append("experience", formData.experience);
    dataToSend.append("education", formData.education);
    dataToSend.append("contact", formData.contact);
    dataToSend.append("birthDate", formData.birthDate);
    dataToSend.append("selectedCareer", formData.selectedCareer);
    dataToSend.append("recommendedCareer", formData.recommendedCareer || "");
  
    if (formData.photo instanceof File) {
      if (formData.photo.size > 5 * 1024 * 1024) {
        setMessage("Photo must be less than 5MB");
        return;
      }
      if (!formData.photo.type.startsWith('image/')) {
        setMessage("Please upload a valid image file");
        return;
      }
      dataToSend.append("photo", formData.photo);
    }
  
    if (formData.resume instanceof File) {
      if (formData.resume.size > 5 * 1024 * 1024) {
        setMessage("Resume must be less than 5MB");
        return;
      }
      if (formData.resume.type !== 'application/pdf') {
        setMessage("Please upload a PDF file for resume");
        return;
      }
      dataToSend.append("resume", formData.resume);
    }
  
    try {
      setMessage("Uploading profile data...");
      
      const response = await axios.post("/profile/create", dataToSend, { 
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setMessage(`Uploading: ${percentCompleted}%`);
        }
      });
  
      if (response.status === 200 || response.status === 201) {
        setMessage("Profile updated successfully!");
        if (response.data.profile) {
          setFormData(prevData => ({
            ...prevData,
            ...response.data.profile,
            photo: null,
            resume: null
          }));
        }
        setTimeout(() => navigate("/profile"), 1000);
      }
    } catch (error) {
      console.error("Server error:", error.response?.data || error.message);
      setMessage(error.response?.data?.error || "Server error. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <Loader size="xl" />
      </Container>
    );
  }

  const careerOptions = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Full-Stack Developer", label: "Full-Stack Developer" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "Data Engineer", label: "Data Engineer" },
    { value: "Machine Learning Engineer", label: "Machine Learning Engineer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "Cloud Solutions Architect", label: "Cloud Solutions Architect" },
    { value: "Cybersecurity Analyst", label: "Cybersecurity Analyst" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Quality Assurance Engineer", label: "Quality Assurance Engineer" },
    { value: "Mobile App Developer", label: "Mobile App Developer" },
    { value: "Blockchain Developer", label: "Blockchain Developer" },
    { value: "Other", label: "Other (Please Specify)" },
  ];


  return (
    <Container size="xl" className="py-8">
      <Paper shadow="sm" p="xl" radius="lg" withBorder className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Group position="apart" className="mb-6">
            <div>
              <Title order={2} className="text-2xl font-semibold text-gray-800">Profile Settings</Title>
              <Text color="dimmed" size="sm">Manage your profile information</Text>
            </div>
            {message && (
              <Text 
                className={`px-4 py-2 rounded-md ${
                  message.includes("successfully") 
                    ? "bg-green-50 text-green-700" 
                    : message.includes("Uploading") 
                      ? "bg-blue-50 text-blue-700" 
                      : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </Text>
            )}
          </Group>
          
          <Grid className="items-start">
            <Grid.Col span={3}>
              <div className="text-center">
                <Avatar 
                  size={120} 
                  radius="xl" 
                  src={formData.photo instanceof File ? URL.createObjectURL(formData.photo) : formData.photo}
                  className="mx-auto mb-4"
                >
                  <IconUser size={80} />
                </Avatar>
                <FileInput
                  placeholder="Change photo"
                  size="xs"
                  accept="image/*"
                  icon={<IconUpload size={14} />}
                  onChange={(file) => handleFileChange({ target: { name: 'photo', files: [file] } })}
                />
              </div>

              <Box className="mt-6 p-4 border rounded-lg bg-gray-50">
                <Text size="sm" weight={500} className="mb-3">Documents</Text>
                <FileInput
                  label="Resume/CV"
                  placeholder="Upload PDF"
                  accept="application/pdf"
                  icon={<IconFileUpload size={14} />}
                  className="mb-2"
                  onChange={(file) => handleFileChange({ target: { name: 'resume', files: [file] } })}
                  styles={{
                    input: {
                      border: '1px solid #e2e8f0',
                      '&:hover': {
                        borderColor: '#cbd5e1'
                      }
                    }
                  }}
                />
                <Text size="xs" color="dimmed">Max size: 5MB, PDF only</Text>
              </Box>
            </Grid.Col>

            <Grid.Col span={9}>
              <form onSubmit={handleSubmit}>
                <Stack spacing="lg">
                  <Grid>
                    <Grid.Col span={6}>
                      <TextInput
                        required
                        label="First Name"
                        name="name"
                        value={formData.name.split(' ')[0] || ''}
                        onChange={(e) => {
                          const lastName = formData.name.split(' ').slice(1).join(' ');
                          handleChange({
                            target: {
                              name: 'name',
                              value: `${e.target.value} ${lastName}`.trim()
                            }
                          });
                        }}
                        placeholder="Enter first name"
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        required
                        label="Last Name"
                        value={formData.name.split(' ').slice(1).join(' ') || ''}
                        onChange={(e) => {
                          const firstName = formData.name.split(' ')[0];
                          handleChange({
                            target: {
                              name: 'name',
                              value: `${firstName} ${e.target.value}`.trim()
                            }
                          });
                        }}
                        placeholder="Enter last name"
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Email"
                        value={userEmail || ''}
                        disabled
                        icon={<span className="text-green-500">✓</span>}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        required
                        label="Education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="Your highest education"
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                    <TextInput
              type="date"
              label="Birth Date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
                    </Grid.Col>
                  </Grid>

                  <Divider label="Additional Information" labelPosition="center" />

                  <Grid>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Phone"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        required
                        label="Experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Years of experience"
                      />
                    </Grid.Col>
                  </Grid>

                  <div className="skills-section">
                    <Text weight={500} size="sm" className="mb-2">Skills</Text>
                    <SkillRatingForm 
                      value={formData.skills}
                      onChange={handleSkillsChange}
                    />
                  </div>

                  <div className="career-section relative">
          <Paper p="lg" radius="md" className="bg-gray-50 border">
            <Text weight={500} size="sm" className="mb-4">Career Information</Text>
            
            <div className="mb-6 p-4 bg-white rounded-md border">
              <Text size="sm" weight={500} className="text-gray-700">Recommended Career Path:</Text>
              <Text className="mt-2 p-3 bg-gray-50 rounded-md">
                {formData.recommendedCareer || "Not available yet"}
              </Text>
            </div>

            <div className="relative z-50"> {/* Added z-index wrapper */}
              <Select
                required
                label="Selected Career Path"
                name="selectedCareer"
                value={formData.selectedCareer}
                onChange={(value) => {
                  if (value === "Other") {
                    setFormData((prevData) => ({
                      ...prevData,
                      selectedCareer: "",
                    }));
                  } else {
                    handleChange({ target: { name: "selectedCareer", value } });
                  }
                }}
                data={careerOptions}
                searchable
                clearable
                dropdownPosition="bottom"
                withinPortal={false}
                styles={{
                  root: {
                    position: 'relative',
                    zIndex: 50
                  },
                  input: {
                    minHeight: '42px',
                    border: '1px solid #e2e8f0',
                    '&:focus': {
                      borderColor: '#3b82f6'
                    }
                  },
                  dropdown: {
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    marginTop: '4px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000
                  },
                  item: {
                    padding: '8px 12px',
                    '&:hover': {
                      backgroundColor: '#f8fafc'
                    }
                  }
                }}
              />
            </div>

            {formData.selectedCareer === "Other" && (
              <TextInput
                required
                label="Please specify your career choice"
                name="selectedCareer"
                value={formData.selectedCareer}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "selectedCareer",
                      value: e.target.value,
                    },
                  })
                }
                          placeholder="Enter your career choice"
                          className="mt-4"
                          styles={{
                            input: {
                              height: '48px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '8px',
                              '&:focus': {
                                borderColor: '#3b82f6',
                                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                              }
                            }
                          }}
                        />
                      )}
                    </Paper>
                  </div>

                  <Group position="right" mt="xl">
                    <Button 
                      variant="default" 
                      onClick={() => navigate("/profile")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Changes
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Grid.Col>
          </Grid>
        </div>
      </Paper>
    </Container>

  );
};

export default ProfileForm;