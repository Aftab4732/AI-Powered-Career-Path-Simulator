// // Courses.jsx
// import React, { useState, useEffect } from "react";
// import { fetchUdemyCourses } from "../utils/api";
// import { useLocation } from "react-router-dom";
// import { 
//     Paper, 
//     Title, 
//     TextInput, 
//     Button, 
//     Group, 
//     Text, 
//     Loader,
//     Divider,
//     Badge
// } from '@mantine/core';
// import CourseCard from "../components/CourseCard";
// import '../styles/courses.css';

// const Courses = () => {
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const careerTitleFromURL = queryParams.get("career");

//     const [query, setQuery] = useState(
//         careerTitleFromURL || 
//         localStorage.getItem("selectedCareer") || 
//         "web development"
//     );
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [sortOption, setSortOption] = useState("popular"); // Default sort option

//     const fetchCourses = async () => {
//         setLoading(true);
//         setError(null);
//         console.log("Fetching courses for:", query);
        
//         try {
//             const data = await fetchUdemyCourses(query);
//             console.log("Fetched Courses:", data);
//             const coursesData = data.courses?.udemy || data.courses || [];
//             setCourses(Array.isArray(coursesData) ? coursesData : []);
//         } catch (error) {
//             console.error("Error fetching courses:", error);
//             setError("Failed to fetch courses. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     useEffect(() => {
//         if (careerTitleFromURL) {
//             localStorage.setItem("selectedCareer", careerTitleFromURL);
//         }
//     }, [careerTitleFromURL]);

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             fetchCourses();
//         }
//     };

//     const getSortedCourses = () => {
//         if (!courses.length) return [];
        
//         const coursesCopy = [...courses];
        
//         switch(sortOption) {
//             case "priceAsc":
//                 return coursesCopy.sort((a, b) => 
//                     (a.current_price || 0) - (b.current_price || 0)
//                 );
//             case "priceDesc":
//                 return coursesCopy.sort((a, b) => 
//                     (b.current_price || 0) - (a.current_price || 0)
//                 );
//             case "rating":
//                 return coursesCopy.sort((a, b) => 
//                     (b.rating || 0) - (a.rating || 0)
//                 );
//             case "newest":
//                 return coursesCopy.sort((a, b) => {
//                     const dateA = a.published_at ? new Date(a.published_at) : new Date(0);
//                     const dateB = b.published_at ? new Date(b.published_at) : new Date(0);
//                     return dateB - dateA;
//                 });
//             case "popular":
//             default:
//                 return coursesCopy.sort((a, b) => 
//                     (b.num_reviews || 0) - (a.num_reviews || 0)
//                 );
//         }
//     };

//     const handleClearSearch = () => {
//         setQuery("");
//     };

//     return (
//         <div className="learning-path-container">
//             <div className="learning-path-header">
//                 <Title order={1} className="learning-path-title">
//                     Recommended Courses
//                 </Title>
//                 <Badge size="lg" className="course-count-badge">
//                     {courses.length} COURSES FOUND
//                 </Badge>
//             </div>

//             <div className="roadmap-section">
//                 <div className="search-section">
//                     <Group className="search-group">
//                         <div className="search-input-wrapper">
//                             <TextInput
//                                 value={query}
//                                 onChange={(e) => setQuery(e.target.value)}
//                                 onKeyPress={handleKeyPress}
//                                 placeholder="Search for courses..."
//                                 className="search-input"
//                                 icon={<span>🔍</span>}
//                                 rightSection={
//                                     query && (
//                                         <span 
//                                             className="clear-search-btn" 
//                                             onClick={handleClearSearch}
//                                         >
//                                             ✕
//                                         </span>
//                                     )
//                                 }
//                             />
//                         </div>
//                         <Button
//                             onClick={fetchCourses}
//                             loading={loading}
//                             className="search-button"
//                         >
//                             {loading ? "Searching..." : "Search Courses"}
//                         </Button>
//                     </Group>
//                 </div>

              
//             </div>

//             <Paper className="courses-container">
//                 {error && (
//                     <div className="error-container">
//                         <Text color="red" className="error-message">
//                             ❌ {error}
//                         </Text>
//                     </div>
//                 )}

//                 {loading ? (
//                     <div className="loader-container">
//                         <Loader size="md" color="#6366f1" />
//                         <Text>Searching for the best courses...</Text>
//                     </div>
//                 ) : courses.length > 0 ? (
//                     <div className="courses-grid">
//                         {getSortedCourses().map((course, index) => (
//                             <CourseCard key={index} course={course} />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="no-courses-container">
//                         <Text className="no-courses">
//                             ⚠️ No courses found. Try searching something else.
//                         </Text>
//                     </div>
//                 )}
//             </Paper>
//         </div>
//     );
// };

// export default Courses;






// Courses.jsx
import React, { useState, useEffect } from "react";
import { fetchUdemyCourses } from "../utils/api";
import { useLocation } from "react-router-dom";
import { 
    Paper, 
    Title, 
    TextInput, 
    Button, 
    Group, 
    Text, 
    Loader,
    Divider,
    Badge,
    useMantineColorScheme
} from '@mantine/core';
import CourseCard from "../components/CourseCard";
import '../styles/courses.css';

const Courses = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const careerTitleFromURL = queryParams.get("career");
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    const [query, setQuery] = useState(
        careerTitleFromURL || 
        localStorage.getItem("selectedCareer") || 
        "web development"
    );
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState("popular"); // Default sort option

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        console.log("Fetching courses for:", query);
        
        try {
            const data = await fetchUdemyCourses(query);
            console.log("Fetched Courses:", data);
            const coursesData = data.courses?.udemy || data.courses || [];
            setCourses(Array.isArray(coursesData) ? coursesData : []);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError("Failed to fetch courses. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (careerTitleFromURL) {
            localStorage.setItem("selectedCareer", careerTitleFromURL);
        }
    }, [careerTitleFromURL]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchCourses();
        }
    };

    const getSortedCourses = () => {
        if (!courses.length) return [];
        
        const coursesCopy = [...courses];
        
        switch(sortOption) {
            case "priceAsc":
                return coursesCopy.sort((a, b) => 
                    (a.current_price || 0) - (b.current_price || 0)
                );
            case "priceDesc":
                return coursesCopy.sort((a, b) => 
                    (b.current_price || 0) - (a.current_price || 0)
                );
            case "rating":
                return coursesCopy.sort((a, b) => 
                    (b.rating || 0) - (a.rating || 0)
                );
            case "newest":
                return coursesCopy.sort((a, b) => {
                    const dateA = a.published_at ? new Date(a.published_at) : new Date(0);
                    const dateB = b.published_at ? new Date(b.published_at) : new Date(0);
                    return dateB - dateA;
                });
            case "popular":
            default:
                return coursesCopy.sort((a, b) => 
                    (b.num_reviews || 0) - (a.num_reviews || 0)
                );
        }
    };

    const handleClearSearch = () => {
        setQuery("");
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    return (
        <div className={`learning-path-container ${isDark ? 'dark-mode' : ''}`}>
            <div className="learning-path-header">
                <div className="header-content">
                    <Title order={1} className="learning-path-title">
                        Recommended Courses
                    </Title>
                    <Badge size="lg" className="course-count-badge">
                        {courses.length} COURSES FOUND
                    </Badge>
                </div>
            </div>

            <div className="search-section">
                <Paper className={`search-container ${isDark ? 'dark' : ''}`}>
                    <Group className="search-group">
                        <div className="search-input-wrapper">
                            <TextInput
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Search for courses..."
                                className="search-input"
                                icon={<span className="search-icon">🔍</span>}
                                rightSection={
                                    query && (
                                        <span 
                                            className="clear-search-btn" 
                                            onClick={handleClearSearch}
                                        >
                                            ✕
                                        </span>
                                    )
                                }
                            />
                        </div>
                        <Button
                            onClick={fetchCourses}
                            loading={loading}
                            className="search-button"
                        >
                            {loading ? "Searching..." : "Search Courses"}
                        </Button>
                    </Group>
                </Paper>
            </div>

            
                

            <Paper className={`courses-container ${isDark ? 'dark' : ''}`}>
                {error && (
                    <div className="error-container">
                        <Text color="red" className="error-message">
                            ❌ {error}
                        </Text>
                    </div>
                )}

                {loading ? (
                    <div className="loader-container">
                        <Loader size="md" color={isDark ? "#a78bfa" : "#6366f1"} />
                        <Text className="loader-text">Searching for the best courses...</Text>
                    </div>
                ) : courses.length > 0 ? (
                    <div className="courses-grid">
                        {getSortedCourses().map((course, index) => (
                            <CourseCard key={index} course={course} isDark={isDark} />
                        ))}
                    </div>
                ) : (
                    <div className="no-courses-container">
                        <Text className="no-courses">
                            ⚠️ No courses found. Try searching something else.
                        </Text>
                    </div>
                )}
            </Paper>
        </div>
    );
};

export default Courses;