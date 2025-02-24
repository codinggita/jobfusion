import { useState, useEffect } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function BookmarkButton({ job, onToggle }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setBookmarked(savedJobs.includes(job.id));
  }, [job.id]);

  const handleClick = async () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Please log in to save jobs.");
      return;
    }

    // Optimistic UI update
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);

    try {
      let updatedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

      if (newBookmarkedState) {
        await axios.post("https://jobfusion.onrender.com/api/jobs/save", { email, jobData: job });
        updatedJobs.push(job.id);
      } else {
        await axios.delete("https://jobfusion.onrender.com/api/jobs/unsave", {
          data: { email, jobId: job.id },
        });
        updatedJobs = updatedJobs.filter((id) => id !== job.id);
      }

      localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
      onToggle();
    } catch (error) {
      console.error("Error updating saved jobs:", error);
      alert("Failed to update saved jobs.");
      setBookmarked(!newBookmarkedState); // Rollback UI on error
    }
  };

  return (
    <button onClick={handleClick} className="p-2 rounded-full bg-transparent border-none cursor-pointer">
      <AnimatePresence mode="wait">
        {bookmarked ? (
          <motion.div
            key="added"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BookmarkAddedIcon fontSize="large" style={{ color: "lightblue" }} />
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BookmarkAddIcon fontSize="large" style={{ color: "lightblue" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
