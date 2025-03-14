// components/SaveResumeButton.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from './Button';
import { Save } from 'lucide-react';

const SaveResumeButton = ({ resumeData }) => {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Replace with your actual backend API endpoint
      const response = await axios.post('http://localhost:5000/api/resumes', resumeData);
      toast.success('Resume saved successfully!', { position: 'top-center', autoClose: 2000 });
      console.log('Saved resume:', response.data);
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume. Check console for details.', { position: 'top-center', autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSave} disabled={loading} className="flex items-center gap-2">
      <Save className="h-4 w-4" />
      {loading ? 'Saving...' : 'Save Resume'}
    </Button>
  );
};

export default SaveResumeButton;