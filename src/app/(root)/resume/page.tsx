"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Plus, Minus, Award } from "lucide-react";
import ThemeSelector from '@/app/components/ThemeSelector';
import SkillSuggestions from '@/app/components/SkillSuggestions';

interface Experience {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface Education {
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
}

interface Skill {
  name: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

const ResumeBuilder = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    summary: "",
    experience: [
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ],
    education: [
      {
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
      },
    ],
    skills: [
      { name: "" },
      { name: "" },
      { name: "" },
    ],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('modern');

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchSummary = async (summaryTitle: string) => {
    if (!summaryTitle) {
      alert("Please enter a job title first");
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/suggest-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summaryTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();
      // Update the formData directly with the new summary
      setFormData(prev => ({
        ...prev,
        summary: data.summary
      }));
      console.log(formData)
    } catch (error) {
      console.error("Error fetching job title summary:", error);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExperienceChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, experience: newExperience }));
  };

  const handleEducationChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, education: newEducation }));
  };

  const handleSkillChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const newSkills = [...formData.skills];
    newSkills[index] = { name: value };
    setFormData((prevData) => ({ ...prevData, skills: newSkills }));
  };

  const createResume = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add validation
    if (!formData.firstName || !formData.lastName || !formData.jobTitle) {
      alert("Please fill in all required fields (First Name, Last Name, Job Title)");
      return;
    }

    try {
      const response = await fetch("/api/create-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          theme: selectedTheme,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create resume");
      }

      const result = await response.json();
      window.location.href = `/resume/view/${result._id}`;
    } catch (error) {
      console.error("Error creating resume:", error);
      alert(error instanceof Error ? error.message : "Failed to create resume. Please try again.");
    }
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: "" }]
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const generateDescription = async (jobTitle: string, index: number) => {
    try {
      const response = await fetch("/api/suggest-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch description");
      }

      const data = await response.json();
      
      // Update the specific experience entry with the generated description
      const newExperience = [...formData.experience];
      newExperience[index] = { 
        ...newExperience[index], 
        description: data.description 
      };
      setFormData(prev => ({
        ...prev,
        experience: newExperience
      }));
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Failed to generate description. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Create Your Professional Resume
        </h2>

        <form onSubmit={createResume} className="space-y-8">
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold ml-3">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                name="jobTitle"
                type="text"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* AI Summary Generator Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold ml-3">AI-Powered Summary</h3>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => fetchSummary(formData.jobTitle)}
                disabled={isGenerating}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate Professional Summary'
                )}
              </button>

              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Your professional summary will appear here..."
                className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold ml-3">Work Experience</h3>
            </div>

            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    name="title"
                    type="text"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => generateDescription(exp.title, index)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Generate Description
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    name="companyName"
                    type="text"
                    placeholder="Company Name"
                    value={exp.companyName}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    value={exp.city}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    name="state"
                    type="text"
                    placeholder="State"
                    value={exp.state}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="startDate"
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    name="endDate"
                    type="date"
                    value={exp.endDate}
                    disabled={exp.currentlyWorking}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking}
                      onChange={(e) => handleExperienceChange(index, {
                        target: {
                          name: "currentlyWorking",
                          value: e.target.checked,
                        },
                      } as any)}
                      className="form-checkbox"
                    />
                    <span>Currently Working</span>
                  </div>
                </div>
                <textarea
                  name="description"
                  placeholder="Job Description"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full p-3 border rounded-lg mt-4"
                  rows={4}
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={addExperience}
                className="text-blue-500 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </button>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold ml-3">Education</h3>
            </div>

            {formData.education.map((edu, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    name="degree"
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <input
                    name="universityName"
                    type="text"
                    placeholder="University Name"
                    value={edu.universityName}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <input
                    name="startDate"
                    type="text"
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <input
                    name="endDate"
                    type="text"
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Award className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Skills</h3>
            </div>

            <SkillSuggestions
              jobTitle={formData.jobTitle}
              experience={formData.experience[0]?.title || ''}
              onAddSkill={(skill) => {
                setFormData(prev => ({
                  ...prev,
                  skills: [...prev.skills, skill]
                }));
              }}
            />

            <div className="mt-6 space-y-4">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Skill Name"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, e)}
                    className="flex-1 p-3 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={addSkill}
                className="text-green-600 hover:text-green-800 flex items-center mr-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </button>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold ml-3">Choose Resume Theme</h3>
            </div>
            
            <ThemeSelector
              selectedTheme={selectedTheme}
              onThemeSelect={setSelectedTheme}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeBuilder;
