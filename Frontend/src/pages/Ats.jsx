import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Upload, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

function ATSChecker() {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    handleFileUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/api/ats-checker", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();

      if (data.success) {
        setScore(data.atsScore);
        setSuggestions(data.suggestions);
      } else {
        throw new Error(data.message || "Failed to analyze resume");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setScore(0);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (score > 0) {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev < score) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [score]);

  const handleCheckAnother = () => {
    setFile(null);
    setScore(0);
    setAnimatedScore(0);
    setSuggestions([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-[#E8EEF5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#333]">
          ATS Resume Checker
        </h1>

        {!file ? (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-[#688BC5] rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-[#F7F9FC]"
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto text-[#688BC5] mb-4" size={48} />
            {isDragActive ? (
              <p className="text-[#688BC5]">Drop your resume here...</p>
            ) : (
              <p className="text-[#333]">
                Drag & drop your resume (PDF) or click to upload
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between bg-[#F7F9FC] p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" />
                <span className="font-medium">{file.name}</span>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setScore(0);
                  setSuggestions([]);
                  setError(null);
                }}
                className="text-[#688BC5] hover:underline"
              >
                Remove
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin text-[#688BC5]" size={48} />
                <span className="ml-2 text-[#333]">Analyzing your resume...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">
                <AlertTriangle className="mx-auto mb-2" size={24} />
                <p>{error}</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <div className="w-48 h-48">
                    <CircularProgressbar
                      value={animatedScore}
                      text={`${animatedScore}%`}
                      styles={buildStyles({
                        textSize: "16px",
                        pathTransitionDuration: 0.5,
                        pathColor:
                          animatedScore > 80
                            ? "#22c55e"
                            : animatedScore > 50
                            ? "#688BC5"
                            : "#ef4444",
                        textColor: "#333",
                      })}
                    />
                  </div>
                </div>

                {suggestions.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#333]">
                      Suggestions for Improvement
                    </h2>
                    <ul className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle
                            className="text-[#688BC5] mr-2 flex-shrink-0 mt-1"
                            size={20}
                          />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={handleCheckAnother}
                  className="w-full bg-[#688BC5] text-white py-3 rounded-lg font-medium hover:bg-[#5A7AB0] transition-colors"
                >
                  Check Another Resume
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSChecker;