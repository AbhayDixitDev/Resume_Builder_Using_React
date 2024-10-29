import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ThemeSelection = ({ onSelectTheme }) => {
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/themes');
        setThemes(response.data);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };
    fetchThemes();
  }, []);

  return (
    <div>
      <h1>Select a Resume Theme</h1>
      {themes.map(theme => (
        <button key={theme.id} onClick={() => onSelectTheme(theme)}>
          {theme.name}
        </button>
      ))}
      <button onClick={() => navigate('/')}>Go Home</button> {/* Home Button */}
    </div>
  );
};

export default ThemeSelection;