import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePdf from './ResumePdf'; // Ensure this component is defined properly
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ResumePreview = ({ formData }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div>
      <h1>Resume Preview</h1>
      <div>
        <h2>{formData.name}</h2>
        <p>{formData.email}</p>
        <p>{formData.phone}</p>
        <p>{formData.city}</p>
        <h3>Summary/Objective</h3>
        <p>{formData.summary}</p>
        <h3>Skills</h3>
        <p>{formData.skills.split(',').map(skill => skill.trim()).join(', ')}</p>
        <h3>Languages</h3>
        <p>{formData.languages.split(',').map(language => language.trim()).join(', ')}</p>
        <h3>Links</h3>
        <p>LinkedIn: <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">{formData.linkedin}</a></p>
        <p>GitHub: <a href={formData.github} target="_blank" rel="noopener noreferrer">{formData.github}</a></p>

        <h3>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index}>
            <h4>{exp.title} at {exp.company}</h4>
            <p>{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}

        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <h4>{edu.degree} from {edu.institution} ({edu.year})</h4>
          </div>
        ))}

        <h3>Projects</h3>
        {formData.projects.map((proj, index) => (
          <div key={index}>
            <h4>{proj.title}</h4>
            <p>{proj.description}</p>
          </div>
        ))}
      </div>

      <PDFDownloadLink document={<ResumePdf formData={formData} />} fileName="resume.pdf">
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>

      <button onClick={() => navigate('/')}>Go Home</button> {/* Home Button */}
    </div>
  );
};

export default ResumePreview;