// const generateCareerPath = (userProfile) => {
//     const { experience, skills, education } = userProfile;

//     // Define career stages
//     const stages = [
//         { level: "Beginner", minExperience: 0, maxExperience: 1 },
//         { level: "Junior", minExperience: 1, maxExperience: 3 },
//         { level: "Mid-Level", minExperience: 3, maxExperience: 6 },
//         { level: "Senior", minExperience: 6, maxExperience: 10 },
//         { level: "Expert", minExperience: 10, maxExperience: 100 }
//     ];

//     // Determine user's current career stage
//     const currentStageIndex = stages.findIndex(stage => experience >= stage.minExperience && experience < stage.maxExperience);
//     const currentStage = stages[currentStageIndex];

//     // Generate a full career path timeline
//     const timeline = stages.map((stage, index) => ({
//         stage: stage.level,
//         minExperience: stage.minExperience,
//         maxExperience: stage.maxExperience,
//         achieved: index <= currentStageIndex // Mark achieved stages
//     }));

//     // Return structured career path data
//     return {
//         currentStage: currentStage.level,
//         nextStage: stages[currentStageIndex + 1]?.level || "Top Level",
//         skills,
//         education,
//         timeline
//     };
// };

// module.exports = { generateCareerPath };







// const generateCareerPath = (userProfile) => {
//     const { experience, skills, education } = userProfile;

//     // Define career stages
//     const stages = [
//         { level: "Beginner", minExperience: 0, maxExperience: 1 },
//         { level: "Junior", minExperience: 1, maxExperience: 3 },
//         { level: "Mid-Level", minExperience: 3, maxExperience: 6 },
//         { level: "Senior", minExperience: 6, maxExperience: 10 },
//         { level: "Expert", minExperience: 10, maxExperience: 100 }
//     ];

//     // Determine user's current career stage
//     const currentStage = stages.find(stage => experience >= stage.minExperience && experience < stage.maxExperience) || stages[0];

//     // Construct career path timeline with achieved status
//     // const careerTimeline = stages.map(stage => ({
//     //     stage: stage.level,
//     //     minExperience: stage.minExperience,
//     //     maxExperience: stage.maxExperience,
//     //     achieved: experience >= stage.minExperience
//     // }));

//     // return {
//     //     currentStage: currentStage.level,
//     //     nextStage: stages[stages.indexOf(currentStage) + 1]?.level || "Top Level",
//     //     skills: skills,
//     //     education: education,
//     //     timeline: careerTimeline // Include this
//     // };
//     async function generateCareerSkills(selectedCareer) {
//         // Simulated AI-based skill suggestion (Replace this with Gemini API call if needed)
//         const careerSkills = {
//             "Software Engineer": ["JavaScript", "React", "Node.js", "SQL"],
//             "Data Scientist": ["Python", "Machine Learning", "Data Analysis"],
//             "Cybersecurity Analyst": ["Network Security", "Ethical Hacking", "Cryptography"]
//         };
    
//         return careerSkills[selectedCareer] || ["General Problem-Solving", "Communication"];
//     }
    

    
//     const careerTimeline = {
//         currentStage: currentStage.level,
//         nextStage: stages[stages.indexOf(currentStage) + 1]?.level || "Top Level",
//         skills: skills.length ? skills : ["Not specified"],
//         education: education,
//         timeline: stages.map(stage => ({
//             stage: stage.level,
//             minExperience: stage.minExperience,
//             maxExperience: stage.maxExperience,
//             achieved: experience >= stage.minExperience
//         }))
//     };

//     console.log("Generated Career Timeline:", careerTimeline);

//     return careerTimeline;
// };


// module.exports = { generateCareerPath };





// Function to generate career skills dynamically (Placeholder, replace with AI API call)
async function generateCareerSkills(selectedCareer) {
    const careerSkills = {
        "Software Engineer": ["JavaScript", "React", "Node.js", "SQL"],
        "Data Scientist": ["Python", "Machine Learning", "Data Analysis"],
        "Cybersecurity Analyst": ["Network Security", "Ethical Hacking", "Cryptography"]
    };

    return careerSkills[selectedCareer] || ["General Problem-Solving", "Communication"];
}

// Function to generate career path
const generateCareerPath = (userProfile) => {
    const { experience, skills, education } = userProfile;

    const stages = [
        { level: "Beginner", minExperience: 0, maxExperience: 1 },
        { level: "Junior", minExperience: 1, maxExperience: 3 },
        { level: "Mid-Level", minExperience: 3, maxExperience: 6 },
        { level: "Senior", minExperience: 6, maxExperience: 10 },
        { level: "Expert", minExperience: 10, maxExperience: 15 }
    ];

    const currentStage = stages.find(stage => experience >= stage.minExperience && experience < stage.maxExperience) || stages[0];

    return {
        currentStage: currentStage.level,
        nextStage: stages[stages.indexOf(currentStage) + 1]?.level || "Top Level",
        skills: skills.length ? skills : ["Not specified"],
        education: education,
        timeline: stages.map(stage => ({
            stage: stage.level,
            minExperience: stage.minExperience,
            maxExperience: stage.maxExperience,
            achieved: experience >= stage.minExperience
        }))
    };
};

// ✅ Export both functions
module.exports = {
    generateCareerPath,
    generateCareerSkills
};
