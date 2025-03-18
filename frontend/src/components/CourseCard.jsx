// // components/CourseCard.jsx
// import React from 'react';
// import '../styles/CourseCard.css';

// const CourseCard = ({ course }) => {
//     // Function to sanitize HTML tags from text
//     const sanitizeText = (text) => {
//         if (!text) return '';
//         // Create a temporary div element
//         const tempDiv = document.createElement('div');
//         // Set the HTML content
//         tempDiv.innerHTML = text;
//         // Return the text content (without HTML tags)
//         return tempDiv.textContent || tempDiv.innerText || '';
//     };

//     // Sanitize title and description
//     const sanitizedTitle = sanitizeText(course.title);
//     const sanitizedDescription = course.description ? sanitizeText(course.description) : '';

//     // Format price text
//     const formatPrice = (priceText) => {
//         if (!priceText) return 'Price not available';
//         return sanitizeText(priceText);
//     };

//     return (
//         <div className="course-card">
//             <div className="course-card-content">
//                 <h3 className="course-title">{sanitizedTitle}</h3>
                
//                 {course.price && (
//                     <div className="course-price">
//                         {formatPrice(course.price)}
//                     </div>
//                 )}
                
//                 {sanitizedDescription && (
//                     <p className="course-description">{sanitizedDescription}</p>
//                 )}
                
//                 <a 
//                     href={course.link} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="course-link"
//                 >
//                     View Course
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default CourseCard;




// components/CourseCard.jsx
import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ course, isDark }) => {
    // Function to sanitize HTML tags from text
    const sanitizeText = (text) => {
        if (!text) return '';
        // Create a temporary div element
        const tempDiv = document.createElement('div');
        // Set the HTML content
        tempDiv.innerHTML = text;
        // Return the text content (without HTML tags)
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    // Sanitize title and description
    const sanitizedTitle = sanitizeText(course.title);
    const sanitizedDescription = course.description ? sanitizeText(course.description) : '';

    // Format price text
    const formatPrice = (priceText) => {
        if (!priceText) return 'Price not available';
        return sanitizeText(priceText);
    };

    return (
        <div className={`course-card ${isDark ? 'dark' : ''}`}>
            <div className="course-card-content">
                <h3 className="course-title">{sanitizedTitle}</h3>
                
                {course.price && (
                    <div className="course-price">
                        {formatPrice(course.price)}
                    </div>
                )}
                
                {sanitizedDescription && (
                    <p className="course-description">{sanitizedDescription}</p>
                )}
                
                <a 
                    href={course.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="course-link"
                >
                    View Course
                </a>
            </div>
        </div>
    );
};

export default CourseCard;