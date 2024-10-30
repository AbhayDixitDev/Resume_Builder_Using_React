import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 5,
    textDecoration: 'underline',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
});

const ResumePdf = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>{formData.name}</Text>
          <Text style={styles.text}>{formData.email}</Text>
          <Text style={styles.text}>{formData.phone}</Text>
          <Text style={styles.text}>{formData.city}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary/Objective</Text>
            <Text style={styles.text}>{formData.summary}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.text}>{formData.skills.split(',').map(skill => skill.trim()).join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.text}>{formData.languages.split(',').map(language => language.trim()).join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Links</Text>
            <Text style={styles.text}>LinkedIn: <Text style={styles.link}>{formData.linkedin}</Text></Text>
            <Text style={styles.text}>GitHub: <Text style={styles.link}>{formData.github}</Text></Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {formData.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.experienceTitle}>{exp.title} at {exp.company}</Text>
                <Text style={styles.text}>{exp.duration}</Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {formData.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.experienceTitle}>{edu.degree} from {edu.institution} ({edu.year})</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {formData.projects.map((proj, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style ={styles.experienceTitle}>{proj.title}</Text>
                <Text style={styles.text}>{proj.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePdf;