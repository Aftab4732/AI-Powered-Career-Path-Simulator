// // SkillGapChart.jsx
// import React from "react";
// import { Radar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// const SkillGapChart = ({ userSkills = [], requiredSkills = [] }) => {
//   const getSkillLevel = (level) => {
//     const levels = {
//       'beginner': 1,
//       'intermediate': 2,
//       'advanced': 3,
//       'pro': 4,
//       'expert': 5
//     };
//     return levels[level.toLowerCase()] || 0;
//   };

//   if (!userSkills.length || !requiredSkills.length) {
//     return (
//       <div className="text-center text-gray-500 p-4">
//         <p>Loading skill data...</p>
//       </div>
//     );
//   }

//   // Create skill maps with levels
//   const userSkillMap = Object.fromEntries(
//     userSkills.map(skill => [skill.name.toLowerCase(), getSkillLevel(skill.level)])
//   );
  
//   const requiredSkillMap = Object.fromEntries(
//     requiredSkills.map(skill => [skill.name.toLowerCase(), getSkillLevel(skill.level)])
//   );

//   const allSkills = Array.from(
//     new Set([
//       ...userSkills.map(s => s.name.toLowerCase()),
//       ...requiredSkills.map(s => s.name.toLowerCase())
//     ])
//   );

//   const userSkillLevels = allSkills.map(skill => userSkillMap[skill] || 0);
//   const requiredSkillLevels = allSkills.map(skill => requiredSkillMap[skill] || 0);

//   const data = {
//     labels: allSkills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1)),
//     datasets: [
//       {
//         label: "Your Skills",
//         data: userSkillLevels,
//         backgroundColor: "rgba(54, 162, 235, 0.3)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 2,
//         pointRadius: 4,
//       },
//       {
//         label: "Required Skills",
//         data: requiredSkillLevels,
//         backgroundColor: "rgba(255, 99, 132, 0.3)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 2,
//         pointRadius: 4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       r: {
//         beginAtZero: true,
//         max: 5,
//         min: 0,
//         ticks: {
//           stepSize: 1
//         },
//         grid: {
//           color: "rgba(200, 200, 200, 0.3)",
//         },
//         angleLines: {
//           color: "rgba(200, 200, 200, 0.3)",
//         },
//         pointLabels: {
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           font: {
//             size: 12,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
//       <h2 className="text-lg font-bold mb-4 text-center">Skill Gap Analysis</h2>
//       <div className="relative" style={{ height: "400px" }}>
//         <Radar data={data} options={options} />
//       </div>
//     </div>
//   );
// };
// export default SkillGapChart;








import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SkillGapChart = ({ userSkills = [], requiredSkills = [] }) => {
  // Helper function to map skill levels
  const getSkillLevel = (level) => {
    const levels = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      pro: 4,
      expert: 5,
    };
    return levels[level?.toLowerCase?.() || ""] || 0; // Safely handle undefined levels
  };

  // Handle empty or invalid data
  if (!Array.isArray(userSkills) || !Array.isArray(requiredSkills)) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>Invalid skill data provided.</p>
      </div>
    );
  }

  if (!userSkills.length || !requiredSkills.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>Loading skill data...</p>
      </div>
    );
  }

  // Create skill maps with levels
  const userSkillMap = Object.fromEntries(
    userSkills
      .filter(skill => skill && typeof skill.name === "string" && typeof skill.level === "string") // Validate skills
      .map(skill => [skill.name.toLowerCase(), getSkillLevel(skill.level)])
  );

  const requiredSkillMap = Object.fromEntries(
    requiredSkills
      .filter(skill => skill && typeof skill.name === "string" && typeof skill.level === "string") // Validate skills
      .map(skill => [skill.name.toLowerCase(), getSkillLevel(skill.level)])
  );

  // Combine all unique skills
  const allSkills = Array.from(
    new Set([
      ...userSkills.map(s => s.name?.toLowerCase?.()), // Safely handle undefined names
      ...requiredSkills.map(s => s.name?.toLowerCase?.()),
    ])
  ).filter(skill => skill); // Remove any undefined or null values

  // Map skill levels
  const userSkillLevels = allSkills.map(skill => userSkillMap[skill] || 0);
  const requiredSkillLevels = allSkills.map(skill => requiredSkillMap[skill] || 0);

  // Chart data
  const data = {
    labels: allSkills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1)),
    datasets: [
      {
        label: "Your Skills",
        data: userSkillLevels,
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Required Skills",
        data: requiredSkillLevels,
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        min: 0,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        angleLines: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Skill Gap Analysis</h2>
      <div className="relative" style={{ height: "400px" }}>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default SkillGapChart;