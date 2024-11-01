import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePdf from './ResumePdf';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumePreview = ({ formData, selectedTheme }) => {
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate();

  // Fetch themes from db.json
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/themes'); // Adjust the path as necessary
        setThemes(response.data); // Use response.data directly
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    fetchThemes();
  }, []);

  // Find the selected theme
  const theme = selectedTheme && themes.find(t => t.name.toLowerCase() === selectedTheme.name.toLowerCase()) || themes[0];

  // Check if theme is loaded
  if (!theme) {
    return <div>Loading theme...</div>; // Loading state
  }

  return (
    <div
      className="resume-preview"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: 'Arial, sans-serif', // Add a standard font
        padding: '20px',
      }}
    >
      <h1 style={{ color: theme.textColor, textAlign: 'center', marginBottom: '20px' }}>{formData.name}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p style={{ margin: 0 }}>{formData.email}</p>
          <p style={{ margin: 0 }}>{formData.phone}</p>
          <p style={{ margin: 0 }}>{formData.city}</p>
        </div>
        <div>
          <p style={{ margin: 0 }}>
            LinkedIn: <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: theme.linkColor }}>{formData.linkedin}</a>
          </p>
          <p style={{ margin: 0 }}>
            GitHub: <a href={formData.github} target="_blank" rel="noopener noreferrer" style={{ color: theme.linkColor }}>{formData.github}</a>
          </p>
        </div>
      </div>

      <h2 style={{ color: theme.textColor, marginBottom: '10px' }}>Summary/Objective</h2>
      <p style={{ marginBottom: '20px' }}>{formData.summary}</p>

      <h2 style={{ color: theme.textColor, marginBottom: '10px' }}>Skills</h2>
      <p style={{ marginBottom: '20px' }}>{formData.skills.split(',').map(skill => skill.trim()).join(', ')}</p>

      <h2 style={{ color: theme.textColor, marginBottom: '10px' }}>Languages</h2>
      <p style={{ marginBottom: '20px' }}>{formData.languages.split(',').map(language => language.trim()).join(', ')}</p>

      <h2 style={{ color: theme.textColor, marginBottom: '10px' }}>Experience</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.textColor, marginBottom: '10px' }}>{exp.title} at {exp.company}</h3>
          <p style={{ marginBottom: '10px' }}>{exp.duration}</p>
          <p style={{ marginBottom: '10px' }}>{exp.description}</p>
        </div>
      ))}

      <h2 style={{ color: theme.textColor, marginBottom: '10px' }}>Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.textColor, marginBottom: '10px' }}>{edu.degree} from {edu.institution} ({edu.year})</h3>
        </div>
      ))}

      <h2 style={{ color: theme.textColor, marginBottom: '10px' }}>Projects</h2>
      {formData.projects.map((proj, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.textColor, marginBottom: '10px' }}>{proj.title}</h3>
          <p style={{ marginBottom: '10px' }}>{proj.description}</p>
        </div>
      ))}

      <PDFDownloadLink document={<ResumePdf formData={formData} />} fileName="resume.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
      <button onClick={() => navigate('/form')}>Edit Resume</button>
    </div>
  );
};

export default ResumePreview;