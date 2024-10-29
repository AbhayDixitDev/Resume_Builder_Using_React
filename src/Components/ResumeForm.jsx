import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ResumeForm = ({ theme, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    summary: '',
    skills: '',
    languages: '',
    linkedin: '',
    github: '',
    experience: [],
    education: [],
    projects: []
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (index, e) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, experience: newExperience });
  };

  const handleEducationChange = (index, e) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, education: newEducation });
  };

  const handleProjectChange = (index, e) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, projects: newProjects });
  };

  const addExperience = () => {
    setFormData({ ...formData, experience: [...formData.experience, { title: '', company: '', duration: '', description: '' }] });
  };

  const addEducation = () => {
    setFormData({ ...formData, education: [...formData.education, { degree: '', institution: '', year: '' }] });
  };

  const addProject = () => {
    setFormData({ ...formData, projects: [...formData.projects, { title: '', description: '' }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/preview');
  };

  return (
    <div>
      <h1>{theme.name} Resume Form</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} />
        <textarea name="summary" placeholder="Summary/Objective" onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />
        <input name="languages" placeholder="Languages (comma separated)" onChange={handleChange} />
        <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
        <input name="github" placeholder="GitHub URL" onChange={handleChange} />

        <h3>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index}>
            <input name="title" placeholder="Job Title" onChange={(e) => handleExperienceChange(index, e)} required />
            <input name="company" placeholder="Company" onChange={(e) => handleExperienceChange(index, e)} required />
            <input name="duration" placeholder="Duration" onChange={(e) => handleExperienceChange(index, e)} required />
            <textarea name="description" placeholder="Description" onChange={(e) => handleExperienceChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={addExperience}>Add More Experience</button>

        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input name="degree" placeholder="Degree" onChange={(e) => handleEducationChange(index, e)} required />
            <input name="institution" placeholder="Institution" onChange={(e) => handleEducationChange(index, e)} required />
            <input name="year" placeholder="Year" onChange={(e) => handleEducationChange(index, e )} required />
          </div>
        ))}
        <button type="button" onClick={addEducation}>Add More Education</button>

        <h3>Projects</h3>
        {formData.projects.map((proj, index) => (
          <div key={index}>
            <input name="title" placeholder="Project Title" onChange={(e) => handleProjectChange(index, e)} required />
            <textarea name="description" placeholder="Project Description" onChange={(e) => handleProjectChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={addProject}>Add More Projects</button>

        <button type="submit">Generate Resume</button>
        <button type="button" onClick={() => navigate('/')}>Go Home</button> {/* Home Button */}
      </form>
    </div>
  );
};

export default ResumeForm;