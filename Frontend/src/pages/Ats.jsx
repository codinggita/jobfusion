import React, { useState } from "react";
import axios from "axios";

function ATS() {
  const [file, setFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to backend
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:3000/api/ats-checker", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAtsScore(response.data.atsScore);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      setError("Error analyzing resume. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container" style={{ textAlign: "center", padding: "20px" }}>
      <h1>ATS Resume Checker</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Check ATS Score"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {atsScore !== null && (
        <div>
          <h2>ATS Score: {atsScore}/100</h2>
          <h3>Suggestions:</h3>
          <ul>
            {suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ATS;
