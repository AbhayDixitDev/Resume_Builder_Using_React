import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeSelection from './Components/ThemeSelection';
import ResumeForm from './Components/ResumeForm';
import ResumePreview from './Components/ResumePreview';
import "./style.css"

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
  };

  const handleSubmitForm = (data) => {
    setFormData(data);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route 
            path="/" 
            element={
              !selectedTheme ? (
                <ThemeSelection onSelectTheme={handleSelectTheme} />
              ) : (
                <ResumeForm theme={selectedTheme} onSubmit={handleSubmitForm} />
              )
            } 
          />
          <Route 
            path="/preview" 
            element={<ResumePreview formData={formData} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;