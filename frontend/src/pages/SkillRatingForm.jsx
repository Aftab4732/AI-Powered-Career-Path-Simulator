import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const SkillRatingForm = ({ value = [], onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const skillLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'pro', label: 'Professional' },
    { value: 'expert', label: 'Expert' }
  ];

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...value, { name: newSkill.trim(), level: 'beginner' }];
      onChange(updatedSkills);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = value.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };

  const handleLevelChange = (index, level) => {
    const updatedSkills = value.map((skill, i) => 
      i === index ? { ...skill, level } : skill
    );
    onChange(updatedSkills);
  };

  return (
    <div className="space-y-2">
      {value.map((skill, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <div className="flex-1 p-2 border rounded bg-gray-50">
            {skill.name}
          </div>
          <select
            value={skill.level}
            onChange={(e) => handleLevelChange(index, e.target.value)}
            className="p-2 border rounded"
          >
            {skillLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleRemoveSkill(index)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter a new skill"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="p-2 text-blue-500 hover:text-blue-700"
          disabled={!newSkill.trim()}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SkillRatingForm;