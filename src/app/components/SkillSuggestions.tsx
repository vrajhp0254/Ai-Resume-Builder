import { useState } from 'react';

interface Skill {
  name: string;
}

interface SkillSuggestionsProps {
  jobTitle: string;
  experience: string;
  onAddSkill: (skill: Skill) => void;
}

export default function SkillSuggestions({ jobTitle, experience, onAddSkill }: SkillSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<{
    technicalSkills: Skill[];
    softSkills: Skill[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    if (!jobTitle) {
      alert("Please enter a job title first");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, experience }),
      });
      
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching skill suggestions:', error);
      alert('Failed to generate skill suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={fetchSuggestions}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        {loading ? 'Generating Suggestions...' : 'Get Skill Suggestions'}
      </button>

      {suggestions && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-gray-700">Technical Skills</h4>
            <div className="space-y-2">
              {suggestions.technicalSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => onAddSkill(skill)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Add Skill
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-gray-700">Soft Skills</h4>
            <div className="space-y-2">
              {suggestions.softSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => onAddSkill(skill)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Add Skill
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 