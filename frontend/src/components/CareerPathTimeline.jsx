// CareerPathTimeline.jsx
const CareerPathTimeline = ({ careerPath }) => {
    console.log("Rendering Career Path:", careerPath);

    if (!careerPath || !careerPath.currentStage || !careerPath.timeline) {
        return <p className="text-gray-500">No career path available.</p>;
    }

    // Extract just the skill names for display
    const skillNames = careerPath.skills?.map(skill => 
        typeof skill === 'object' ? skill.name : skill
    ).join(", ");

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Career Path Progress</h2>
            <ul className="border-l-4 border-blue-500 pl-4">
                {careerPath.timeline.map((stage, index) => (
                    <li key={index} className={`mb-2 ${stage.achieved ? "text-green-600" : "text-gray-500"}`}>
                        <strong>{stage.stage}</strong> ({stage.minExperience} - {stage.maxExperience} years)
                    </li>
                ))}
                <li className="mb-2">
                    <strong>Current Stage:</strong> {careerPath.currentStage}
                </li>
                <li className="mb-2">
                    <strong>Next Stage:</strong> {careerPath.nextStage}
                </li>
                <li className="mb-2">
                    <strong>Key Skills:</strong> {skillNames}
                </li>
                <li className="mb-2">
                    <strong>Education Level:</strong> {careerPath.education}
                </li>
            </ul>
        </div>
    );
};

export default CareerPathTimeline;